define(["moment"], function (moment) {
   return function GithubEvent(rawEvent) {
       var self = this;

       var createdAt = moment(rawEvent.created_at);

       self.username = rawEvent.actor;
       self.type = rawEvent.type;
       self.eventActionSummary = "opened pull request to pimterry/github-org-feed-page";
       self.eventDetail = "Initial commit";
       self.eventTime = createdAt.fromNow();
       self.timestamp = createdAt.valueOf();
   };
});