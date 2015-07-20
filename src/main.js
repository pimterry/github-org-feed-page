requirejs.config({
    "paths" : {
        "moment": "lib/moment"
    }
});

require(["lib/knockout", "lib/octokat", "feedViewModel"],
    function (ko, Octocat, ViewModel) {

        var ORGANISATION_NAME = "Softwire";
        OAuth.initialize('KabILxBurHG_ryDZ62XjHHnqh-0');

        var accessToken = localStorage["OAUTH_TOKEN"];
        if (!accessToken) {
            OAuth.popup('github').done(function (result) {
                accessToken = result.access_token;
                localStorage["OAUTH_TOKEN"] = accessToken;
                ko.applyBindings(new ViewModel(ORGANISATION_NAME, new Octocat({ token: accessToken })));                
            }).fail(function (error) {
                alert("Login failed: " + error);
            });
        } else {
            ko.applyBindings(new ViewModel(ORGANISATION_NAME, new Octocat({ token: accessToken })));
        }
    }
);