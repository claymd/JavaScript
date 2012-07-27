/* Autosize
 * When included with a project, textareas will automatically resize to fit their contents.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Autosize
 * Automatically increases the height of full textareas.
 *
 * Usage: $("textarea").autosize(size);
 */
(function ($) {
	$.fn.autosize = function (size) {
		if (arguments.length == 0) size = 50;

		this.each(function () {
			if ($(this)[0] != null)
				$(this).height(size).height($(this)[0].scrollHeight);
		});

		$(document).on("input", $(this).selector, function () {
			$(this).height(size).height($(this)[0].scrollHeight);
		});

		return $(this);
	}
}) (jQuery);

/* Autosize all textareas. */
$(document).ready(function () { $("textarea").autosize(); });
