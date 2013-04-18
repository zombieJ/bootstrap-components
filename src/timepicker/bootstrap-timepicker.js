// init env
// $._bc.dialog = new Object();
// $._bc.dialog.z_index = 1051;

// init function
$.fn.extend({
	timepicker:function(options, callback){
		var vars = $._bc(options, callback);

		var $input = $(this).find(".timepicker");
		var $btn = $(this).find("[data-toggle='timepicker']");
		$btn.click(function(){
			var $date = $("<div class='timepicker'>");
			$date.appendTo("body");
		});
	}
});