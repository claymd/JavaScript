/* Search
 * When included with a project, a jQuery plugin ("searches") is enabled.
 * Inputs with class "search" are automatically labelled and styled.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Searches
 * Searches elements for data stored in all HTML5 data attributes.
 *
 * Usage: $(input_elem).searches($(searchable_elem), function() { callback_function(); });
 */
(function ($) {
	$.fn.searches = function (elem, callback) {
		if (arguments.length == 0) elem = $("div.box");
		if ((arguments.length == 1) && (typeof elem == "function")) { callback = elem; elem = $("div.box"); }

		$(document).on("input", $(this).selector, function () {
			/* Get search terms. */
			var val = $(this).val().toLowerCase();

			if (val == '') {
				/* Show all elements. */
				elem.show();
			} else {
				/* Hide all elements. */
				elem.hide();

				/* Show matched elements. */
				/* Class-based search. */
				// $(".data:containsi('" + val + "')").closest(elem).show();

				/* Attribute-based search. */
				for (var i = 0; i < elem.length; i++) {
					var data = JSON.stringify($(elem[i]).data()).toLowerCase().replace(/{(.*?):|,(.*?):/g, "");
					if (data.indexOf(val) >= 0) $(elem[i]).show();
				}
			}

			/* Executes a callback function. */
			if (typeof callback == "function") {
				callback.call(this);
			}
		});

		return $(this);
	}
}) (jQuery);

/* Patricide.
 * Hides parent elements with invisible children.
 *
 * Usage: $(input_elem).patricide($(parents));
 */
(function ($) {
	$.fn.patricide = function (parents) {
		parents.show();
		if ($(this).val() == '') return;

		for (var i = 0; i < parents.length; i++) {
			var parent = $(parents[i]);
			var children = $(parent).find(".box");
			var hides = 0;

			for (var j = 0; j < children.length; j++) {
				var child = $(children[j]);
				if (!child.is(":visible")) hides++;
			}

			if (hides == children.length) $(parent).hide();
		}

		return $(this);
	}
}) (jQuery);

/* JavaScript Url.
 * Gets the url of the JavaScript folder.
 *
 * Usage: jsUrl();
 */
function jsUrl() {
	return $("script[src]").last().attr("src").split('?')[0].split('/').slice(0, -1).join('/') + '/';
}

/* Trigger Search on input. */
$(document).ready(function () { $("input.search").searches($("div.box")); });

/* Label searchbox. */
$.getScript(jsUrl() + "label.js", function() {
	$(document).ready(function () { $("input.search").label("Search"); });
});

/* Style searchbox. */
$(document).ready(function () {
	$("input.search").css({
		"border-radius": "4px",
		"-moz-box-sizing": "content-box",
		"-webkit-box-sizing": "content-box",
		"box-sizing": "content-box",
		"float": "right",
		"height": "24px",
		"width": "55%",
		"padding": "3px",
		"border": "#cccccc solid 1px",
		"background": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFAhISFcFK0ikAAAFdSURBVEjHxZW9SgNBEIC/lZBGIZVYCAdBK4lgJQgBQRAEwQfwAQK2VoqQSlB8BMtAsBGrgIUEBEt/CquAWhiwF64LwthMca6b3duLhwPLMrcz8x2zM7NGRChTpihZSgdUQgbGmGVgBRgCTyKSRhFExLmAY+AOEGv1gGSc3684jsDTQD8T8BnoALdAqt8+gUZRQEeDDIB166wGdPX8HahFAYBNdU6Buid9PbXrxgLO1LHtdYIE+FLbis/WLtOm7jeBwhgCr6ouxPRBVfdRjgIcWT65APe6rwZ6YwZYVPUtdx8Au5rXF6DquYMjtbsuUqb9TEPNOs73Mxe8FQK4RsWeXvI2MDDGXAKPQB3YsNKXFBoVwBxw5RgTAjwAFxm9FZUiC7QEtIBz4ABoOnrGCyHv0BrzA0HIRACFnPggEwMckB3fqCgkInIInKq69qMp//LRN8bMi8hHaYB/efS/AdZxsnTbUpVBAAAAAElFTkSuQmCC) no-repeat 99.5% 3px"
	});
});

