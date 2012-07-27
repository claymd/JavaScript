/* Color Picker
 * This file is not intended for web use.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Color Picker
 * Sends clicked coordinates to a controller function via Ajax.
 *
 * Usage: color_picker(event);
 */
(function ($) {
	$.fn.upload = function (options, callback) {
		if ((arguments.length == 1) && (typeof options == "function")) { callback = options; options = ""; }

		/* Default settings. */
		var settings = $.extend({
			"action": "/Home/UploadFile",
			"type": "Auto"
		}, options);
		var elem = $(this).selector;

		/* Add a form. */
		var form = "<form action=\"" + settings.action + "\" enctype=\"multipart/form-data\" class=\"uploader\" method=\"post\" target=\"iframe-" + elem + "\">" +
		"<input type=\"file\" name=\"file\">";
		if (settings.type != "Auto") form += "<input type=\"button\" value=\"Upload File\">";
		form += "</form>";
		$(this).html($(form));

		/* Add a hidden iframe. */
		var iframe = $("<iframe id=\"iframe-" + elem + "\" style=\"display: none;\"></iframe>");
		$(this).after(iframe);

		/* Submit form on either Click or Change. */
		if (settings.type != "Auto")
			$(document).on("click", elem + " form.uploader input:button", function () { $(elem + " form.uploader").submit(); });
		else
			$(document).on("change", elem + " form.uploader input:file", function () { $(elem + " form.uploader").submit(); });

		/* Executes a callback function. */
		$(iframe).load(function () {
			if (typeof callback == "function") {
				callback.call(this);
			}
		});

		return $(this);
	}
})(jQuery);
function color_picker(e) {
	$.ajax({
		url: '/Home/Regions/',
		data: {
			x: e.pageX - $("img.map").offset().left,
			y: e.pageY - $("img.map").offset().top
		},
		success: function (data) {
			self.location = '../Home/' + data;
		}
	});
}

/* Trigger Color Picker on img click. */
$(document).on("click", ".colorpicker", function (e) { color_picker(e); });