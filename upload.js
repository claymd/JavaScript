/* Upload
 * When included with a project, a jQuery plugin ("upload") is enabled.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Upload
 * HTTP Post a file using AJAX and a hidden iframe.
 * Supported in all major browsers.
 *
 * Usage: $(elem).upload({options});
 */
(function ($) {
	$.fn.upload = function (options, callback) {
		if ((arguments.length == 1) && (typeof options == "function")) { callback = options; options = ""; }

		/* Default settings. */
		var settings = $.extend({
			"action": "/Home/UploadFile",
			"type": "Auto"
		}, options);
		var elem = $(this).selector;

		/* Add a form. */
		var form = "<form action=\"" + settings.action + "\" enctype=\"multipart/form-data\" class=\"uploader\" method=\"post\" target=\"iframe-" + elem + "\">" +
		"<input type=\"file\" name=\"file\">";
		if (settings.type != "Auto") form += "<input type=\"button\" value=\"Upload File\">";
		form += "</form>";
		$(this).html($(form));

		/* Add a hidden iframe. */
		var iframe = $("<iframe id=\"iframe-" + elem + "\" style=\"display: none;\"></iframe>");
		$(this).after(iframe);

		/* Submit form on either Click or Change. */
		if (settings.type != "Auto")
			$(document).on("click", elem + " form.uploader input:button", function () { $(elem + " form.uploader").submit(); });
		else
			$(document).on("change", elem + " form.uploader input:file", function () { $(elem + " form.uploader").submit(); });
		
		/* Executes a callback function. */
		$(iframe).load(function () {
			if (typeof callback == "function") {
				callback.call(this);
			}
		});

		return $(this);
	}
}) (jQuery);

/* Javascript
 * Displays an indicator on upload completion and stores the file url.
 *
 * function Upload(elem) {
 *		var section = elem.closest("section");
 *
 *		elem.upload({ "action": "/Experiments/UploadFile" }, function () {
 *			// Get file JSON from iframe.
 *			var file = $.parseJSON(section.find("iframe").contents().find("pre").html());
 *
 *			// Display a success indicator.
 *			elem.find("form img").remove();
 *			if (file.IsValid == true) {
 *				elem.find("form").append("<img src=\"../Content/Images/ok.png\" style=\"display: none;\" />");
 *			} else {
 *				elem.find("form").append("<img src=\"../Content/Images/remove.png\" style=\"display: none;\" />");
 *				alert(file.Message);
 *			}
 *			elem.find("form img").fadeIn(500, null);
 *
 *			// Store file url.
 *			elem.after("<input type=\"hidden\" id=\"file_Link\" value=\"" + file.Path + "\" />");
 *		});
 * }
 *
 * $(document).ready(function () { Upload($("section#three div.upload")); });
 */

/* C#
 * Saves file to disk.
 *
 * [HttpPost]
 * public ActionResult UploadFile(HttpPostedFileWrapper file) {
 *		if (file == null || file.ContentLength == 0) {
 *			return Json(new { IsValid = false, Message = "No file was uploaded.", Path = string.Empty });
 *		}
 *
 *		var name = String.Format("{0}.jpg", Guid.NewGuid().ToString());
 *		var path = Path.Combine(Server.MapPath(Url.Content("~/Uploads")), name);
 *
 *		file.SaveAs(path);
 *
 *		return Json(new { IsValid = true, Message = string.Empty, Path = Url.Content(String.Format("~/Uploads/" + name)) });
 * }
 */

/* C#
 * Saves file to SQL.
 *
 * [HttpPost]
 * public ActionResult UploadFile(HttpPostedFileWrapper file) {
 *		if (db == null)
 *			db = new Repository();
 *
 *		if (file == null || file.ContentLength == 0)
 *			return Json(new { IsValid = false, Message = "No file was uploaded.", Path = string.Empty });
 *
 *		FILE f = new FILE();
 *		f.Name = String.Format("{0}.jpg", Guid.NewGuid().ToString());
 *		f.Mimetype = file.ContentType;
 *		MemoryStream ms = new MemoryStream();
 *		file.InputStream.CopyTo(ms);
 *		f.Data = ms.ToArray();
 *		f.Link = Url.Content(String.Format("~/Content/Files/" + f.Name));
 *		db.Add(f);
 *
 *		return Json(new { IsValid = true, Message = string.Empty, Path = f.Link });
 * }
 */