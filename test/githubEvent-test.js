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

        it("should have a description for push events", function () {
            var event = new GithubEvent({
                type: "PushEvent",
                repository: {
                    owner: "pimterry",
                    name: "loglevel"
                },
                payload: {
                    shas: [
                        {}, {}, {}
                    ]
                }
            });

            expect(event.eventActionSummary).toEqual("pushed 3 commits to pimterry/loglevel");
        });

        it("should have a singular description for single push events", function () {
            var event = new GithubEvent({
                type: "PushEvent",
                repository: {
                    owner: "pimterry",
                    name: "loglevel"
                },
                payload: {
                    shas: [ {} ]
                }
            });

            expect(event.eventActionSummary).toEqual("pushed 1 commit to pimterry/loglevel");
        });

        it("should have a description for pull requests", function () {
            var event = new GithubEvent({
                type: "PullRequestEvent",
                repository: {
                    owner: "junit-team",
                    name: "junit"
                },
                payload: {
                    action: "opened",
                    pull_request: {
                        title: "New Pull Request"
                    }
                }
            });

            expect(event.eventActionSummary)
                .toEqual("opened pull request 'New Pull Request' for junit-team/junit");
        });
    });
});