define(["lib/knockout", "lib/lodash", "event"], function (ko, _, event) {
    return function FeedViewModel() {
        var self = this;

        self.majorEvents = ko.observableArray(_.map([
            { "username": "pimterry" },
            { "username": "other" }
        ], event));
        self.minorEvents = ko.observableArray();
    };
})