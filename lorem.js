/* Lorem Ipsum
 * When included with a project, elements with class "lorem" or "ipsum" will be modified.
 * Copyright © 2012 Clay Miller (clay@auburn.edu)
 */

/* Lorem Ipsum
 * Fills an element with placeholder text.
 *
 * Usage: $(elem).lorem(num_paragraphs);
 */
(function ($) {
	$.fn.lorem = function (paragraphs) {
		/* Set default values. */
		if (arguments.length == 0) paragraphs = 1;
		var b = !$(this).is("p");

		/* Set placeholder array. */
		var ipsum = new Array();
		ipsum.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere lectus ac lorem tincidunt porta. Donec eu leo metus, non varius ligula. Mauris dolor nibh, fringilla eu hendrerit in, lacinia vel libero. Quisque et urna nunc. Fusce ornare massa id magna egestas quis convallis est dignissim. Etiam faucibus erat eget magna posuere mattis. Mauris a ultrices erat. Nunc diam risus, auctor in dapibus ac, ullamcorper eget nisl. Pellentesque vitae neque id ante hendrerit egestas. Sed pretium metus iaculis quam varius interdum. Vivamus ut commodo risus. Suspendisse sed risus mauris. Curabitur nisl lorem, aliquet at imperdiet a, posuere ut justo. Sed iaculis vestibulum fermentum. Donec nisl orci, accumsan ultricies aliquet nec, egestas et metus. Integer luctus felis ac massa feugiat bibendum.");
		ipsum.push("Nullam eu mi arcu, non sagittis leo. Donec fermentum, massa ut rutrum feugiat, erat dolor vestibulum elit, et posuere nunc lorem at odio. Nullam libero felis, vestibulum a venenatis at, facilisis id felis. Phasellus blandit nunc pretium nulla fermentum sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis dictum lorem in mauris ullamcorper eu malesuada justo pretium. Sed non mauris lectus, in tincidunt enim. Aliquam mollis sagittis imperdiet. Curabitur sed risus vitae quam dignissim varius. Integer gravida felis sit amet metus cursus ut varius leo semper. Duis et urna augue, eu aliquam dui. Nullam sollicitudin, diam at feugiat viverra, mi lectus varius felis, blandit congue nulla urna nec mauris. Sed convallis commodo pellentesque. Integer feugiat, felis in vestibulum vehicula, ante nibh tempus mi, et dapibus dolor purus a diam. Praesent consequat fringilla sagittis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.");
		ipsum.push("Ut interdum mi nec sem feugiat lacinia. Ut ultrices nunc quis purus gravida quis euismod arcu ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec imperdiet massa ligula, et suscipit mi. Sed feugiat augue ac turpis rhoncus consectetur. Proin condimentum laoreet orci. Suspendisse et tellus metus. Phasellus convallis feugiat vehicula. Cras in massa diam. Aliquam ac lorem ac justo vulputate bibendum. Aliquam erat volutpat. Praesent sapien velit, congue elementum ullamcorper sed, pellentesque quis augue. Duis ut nibh lobortis ligula egestas cursus.");
		ipsum.push("Etiam id elit hendrerit mauris mollis aliquam in id odio. Donec quis ante velit, vitae ornare dui. Suspendisse eu eros a erat suscipit consectetur ac vel dui. Donec convallis posuere tristique. Phasellus sed metus libero, eu interdum orci. Nam nisl dui, sagittis a convallis et, eleifend sit amet risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla placerat, quam eget interdum luctus, nunc dui pulvinar dolor, sed elementum metus tortor nec nibh. Praesent accumsan elit vel ipsum pellentesque eu aliquam leo fringilla. Mauris mollis odio sit amet neque gravida a viverra ligula condimentum. Mauris laoreet porta nibh, ac pulvinar eros lacinia ut. Suspendisse potenti. Duis iaculis felis eu nunc convallis vel venenatis mauris commodo. Integer semper, velit mollis feugiat dictum, velit est fermentum nunc, vel faucibus felis sapien et neque. Proin augue diam, faucibus consectetur dapibus pellentesque, dictum quis mi. Sed vitae urna quis nulla commodo pulvinar vitae eget enim.");
		ipsum.push("Donec interdum dolor at ipsum bibendum luctus. Suspendisse in turpis at est cursus facilisis id nec massa. Duis vulputate mollis magna, nec lacinia justo rutrum eget. Donec leo nisl, aliquet quis dignissim vitae, adipiscing in tellus. Nullam velit nibh, vehicula eget sollicitudin vitae, vehicula et nisl. Nulla tellus dui, mattis vel interdum sit amet, aliquet a lectus. Sed tempus felis urna, quis tincidunt neque. Donec mollis tincidunt enim. Curabitur id dui sed tellus varius commodo fringilla id nulla.");
		ipsum.push("Mauris eu nisi mi. Ut massa augue, ullamcorper ut iaculis quis, aliquam ut ipsum. In tempor metus ac urna venenatis tristique. Donec sit amet semper urna. Fusce a imperdiet magna. Cras sit amet quam nec ante placerat egestas. Nulla at mauris ut sem interdum mattis vitae vel nibh. Maecenas quis laoreet mi. In eget libero non est rhoncus consectetur a laoreet est. Sed accumsan malesuada ultrices. Curabitur vel lacus ac turpis mollis convallis.");
		ipsum.push("Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris tristique, orci sit amet consequat fermentum, justo nisi mattis erat, eu cursus ligula nisl vel arcu. Pellentesque porta metus ac turpis condimentum aliquet. Donec non tellus metus. Nunc sagittis iaculis venenatis. Mauris mollis dui volutpat massa posuere commodo. Nunc a tellus justo, eget pulvinar dolor. Integer commodo sapien ac est lobortis sed sollicitudin tortor euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec at risus ipsum, quis porttitor urna. Maecenas ullamcorper purus vitae libero sodales porttitor.");
		ipsum.push("Proin tincidunt tellus in est suscipit porta. Vestibulum ac tortor est, nec gravida magna. Morbi sagittis, lectus vel facilisis tincidunt, nulla est semper dui, et luctus arcu metus ornare leo. Fusce posuere felis quis est congue aliquet. Fusce quis elit nisi, nec laoreet massa. Aliquam fringilla hendrerit varius. Sed ligula dui, lobortis nec adipiscing eget, imperdiet quis lectus. Vestibulum lorem nisi, fermentum vitae dignissim eget, lobortis sed purus. Vestibulum in risus ut massa sodales interdum in vel ipsum. Nulla iaculis faucibus sem vitae ornare.");
		ipsum.push("Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis ac quam volutpat velit ornare tristique. Donec magna nisi, pulvinar ac imperdiet vel, vehicula et lorem. In hac habitasse platea dictumst. Proin vitae est convallis sem cursus tristique. Vestibulum laoreet, nisi sit amet adipiscing fringilla, erat dolor interdum orci, sed gravida purus ligula ut diam. In dignissim libero sit amet magna euismod at bibendum nisi dictum. Aliquam sodales imperdiet dictum. Fusce nec dui eu arcu venenatis vulputate. Sed dui neque, interdum at blandit vitae, tincidunt mollis lacus. Mauris sit amet iaculis arcu. Proin libero orci, faucibus quis dapibus id, dictum sed metus. Vestibulum interdum tristique viverra. Proin et augue neque. Donec at nisi vitae sem porta viverra. Sed sit amet velit risus.");
		ipsum.push("Donec mollis viverra venenatis. Cras nec dolor leo. In pulvinar euismod pharetra. Suspendisse elementum sem sit amet lorem vulputate placerat. Integer eget nisl ornare lorem fermentum blandit. Nulla aliquam tincidunt posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse hendrerit, nibh non varius lacinia, nulla lacus vehicula urna, vitae sollicitudin massa tortor fringilla dui. Sed placerat sem sed est vehicula ut pellentesque mauris accumsan. Aliquam imperdiet rutrum orci, non accumsan sapien pulvinar a. Aliquam vulputate tortor eget quam pulvinar posuere. Mauris eu magna consequat ante blandit tincidunt vel sed libero.");

		/* Get next array index. */
		function index(i) {
			if (i < ipsum.length) return i;
			return i - (ipsum.length * parseInt(i / ipsum.length));
		}

		/* Set placeholder text. */
		var output = "";
		for (var i = 0; i < parseInt(paragraphs); i++) {
			output += (b ? "<p>" : "")
				   + (ipsum[index(i)])
				   + (b ? "</p>" : "");
		}

		/* Display placeholder text. */
		$(this).html(output);

		return $(this);
	}
}) (jQuery);

/* Fill elements on page load. */
$(document).ready(function () { $(".lorem").lorem(); });
$(document).ready(function () { $(".ipsum").lorem(); });
