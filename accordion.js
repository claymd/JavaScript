/* Accordion
 * When included with a project, elements with class "accordion" will be modified.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 *
 * Usage:
 * <div class="accordion">
 *	<section id="one">
 *		<h3>Heading 1</h3>
 *		<div>Content 1</div>
 *	</section>
 *	<section id="two">
 *		<h3>Heading 2</h3>
 *		<div>Content 2</div>
 *	</section>
 * </div>
 */

/* Accordion
 * Create a collapsible accordion.
 *
 * Usage: $(elem).accordion({options});
 */
(function ($) {
	$.fn.accordion = function (options) {
		/* Default settings. */
		var settings = $.extend({
			"type": "widget"
		}, options);

		/* Apply CSS. */
		$("body").append(css);
		if (settings.type == "page")
			$("body").append(css_page);

		$(document).on("click", ".accordion > section > h3", function () {
			var div = $(this).parent("section").find("div:first");

			/* Expand section. */
			if (parseInt(div.css("height")) == 0) {
				$(".accordion > section > div").css("height", "0");
				div.css("height", div[0].scrollHeight);
				div.on("DOMSubtreeModified", function () {
					div.css("height", div[0].scrollHeight);
				});

			/* Collapse section. */
			} else {
				div.css("height", "0");
			}
		});

		return $(this);
	}

	/* Widget CSS. */
	var css = $("<style type=\"text/css\">\n" +
	".accordion {\n" +
		"background-color: #e9e9e9;\n" +
		"border: 1px solid #c9c9c9;\n" +
		"-moz-box-sizing: border-box;\n" +
		"-webkit-box-sizing: border-box;\n" +
		"box-sizing: border-box;\n" +
		"width: 100%;\n" +
	"}\n\n" +
	".accordion > section {\n" +
		"background-color: #fff;\n" +
		"border: 1px solid #c9c9c9;\n" +
		"margin: 5px;\n" +
	"}\n\n" +
	".accordion > section > h3 {\n" +
		"cursor: pointer;\n" +
		"margin: 0 !important;\n" +
		"padding: 10px;\n" +
	"}\n\n" +
	".accordion > section > h3:hover {\n" +
		"background-color: #fff;\n" +
	"}\n\n" +
	".accordion > section > div {\n" +
		"height: 0;\n" +
		"overflow: hidden;\n" +
		"padding: 0 1em;\n" +
		"-moz-transition: height 1s ease-in-out;\n" +
		"-webkit-transition: height 1s ease-in-out;\n" +
		"-o-transition: height 1s ease-in-out;\n" +
		"transition: height 1s ease-in-out;\n" +
	"}\n" +
	"</style>\n");

	/* Page CSS. */
	var css_page = $("<style type=\"text/css\">\n" +
	".accordion {\n" +
		"background-color: inherit;\n" +
		"border: none;\n" +
	"}\n\n" +
	".accordion > section {\n" +
		"border: none;\n" +
		"margin: inherit;\n" +
	"}\n\n" +
	".accordion > section > h3 {\n" +
		"background-color: #e9e9e9;\n" +
		"border: 1px solid #c9c9c9;\n" +
		"-moz-box-sizing: border-box;\n" +
		"-webkit-box-sizing: border-box;\n" +
		"box-sizing: border-box;\n" +
		"width: 100%;\n" +
	"}\n\n" +
	".accordion > section > div {\n" +
		"margin: 1em 0 0 0;\n" +
		"padding: 0;\n" +
	"}\n" +
	"</style>\n");
}) (jQuery);

/* Trigger Accordion on page load. */
$(document).ready(function () { $("div.accordion").accordion(); });

/* Expand first section. */
$(document).ready(function () {
	var div = $(".accordion > section > div:first");
	if (div[0] != undefined) div.css("height", div[0].scrollHeight);
});
 