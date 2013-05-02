/* options:
	after:		[element]			float after target element, default null
	margin:		[number]			margin of target elment, default is 0
	collapse:	[boolean]			create a span to fill the ori element position, default is false
*/

// init function
$.fn.extend({
	floater:function(options, callback){
		// get options
		var vars = $._bc.vars(options);
		var _options = vars.options;
		var _callback = vars.callback;

		var my = $(this);
		var $after = $._bc.get(_options, "after", null);
		var _margin = $._bc.get(_options, "margin", 0);
		var _collapse = $._bc.get(_options, "collapse", false);
		var $tgt = $(document);

		if(my.length == 0) return;

		if($after != null) $after = $($after);

		var my_fake = $("<span class='floater-collapse'>");
		my_fake.css("display", my.css("display"));
		my_fake.css("margin", my.css("margin"));
		my_fake.outerHeight(my.outerHeight());
		my_fake.outerWidth(my.outerWidth());
		my_fake.insertAfter(my);
		my_fake.hide();

		$tgt.scroll(function(){
			var pos = my.offset();

			if(my.css("position") == "static") {
				my.data("bootstrapcomponent_floater_pos", pos);
			} else {
				pos = my.data("bootstrapcomponent_floater_pos");
			}

			if($after == null) {
				if($(this).scrollTop() + _margin > pos.top) {
					if(!_collapse) my_fake.show();
					my.addClass("floater");
					my.css("top", _margin);
				} else {
					if(!_collapse) my_fake.hide();
					my.removeClass("floater");
				}
			} else {
				var _top = $after.offset().top + $after.outerHeight();
				if(_top + _margin > pos.top) {
					if(!_collapse) my_fake.show();
					my.addClass("floater");
					my.css("top", (_top - $(this).scrollTop() + _margin) + "px");
				} else {
					if(!_collapse) my_fake.hide();
					my.removeClass("floater");
				}
			}
		});
	}
});