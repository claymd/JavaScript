/* Slide
 * When included with a project, content will slide in and out of the viewport on swipe and resize.
 * Copyright © 2012 Clay Miller (clay@auburn.edu) and Seth Humphrey (humphse@auburn.edu)
 */

/* Reset Height
 * Resets element heights.
 *
 * Usage: $(elem).reset_height();
 */
(function ($) {
	$.fn.reset_height = function () {
		var tallest = 0;
		var window_height = parseInt($(window).height()) - parseInt($("header").height());

		$(this).each(function() {
			var this_height = parseInt($(this).height());
			tallest = this_height > tallest ? this_height : tallest;
		});
		tallest = window_height > tallest ? window_height : tallest;
		$(this).height(tallest);

		return $(this);
	}
}) (jQuery);

/* Reset Width
 * Resets element widths.
 *
 * Usage: $(elem).reset_width();
 */
(function ($) {
	$.fn.reset_width = function () {
		var window_width = parseInt($("body").innerWidth());
	
		if ($(window).innerWidth() < 640) {
			$(this).width(window_width - 20);
			$(this).css("left", (window_width * -(pos)));
		} else {
			$(this).css({ width: "", left: 0 });
		}

		return $(this);
	}
}) (jQuery);

/* Document Ready
 * Adjusts content dimensions.
 * Adds touch triggers.
 *
 * Usage: document_ready($(elem));
 */
function document_ready(elem) {
	elem.reset_height();
	if ($("body").innerWidth() < 640){
		$("body").swipeleft(function() { show_right(elem); });
		$("body").swiperight(function() { show_left(elem); });
		elem.width(parseInt($("body").innerWidth()) - 20);
	}
}

/* Window Resize
 * Adjusts content dimensions.
 *
 * Usage: window_resize($(elem));
 */
function window_resize(elem) {
	elem.css("height", "auto");
	elem.reset_height();
	elem.reset_width();
	if ($("body").innerWidth() > 640) {
		$("body").unbind("swipeleft");
		$("body").unbind("swiperight");
	} else {
		$("body").swipeleft(function() { show_right(elem); });
		$("body").swiperight(function() { show_left(elem); });
	}
}

/* Show Right
 * Slides the content left to display content which is currently offscreen to the right.
 *
 * Usage: show_right($(elem));
 */
function show_right(elem) {
	var width = parseInt($("body").innerWidth());
	var offset = parseInt(elem.css("left"));
	if (offset > (width * -2)) elem.css("left", offset - width);
	pos++;
}

/* Show Left
 * Slides the content right to display content which is currently offscreen to the left.
 *
 * Usage: show_left($(elem));
 */
function show_left(elem) {
	var width = parseInt($("body").innerWidth());
	var offset = parseInt(elem.css("left"));
	if (offset < 0) elem.css("left", offset + width);
	pos--;
}

/* Set current position to the default. */
var pos = 0;

/* Trigger Document Ready on page load. */
$(document).ready(function() { document_ready($("div.content")) });

/* Trigger Window Resize when the window is resized. */
$(window).resize(function() { window_resize($("div.content")) });

