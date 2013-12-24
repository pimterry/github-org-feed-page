define(["moment"], function (moment) {
   return function GithubEvent(rawEvent) {
       var self = this;

       self.username = rawEvent.actor.login;
       self.type = rawEvent.type;
       self.eventActionSummary = "opened pull request to pimterry/github-org-feed-page";
       self.eventDetail = "Initial commit"
       self.eventTime = moment(rawEvent.created_at).fromNow();
   };
});