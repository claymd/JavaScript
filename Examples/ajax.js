/* Ajax examples
 * This file is not intended for web use.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

﻿/* Standard Default
 * Hide a specified standard's information and show the edit interface.
 *
 * Usage: standard_default(elem);
 */
function standard_default(elem) {
	var _courseId = elem.closest("div.standard").data("courseid");
	var _standardNumber = elem.closest("div.standard").data("standardnumber");
	$.ajax({
		url: '/asim/Standards/RenderStandardEdit/',
		data: {
			courseId: _courseId,
			standardNumber: _standardNumber
		},
		success: function (data) {
			var d = $("div.standard[data-courseid='" + _courseId + "'][data-standardnumber='" + _standardNumber + "']");
			var t = d.find("p.text").text().trim();
			d.html(data);
			d.find("textarea").val(t);
			d.find("textarea").height(50).height(d.find("textarea")[0].scrollHeight);
		}
	});
}

/* Standard Save
 * Save changes to the edit interface.
 * Hide the specified edit interface and show the standard's information.
 *
 * Usage: standard_save(elem);
 */
function standard_save(elem) {
	var _courseId = elem.closest("div.standard").data("courseid");
	var _standardNumber = elem.closest("div.standard").data("standardnumber");
	var _standardText = elem.closest("div.standard").find("textarea").val();
	$.ajax({
		type: "POST",
		url: '/asim/Standards/Edit/',
		data: {
			courseId: _courseId,
			standardNumber: _standardNumber,
			standardText: _standardText
		},
		success: function (data) {
			$("div.standard[data-courseid='" + _courseId + "'][data-standardnumber='" + _standardNumber + "']").html(data);
		}
	});
}

/* Standard Cancel
 * Discard changes to the edit interface.
 * Hide the specified edit interface and show the standard's information.
 *
 * Usage: standard_cancel(elem);
 */
function standard_cancel(elem) {
	var _courseId = elem.closest("div.standard").data("courseid");
	var _standardNumber = elem.closest("div.standard").data("standardnumber");
	$.ajax({
		url: '/asim/Standards/RenderStandardDefault/',
		data: {
			courseId: _courseId,
			standardNumber: _standardNumber
		},
		success: function (data) {
			$("div.standard[data-courseid='" + _courseId + "'][data-standardnumber='" + _standardNumber + "']").html(data);
		}
	});
}

/* Standard Delete
 * Delete the specified standard.
 *
 * Usage: standard_delete(elem);
 */
function standard_delete(elem) {
	var _courseId = elem.closest("div.standard").data("courseid");
	var _standardNumber = elem.closest("div.standard").data("standardnumber");
	$.ajax({
		url: '/asim/Standards/Delete/',
		data: {
			courseId: _courseId,
			standardNumber: _standardNumber
		},
		success: function (data) {
			$("div.standard[data-courseid='" + _courseId + "'][data-standardnumber='" + _standardNumber + "']").remove();
		}
	});
}

/* Add Default
 * Hide the "Add New" link and show the add interface.
 *
 * Usage: add_default(elem);
 */
function add_default(elem) {
	var _courseId = elem.closest("div.add").data("courseid");
	$.ajax({
		url: '/asim/Standards/RenderAddEdit/',
		data: {
			courseId: _courseId
		},
		success: function (data) {
			var d = $("div.add[data-courseid='" + _courseId + "']");
			d.html(data);
			d.attr("data-standardnumber", parseInt(d.find("p.number").text()));
		}
	});
}

/* Add Save
 * Save changes to the add interface.
 * Hide the specified add interface and show the standard's information.
 *
 * Usage: add_save(elem);
 */
function add_save(elem) {
	var _courseId = elem.closest("div.add").data("courseid");
	var _standardNumber = parseInt(elem.closest("div.add").find("p.number").text());
	var _standardText = elem.closest("div.add").find("textarea").val();
	$.ajax({
		type: "POST",
		url: '/asim/Standards/Add/',
		data: {
			courseId: _courseId,
			standardNumber: _standardNumber,
			standardText: _standardText
		},
		success: function (data) {
			var a = $("div.add[data-courseid='" + _courseId + "'][data-standardnumber='" + _standardNumber + "']");
			a.html("<a class='add default'>Add New</a>");
			a.attr("data-standardnumber", parseInt(_standardNumber) + 1);
			var c = $("<div class='standard' data-courseid='" + _courseId + "' data-standardnumber='" + _standardNumber + "'/>").html(data);
			a.before(c);
		}
	});
}

/* Add Cancel
 * Discard changes to the add interface.
 * Hide the specified add interface and show the "Add New" link.
 * 
 * Usage: add_cancel(elem);
 */
function add_cancel(elem) {
	var _courseId = elem.closest("div.add").data("courseid");
	$.ajax({
		url: '/asim/Standards/RenderAddDefault/',
		data: {
			courseId: _courseId
		},
		success: function (data) {
			$("div.add[data-courseid='" + _courseId + "']").html(data);
		}
	});
}

/* Trigger events on anchor-link click. */
$(document).on("click", "a.standard.default", function () { standard_default($(this)); });
$(document).on("click", "a.standard.save",    function () { standard_save   ($(this)); });
$(document).on("click", "a.standard.cancel",  function () { standard_cancel ($(this)); });
$(document).on("click", "a.standard.delete",  function () { standard_delete ($(this)); });
$(document).on("click", "a.add.default",      function () { add_default     ($(this)); });
$(document).on("click", "a.add.save",         function () { add_save        ($(this)); });
$(document).on("click", "a.add.cancel",       function () { add_cancel      ($(this)); });
