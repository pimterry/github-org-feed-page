define(["lib/knockout", "lib/lodash", "githubApi"],
  function (ko, _, githubApi) {
    return function FeedViewModel(organisationName) {
        var self = this;

        var events = githubApi.getOrganisationEvents("Softwire");

        var loaded = ko.computed(function () {
            if (events.loadingComplete()) {
                return true;
            } else {
                return events().length > 0;
            }
        });

        self.majorEvents = ko.computed(function () {
            return _.where(events(), function (e) {
                return _.contains([
                    "IssuesEvent",
                    "PullRequestEvent",
                    "ForkEvent"
                ], e.type);
            });
        });

        self.minorEvents = ko.computed(function () {
            return _.where(events(), function (e) {
                return _.contains([
                    "PushEvent",
                    "WatchEvent"
                ], e.type);
            });
        });
    };
});