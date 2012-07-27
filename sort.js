/* Sort
 * When included with a project, a jQuery plugin ("sortby") is enabled.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Sort By
 * Sorts elements by data stored in an HTML5 data attribute.
 * Inspired by http://james.padolsey.com/javascript/sorting-elements-with-jquery/
 *
 * Usage: $(elem).sortby(data_attribute);
 */
(function ($) {
	$.fn.sortby = function (data) {
		var sort = [].sort;
		var comparator = function (a, b) {
			return jQuery(a).data(data) > jQuery(b).data(data) ? 1 : -1;
		};
		var getSortable = function () { return this; };

		var placements = this.map(function () {
			var sortElement = getSortable.call(this),
			parentNode = sortElement.parentNode,
			nextSibling = parentNode.insertBefore(
				document.createTextNode(''),
				sortElement.nextSibling
			);

			return function () {
				if (parentNode === this) {
					throw new Error("You can't sort elements if any one is a descendant of another.");
				}
				parentNode.insertBefore(this, nextSibling);
				parentNode.removeChild(nextSibling);
			};
		});

		return sort.call(this, comparator).each(function (i) {
			placements[i].call(getSortable.call(this));
		});
	}
}) (jQuery);

/* Examples. */

/* Trigger Sort By (first) on click.
 * $(document).on("click", "a#sortfirst", function() { $("div.box").sortby("first"); });
 */

/* Trigger Sort By (area) then (last) on click.
 * $(document).on("click", "a#sortarea", function() { $("div.box").sortby("area");
 *	$.each(["Banner Student Supt", "Campus Network Support", "DB Administration", "Educ Tech and Systems", "Help Desk", "Identity Management", "IMG", "Info Systems", "Infrastructure Proj Mgmt", "Lab Support", "MM Systems and Classroom Tech", "Network Security", "Network Support", "OIT Administration", "Operations", "Production Support", "Student PC Shop", "Systems Support", "Telecom", "Telephone Support", "Uplink Engineering", "User Services"], function (index, value) {
 *		$('a#asortarea[value="' + value + '"]').closest("div.box").sortby("last");
 *	});
 * });
 */

/* Trigger Sort By (building) then (last) on click.
 * $(document).on("click", "a#sortbuilding", function () { $("div.box").sortby("building");
 * 	$.each(["Draughon Library #1011", "OIT Building #226"], function (index, value) {
 * 		$('a#oitphone-asortbuilding[value="' + value + '"]').closest(".box").sortby("last");
 * 	});
 * });
 */

/* Trigger Sort By (type) then (last) on click.
 * $(document).on("click", "a#sorttype", function () { $("div.box").sortby("type");
 * 	$('a#asorttype[value="ST"],[value="PB"],[value="GA"],[value="WA"]').closest(".box").sortby("last");
 *	$('a#asorttype').not('[value="ST"],[value="PB"],[value="GA"],[value="WA"]').closest(".box").sortby("last");
 * });
 */

