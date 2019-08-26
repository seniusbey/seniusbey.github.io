// ==UserScript==
// @name         Realistic V1
// @namespace    Realistic v1
// @version      1.6
// @description  Agario Mod - Ogario
// @homepage     seniusbey.github.io
// @author       Senius
// @license      MIT
// @icon         https://jimboy3100.github.io/banners/CropedImage128.gif
// @match        https://agar.io/*
// @match        https://play.google.com/*
// @downloadURL  seniusbey.github.io/Realistic/Realistic.user.js
// @updateURL    seniusbey.github.io/Realistic/Realistic.user.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      seniusbey.github.io
// ==/UserScript==

// Realistic By Senius
/*MIT License*/

// Check location
if (location.host === "agar.io" && location.pathname === "/") {
var url = window.location.href;
localStorage.setItem("url", url);
    location.href = "https://agar.io/realistic" + location.hash;
    return;
}
var modVersion = GM_info.script.version;
// Inject Legend
function inject(page) {
    var page = page.replace("</body>", "<script>init('" + modVersion + "');</script>" + "</body>");
    return page;
}
//window.stop();
document.documentElement.innerHTML = "";

GM_xmlhttpRequest({
    method: "GET",
    url: "https://seniusbey.github.io/Realistic/Realistic.html",
    onload: function(legend) {
        var doc = inject(legend.responseText);
        document.open();
        document.write(doc);
        setTimeout(function() {
            window.history.pushState(null, null, "/");
        }, 2000);

        document.close();
    }
});

if (location.host == "play.google.com") {
    window.close();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

