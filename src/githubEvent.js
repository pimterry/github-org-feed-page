define(["moment"], function (moment) {
    function GithubEvent(rawEvent) {
        var self = this;

        var createdAt = moment(rawEvent.created_at);

        self.username = rawEvent.actor;
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
                var commits = rawEvent.payload.shas;
                var commitsPushed = commits.length + " commit" + (commits.length > 1 ? "s" : "");

                return "pushed " + commitsPushed + " to " +
                       rawEvent.repository.owner + "/" + rawEvent.repository.name;
            }
        },
        PullRequestEvent: {
            actionSummary: function (rawEvent) {
                return rawEvent.payload.action + " pull request '" +
                       rawEvent.payload.pull_request.title + "' for " +
                       rawEvent.repository.owner + "/" + rawEvent.repository.name;
            }
        },
        IssuesEvent: {
            actionSummary: function (rawEvent) {
                return rawEvent.payload.action + " issue #" +
                    rawEvent.payload.number + " in " +
                    rawEvent.repository.owner + "/" + rawEvent.repository.name;
            }
        },
        ForkEvent: {
            actionSummary: function (rawEvent) {
                return "forked " + rawEvent.repository.owner + "/" + rawEvent.repository.name;
            }
        },
        WatchEvent: { // Due to an accident of github api history, watch means star
            actionSummary: function (rawEvent) {
                return "starred " + rawEvent.repository.owner + "/" + rawEvent.repository.name;
            }
        }
    };

    return GithubEvent;
});