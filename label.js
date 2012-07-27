/* Label
 * When included with a project, a jQuery plugin ("label") is enabled.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Label
 * Adds a field name to an input[type="text"] or textarea.
 * The field name is shown when the element is empty and hidden otherwise.
 *
 * Usage: $(elem).label(field_name);
 */
(function ($) {
	$.fn.label = function (field_name) {
		$(this).val(field_name);
		$(this).on("blur", $(this), function () { $(this).val() == '' ? $(this).val(field_name) : $(this).val(); });
		$(this).on("focus", $(this), function () { $(this).val() == field_name ? $(this).val('') : $(this).val(); });

		return $(this)
	}
}) (jQuery);
