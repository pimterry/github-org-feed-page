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
        }
    };

    return GithubEvent;
});