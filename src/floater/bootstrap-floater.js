// init function
$.fn.extend({
	floater:function(options, callback){
		// get options
		var vars = $._bc.vars(options);
		var _options = vars.options;
		var _callback = vars.callback;

		var my = $(this);
		var $tgt = $($._bc.get(_options, "target", document));

		var my_fake = $("<div>");
		my_fake.outerHeight(my.outerHeight());
		my_fake.insertAfter(my);
		my_fake.hide();

		$tgt.scroll(function(){
			var pos = my.position();

			if(my.css("position") == "static") {
				my.data("bootstrapcomponent_floater_pos", pos);
			} else {
				pos = my.data("bootstrapcomponent_floater_pos");
			}

			if($(this).scrollTop() > pos.top) {
				my_fake.show();
				my.addClass("floater");
				my.css("top", "0");
			} else {
				my_fake.hide();
				my.removeClass("floater");
			}
		});
	}
});