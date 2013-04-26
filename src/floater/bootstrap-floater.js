/* options:
	after:		[element]			float after target element, default null
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
		var $tgt = $(document);

		if(my.length == 0) return;

		if($after != null) $after = $($after);

		var my_fake = $("<span>");
		my_fake.css("display", my.css("display"));my_fake.css("zoom", "1");
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
				if($(this).scrollTop() > pos.top) {
					my_fake.show();
					my.addClass("floater");
					my.css("top", "0");
				} else {
					my_fake.hide();
					my.removeClass("floater");
				}
			} else {
				var _top = $after.offset().top + $after.outerHeight();
				if(_top > pos.top) {
					my_fake.show();
					my.addClass("floater");
					my.css("top", (_top - $(this).scrollTop()) + "px");
				} else {
					my_fake.hide();
					my.removeClass("floater");
				}
			}
		});
	}
});