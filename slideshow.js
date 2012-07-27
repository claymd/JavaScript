/* Slideshow
 * When included with a project, elements with class "slideshow" will be modified.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 *
 * Usage:
 * Image names should follow a pattern: "1.jpg", "2.jpg", "3.jpg", etc.
 * For best results, images should have the same aspect ratio.
 */

/* Slideshow
 * Displays the images in a specified folder.
 *
 * Usage: $(elem).slideshow({options});
 */
(function ($) {
	$.fn.slideshow = function (options) {
		/* Default settings. */
		var settings = $.extend({
			"folder": "../Content/Images/Slideshow/",
			"count": "1",
			"interval": "5000"
		}, options);
		var img = $("<div>").css(css_in);
		var i = 1;

		/* Apply CSS. */
		$("body").append(css);

		/* Display first image on page load. */
		img.css("background-image", "url('" + settings.folder + i + ".jpg')");
		$(this).append(img);

		/* Display next image after specified interval. */
		setInterval(function () {
			i = (i + 1 <= parseInt(settings.count)) ? i + 1 : 1;
			img.css("background-image", "url('" + settings.folder + i + ".jpg')");
		}, parseInt(settings.interval));

		return $(this);
	}

	/* CSS. */
	var css = $("<style type=\"text/css\">\n" +
	".slideshow {\n" +
		"background: #E9E9E9;\n" +
		"border: 1px solid #C9C9C9;\n" +
		"-moz-box-sizing: border-box;\n" +
		"-webkit-box-sizing: border-box;\n" +
		"box-sizing: border-box;\n" +
		"height: 240px;\n" +
		"margin-bottom: 1em;\n" +
		"padding: 5px;\n" +
		"width: 100%;\n" +
	"}\n\n" +
	"@media only screen and (min-width:480px) {\n" +
		".slideshow {\n" +
			"height: 400px;\n" +
		"}\n" +
	"}\n" +
	"</style>\n");

	var css_in = {
		"-webkit-transition": "background-image 1s ease",
		"-moz-transition": "background-image 1s ease",
		"-o-transition": "background-image 1s ease",
		"transition": "background-image 1s ease",
		"background-repeat": "no-repeat",
		"background-size": "100% 100%",
		"height": "100%",
		"width": "100%"
	};
}) (jQuery);

/* Trigger Slideshow on page load. */
$(document).ready(function () {
	$(".slideshow").slideshow({ "count": "4" });
});