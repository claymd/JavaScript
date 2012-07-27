/*
* Google Feed API Script
* Displays RSS feed data from any website.
* Copyright © 2012 Clay Miller (clay@auburn.edu)
* Version 2012-2-1
*
* If not using shared ASPX View Master Page, add to <head>:
* <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
* <script src="https://www.google.com/jsapi?key=ABQIAAAAgc0qSQpyYrthx0hm6sj0SxSiXPi56fILpi67vosh8wwWnYGtvRR3X30k4T7PLZiVmm-QUyB7DNii1Q"></script> 
* <script type="text/javascript" src="http://cws.auburn.edu/shared/scripts/google.rss.js"></script>
*
* Add to <body>:
* <div class="feed">http://wireeagle.auburn.edu/?feed=rss</div>
* <div class="feed">http://theplainsman.com/rss/home/all+articles?content_type=article&page_name=home&offset=0&limit=50&instance=all+articles</div>
*/

google.load("feeds", "1");

function open() {
    $(".feed").each(function () {
        var that = $(this);
        var feed = new google.feeds.Feed($(this).html());

        feed.load(function (result) {
            that.html('');

            /*
            * Loop through the feeds, putting the titles onto the page.
            * Check out the result object for a list of properties returned in each entry.
            * http://code.google.com/apis/ajaxfeeds/documentation/reference.html#JSON
            */
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var div = document.createElement("div");
                div.setAttribute("class", "newsItem");
                div.setAttribute("style", "padding: 0 0 0 12px");
                var a = document.createElement("a");
                a.setAttribute("href", entry.link);
                div.appendChild(a);
                a.appendChild(document.createTextNode(entry.title));
                that.append(div);
            }
        });
    });
}

google.setOnLoadCallback(open);

