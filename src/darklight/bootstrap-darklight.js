/*	this is to help hightlight target element with dark background.
	tips: it will not work when element's parent element has been set the z-index
options:
	backdrop:		static(default)		specify static for a backdrop which doesn't close the modal on click.
					true				enable close the modal on click backdrop.
	event:			[event]				String: when element call the target function, dark background will hide.
										default is "click" event, it will auto close.
	start:			boolean				default is null, false to prevent show right now.
										to show it call $(tgt).showDarklight();
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
		var _start = _options.start;

		if(_callback == null) _callback = function() {return true;}

		var my = $(this);
		var $next = null;
		var $dark = $._bc.vals.darklight.darkdrop;

		if(_start == null) {
			// first open to show animation
			if(!$._bc.vals.darklight.opened) {
				$("body").append($dark);
				setTimeout(function(){
					$dark.addClass("in");
				},1);

				$._bc.vals.darklight.opened = true;
			}

			my.addClass("darklight-top");

			// call to check close the darklight
			my.bind(_event + EVENT_ATTACH, function(){
				var _ret = _callback.call($(this));
				if(_ret) {console.log($next);
					$(this).unbind(_event + EVENT_ATTACH);
					my.removeClass("darklight-top");

					if($next == null) {
						$dark.removeClass("in");
						setTimeout(function(){
							$dark.hide();
						},300);
					} else {
						$next.showDarklight();
					}
				}
			});
		}

		my.nextDarklight = function(obj, options, callback){
			var $_next = $(obj);
			if(options == null) options = new Object();
			options.start = false;
			$next = $_next.darklight(options, callback);

			return $next;
		}

		my.showDarklight = function() {
			if(options == null) options = new Object();
			options.start = null;
			my.darklight(options, callback);
		}

		return my;
	}
});

$.fn.extend({});