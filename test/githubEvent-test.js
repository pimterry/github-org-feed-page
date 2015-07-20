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

            var event = new GithubEvent({
                createdAt: eventDate.toISOString(),
                actor: {}
            });

            expect(event.timestamp).toEqual(eventDate.valueOf());
        });

        it("should have a description for push events", function () {
            var event = new GithubEvent({
                type: "PushEvent",
                actor: {},
                repo: {
                    name: "pimterry/loglevel"
                },
                payload: {
                    commits: [
                        {}, {}, {}
                    ]
                }
            });

            expect(event.eventActionSummary).toEqual("pushed 3 commits to pimterry/loglevel");
        });

        it("should have a singular description for single push events", function () {
            var event = new GithubEvent({
                type: "PushEvent",
                actor: {},
                repo: {
                    name: "pimterry/loglevel"
                },
                payload: {
                    commits: [ {} ]
                }
            });

            expect(event.eventActionSummary).toEqual("pushed 1 commit to pimterry/loglevel");
        });

        it("should have a description for pull requests", function () {
            var event = new GithubEvent({
                type: "PullRequestEvent",
                actor: {},
                repo: {
                    name: "junit-team/junit"
                },
                payload: {
                    action: "opened",
                    pullRequest: {
                        title: "New Pull Request"
                    }
                }
            });

            expect(event.eventActionSummary)
                .toEqual("opened pull request 'New Pull Request' for junit-team/junit");
        });

        it("should have a description for issues", function () {
            var event = new GithubEvent({
                type: "IssuesEvent",
                actor: {},
                repo: {
                    name: "junit-team/junit"
                },
                payload: {
                    action: "closed",
                    issue: {
                        number: 34,
                        title: "title"
                    }
                }
            });

            expect(event.eventActionSummary)
                .toEqual("closed issue #34: 'title' in junit-team/junit");
        });

        it("should have a description for issues", function () {
            var event = new GithubEvent({
                type: "ForkEvent",
                actor: {},
                repo: {
                    name: "knockout/knockout"
                }
            });

            expect(event.eventActionSummary)
                .toEqual("forked knockout/knockout");
        });

        it("should have a description for star events", function () {
            var event = new GithubEvent({
                type: "WatchEvent",
                actor: {},
                repo: {
                    name: "knockout/knockout"
                }
            });

            expect(event.eventActionSummary)
                .toEqual("starred knockout/knockout");
        });
    });
});