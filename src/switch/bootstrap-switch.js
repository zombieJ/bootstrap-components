// init function
$.fn.extend({
	switch:function(options){
		// get options
		var vars = $._bc.vars(options);
		var _options = vars.options;

		var my = $(this);
		my.hide();

		var _readonly = my.prop('readonly');
		var _disabled = my.prop('disabled');

		var $bac = $("<div class='progress switch'>");
		var $lbl = $("<button class='label'></button>");
		var $btn = $("<button type='button' class='btn spiner'>");

		$bac.insertAfter(my);
		$lbl.appendTo($bac);
		$btn.appendTo($bac);

		function refreshStatus() {
			var _on = my.prop("checked");
			if(_on) {
				$bac.removeClass("off");
				$bac.addClass("on");
				$lbl.html("ON");

				var _left = $bac.width() - $btn.outerWidth();
				$btn.css("left", _left + "px");
			} else {
				$bac.removeClass("on");
				$bac.addClass("off");
				$lbl.html("OFF");

				$btn.css("left", 0);
			}
		}
		refreshStatus();

		if(_readonly || _disabled) {
			$bac.addClass("readonly");
			$btn.addClass("disabled");

			if(_disabled) {
				$bac.addClass("disabled");
			}
		} else {
			$bac.click(function(){
				var _on = !my.prop("checked");
				my.prop("checked", _on);
				refreshStatus();
				my.change();
			});
		}
	}
});