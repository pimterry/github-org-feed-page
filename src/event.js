define(["moment"], function (moment) {
   return function Event(rawEvent) {
       var self = this;

       self.username = "pimterry";
       self.eventActionSummary = "pushed to pimterry/github-org-feed-page";
       self.eventDetail = "Initial commit"
       self.eventTime = moment("2013-12-23T19:10:00").fromNow();
   };
});