$.extend({
	dialog:function(options){
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

		if(options.show != null) {
			options.show($modal);
		}
		$modal.modal(options.options);
		$modal.on('hidden', function () {
			$(this).remove();
		});
		return $modal;
	}
});