requirejs.config({
    "paths" : {
        "moment": "lib/moment"
    }
})

require(["feedViewModel", "lib/knockout"], function (ViewModel, ko) {
    ko.applyBindings(new ViewModel("Softwire"));
});