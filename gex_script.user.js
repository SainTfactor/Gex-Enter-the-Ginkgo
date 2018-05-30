// ==UserScript==
// @name         Gex, Enter the Ginkgo
// @namespace    https://github.com/SainTfactor/Gex-Enter-the-Ginkgo
// @version      0.2.05
// @description  Making Ginkgo not suck again!
// @author       @SainTfactor
// @match        http://ginkgo.azuretitan.com/*resume_course*
// @updateURL    https://raw.githubusercontent.com/SainTfactor/Gex-Enter-the-Ginkgo/master/gex_script.user.js
// ==/UserScript==

//I have to put them in like this, cause there's some sort of weird scoping issue if you include them with an @required
jQuery.getScript("http://j-ulrich.github.io/jquery-simulate-ext/jquery.simulate.js", function() {
    jQuery.getScript("http://j-ulrich.github.io/jquery-simulate-ext/jquery.simulate.ext.js", function() {
        jQuery.getScript("http://j-ulrich.github.io/jquery-simulate-ext/jquery.simulate.drag-n-drop.js", function(){});
    });
});

// Launches the script after a small delay
(function(){
    'use strict';

    var pageURLCheckTimer = setInterval (
        function () {
            if (    this.lastPathStr  !== location.pathname
                ||  this.lastQueryStr !== location.search
                ||  this.lastPathStr   === null
                ||  this.lastQueryStr  === null
               ) {
                this.lastPathStr  = location.pathname;
                this.lastQueryStr = location.search;
                setTimeout(function() { launch_gex (); }, 500);
            }
        }, 222);
})();

//Settings that need to be reloaded.
var fontsize = parseFloat(jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size"));


var onWinResize = function() {
    // Page fixes
	jQuery("body").css("padding-bottom", "0");
	jQuery(".tinCaniFrame").css("height", jQuery(window).height() - jQuery(".tinCaniFrame").offset().top - 2); // Minus 2, so not to be flush
    // The -11 is the padding on that div (10px), +2 so that it isn't perfectly flush with the bottom.
	jQuery(".tinCaniFrame").contents().find("#transcriptContainer").css("height", jQuery(".tinCaniFrame").height() - jQuery(".tinCaniFrame").contents().find("#transcriptContainer").offset().top - 12);
	jQuery(".tinCaniFrame").contents().find("#transcriptContainer").css("background-color", "#777");
	jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size", fontsize);
}

// Main Script
var launch_gex = function() {// ==UserScript==
// @name         Gex, Enter the Ginkgo
// @namespace    https://github.com/SainTfactor/Gex-Enter-the-Ginkgo
// @version      0.2.04
// @description  Making Ginkgo not suck again!
// @author       @SainTfactor
// @match        http://ginkgo.azuretitan.com/*resume_course*
// @updateURL    https://raw.githubusercontent.com/SainTfactor/Gex-Enter-the-Ginkgo/master/gex_script.user.js
// ==/UserScript==
//I have to put them in like this, cause there's some sort of weird scoping issue if you include them with an @required
jQuery.getScript("http://j-ulrich.github.io/jquery-simulate-ext/jquery.simulate.js", function() {
    jQuery.getScript("http://j-ulrich.github.io/jquery-simulate-ext/jquery.simulate.ext.js", function() {
        jQuery.getScript("http://j-ulrich.github.io/jquery-simulate-ext/jquery.simulate.drag-n-drop.js", function() {});
    });
});

// Launches the script after a small delay
(function() {
    'use strict';

    var pageURLCheckTimer = setInterval(
        function() {
            if (this.lastPathStr !== location.pathname ||
                this.lastQueryStr !== location.search ||
                this.lastPathStr === null ||
                this.lastQueryStr === null
            ) {
                this.lastPathStr = location.pathname;
                this.lastQueryStr = location.search;
                setTimeout(function() {
                    launch_gex();
                }, 500);
            }
        }, 222);
})();

//Settings that need to be reloaded.
var fontsize = parseFloat(jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size"));


var onWinResize = function() {
    // Page fixes
    jQuery("body").css("padding-bottom", "0");
    jQuery(".tinCaniFrame").css("height", jQuery(window).height() - jQuery(".tinCaniFrame").offset().top - 2); // Minus 2, so not to be flush
    // The -11 is the padding on that div (10px), +2 so that it isn't perfectly flush with the bottom.
    jQuery(".tinCaniFrame").contents().find("#transcriptContainer").css("height", jQuery(".tinCaniFrame").height() - jQuery(".tinCaniFrame").contents().find("#transcriptContainer").offset().top - 12);
    jQuery(".tinCaniFrame").contents().find("#transcriptContainer").css("background-color", "#777");
    jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size", fontsize);
}

// Main Script
var launch_gex = function() {
    // Run page fixes
    onWinResize();

    // Actions
    var singlerun = true;
    var scrollplace = 0;
    var dabuttons_forward = [110, 13, 78, 39];
    var dabuttons_back = [37, 80];
    var dabuttons_pause = [75, 32];
    var dabuttons_rewind = [74];
    var dabuttons_fastforward = [76];
    var dabuttons_fontPlus = [87, 187, 107];
    var dabuttons_fontMinus = [81, 189, 109];
    var dabuttons_scrollUp = [38];
    var dabuttons_scrollDown = [40];
    var funct = "keydown";
    var tap_delay = 400;
    var cleartap = function() {
        singlerun = false;
        setTimeout(function() {
            singlerun = true;
        }, tap_delay);
    };
    var clickme = function(evt) {
        if (!jQuery(".sideBarHeader").is(function(i, val) {
                return jQuery(val).width() > 0;
            })) {
            if (singlerun && dabuttons_forward.indexOf(evt.which) != -1) {
                cleartap();
                jQuery(".tinCaniFrame").contents().find("#btn_next").click();
            } else if (singlerun && dabuttons_back.indexOf(evt.which) != -1) {
                cleartap();
                jQuery(".tinCaniFrame").contents().find("#btn_back").click();
            } else if (singlerun && dabuttons_pause.indexOf(evt.which) != -1) {
                cleartap();
                jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_playPauseHolder").click();
            } else if (singlerun && dabuttons_rewind.indexOf(evt.which) != -1) {
                jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_slider_sliderBtn").simulate("drag-n-drop", {
                    dx: -30,
                    interpolation: {
                        stepWidth: 10,
                        stepDelay: 10
                    }
                });
            } else if (singlerun && dabuttons_fastforward.indexOf(evt.which) != -1) {
                jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_slider_sliderBtn").simulate("drag-n-drop", {
                    dx: 30,
                    interpolation: {
                        stepWidth: 10,
                        stepDelay: 10
                    }
                });
            } else if (singlerun && dabuttons_fontPlus.indexOf(evt.which) != -1) {
                fontsize = parseFloat(jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size"));
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size", fontsize + 1);
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("line-height", (fontsize + 6) + "px");
            } else if (singlerun && dabuttons_fontMinus.indexOf(evt.which) != -1) {
                fontsize = parseFloat(jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size"));
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size", fontsize - 1);
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("line-height", (fontsize + 4) + "px");
            } else if (singlerun && dabuttons_scrollUp.indexOf(evt.which) != -1) {
                scrollplace = jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop();
                jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop(scrollplace - 30);
            } else if (singlerun && dabuttons_scrollDown.indexOf(evt.which) != -1) {
                scrollplace = jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop();
                jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop(scrollplace + 30);
            }
        }
    };

    jQuery("html").off();
    jQuery(window).off();
    jQuery(jQuery(".tinCaniFrame")[0].contentWindow.document).off();
    jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).off();
    jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).off();

    jQuery(window).resize(function() {
        onWinResize();
    });

    jQuery("html").on(funct, function(evt) {
        clickme(evt);
    });
    jQuery(jQuery(".tinCaniFrame")[0].contentWindow.document).on(funct, function(evt) {
        clickme(evt);
    });
    jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).on(funct, function(evt) {
        clickme(evt);
    });
    jQuery(".tinCaniFrame").contents().find("#pageNumber").bind("DOMSubtreeModified", function() {
        setTimeout(function() {
            jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).on(funct, function(evt) {
                clickme(evt);
            });
        }, 1000);
    });
};
    // Run page fixes
    onWinResize();

    // Actions
	var singlerun = true;
    var scrollplace = 0;
	var dabuttons_forward = [110, 13, 78, 39];
	var dabuttons_back = [37, 80];
	var dabuttons_pause = [75, 32];
	var dabuttons_rewind = [74];
	var dabuttons_fastforward = [76];
	var dabuttons_fontPlus = [87, 187, 107];
	var dabuttons_fontMinus = [81, 189, 109];
	var dabuttons_scrollUp = [38];
	var dabuttons_scrollDown = [40];
	var funct = "keydown";
	var tap_delay = 400;
	var cleartap = function() {
		singlerun = false;
		setTimeout(function() {
			singlerun = true;
		}, tap_delay);
	};
	var clickme = function(evt) {
		if (!jQuery(".sideBarHeader").is(function(i,val){ return jQuery(val).width() > 0; })) {
			if (singlerun && dabuttons_forward.indexOf(evt.which) != -1) {
				cleartap();
				jQuery(".tinCaniFrame").contents().find("#btn_next").click();
			} else if (singlerun && dabuttons_back.indexOf(evt.which) != -1) {
				cleartap();
				jQuery(".tinCaniFrame").contents().find("#btn_back").click();
			} else if (singlerun && dabuttons_pause.indexOf(evt.which) != -1) {
				cleartap();
				jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_playPauseHolder").click();
			} else if (singlerun && dabuttons_rewind.indexOf(evt.which) != -1) {
				jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_slider_sliderBtn").simulate("drag-n-drop", {dx:-30, interpolation: { stepWidth:10, stepDelay:10}});
			} else if (singlerun && dabuttons_fastforward.indexOf(evt.which) != -1) {
				jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_slider_sliderBtn").simulate("drag-n-drop", {dx:30, interpolation: { stepWidth:10, stepDelay:10}});
			} else if (singlerun && dabuttons_fontPlus.indexOf(evt.which) != -1) {
                fontsize = parseFloat(jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size"));
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size", fontsize + 1);
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("line-height", (fontsize + 6) + "px");
			} else if (singlerun && dabuttons_fontMinus.indexOf(evt.which) != -1) {
                fontsize = parseFloat(jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size"));
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size", fontsize - 1);
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("line-height", (fontsize + 4) + "px");
			} else if (singlerun && dabuttons_scrollUp.indexOf(evt.which) != -1) {
                scrollplace = jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop();
                jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop(scrollplace - 30);
			} else if (singlerun && dabuttons_scrollDown.indexOf(evt.which) != -1) {
                scrollplace = jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop();
                jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop(scrollplace + 30);
			}
		}
	};

    jQuery("html").off();
    jQuery(window).off();
    jQuery(jQuery(".tinCaniFrame")[0].contentWindow.document).off();
    jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).off();
    jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).off();

    jQuery(window).resize(function() {
        onWinResize();
    });

    jQuery("html").on(funct, function(evt) {
        clickme(evt);
    });
    jQuery(jQuery(".tinCaniFrame")[0].contentWindow.document).on(funct, function(evt) {
        clickme(evt);
    });
    jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).on(funct, function(evt) {
        clickme(evt);
    });
    jQuery(".tinCaniFrame").contents().find("#pageNumber").bind("DOMSubtreeModified", function() {
        setTimeout(function() {
            jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).on(funct, function(evt) {
                clickme(evt);
            });
        }, 1000);
    });
};
