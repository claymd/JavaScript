/* Is Number
 * When included with a project, a JavaScript function ("is_number") becomes available.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 *
 * Usage:
 * <input type="text" onkeypress="return is_number(event)"></input>
 */

/* Is Number
 * Check whether the keyCode is 0-9, ' ', '-', '(', ')', or '.'.
 *
 * Usage: is_number(event);
 */
function is_number(e) {
	var c = e.which ? e.which : e.keyCode;
	return (c <= 32 || (c >= 48 && c <= 57) || c == 40 || c == 41 || c == 45 || c == 46)
}

