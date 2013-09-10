// init function
$.fn.extend({
	slider:function(options){
		// get options
		var vars = $._bc.vars(options);
		var _options = vars.options;

		var value = _options.value;
		var max_value = $._bc.get(_options, "max", null);
		var min_value = $._bc.get(_options, "min", null);

		var $process = $(this);
		var $spiner = $process.find(".slider[data-toggle='slider']");
		var _total_width = $process.outerWidth() - $spiner.outerWidth();

		if(max_value != null && min_value != null) {
			$spiner.attr("data-min", min_value);
			$spiner.attr("data-max", max_value);
		}

		var _min = parseInt($spiner.attr("data-min"), 10);
		var _max = parseInt($spiner.attr("data-max"), 10);

		if(!isNaN(_min) && !isNaN(_max) && _min < _max) {
			$spiner.val(value);
			$spiner.css("margin-left", ((value - _min) / (_max - _min) * _total_width) + "px");
		} else {
			$spiner.val((value * 100) + "%");
			$spiner.css("margin-left", (_total_width * value) + "px");
		}
	}
});

!function ($) {
	var mouse_down = false;
	var process;
	var tgt;
	var _innerLeft;
	var _click_slider = false;

	function sliderGo(tgt, _curLeft, _total_width) {
		if(_curLeft < 0) _curLeft = 0;
		if(_curLeft > _total_width) _curLeft = _total_width;
		tgt.css("margin-left", _curLeft + "px");

		var _min = parseInt(tgt.attr("data-min"), 10);
		var _max = parseInt(tgt.attr("data-max"), 10);
		if(!isNaN(_min) && !isNaN(_max) && _min < _max) {
			tgt.val(_curLeft / _total_width * (_max - _min) + _min);
		} else {
			tgt.val((_curLeft / _total_width * 100) + "%");
		}

		// raise change event
		tgt.change();
	}

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

		sliderGo(tgt, _curLeft, _total_width);
	});

	// mouse up
	$(document).on("mouseup.bootstrapcomponent.slider", function(event){
		mouse_down = false;
	});

	// mouse click
	$(document).on("click.bootstrapcomponent.slider", ".progress", function(event){
		if(_click_slider) {
			_click_slider = false;
			return;
		}

		var process = $(this);
		$(this).find("button.slider").each(function(){
			var _my = $(this);
			var _tgt_width = _my.outerWidth();
			var _process_width = process.outerWidth();
			var _total_width = _process_width - _tgt_width;
			var _curLeft = event.pageX - process.offset().left - _tgt_width / 2;

			sliderGo(_my, _curLeft, _total_width);
		});
	});

	// slider click
	$(document).on("click.bootstrapcomponent.slider", "button.slider", function(event){
		_click_slider = true;
	});
}(window.jQuery);