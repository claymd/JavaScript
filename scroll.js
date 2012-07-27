/* Scroll
 * When included with a project, scrolling by section is automatically enabled.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 *
 * Usage:
 * <div id="top"></div>
 * <div class="section" id="section1"></div>
 * <div class="section" id="section2"></div>
 * <nav class="footer">
 *		<a class="scroll previous">Previous</a>
 *		<a class="scroll next">Next</a>
 *		<a class="scroll top" href="#top">Top</a>
 * </nav>
 */

﻿/* Scroll
 * Scroll to a specified section on the page.
 *
 * Usage: scroll(event, int);
 */
function scroll(event, i) {
	/* Prevent default anchor-click behaviour. */
	if (event != null) event.preventDefault();

	/* Get the current section number (#top is -1). */
	var s = window.location.href.split("#section")[1] != null ? window.location.href.split("#section")[1] : "1";
	if ((s == 1 || event != null) && i == 0) s = -1;
	var start = s;

	/* Add offset to the current section number. */
	s = parseInt(s) + parseInt(i);

	/* Wrap the first and last sections. */
	var last = $(".section").last().attr("id") != null ? parseInt($(".section").last().attr("id").split("section")[1]) : null;

	if (s == 0)
		s = last;
	else if (s == (last + 1))
		s = 1;

	/* Prevent default scroll behaviour. */
	$(window).stop().unbind("scroll");

	/* Only scroll to visible sections. */
	while ($("#section" + s).is(":not(:visible)") && s != start) {
		s = s + i;
		if (s == 0)
			s = last;
		else if (s == (last + 1))
			s = 1;
	}

	/* Get new tag name. */
	var section = (s != -1 && last != null) ? "section" + s : "top";

	/* Scroll to the new section. */
	$('html, body').stop().animate(
		{ scrollTop: ($("#" + section).offset().top - 10) },
		(event != null ? 1000 : 1),
		function () {
			/* When scrolling is complete: */
			$('html, body').stop();

			/* Fix fixed element behaviour in iOS 5. */
			$("#iosfix").show();

			/* Allow default scroll behaviour. */
			$(window).bind("scroll", function () { update(); });

			/* Fix fixed element behaviour in iOS 5. */
			$("#iosfix").hide();
		});

	/* Update the current section. */
	window.location.hash = section;
}

/* Update
 * Update the current section as the page is scrolled.
 *
 * Usage: update();
 */
function update() {
	/* Get the current section number. */
	var n = p = s = parseInt(window.location.href.split("#section")[1] != null ? window.location.href.split("#section")[1] : "1");
	var last = $(".section").last().attr("id") != null ? parseInt($(".section").last().attr("id").split("section")[1]) : -1;

	/* Get the next visible section. */
	n++;
	while ($("#section" + n).is(":not(:visible)") && n != s) {
		if (n == (last + 1))
			n = 1;
		else
			n++;
	}
	var next = $("#section" + n);

	/* Get the previous visible section. */
	p--;
	while ($("#section" + p).is(":not(:visible)") && p != s) {
		if (p == 0)
			p = last;
		else
			p--;
	}
	var previous = $("#section" + p);

	/* Update the current section when the next section is passed. */
	if (next.offset() != null && $(window).scrollTop() > next.offset().top) {
		window.location.hash = "section" + n;
	}

	/* Update the current section when the previous section is passed. */
	if (previous.offset() != null && ($(window).scrollTop() + 20) < previous.offset().top) {
		window.location.hash = "section" + p;
	}
}

/* Trigger Scroll when the previous, next, or top links are clicked. */
$(document).on("click", "a.scroll.previous", function () { scroll(event, -1); });
$(document).on("click", "a.scroll.next",     function () { scroll(event,  1); });
$(document).on("click", "a.scroll.top",      function () { scroll(event,  0); });

/* Trigger Update when the window is scrolled. */
$(window).on("scroll", function () { update(); });

/* Trigger Scroll on page load. */
$(document).ready(function () { scroll(null, 0); });

/* Show jump links. */
$(document).ready(function () { $("nav.footer").show(); });

