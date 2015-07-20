define(["lib/knockout", "lib/lodash", "githubEvent"],
  function (ko, _, GithubEvent) {
    return function FeedViewModel(organisationName, Github) {
        var self = this;

        var events = ko.observableArray([]);

        Github.orgs("Softwire").members.fetch().then(function (members) {
            return Promise.all(members.map(function (member) {
                return member.events.fetch();
            }));
        }).then(function (memberEvents) {
            events(_(memberEvents).flatten().map(function (event) {
                return new GithubEvent(event);
            }).sortBy(function (event) {
                return event.timestamp;
            }).reverse().value());
        }).catch(console.error.bind(console));

        self.majorEvents = ko.computed(function () {
            return _.where(events(), function (e) {
                return _.contains([
                    "IssuesEvent",
                    "PullRequestEvent",
                    "ForkEvent"
                ], e.type);
            }).slice(0, 20);
        });

        self.minorEvents = ko.computed(function () {
            return _.where(events(), function (e) {
                return _.contains([
                    "PushEvent",
                    "WatchEvent"
                ], e.type);
            }).slice(0, 20);
        });
    };
});