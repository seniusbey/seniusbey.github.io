//Realistic Sniff 3 by Senius

//Prevent Image crash

//preventcanvasimagecrash();


/*
//1. RegisterSkins (declared on ogario.js)
if ( typeof core != 'undefined'){
//core.registerSkin('fly', null, 'https://i.imgur.com/poFMdZd.png', 1, null);
	core.registerSkin = function(a, b, c, d, e){
	window.customskinsname=a;
	window.customskinsurl=c;
	}
}
*/


// Inject Chat to text userscript
//setTimeout(function() {
//	console.log("VoiceDeOChat:Stage 1");
 var myEle = document.getElementById("voice-prefix");
    if(!myEle){
//    console.log("VoiceDeOChat:Stage 2");
    		
var textspeach="";
        function pre_loop() {
            if (!document.getElementById("message-box")) {
                setTimeout(pre_loop, 4000);
//                console.log("VoiceDeOChat:wait for Legend load");
                return;
            }
            return initialize();
        }
        pre_loop();

        function initialize() {
            var lang_hash = {
                "default": "default",
                "ja": "日本語",
                "en-US": "English",
                "el-GR": "Ελληνικά",
                "zh-CN": "简体中文",
                "zh-TW": "繁體中文",
                "ko": "한국어"
            };
            var cfg = {};
			cfg.prefix = localStorage.getItem("prefix");
			if (cfg.prefix==null){
				cfg.prefix="🎤";
			}
            //cfg.prefix = GM_getValue("prefix", "🎤");
			cfg.lang = localStorage.getItem("lang");
			if (cfg.lang==null){
				cfg.lang="default";
			}						
            //cfg.lang = GM_getValue("lang", "default");
			cfg.unpause = localStorage.getItem("unpause");
			if (cfg.unpause==null){
				cfg.unpause=false;
			}			
            //cfg.unpause = GM_getValue("unpause", false);
//            console.log("load prefix=" + cfg.prefix + " lang=" + cfg.lang + " unpause=" + cfg.unpause);
            $("#message-box").mousedown(function() {
                return false;
            });
            $(".team-top-menu").mousedown(function() {
                return false;
            });
            $("#message-menu").append('<a href="#" class="chatbox-hide icon-close" style="float:right;">X</a>');
            $(".chatbox-hide").click(function() {
                $("#message-box").css("display", "none");
                if (cfg.unpause && $("#pause-hud").css("display") == "block") {
                    var code = 82; // 'R'
                    $(document).trigger(jQuery.Event('keydown', {
                        keyCode: code,
                        which: code
                    }));
                }
            });
            $("#message-menu").append('<a href="#" class="chatbox-clear icon-clear" style="float:right;">C</a>');
            $(".chatbox-clear").click(function() {
                $("#message").val("");
				textspeach="";
            });
            window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
            var recognition = new window.SpeechRecognition();
            if (cfg.lang !== "default") {
                recognition.lang = cfg.lang;
            }
//            console.log("cfg.lang/recognition.lang=" + cfg.lang + "/" + recognition.lang);
            recognition.addEventListener('result', function(event) {
                var text_to = event.results.item(0).item(0).transcript;
/*                var text_pre = $("#message").val();
                if (text_pre === "") {
                    text_to = cfg.prefix + text_to;
                } else {
                    text_to = text_pre + " " + text_to;
                }
                $("#message").val(text_to); */
				textspeach=text_to;
				legendmod3.sendChatMessage(101,"🎤 " +text_to)
            }, false);
            recognition.addEventListener('end', function(event) {
                fn_recognition_end();
            }, false);
            $("#message-menu").append('<a href="#" class="voice-start icon-mic" style="float:right;">🎤</a>');
            $(".voice-start").click(function() {
                fn_recognition_start();
            });

            function fn_recognition_start() {
                $("#voice-config").css("display", "none");
                $(".voice-start").css("background-color", "green");
				$("#VoiceBtn1").css("background-color", "green");
                recognition.start();
            }

            function fn_recognition_end() {
                $(".voice-start").css("background-color", "");
				$("#VoiceBtn1").css("background-color", "");
            }
            $("#og-options").append('<div id="voice-config" class="options-box voiceGroup"></div>');
            $("#voice-config").append('<h5 class="menu-main-color">Voice</h5>');
            $("#voice-config").append('<label>Voice-Prefix:<input type="text" id="voice-prefix" style="width:4em; float:none;" value="' + cfg.prefix + '"/></label>');

            function fn_lang_make() {
                $("#voice-config").append('<label>Voice-lang:<select id="voice-lang"/></select></label>');
                for (var code in lang_hash) {
                    var desc = lang_hash[code];
                    var selected = (code === cfg.lang) ? ' selected' : '';
                    $("#voice-lang").append('<option value="' + code + '"' + selected + '>' + desc + '</option>');
                }
            }
            fn_lang_make();
            $("#voice-config").append('<label title="Voice UnPause"><input type="checkbox" id="voice-unpause"' + (cfg.unpause ? ' checked' : '') + '/>UnPause</label>');

            var observ_obj = $("#og-settings");
            var observ_cur = observ_obj.css("display");
            var observer = new MutationObserver(function(mutations) {
                var observ_pre = observ_cur;
                var observ_new = observ_obj.css("display");
                observ_cur = observ_new;
                if (observ_new == "none" && observ_pre == "block") {
                    fn_config_save();
                }
            });
            observer.observe(observ_obj[0], {
                attributes: true,
                attributeFilter: ['style']
            });

            function fn_config_save() {
                cfg.prefix = $("#voice-prefix").val();
				localStorage.setItem("prefix", cfg.prefix);	
                //GM_setValue("prefix", cfg.prefix);				
                cfg.lang = $("#voice-lang").val();
				localStorage.setItem("lang", cfg.lang);	
                //GM_setValue("lang", cfg.lang);
                if (cfg.lang !== "default") {
                    recognition.lang = cfg.lang;
                }
                cfg.unpause = $("#voice-unpause").prop('checked');
				localStorage.setItem("unpause", cfg.unpause);
                //GM_setValue("unpause", cfg.unpause);
//                console.log("saved prefix=" + cfg.prefix + " lang=" + cfg.lang + " unpause=" + cfg.unpause);
            }
        }
	}
//	}, 4000);
