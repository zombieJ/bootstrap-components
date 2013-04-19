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
			var $timepicker = $("<div class='timepicker modal'>");
			var $date = $("<div class='timepicker-date'>");
			var $date_head  = $("<div class='timepicker-head'>");
			var $date_left = $("<button class='btn btn-small timepicker-month-left'><i class='icon-chevron-left'></i></button>");
			var $date_content = $("<h5>2013 - 04</h5>");
			var $date_right = $("<button class='btn btn-small timepicker-month-right'><i class='icon-chevron-right'></i></button>");
			var $date_body = $("<div class='timepicker-body'>");

			var di = 0;
			var $div;
			for(var i = 1 ; i <= 31 ; i++) {
				if(di == 0) {
					$div = $("<div>");
					$div.appendTo($date_body);
				}
				$btn = $("<button class='btn'>"+i+"</button>");
				$btn.appendTo($div);

				di++;
				if(di == 7) di = 0;
			}

			$timepicker.appendTo("body");
			$date.appendTo($timepicker);
			$date_head.appendTo($date);
			$date_left.appendTo($date_head);
			$date_content.appendTo($date_head);
			$date_right.appendTo($date_head);
			$date_body.appendTo($date);
		});
	}
});