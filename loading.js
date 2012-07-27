/* Pretty Loading
 * When included with a project, a JavaScript function ("pretty_loading") becomes available.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Pretty Loading
 * Fade and overlay content while it is being loaded.
 *
 * Usage: pretty_loading($(elem), $(overlay), action, params_json);
 */
function pretty_loading(elem, overlay, action, params) {
	elem.fadeTo("fast", 0.5);
	overlay.show();

	$.ajax({
		url: action,
		data: params,
		success: function (data) {
			overlay.hide();
			elem.html(data);
			elem.fadeTo("fast", 1.0);
		}
	});
}

