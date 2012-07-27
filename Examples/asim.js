/* ASIM examples
 * This file is not intended for web use.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Document Nav
 * Makes the sidebar and logo always visible on large screens.
 *
 * Usage: document_nav();
 */
function document_nav () {
	if ($(window).width() > 800) {
		$("nav.sidebar").css("position", "fixed");
		$("div.logo").css("position", "fixed");
		$("div.logo").css("top", "266px");
	}
};

/* Document Slide
 * If the sidebar isn't visible, show it.
 * If the sidebar is visible and the screen is small, hide it.
 * Add Document Slide triggers on mobile devices.
 *
 * Usage: document_slide();
 */
function document_slide() {
	if ($("div.body").css("left") == "-230px") {
		$("div.body").css("left", "0");
		$("body").swipeleft(function() { document_slide(); });
		$("body").unbind("swiperight");
	} else if ($(window).width() < 800) {
		$("div.body").css("left", "-230px");
		$("body").swiperight(function () { document_slide(); });
		$("body").unbind("swipeleft");
	}
}

/* Document Swipe
 * Add Document Slide trigger on mobile devices.
 *
 * Usage: document_swipe();
 */
function document_swipe() {
	if ($("div.body").css("left") == "-230px" && $(window).width() < 800)
		$("body").swiperight(function() { document_slide(); });
}

/* Window Resize
 * Show the sidebar on large screens.
 * Lock elements on medium screens.
 *
 * Usage: window_resize();
 */
function window_resize() {
	if ($(window).width() >= 800) {
		$("div.body").css("left", "0");
	} else if ($(window).width() < 800 && $(window).width() > 378) {
		$("nav.sidebar").css("position", "absolute");
		$("div.logo").css("position", "absolute");
		$("div.logo").css("top", "195px");
		$("div.body").css("left", "-230px");
	}
}

/* Trigger Document Nav when the body element is repositioned. */
$(document).on("webkitTransitionEnd", "div.body", function () { document_nav(); });
$(document).on("transitionend",       "div.body", function () { document_nav(); });
$(document).on("oTransitionEnd",      "div.body", function () { document_nav(); });

/* Trigger Document Slide when h2 elements are clicked. */
$(document).on("click", "h2", function () { document_slide(); });

/* Trigger Window Resize when the window is resized. */
$(window).on("resize", function () { window_resize(); });

/* Trigger Document Nav on page load. */
$(document).ready(function () { document_nav(); });

/* Trigger Document Swipe on page load. */
$(document).ready(function () { document_swipe(); });

/* Autosize all textareas. */
$("textarea").autosize();
