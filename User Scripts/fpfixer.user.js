// ==UserScript==
// @name		FP Fixer
// @version		0.1
// @description	Automatically uses https:// on all fp.auburn.edu sites.
// @match		http://fp.auburn.edu*
// @copyright	Clay Miller (clay@auburn.edu)
// ==/UserScript==
window.location = "https://" + window.location.hostname + window.location.pathname;
