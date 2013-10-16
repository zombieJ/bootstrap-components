/*	this is to help hightlight target element with dark background.
options:
	title:			string				specify title of dialog.
	content:		element				specify content of dialog.
	close:			boolean				default is true for alert window contains close button
	confirm:		boolean				default is false for dialog can check yes or no
	!other options which contains in modal

callback:			[function]			it will trigger event when user close this dialog by click the return button.
										return boolean of confirm, and false of alert and close button.
*/

// init env
$._bc.vals.dialog = new Object();
$._bc.vals.dialog.z_index = 1051;

// init function
$.extend({
	dialog:function(options, callback){
		// get options
		var vars = $._bc.vars(options, callback);
		var _options = vars.options;
		var _callback = vars.callback;

		var _title = $._bc.get(_options, "title", "");
		var _content = $._bc.get(_options, "content", "");
		var _close = $._bc.get(_options, "close", true);
		var _confirm = $._bc.get(_options, "confirm", false);

		var _ret = null;

		var $modal = $('<div class="modal hide fade"></div>');
		var $header = $('<div class="modal-header"></div>');
		var $content = $('<div class="modal-body"></div>');
		var $footer = $('<div class="modal-footer"></div>');
		$modal.append($header);
		$modal.append($content);
		$modal.append($footer);

		// title
		var $close = $('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>');
		if(!_close) $close.css("visibility", "hidden");

		$header.append($close);
		$header.append('<h3 id="myModalLabel">'+_title+'</h3>');

		// content
		$content.append(_content);

		// footer
		if(_confirm) {
			var $f_cancel = $('<button class="btn">Cancel</button>');
			var $f_confirm = $('<button class="btn btn-primary">Confirm</button>');
			$f_cancel.data("ret", false);
			$f_confirm.data("ret", true);
			$footer.append($f_cancel);
			$footer.append($f_confirm);

			$f_cancel.add($f_confirm).click(function(){
				_ret = $(this).data("ret");
				$modal.modal('hide');
			});
		} else {
			var $f_close = $('<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');
			$footer.append($f_close);
		}

		$modal.appendTo("body");

		// show dialog with options
		$modal.modal(_options);

		// move modal-backdrop to top
		var $back = $("body div.modal-backdrop:last");
		$back.css("z-index", $._bc.vals.dialog.z_index);
		$modal.css("z-index", $._bc.vals.dialog.z_index+1);
		$._bc.vals.dialog.z_index += 2;

		// begin hide window, return callback
		$modal.on('hide', function () {
			if(_callback != null) {
				var ret;
				if(_ret != null) {
					ret = _callback.call($modal, _ret);
				} else {
					ret = _callback.call($modal, false);
				}
				return ret;
			}
		});

		// when show hidden, remove it
		$modal.on('hidden', function () {
			$(this).remove();
			$._bc.vals.dialog.z_index -= 2;
		});
		return $modal;
	}
});