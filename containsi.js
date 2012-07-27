/* Contains Insensitive
 * When included with a project, an additional jQuery selector (":containsi") becomes available.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Contains Insensitive
 * Selects objects matching a case-insensitive string.
 *
 * Usage: $(elem:containsi('string'));
 */
(function ($) { $.fn.extend($.expr[':'], {
	containsi: function (elem, i, match, array) {
		return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
}); }) (jQuery);
