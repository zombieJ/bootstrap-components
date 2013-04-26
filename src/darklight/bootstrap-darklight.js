/*	this is to help hightlight target element with dark background.
	tips: it will not work when element's parent element has been set the z-index
options:
	backdrop:		static(default)		specify static for a backdrop which doesn't close the modal on click.
					true				enable close the modal on click backdrop.
	event:			[event]				String: when element call the target function, dark background will hide.
										default is "click" event, it will auto close.
callback:			[function]			it will trigger event your set in option-event, return true to trigger close.
										defalut is always return true.
*/

// init env
$._bc.vals.darklight = new Object();
$._bc.vals.darklight.opened = false;
$._bc.vals.darklight.darkdrop = $("<div class='modal-backdrop fade darklight-backdrop'></div>");

// init function
$.fn.extend({
	darklight:function(options, callback){
		var EVENT_ATTACH = ".bootstrapcomponent.darklight";
		// get options
		var vars = $._bc.vars(options, callback);
		var _options = vars.options;
		var _callback = vars.callback;

		var _backdrop = $._bc.get(_options, "backdrop", "static");
		var _event = $._bc.get(_options, "event", "click");
		if(_callback == null) _callback = function() {return true;}

		var my = $(this);
		var $dark = $._bc.vals.darklight.darkdrop;

		// first open to show animation
		if(!$._bc.vals.darklight.opened) {
			$("body").append($dark);
			setTimeout(function(){
				$dark.addClass("in");
			},1);

			$._bc.vals.darklight.opened = true;
		}

		my.addClass("darklight-top");

		my.bind(_event + EVENT_ATTACH, function(){
			var _ret = _callback.call($(this));
			if(_ret) {
				$(this).unbind(_event + EVENT_ATTACH);
				$dark.removeClass("in");
				setTimeout(function(){
					$dark.hide();
				},300);
			}
		});
	}
});