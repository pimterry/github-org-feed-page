define(["lib/reqwest", "lib/lodash", "lib/knockout", "githubEvent"],
  function (reqwest, _, ko, GithubEvent) {
    var githubApi = {};

    var rootUrl = "https://api.github.com";

    function getOrganisationMembers(orgName) {
        return reqwest({
            url: 'https://api.github.com/orgs/' + orgName + '/members',
            type: 'json'
        });
    }

    function getUserEvents(username) {
        return reqwest({
            url: 'https://github.com/' + username + '.json?callback=?',
            method: 'get',
            crossOrigin: true,
            headers: { "Accept": "application/json" },
            type: 'jsonp'
        }).then(function (response) {
            return _.map(response, function (response) {
                return new GithubEvent(response);
            });
        });
    }

    // Returns a KO array which is then updated as data arrives
    githubApi.getOrganisationEvents = function (orgName) {
        var events = ko.observableArray([]);

        var loading = 1;

        getOrganisationMembers(orgName).then(function (members) {
            loading = members.length;

            _.each(members, function (member) {
                getUserEvents(member.login).then(function (userEvents) {
                    var combinedEvents = events().concat(userEvents);
                    events(_.sortBy(combinedEvents, function (e) {
                        return e.timestamp;
                    }).reverse());
                    loading--;
                });
            });
        });

        events.loadingComplete = ko.computed(function () {
            return loading === 0;
        });

        return events;
    };

    return githubApi;
});