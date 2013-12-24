define(["test/lib/Squire"], function (Squire) {
    "use strict";

    describe("Github event", function () {
        var GithubEvent;

        beforeEach(function () {
            runs(function () {
                GithubEvent = null;
                new Squire().require(['githubEvent'], function (freshGithubEvent) {
                    GithubEvent = freshGithubEvent;
                });
            });

            waitsFor(function () {
                return GithubEvent;
            });
        });

        it("should have a correct timestamp", function () {
            var eventDate = new Date();

            var event = new GithubEvent({created_at: eventDate.toISOString()});

            expect(event.timestamp).toEqual(eventDate.valueOf());
        });
    });
});