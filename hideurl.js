/* Hide URL
 * When included with a project, the address bar will automatically hide on mobile devices.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Hide URL
 * Hide address bar on mobile devices.
 *
 * Usage: <automatic>
 */
if (!window.location.hash && window.addEventListener) {
	window.addEventListener("load", function() {
		window.scrollTo( 0, 1 );
		window.scrollTo( 0, 0 );
	}, false);
}
