// init function
!function ($) {
	var mouse_down = false;
	var process;
	var tgt;
	var _innerLeft;

	// mouse down
	$(document).on("mousedown.bootstrapcomponent.slider", "button[data-toggle='slider']", function(event){
		process = $(this).parent();
		tgt = $(this);
		_innerLeft = event.pageX - tgt.offset().left;
		mouse_down = true;
	});

	// mouse move
	$(document).on("mousemove.bootstrapcomponent.slider", function(event){
		if(!mouse_down) return;

		var _tgt_width = tgt.outerWidth();
		var _process_width = process.outerWidth();
		var _total_width = _process_width - _tgt_width;
		var _curLeft = event.pageX - process.offset().left - _innerLeft;
		if(_curLeft < 0) _curLeft = 0;
		if(_curLeft > _total_width) _curLeft = _total_width;
		tgt.css("margin-left", _curLeft + "px");

		var _min = parseInt(tgt.attr("data-min"), 10);
		var _max = parseInt(tgt.attr("data-max"), 10);
		if(!isNaN(_min) && !isNaN(_max) && _min < _max) {
			tgt.attr("data-value", _curLeft / _total_width * (_max - _min));
		} else {
			tgt.attr("data-value", (_curLeft / _total_width * 100) + "%");
		}
	});

	// mouse up
	$(document).on("mouseup.bootstrapcomponent.slider", function(event){
		mouse_down = false;
	});
}(window.jQuery);