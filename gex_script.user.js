// ==UserScript==
// @name         Gex, Enter the Ginkgo
// @namespace    https://github.com/SainTfactor/Gex-Enter-the-Ginkgo
// @version      0.2.08
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

    // Rerun the changes if the url has changed.  Check every 222ms
    var pageURLCheckTimer = setInterval(
        function() {
            if (this.lastPathStr !== location.pathname ||
                this.lastQueryStr !== location.search ||
                this.lastPathStr === null ||
                this.lastQueryStr === null
            ) {
                this.lastPathStr = location.pathname;
                this.lastQueryStr = location.search;
		// If there was a change in url, wait half a second before launching Gex, so the DOM has time to load.
                setTimeout(function() {
                    launch_gex();
                }, 500);
            }
        }, 222);
})();

//Settings that need to be reloaded.
var fontsize = parseFloat(jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size"));

// Resize the grey box at the bottom.  Runs anytime the window resizes and at start.
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

    // Control Variables
    var singlerun = true;
    var scrollplace = 0;	
    var dabuttons_forward = [190, 110, 13, 78, 39]; // period, period (num pad), enter, n, right arrow
    var dabuttons_back = [37, 80]; // left arrow, p
    var dabuttons_pause = [75, 32]; // k, space
    var dabuttons_rewind = [74]; // j
    var dabuttons_fastforward = [76]; // l (L) 
    var dabuttons_fontPlus = [87, 187, 107]; //  w, = (+), + (num pad)
    var dabuttons_fontMinus = [81, 189, 109]; // q, -, - (num pad)
    var dabuttons_scrollUp = [38]; // up arrow
    var dabuttons_scrollDown = [40]; // down arrow
    var funct = "keydown";
    var tap_delay = 400;
	
    // Basically this is a semifore to prevent you from accidentally doubletapping next slide and missing something.
    // This is mostly legacy from when it wasn't a tampermonkey extension, but it's still good to have.
    var cleartap = function() {
        singlerun = false;
        setTimeout(function() {
            singlerun = true;
        }, tap_delay);
    };

    // This is what's run when an event is detected (i.e. one of "dabuttons" is pressed)
    // Most of the stuff in here works by "manually" touching the existing DOM elements that already do things.
    var clickme = function(evt) {
	// This if statement keeps things from happening if any of the sidebar menus are open.  It's annoying when you're typing 
	// notes and stuff is jumping around.
        if (!jQuery(".sideBarHeader").is(function(i, val) { return jQuery(val).width() > 0; })) {	    
            if (singlerun && dabuttons_forward.indexOf(evt.which) != -1) { // Forward slide
                cleartap();
                jQuery(".tinCaniFrame").contents().find("#btn_next").click();
            } else if (singlerun && dabuttons_back.indexOf(evt.which) != -1) { // Back slide
                cleartap();
                jQuery(".tinCaniFrame").contents().find("#btn_back").click();
            } else if (singlerun && dabuttons_pause.indexOf(evt.which) != -1) { // Pause
                cleartap();
                jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_playPauseHolder").click();
            } else if (singlerun && dabuttons_rewind.indexOf(evt.which) != -1) { // Rewind
                jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_slider_sliderBtn").simulate("drag-n-drop", {
                    dx: -30,
                    interpolation: {
                        stepWidth: 10,
                        stepDelay: 10
                    }
                });
            } else if (singlerun && dabuttons_fastforward.indexOf(evt.which) != -1) { // Fast forward
                jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_slider_sliderBtn").simulate("drag-n-drop", {
                    dx: 30,
                    interpolation: {
                        stepWidth: 10,
                        stepDelay: 10
                    }
                });
            } else if (singlerun && dabuttons_fontPlus.indexOf(evt.which) != -1) { // Font size ++
                fontsize = parseFloat(jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size"));
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size", fontsize + 1);
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("line-height", (fontsize + 6) + "px");
            } else if (singlerun && dabuttons_fontMinus.indexOf(evt.which) != -1) { // Font size --
                fontsize = parseFloat(jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size"));
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("font-size", fontsize - 1);
                jQuery(".tinCaniFrame").contents().find("#transcriptText").css("line-height", (fontsize + 4) + "px");
            } else if (singlerun && dabuttons_scrollUp.indexOf(evt.which) != -1) { // Scroll text up
		// This if fixes a bug.  Basically, if you're on an exercise, the extension still runs, and you don't want up and
		// down not to work on an exercise, cause they are useful in textareas and stuff.
		if($("#countdown-timer")[0] == undefined) {
                    evt.preventDefault();
                }
                scrollplace = jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop();
                jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop(scrollplace - 30);
            } else if (singlerun && dabuttons_scrollDown.indexOf(evt.which) != -1) { // Scroll text down
		// This if fixes a bug.  Basically, if you're on an exercise, the extension still runs, and you don't want up and
		// down not to work on an exercise, cause they are useful in textareas and stuff.
		if($("#countdown-timer")[0] == undefined) {
                    evt.preventDefault();
                }
                scrollplace = jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop();
                jQuery(".tinCaniFrame").contents().find("#transcriptContainer").scrollTop(scrollplace + 30);
            }
        }
    };

    // Turn off all the previous click handlers.  
    // If you don't do this, they stack, so all the buttons happen twice, which is no bueno.
    // It took me a bit to realize I was skipping slides because it was double triggering.  Not a fun day of going back over stuff.
    jQuery("html").off();
    jQuery(window).off();
    jQuery(jQuery(".tinCaniFrame")[0].contentWindow.document).off();
    jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).off();
    jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).off();

    // Window Resize
    jQuery(window).resize(function() {
        onWinResize();
    });

    // When you hit a key, while focus is on the main page html
    jQuery("html").on(funct, function(evt) {
        clickme(evt);
    });
    // When you hit a key, while focus is on the main iframe
    jQuery(jQuery(".tinCaniFrame")[0].contentWindow.document).on(funct, function(evt) {
        clickme(evt);
    });
    // When you hit a key, while focus is on the part of the screen that the animations and stuff are in
    jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).on(funct, function(evt) {
        clickme(evt);
    });
    // So, that last one gets cleared every time the slide changes, and needs to be rebound
    jQuery(".tinCaniFrame").contents().find("#pageNumber").bind("DOMSubtreeModified", function() {
	// Give the slide a second to load
        setTimeout(function() {
	    // Then rebind to the animation-y bit
            jQuery(jQuery(".tinCaniFrame").contents().find("#ajaxiFrame")[0].contentWindow.document).on(funct, function(evt) {
                clickme(evt);
            });
        }, 1000);
    });
};
