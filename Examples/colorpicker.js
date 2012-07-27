/* Color Picker
 * This file is not intended for web use.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Color Picker
 * Sends clicked coordinates to a controller function via Ajax.
 *
 * Usage: color_picker(event);
 */
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
﻿$(document).on("click", "img.map", function (e) { color_picker(e); });
