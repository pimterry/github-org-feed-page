define(["moment"], function (moment) {
    function GithubEvent(rawEvent) {
        var self = this;

        var createdAt = moment(rawEvent.createdAt);

        self.username = rawEvent.actor.login;
        self.type = rawEvent.type;

        self.eventTime = createdAt.fromNow();
        self.timestamp = createdAt.valueOf();

        var eventType = eventTypes[rawEvent.type];
        if (typeof eventType !== "undefined") {
            self.eventActionSummary = eventType.actionSummary(rawEvent);
        } else {
            self.eventActionSummary = "did something";
        }
    }

    var eventTypes = {
        PushEvent: {
            actionSummary: function (rawEvent) {
                var commits = rawEvent.payload.commits;
                var commitsPushed = commits.length + " commit" + (commits.length > 1 ? "s" : "");

                return "pushed " + commitsPushed + " to " + rawEvent.repo.name;
            }
        },
        PullRequestEvent: {
            actionSummary: function (rawEvent) {
                return rawEvent.payload.action + " pull request '" +
                       rawEvent.payload.pullRequest.title + "' for " +
                       rawEvent.repo.name;
            }
        },
        IssuesEvent: {
            actionSummary: function (rawEvent) {
                return rawEvent.payload.action + " issue #" +
                       rawEvent.payload.issue.number + ": '" +
                       rawEvent.payload.issue.title + "' in " +
                       rawEvent.repo.name;
            }
        },
        ForkEvent: {
            actionSummary: function (rawEvent) {
                return "forked " + rawEvent.repo.name;
            }
        },
        WatchEvent: { // Due to an accident of github api history, watch means star
            actionSummary: function (rawEvent) {
                return "starred " + rawEvent.repo.name;
            }
        }
    };

    return GithubEvent;
});