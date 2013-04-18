// init env
$._bc.dialog = new Object();
$._bc.dialog.z_index = 1051;

// init function
$.extend({
	dialog:function(options, callback){
		if(options == null) options = new Object();
		var $modal = $('<div class="modal hide fade"></div>');
		var $header = $('<div class="modal-header"></div>');
		var $content = $('<div class="modal-body"></div>');
		var $footer = $('<div class="modal-footer"></div>');
		$modal.append($header);
		$modal.append($content);
		$modal.append($footer);

		$header.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">¡Á</button>');
		$header.append('<h3 id="myModalLabel">'+options.title+'</h3>');

		$content.append(options.content);

		$footer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');

		$modal.appendTo("body");

		if(callback != null) {
			var mcall = callback;
			$modal.each(function(){
				mcall.call($(this));
			});
		}

		// show dialog with options
		$modal.modal(options.options);

		// move modal-backdrop to top
		var $back = $("body div.modal-backdrop:last");
		$back.css("z-index", $._bc.dialog.z_index);
		$modal.css("z-index", $._bc.dialog.z_index+1);
		$._bc.dialog.z_index += 2;

		// when show hidden, remove it
		$modal.on('hidden', function () {
			$(this).remove();
			$._bc.dialog.z_index -= 2;
		});
		return $modal;
	}
});