/* KnollGrass examples
 * This file is not intended for web use.
 * Copyright © 2012 Seth Humphrey (humphse@auburn.edu)
 */

/* ================================================================================================
 * CONSISTIFY HEIGHTS/WIDTHS
 * ================================================================================================
 */
function equalHeight(group1) {
	var tallest = 0;
	var bih = parseInt($(window).height()) - 100;
	
	group1.each(function() {
		var thisHeight = parseInt($(this).height());
		if(thisHeight > tallest)
			tallest = thisHeight;
	});
	
	if(tallest < bih)
		tallest = bih;

	group1.height(tallest);
}

function setWidths(group2){
	var windowSize = parseInt($('body').innerWidth());
	var contentAreaSize = parseInt($('.contentArea').width());
	
	if ($(window).innerWidth() < 640) {
		$(group2).width(parseInt($('body').innerWidth()) - 20);
		$(".contentArea").addClass('noTransitions');
		$(".contentArea").css('left', (windowSize * -(pos)));
	} else{
		$(group2).css('width', '');
		$(".contentArea").css('left', 0);
	}

}

/* ================================================================================================
 * CLICKING TO SLIDE TO RIGHT
 * ================================================================================================
 */
function document_click(){
	$(".contentArea").removeClass('noTransitions');
	var dw = parseInt($('body').innerWidth());
	var cm = parseInt($(".contentArea").css('left'));
	if (cm > (dw * -2)){cm = cm - dw; $(".contentArea").css('left', cm);}
	
	++pos;
}

/* ================================================================================================
 * SWIPING TO GET BACK LEFT
 * ================================================================================================
 */
function document_swipe() {
	$(".contentArea").removeClass('noTransitions');
	var dw = parseInt($('body').innerWidth());
	var cm = parseInt($(".contentArea").css('left'));
	if (cm < 0){cm = cm + dw; $(".contentArea").css('left', cm);}
	
	--pos;
}


/* ================================================================================================
 * ON LOAD
 * ================================================================================================
 */
 
var pos = 0;

$(document).ready(function() {
	equalHeight($(".col"));
	if ($('body').innerWidth() < 640){
		$(".contentArea").swiperight(function(){
				$(this).stop();
				document_swipe();
		});	
		$(".col").width(parseInt($('body').innerWidth()) - 20);
	}
});

/* ================================================================================================
 * ON RESIZE
 * ================================================================================================
 */
$(window).resize(function(e){
	$('.col').css('height','auto');
	equalHeight($('.col'));
	setWidths($('.col'));
});



$(document).on("click", "div.org", function () { document_click();});

