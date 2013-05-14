/* options:
	after:		[element]			float after target element, default null
	margin:		[number]			margin of target elment, default is 0
	collapse:	[boolean]			create a span to fill the ori element position, default is false
*/

// init function
$.fn.extend({
	multiselect:function(options, callback){
		// get options
		var vars = $._bc.vars(options);
		var _options = vars.options;
		var _callback = vars.callback;

		$(this).each(function(){
			var my = $(this);

			// create input instead of ori-select
			var $input = $("<input type='text' />");
			$input.insertBefore(my);
			my.hide();

			// create show list
			var $list = $("<ul class='dropdown-menu multiselect-menu'>");
			$list.insertAfter($input);

			// options list
			my.find("option").each(function(){
				var $li = $("<li>");
				var $a = $("<a>");
				$a.html($(this).html());
				$li.append($a);
				$list.append($li);
			});

			$input.keyup(function(){
				$list.addClass("selected");
				$list.outerWidth($(this).outerWidth());
				var pos = $(this).position();
				$list.css("top", (pos.top + $(this).outerHeight()) + "px");
				$list.css("left", pos.left + "px");
			});
		});
	}
});