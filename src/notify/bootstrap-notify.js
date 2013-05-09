/*	this is to help hightlight target element with dark background.
options:
	title:			string				specify title of dialog.
	content:		element				specify content of dialog.
	position:		string				"left", "right", "top", "bottom". You can mix then up as "left,top" (it's same as "top,left")
	type:			string				"normal", "warning", "info", "error", "success"
	timeout:		number				default: 4000, hiden speed.
	overtimeout:	number				default: 1000, hiden speed after mouse move out.
	queuetimeout:	number				default: 1000, hiden speed interval between 2 notification in same the region.
	region:			string				default: "", saming region notification will not keep out other notification in same region.

callback:			[function]			it will trigger event when user close this dialog by click the return button.
										return boolean of confirm, and false of alert and close button.

return:				[element]			return notification element
*/

// init env
$._bc.vals.notify = new Object();
$._bc.vals.notify.region = new Object();	// record by region

// init function
$.extend({
	notify:function(options, callback){
		// get options
		var vars = $._bc.vars(options, callback);
		var _options = vars.options;
		var _callback = vars.callback;

		var _title = $._bc.get(_options, "title", "Notification");
		var _content = $._bc.get(_options, "content", "");
		var _position = $._bc.get(_options, "position", "right,top");
		var _type = $._bc.get(_options, "type", "normal");
		var _timeout = $._bc.get(_options, "timeout", 4000);
		var _overtimeout = $._bc.get(_options, "overtimeout", 1000);
		var _queuetimeout = $._bc.get(_options, "queuetimeout", 1000);
		var _region = $._bc.get(_options, "region", "");
		var _list = null;

		var _tt = null;

		var $notification = $("<div class='alert notification-body'>");
		var $btn = $("<button type='button' class='close'>¡Á</button>");

		// get the notification list for region
		if(_region != "") {
			$notification.attr("data-region", _region);
			_list = $._bc.vals.notify.region[_region];
			if(_list == null) {
				_list = $._bc.list();
				$._bc.vals.notify.region[_region] = _list;
			}
			_list.add($notification);
		}

		// alert position
		if(_position.indexOf("left") != -1) $notification.addClass("left");
		if(_position.indexOf("right") != -1) $notification.addClass("right");
		if(_position.indexOf("top") != -1) $notification.addClass("top");
		if(_position.indexOf("bottom") != -1) $notification.addClass("bottom");

		// alert color
		if(_type == "normal") $notification.addClass("alert-normal");
		if(_type == "error") $notification.addClass("alert-error");
		if(_type == "success") $notification.addClass("alert-success");
		if(_type == "info") $notification.addClass("alert-info");

		$notification.append($btn);

		if(_title == "") _title = "&nbsp;";
		if(typeof(_title) == 'string') _title = "<h5>" + _title + "</h5>";
		$notification.append(_title);
		if(_content != "") $notification.append(_content);

		// append notification
		$("body").append($notification);

		// fade in
		$notification.hide();
		$notification.fadeIn();

		// auto fade out
		$notification.stopAutoFadeOut = function() {
			window.clearTimeout(_tt);
		}
		$notification.setAutoFadeOut = function(_delay) {
			if(_timeout > 0) {
				var _inner_delay = _delay == null ? _timeout : _delay;

				$notification.stopAutoFadeOut();
				_tt = window.setTimeout(function(){
					$btn.click();
				}, _inner_delay);
			}
		}

		// refresh timeout if is hover
		if(_timeout > 0) {
			$notification.mouseenter(function(){
				if(_list == null) {
					$notification.stopAutoFadeOut();
				} else {
					for(var i = _list.length - 1 ; i >= 0  ; i--) {
						var $element = _list[i];
						$element.stopAutoFadeOut();
					}
				}
			});
			$notification.mouseleave(function(){
				refreshAllRelated(_overtimeout);
			});
		}

		// deal with notifications in same region
		function refreshAllRelated(_delay) {
			var _inner_delay = _delay == null ? _timeout : _delay;

			if(_list == null) {
				$notification.setAutoFadeOut(_inner_delay);
			} else {
				var _istop = _position.indexOf("top") != -1;
				var _isbottom = _position.indexOf("bottom") != -1;

				var _offset = 0;
				for(var i = _list.length - 1 ; i >= 0  ; i--) {
					var $element = _list[i];

					// move element
					if(_istop) {
						$element.animate({	top: _offset,},{queue: false});
					} else if(_isbottom) {
						$element.animate({	bottom: _offset,},{queue: false});
					}
					var _marginTop = parseInt($element.css("margin-top").replace("px",""), 10);
					_offset += $element.outerHeight() + _marginTop;

					// set timeout
					$element.setAutoFadeOut(_inner_delay + i * _queuetimeout);
				}
			}
		}
		refreshAllRelated();

		// fade out
		$btn.click(function(){
			$notification.fadeOut();
			window.setTimeout(function(){
				$notification.remove();
				if(_list != null) _list.remove($notification);
			}, 1000);
		});

		return $notification;
	}
});