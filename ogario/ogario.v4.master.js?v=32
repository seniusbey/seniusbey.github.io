
            });
            $("#gamemode").on("change", function() {
                chat.handleChangeMode();
            });
            $(".btn-play, .btn-play-guest").on("click", function(result) {
                result.preventDefault();
                chat.setNick();
            });
            $(".btn-spectate").on("click", function(result) {
                result.preventDefault();
                chat.spectate();
            });
            $("#create-party-btn-2").on("click", function(event) {
                event.preventDefault();
                chat.createParty();
            });
            $("#join-party-btn-2").on("click", function(result) {
                result.preventDefault();
                chat.joinParty($("#party-token").val());
            });
            self.toggleSocialLogin = function() {
                $("#socialLoginContainer").toggle();
            };
        },
        init: function() {
            var n = this;
            this.setUI();
            this.getRegionNames();
            this.refreshRegionInfo();
            this.checkHash();
            this.getRegionCode();
            this.checkRegion();
            setInterval(function() {
                n.refreshRegionInfo();
            }, 18e4);
        }
    };
    self.getStorage = function() {
        if (null !== self.localStorage.getItem("storeObjectInfo")) {
            options = JSON.parse(self.localStorage.getItem("storeObjectInfo"));
        }
    };
    self.updateStorage = function() {
        self.localStorage.setItem("storeObjectInfo", JSON.stringify(options));
    };
    self.logout = function() {
        if (options.context === "google" && api) {
            api.signOut();
        }
        delete self.localStorage.storeObjectInfo;
        $("#helloContainer").attr("data-logged-in", "0");
        $(".progress-bar-striped").width("0%");
        $("#login-facebook").attr("class", "menu-bar-button");
        $("#login-google").attr("class", "menu-bar-button");
        toastr.info("<b>[" + Premadeletter123 + "]:</b> " + Premadeletter127 + "!");
        master.logout();
    };
    self.facebookLogin = function() {
        alert("[Master] You seem to have something blocking Facebook on your browser, please check for any extensions");
    };
    self.fbAsyncInit = function() {
        self.FB.init({
            appId: headers.fb_app_id,
            cookie: true,
            xfbml: true,
            status: true,
            version: "v2.8"
        });
        l = true;
        login();
    };
    self.gapiAsyncInit = function() {
        self.getStorage();
        setup();
    };
};
