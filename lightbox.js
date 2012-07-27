/* Lightbox
 * When included with a project, elements with attribute 'rel="lightbox"' will be modified.
 * Modified by Clay Miller (clay@auburn.edu)
 */

/*
Lightbox v2.51
by Lokesh Dhakar - http://www.lokeshdhakar.com

For more information, visit:
http://lokeshdhakar.com/projects/lightbox2/

Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
- free for use in both personal and commercial projects
- attribution requires leaving author name, author link, and the license info intact
	
Thanks
- Scott Upton(uptonic.com), Peter-Paul Koch(quirksmode.com), and Thomas Fuchs(mir.aculo.us) for ideas, libs, and snippets.
- Artemy Tregubenko (arty.name) for cleanup and help in updating to latest proto-aculous in v2.05.


Table of Contents
=================
LightboxOptions

Lightbox
- constructor
- init
- enable
- build
- start
- changeImage
- sizeContainer
- showImage
- updateNav
- updateDetails
- preloadNeigbhoringImages
- enableKeyboardNav
- disableKeyboardNav
- keyboardAction
- end

options = new LightboxOptions
lightbox = new Lightbox options
*/

(function () {
	var $, Lightbox, LightboxOptions;

	$ = jQuery;

	LightboxOptions = (function () {

		function LightboxOptions() {
			this.fileLoadingImage = '';
			this.resizeDuration = 0;
			this.fadeDuration = 300;
			this.labelImage = "Image";
			this.labelOf = "of";
		}

		return LightboxOptions;

	})();

	Lightbox = (function () {

		function Lightbox(options) {
			this.options = options;
			this.album = [];
			this.currentImageIndex = void 0;
			this.init();
		}

		Lightbox.prototype.init = function () {
			this.enable();
			return this.build();
		};

		Lightbox.prototype.enable = function () {
			var _this = this;
			return $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox]', function (e) {
				_this.start($(e.currentTarget));
				return false;
			});
		};

		Lightbox.prototype.build = function () {
			var $lightbox,
			  _this = this;
			$("<div>", {
				id: 'lightboxOverlay'
			}).after($('<div/>', {
				id: 'lightbox'
			}).append($('<div/>', {
				"class": 'lb-outerContainer'
			}).append($('<div/>', {
				"class": 'lb-container'
			}).append($('<img/>', {
				"class": 'lb-image'
			}), $('<div/>', {
				"class": 'lb-nav'
			}).append($('<a/>', {
				"class": 'lb-prev'
			}), $('<a/>', {
				"class": 'lb-next'
			})), $('<div/>', {
				"class": 'lb-loader'
			}).append($('<a/>', {
				"class": 'lb-cancel'
			}).append($('<img/>', {
				src: this.options.fileLoadingImage
			}))))), $('<div/>', {
				"class": 'lb-dataContainer'
			}).append($('<div/>', {
				"class": 'lb-data'
			}).append($('<div/>', {
				"class": 'lb-details'
			}).append($('<span/>', {
				"class": 'lb-caption'
			}), $('<span/>', {
				"class": 'lb-number'
			})))))).appendTo($('body'));
			$('#lightboxOverlay').hide().on('click', function (e) {
				_this.end();
				return false;
			});
			$('.lb-nav').hide().on('click', function (e) {
				_this.end();
				return false;
			});
			$lightbox = $('#lightbox');
			$lightbox.hide().on('click', function (e) {
				if ($(e.target).attr('id') === 'lightbox') _this.end();
				return false;
			});
			$lightbox.find('.lb-outerContainer').on('click', function (e) {
				if ($(e.target).attr('id') === 'lightbox') _this.end();
				return false;
			});
			$lightbox.find('.lb-prev').on('click', function (e) {
				_this.changeImage(_this.currentImageIndex - 1);
				return false;
			});
			$lightbox.find('.lb-next').on('click', function (e) {
				_this.changeImage(_this.currentImageIndex + 1);
				return false;
			});
			$lightbox.find('.lb-loader, .lb-close').on('click', function (e) {
				_this.end();
				return false;
			});
			$(window).on('scroll', end);
		};

		function end() {
			$(document).off('.keyboard');
			$(window).off("resize", $("#lightbox").sizeOverlay);
			$('#lightbox').fadeOut(400);
			$('#lightboxOverlay').fadeOut(400);
			return $('select, object, embed').css({
				visibility: "visible"
			});
		}

		Lightbox.prototype.start = function ($link) {
			var $lightbox, $window, a, i, imageNumber, left, top, _len, _ref;
			$(window).on("resize", this.sizeOverlay);
			$('select, object, embed').css({
				visibility: "hidden"
			});
			$('#lightboxOverlay').width($(document).width()).height($(document).height()).fadeIn(this.options.fadeDuration);
			this.album = [];
			imageNumber = 0;
			if ($link.attr('rel') === 'lightbox') {
				this.album.push({
					link: $link.attr('href'),
					title: $link.attr('title')
				});
			} else {
				_ref = $($link.prop("tagName") + '[rel="' + $link.attr('rel') + '"]');
				for (i = 0, _len = _ref.length; i < _len; i++) {
					a = _ref[i];
					this.album.push({
						link: $(a).attr('href'),
						title: $(a).attr('title')
					});
					if ($(a).attr('href') === $link.attr('href')) imageNumber = i;
				}
			}
			$window = $(window);
			top = $window.scrollTop() + $window.height() / 10;
			left = $window.scrollLeft();
			$lightbox = $('#lightbox');
			$lightbox.css({
				top: top + 'px',
				left: left + 'px'
			}).fadeIn(this.options.fadeDuration);
			this.changeImage(imageNumber);
		};

		Lightbox.prototype.changeImage = function (imageNumber) {
			var $image, $lightbox, preloader,
			  _this = this;
			this.disableKeyboardNav();
			$lightbox = $('#lightbox');
			$image = $lightbox.find('.lb-image');
			this.sizeOverlay();
			$('#lightboxOverlay').fadeIn(this.options.fadeDuration);
			$('.loader').fadeIn('slow');
			$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();
			$lightbox.find('.lb-outerContainer').addClass('animating');
			preloader = new Image;
			preloader.onload = function () {
				$image.attr('src', _this.album[imageNumber].link);
				$image.width = preloader.width;
				$image.height = preloader.height;
				return _this.sizeContainer(preloader.width, preloader.height);
			};
			preloader.src = this.album[imageNumber].link;
			this.currentImageIndex = imageNumber;
		};

		Lightbox.prototype.sizeOverlay = function () {
			return $('#lightboxOverlay').width($(document).width()).height($(document).height());
		};

		Lightbox.prototype.sizeContainer = function (imageWidth, imageHeight) {
			var $container, $lightbox, $outerContainer, containerBottomPadding, containerLeftPadding, containerRightPadding, containerTopPadding, newHeight, newWidth, oldHeight, oldWidth,
			  _this = this;
			$lightbox = $('#lightbox');
			$outerContainer = $lightbox.find('.lb-outerContainer');
			oldWidth = $outerContainer.outerWidth();
			oldHeight = $outerContainer.outerHeight();
			$container = $lightbox.find('.lb-container');
			containerTopPadding = parseInt($container.css('padding-top'), 10);
			containerRightPadding = parseInt($container.css('padding-right'), 10);
			containerBottomPadding = parseInt($container.css('padding-bottom'), 10);
			containerLeftPadding = parseInt($container.css('padding-left'), 10);
			newWidth = imageWidth + containerLeftPadding + containerRightPadding;
			newHeight = imageHeight + containerTopPadding + containerBottomPadding;
			if (newWidth !== oldWidth && newHeight !== oldHeight) {
				$outerContainer.animate({
					width: (newWidth > $(document).width() ? $(document).width() : newWidth),
					// height: (newHeight > $(document).height() ? $(document).height() : newHeight)
				}, this.options.resizeDuration, 'swing');
			} else if (newWidth !== oldWidth) {
				$outerContainer.animate({
					width: (newWidth > $(document).width() ? $(document).width() : newWidth)
				}, this.options.resizeDuration, 'swing');
			} else if (newHeight !== oldHeight) {
				$outerContainer.animate({
					// height: (newHeight > $(document).height() ? $(document).height() : newHeight)
				}, this.options.resizeDuration, 'swing');
			}
			setTimeout(function () {
				$lightbox.find('.lb-dataContainer').width(newWidth);
				$lightbox.find('.lb-prevLink').height(newHeight);
				$lightbox.find('.lb-nextLink').height(newHeight);
				_this.showImage();
			}, this.options.resizeDuration);
		};

		Lightbox.prototype.showImage = function () {
			var $lightbox;
			$lightbox = $('#lightbox');
			$lightbox.find('.lb-loader').hide();
			$lightbox.find('.lb-image').fadeIn('slow');
			this.updateNav();
			this.updateDetails();
			this.preloadNeighboringImages();
			this.enableKeyboardNav();
		};

		Lightbox.prototype.updateNav = function () {
			var $lightbox;
			$lightbox = $('#lightbox');
			$lightbox.find('.lb-nav').show();
			if (this.currentImageIndex > 0) $lightbox.find('.lb-prev').show();
			if (this.currentImageIndex < this.album.length - 1) {
				$lightbox.find('.lb-next').show();
			}
		};

		Lightbox.prototype.updateDetails = function () {
			var $lightbox,
			  _this = this;
			$lightbox = $('#lightbox');
			if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {
				$lightbox.find('.lb-caption').html(this.album[this.currentImageIndex].title).fadeIn('fast');
			}
			if (this.album.length > 1) {
				$lightbox.find('.lb-number').html(this.options.labelImage + ' ' + (this.currentImageIndex + 1) + ' ' + this.options.labelOf + '  ' + this.album.length).fadeIn('fast');
			} else {
				$lightbox.find('.lb-number').hide();
			}
			$lightbox.find('.lb-outerContainer').removeClass('animating');
			$lightbox.find('.lb-dataContainer').fadeIn(this.resizeDuration, function () {
				return _this.sizeOverlay();
			});
		};

		Lightbox.prototype.preloadNeighboringImages = function () {
			var preloadNext, preloadPrev;
			if (this.album.length > this.currentImageIndex + 1) {
				preloadNext = new Image;
				preloadNext.src = this.album[this.currentImageIndex + 1].link;
			}
			if (this.currentImageIndex > 0) {
				preloadPrev = new Image;
				preloadPrev.src = this.album[this.currentImageIndex - 1].link;
			}
		};

		Lightbox.prototype.enableKeyboardNav = function () {
			$(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
		};

		Lightbox.prototype.disableKeyboardNav = function () {
			$(document).off('.keyboard');
		};

		Lightbox.prototype.keyboardAction = function (event) {
			var KEYCODE_ESC, KEYCODE_LEFTARROW, KEYCODE_RIGHTARROW, key, keycode;
			KEYCODE_ESC = 27;
			KEYCODE_LEFTARROW = 37;
			KEYCODE_RIGHTARROW = 39;
			keycode = event.keyCode;
			key = String.fromCharCode(keycode).toLowerCase();
			if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
				this.end();
			} else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
				if (this.currentImageIndex !== 0) {
					this.changeImage(this.currentImageIndex - 1);
				}
			} else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
				if (this.currentImageIndex !== this.album.length - 1) {
					this.changeImage(this.currentImageIndex + 1);
				}
			}
		};

		Lightbox.prototype.end = function () {
			this.disableKeyboardNav();
			$(window).off("resize", this.sizeOverlay);
			$('#lightbox').fadeOut(this.options.fadeDuration);
			$('#lightboxOverlay').fadeOut(this.options.fadeDuration);
			return $('select, object, embed').css({
				visibility: "visible"
			});
		};

		return Lightbox;

	})();

	$(function () {
		var lightbox, options;
		options = new LightboxOptions;
		return lightbox = new Lightbox(options);
	});

}).call(this);


/* CSS. */
(function() {
	var css = "<style type=\"text/css\">\n" +
	"#lightboxOverlay {\n" +
	  "position: absolute;\n" +
	  "top: 0;\n" +
	  "left: 0;\n" +
	  "z-index: 9999;\n" +
	  "background-color: black;\n" +
	  "filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=85);\n" +
	  "opacity: 0.85;\n" +
	  "display: none;\n" +
	"}\n\n" +

	"#lightbox {\n" +
	  "position: absolute;\n" +
	  "left: 0;\n" +
	  "width: 100%;\n" +
	  "z-index: 10000;\n" +
	  "text-align: center;\n" +
	  "line-height: 0;\n" +
	  "font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;\n" +
	  "font-weight: normal;\n" +
	"}\n\n" +

	"#lightbox img {\n" +
		"max-width: 100%;\n" +
	"}\n\n" +

	"#lightbox a img {\n" +
	  "border: none;\n" +
	"}\n\n" +

	".lb-outerContainer {\n" +
	  "position: relative;\n" +
	  "background-color: white;\n" +
	  "zoom: 1;\n" +
	  "margin: 0 auto;\n" +
	  "max-width: 100%;\n" +
	  "border-radius: 4px;\n" +
	"}\n\n" +

	".lb-outerContainer:after {\n" +
	  "content: '';\n" +
	  "display: table;\n" +
	  "clear: both;\n" +
	"}\n\n" +

	".lb-container {\n" +
	  "padding: 10px;\n" +
	"}\n\n" +

	".lb-loader {\n" +
	  "position: absolute;\n" +
	  "top: 40%;\n" +
	  "left: 0%;\n" +
	  "height: 25%;\n" +
	  "width: 100%;\n" +
	  "text-align: center;\n" +
	  "line-height: 0;\n" +
	"}\n\n" +

	".lb-nav {\n" +
	  "position: absolute;\n" +
	  "top: 0;\n" +
	  "left: 0;\n" +
	  "height: 100%;\n" +
	  "width: 100%;\n" +
	  "z-index: 10;\n" +
	"}\n\n" +

	".lb-container > .nav {\n" +
	  "left: 0;\n" +
	"}\n\n" +

	".lb-nav a {\n" +
	  "outline: none;\n" +
	"}\n\n" +

	".lb-prev, .lb-next {\n" +
	  "width: 49%;\n" +
	  "height: 100%;\n" +
	//  "background-image: url(\"data:image/gif\",base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\");\n" +
	  /* Trick IE into showing hover */
	  "display: block;\n" +
	"}\n\n" +

	".lb-prev {\n" +
	  "left: 0;\n" +
	  "float: left;\n" +
	"}\n\n" +

	".lb-next {\n" +
	  "right: 0;\n" +
	  "float: right;\n" +
	"}\n\n" +

	".lb-prev:hover {\n" +
	//  "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAtCAYAAADsvzj/AAAFH0lEQVR42s2aW0xbdRzHPe2hdGzlJgzb2gsairfVG5sLlBZa0MnMXNQx0PngHgwxy6YmPnILoA8t1xhJMOERfDEi46IPmphFwiXhBRU6E00wvkGAFMpFRv02+TX/E87OOZro//SffAI5/LLx6e///Z3/aXkgkUj8J/wPy0AYgUgY6ZpAsJXWIkwiA5joK8mkv4gARGAGFpALHiTywClglnRISDcRARjoVT8JCoADeMATRAldywdZVCsk4SuiLSHSK/4QCZSJovii2Wy+DF7F9yFcexq4SeZEaqulhwjrhAVYwZOg0m63X5+dnZ3f29v76+Dg4HB+fv6O1+u9RjIPk3R6iJCESSJxBgScTueNhYWFXxLH1urq6rLJZAqi5lGQmxoA+oowiWxgA15Q7XK5buLVv5u4z9rd3T3ANnsFdaUgn0RE/iLyYFskEjVut/vDxcXF3xIKKx6Pb0OkjjKUB0QeHdEONpOodTgcH62srPypJLG5ubnV1NQURm05Bd7CS0Q72NQJm832wfLy8h8qEtsVFRWfoDYEngJFIEuvsAuSTljpF6pGsN+fmZlZVpJYX1/fCYVC3ai9AJ4HDpDD/z4il7DRdKpCJm4h2L8qSWxsbOzW1tamJM4CJ02rTGDgKCIPNkmEkp3AiFWUODw8PKqpqelDbR04d0zCyPOsJQ82SRQVFd3CzW5FSWJraysWCAR6UXuRJFy0nUwkIfASkQebJKxWa3I7RVW203Z5eXmYOnEWuFknmAQHEcVgVyW3EzoR1Qh2D2pfBudIIo9lgiQ4iCgFuxrBvjk3N3dXpRNxBDsp8RJ1wnW/THAQkQXbLgl2cjspSsRisR2/3x+hTpQBpyQTBoDFTYQk2HbypoKNTkRVgp282UUoE2zESoLNU0Sg//QEKASPAT+CfUMj2DsIdjdJlAGXQrC5ioi0pZzgDDLxDjrxk5LE2tpaPBgMfobay+A8C7ZMgqMIO5LnGI3GYuz3t5eWln5WkohGozFMpy9Qfx3UglJ6LjdLg62nSG5GRoZ7ZGSkL6GyRkdHf0ftx+BdUMUelCjcOooIFPQcQRCKMzMzg4ODg1/iZ0dAtvb3949aW1t/RP174ALdZ05TxkQg6ClilNw7ngGX+vr6xtU609LS8i3qGoEPlIACkqGM6CeSCfJpq/hAQ39//7SaTHNz823UvQEqSIaywjrD/z7CRnABBdiHzDR0d3dPqcm0t7dPovYKqJR2hsnwFWGdYTIloNxgMNRHIpFJlhn56uzsnEJtPfBLZLKYDC8RuUwWKEzJgKu9vb3fqMl0dHRM0zZLZaZQKsNTRN4ZJuMDjZBRzUxbW9ukJDMepQHA+3lElHTGQ9um8R8MgHHUvU7yMhleImqZ8QCfKIpXKTOKKxwOf0cDwM9k2ADgK6I9AFQ709PT830yWyAAPLLMcBPRHgAN/3YAyDoD+IhoD4A3cZ/RGgATqHsNvAAeAXnApJcIGwBMphQEcD67Njw8fEfjOPMVTtaX6PhjAyc5vtOonRmSqcSb028NDQ39oHFqnkK2UqflHP7v/WpnxgMqaJpNU2bS+GMFuYx4XAbU49Q8xWRkIheplkT07Ii2zJWBgYGv8W/fk3jcm5iYuI2c+CjwOm8t7RNACTiPX7iuq6vr87GxsYXx8fEFfP+pxWIJ0ie8Vv3Drj0A8oGLnhqfBc/RVy94HNilj8X6iWjLmGnbnAYOUEw46Fq27E0KXUW0P4Yw0/bJJk7RNfanHLT+BkS8IzSKgDnWAAAAAElFTkSuQmCC) left 48% no-repeat;\n" +
	"}\n\n" +

	".lb-next:hover {\n" +
	//  "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAtCAYAAADsvzj/AAAFFklEQVR42s2aXUxbZRjHPf2ig3U43ESK/dgIrU6sU+dHKCvYgjJm5qIbbDov3IUhxjg18ZKvAHpRCoUYSTDhErwxIjLQC03MIuEj4QYVyhJNMN5BgPCNjPpv8m9O85JzGs1yTk/yC015S/jlef7P+54DDwiXRAzACEzECAzkvl7xePy+IF6pEmZg4VfKZL6IlFIBKzgKjoOHyIPABqxcI2WiiETMIBvkAQcoBmeIh++dADlcawBS5ojIrXSEEm7wlMlkClmt1tfAZbx+Ge+do9AjrJhJlskskaPg0YSEz+e7MTU1dWdvb29/Z2fnn4mJianCwsKb+N558AQoADa5MpkgwmAzB0UWiyW4uLg4Fxeu6enp351O5/tYUw6eTJGxUEZ3ERNF8oAXrfTq9vb2nqwgX6jSgsvl+gDrXgI+YAfHZBn9K2LilPJApGZra2sjrnDNzMz84Xa7P8bayqSM0GaS3iI2Br20vr4+vLq6uqYkMz8//7fD4fgEa6tkGWEA6Bj2bJAPSkDI7/d/BhnFyszNzf1lt9s/kisjDACd95Fc7hfPgupQKBRZXl7eVJIZHx+fwwD4kJkpoUyyMpJeIgaQxenlBM+B6qqqqsjKysq2kgwGwF1k5hbWVnCa2QUZXc5aRkHmeVBTWVkZ3d/fP1CSwWi+y8qEKHNoAGgtIlHGwjZzUeZieXl519ra2rqSDDbN+fz8/FuCjDAAtBKhjFAZN9usprS0NIw221Bps1hBQYEsIwwA7UR4CZk5DtyszAUMgE4OAKXKxNhmFQoDQAsR1cy4WJlXMAA6UZktJZnJyckFDACeAA4PAM1FeBlSMuPkKfhCIBDoWF9f31RpswVUJrXNCsUBoJmIOACE0VyDTbMDA2BDpTKxlAHgk9uMMtqKUOZwm53jAEjsM5tpBkDi1BwAj4GT4Ah/nqSZiCgjDIAXweVgMPjF0tKSWmZ+RWbeYYs52WImPUTEAWDlvbyXB8ebmGZfxWIxxX1mdnb2N+TqbaPReIp5swCDjiIMP2/EOGbfBZ8ODg7+GVe5BgYGomaz2c3P6ioiARN7/GHuE9Xgvaampl92d3eVjjEHvb29X2dlZQUlSUpWxKxrRihxAhSDMnC9sbHxB7VKRKPRYay7BM7Ke4ouYWclmA1K+MGVhoaG79Qkuru7x7DuGqWLQB7I0l6EEkIlzoOrLS0tt9UkIpHIKDKRlPDy8xy92uwjokR2ikQA1La1tY2qOBx0dHTcNhgMtVhbCooFCUmrI4oocTIlE1daW1vH1CS6urq+x7q6pAQ/ny1IaCIiBtuTzERzc7NqO0EikYnrlKaEUAkNRJQkysAbCPZwumBTIgA8KZUwaX0/Igbbw1/qajgc/lFNIpEJPCOuo7RHIROaiIiZ8IByUNfZ2flTGomxdMHWQkQSK/E/gn1NLdhai1h4qj0NXgCvI9gjafaJRCbeVAq2Xk8ac4AdnMUJ9RKOHd+oSfT399/BuekG288rSzDYOj77zQVF6PUKnGJH1ST6+vp+xsPut7jDe8VMZPyfFbhjj3E6+YFHKRP6VEQW8UDkooLIAU6xo1hTK0ooPOrRtbVOIx9lIyMjiRPtvRSJez09Pd8m9pP/IqFn2AvAGZvNFmxvb/98eHh4emhoaBqvv4RgDe/RixV2bP1FhNvXQvA48IGnwTP8WgJcIE8MdqaIiA8VjvE21gFOEQffy+UaWSIDRQxy8PnfD5AiOcAqPiXMJJF/AYJfIzT2wWtvAAAAAElFTkSuQmCC) right 48% no-repeat;\n" +
	"}\n\n" +

	".lb-dataContainer {\n" +
	  "margin: 0 auto;\n" +
	  "padding-top: 5px;\n" +
	  "zoom: 1;\n" +
	  "width: 100%;\n" +
	  "-moz-border-radius-bottomleft: 4px;\n" +
	  "-webkit-border-bottom-left-radius: 4px;\n" +
	  "-ms-border-bottom-left-radius: 4px;\n" +
	  "-o-border-bottom-left-radius: 4px;\n" +
	  "border-bottom-left-radius: 4px;\n" +
	  "-moz-border-radius-bottomright: 4px;\n" +
	  "-webkit-border-bottom-right-radius: 4px;\n" +
	  "-ms-border-bottom-right-radius: 4px;\n" +
	  "-o-border-bottom-right-radius: 4px;\n" +
	  "border-bottom-right-radius: 4px;\n" +
	"}\n\n" +

	".lb-dataContainer:after {\n" +
	  "content: '';\n" +
	  "display: table;\n" +
	  "clear: both;\n" +
	"}\n\n" +

	".lb-data {\n" +
	  "padding: 0 10px;\n" +
	  "color: #bbbbbb;\n" +
	"}\n\n" +

	".lb-data .lb-details {\n" +
	  "width: 85%;\n" +
	  "float: left;\n" +
	  "text-align: left;\n" +
	  "line-height: 1.1em;\n" +
	"}\n\n" +

	".lb-data .lb-caption {\n" +
	  "font-size: 13px;\n" +
	  "font-weight: bold;\n" +
	  "line-height: 1em;\n" +
	"}\n\n" +

	".lb-data .lb-number {\n" +
	  "display: block;\n" +
	  "clear: left;\n" +
	  "padding-bottom: 1em;\n" +
	  "font-size: 11px;\n" +
	"}\n\n" +

	".lb-data .lb-close {\n" +
	  "width: 35px;\n" +
	  "float: right;\n" +
	  "padding-bottom: 0.7em;\n" +
	  "outline: none;\n" +
	"}\n\n" +

	".lb-data .lb-close:hover {\n" +
	  "cursor: pointer;\n" +
	"}\n" +
	"</style>";

	$(document).ready(function() { $("body").append(css); });
}) ()