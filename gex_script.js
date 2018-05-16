// ==UserScript==
// @name         Gex, Enter the Ginkgo
// @namespace    https://github.com/SainTfactor/Gex-Enter-the-Ginkgo
// @version      0.1
// @description  Making Ginkgo not suck again!
// @author       @SainTfactor
// @match        http://ginkgo.azuretitan.com/*resume_course*
// @updateURL    https://raw.githubusercontent.com/SainTfactor/Gex-Enter-the-Ginkgo/master/gex_script.js
// @require      http://j-ulrich.github.io/jquery-simulate-ext/jquery.simulate.js
// @require      http://j-ulrich.github.io/jquery-simulate-ext/jquery.simulate.ext.js
// @require      http://j-ulrich.github.io/jquery-simulate-ext/jquery.simulate.drag-n-drop.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';
	
	jQuery("body").css("padding-bottom", "0");
	jQuery(".tinCaniFrame").css("height", "875px");
	jQuery(".tinCaniFrame").contents().find("#transcriptContainer").css("height", "247px");
	jQuery(".tinCaniFrame").contents().find("#transcriptContainer").css("background-color", "#777");
	singlerun = true;
	dabuttons_forward = [110, 13, 78, 39];
	dabuttons_back = [37];
	dabuttons_pause = [75, 32];
	dabuttons_rewind = [74];
	dabuttons_fastforward = [76];
	funct = "keydown";
	clickme = function(evt) {
		if (!jQuery(".sideBarHeader").is(function(i,val){ return jQuery(val).width() > 0; })) {
			if (singlerun && dabuttons_forward.indexOf(evt.which) != -1) {
				singlerun = false;
				setTimeout(function() {
					singlerun = true;
				}, 300);
				jQuery(".tinCaniFrame").contents().find("#btn_next").click();
			} else if (singlerun && dabuttons_back.indexOf(evt.which) != -1) {
				singlerun = false;
				setTimeout(function() {
					singlerun = true;
				}, 300);
				jQuery(".tinCaniFrame").contents().find("#btn_back").click();
			} else if (singlerun && dabuttons_pause.indexOf(evt.which) != -1) {
				singlerun = false;
				setTimeout(function() {
					singlerun = true;
				}, 300);
				jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_playPauseHolder").click();
			} else if (singlerun && dabuttons_rewind.indexOf(evt.which) != -1) {
				singlerun = false;
				setTimeout(function() {
					singlerun = true;
				}, 300);
				jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_slider_sliderBtn").simulate("drag-n-drop", {dx:-30, interpolation: { stepWidth:10, stepDelay:10}});
			} else if (singlerun && dabuttons_fastforward.indexOf(evt.which) != -1) {
				singlerun = false;
				setTimeout(function() {
					singlerun = true;
				}, 300);
				jQuery(".tinCaniFrame").contents().find("#ajaxiFrame").contents().find("#Stage_slider_sliderBtn").simulate("drag-n-drop", {dx:30, interpolation: { stepWidth:10, stepDelay:10}});
			}
		}
	};
	if (semaforeAgain === undefined) {
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
	}
	var semaforeAgain = true;
})()
