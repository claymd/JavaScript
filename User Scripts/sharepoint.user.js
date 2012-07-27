// ==UserScript==
// @name		Sharepoint
// @version		0.1
// @description	Hide unneeded toolbars.
// @match		https://sites.auburn.edu/admin/oit/userservices/*
// @copyright	Clay Miller (clay@auburn.edu)
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
    $("div#headerWrap").hide();
	$("div#s4-ribbonrow").hide();
	$("div.s4-title.s4-lp").hide();
}

addJQuery(main);
