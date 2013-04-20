/* options:
	target:		all(default)	contains date & time picker
				timer			time picker only
				dater			date picker only

	date:		Date()			to set the date time. Default is now.
*/

// init env
$._bc.vals.datepicker = new Object();
$._bc.vals.datepicker.index = 1;

// init function
$.fn.extend({
	datepicker:function(options, callback){
		// get options
		var my = $(this);
		var vars = $._bc.vars(options, callback);
		var _options = vars.options;

		var _index = $._bc.vals.datepicker.index;
		$._bc.vals.datepicker.index++;

		var date = $._bc.get(_options, "date", new Date());
		var enable_datepicker = false;
		var enable_timepicker = false;
		if($._bc.get(_options, "target", "all") == "all" || $._bc.get(_options, "target", "all") == "dater") {
			enable_datepicker = true;
		}
		if($._bc.get(_options, "target", "all") == "all" || $._bc.get(_options, "target", "all") == "timer") {
			enable_timepicker = true;
		}

		function dd(str) {
			str = str + "";
			if(str.length == 1)
				return "0" + str;
			return str;
		}
		function formatDate(date, outer) {		//get string as date
			var str_date = "";
			var show_date = outer == null || (enable_datepicker && outer == true);
			var show_time = outer == null || (enable_timepicker && outer == true);
			if(show_date)
				str_date = date.getFullYear() + "-" + dd(date.getMonth()+1) + "-" + dd(date.getDate()) + (show_time ? " " : "");
			if(show_time)
				str_date += dd(date.getHours()) + ":" + dd(date.getMinutes()) + ":" + dd(date.getSeconds());
			return str_date;
		}

		function getDate(str) {					//get date by input
			var _date;
			try {
				if(str.match(/^\d+:\d+:\d+/)) str = "1990-09-03 " + str;
				_date = new Date(str);
				if(_date == "Invalid Date" || _date == null)
					return date;
				else
					return _date;
			} catch(err) {
				return date;
			}
		}

		// init view
		var $input = $(this).find(".datepicker");
		$input.val(formatDate(date, true));

		var $btn = $(this).find("[data-toggle='datepicker']");
		$btn.click(function(event){
			// get current date
			var _date = getDate($input.val());

			if(my.data("datepicker") == null) {
				var $datepicker = $("<div class='datepicker modal'>");
				$datepicker.appendTo("body");

				var pos = $(this).position();
				$datepicker.css("left", pos.left + "px");
				$datepicker.css("top", (pos.top + $(this).outerHeight()) + "px");

				my.data("datepicker", true);
				// date model
				var $date = $("<div class='datepicker-date'>");
				var $date_head  = $("<div class='datepicker-head'>");
				var $date_left = $("<button class='btn btn-warning btn-small datepicker-month-left'><i class='icon-chevron-left  icon-white'></i></button>");
				var $date_content = $("<h5></h5>");
				var $date_right = $("<button class='btn btn-warning btn-small datepicker-month-right'><i class='icon-chevron-right  icon-white'></i></button>");
				var $date_body = $("<div class='datepicker-body'>");
				var $date_days = $("<div class='datepicker-days'>");
				$date_days.append("<span>Sun</span>");
				$date_days.append("<span>Mon</span>");
				$date_days.append("<span>Tue</span>");
				$date_days.append("<span>Wed</span>");
				$date_days.append("<span>Thur</span>");
				$date_days.append("<span>Fri</span>");
				$date_days.append("<span>Sat</span>");
				var $date_dates = $("<div>");

				$date.appendTo($datepicker);
				$date_head.appendTo($date);
				$date_left.appendTo($date_head);
				$date_content.appendTo($date_head);
				$date_right.appendTo($date_head);
				$date_body.appendTo($date);
				$date_days.appendTo($date_body);
				$date_dates.appendTo($date_body);
				if(!enable_datepicker) $date.hide();

				$date_left.data("m", -1);
				$date_right.data("m", 1);
				$date_left.add($date_right).click(function(){
					var value = $(this).data("m");
					var _mdate = new Date(formatDate(_date));
					_mdate.setMonth(_mdate.getMonth() + value);
					if(value == -1 && _date.getMonth() == _mdate.getMonth()) {
						_mdate.setDate(0);
					} else if(value == 1 && (_date.getMonth() + 2) % 12 == _mdate.getMonth()) {
						_mdate.setDate(0);
					}
					_date = _mdate;
					setDateView();
				});

				function setDateView() {
					function getStartDay(date) {
						var _date = new Date(formatDate(date));
						_date.setDate(1);
						return _date.getDay();
					}
					function getTotalDays(date) {
						var _date = new Date(formatDate(date));
						_date.setDate(1);
						_date.setMonth(_date.getMonth() + 1);
						_date.setDate(0);
						return _date.getDate();
					}

					$date_content.html(_date.getFullYear() + "-" + dd(_date.getMonth()+1));

					$date_dates.empty();
					var _gsd = getStartDay(_date);
					for(var i = 0 ; i < _gsd ; i++) {
						$btn = $("<button class='btn'></button>");
						$btn.css("visibility", "hidden");
						$btn.appendTo($date_dates);
					}
					var _gtd = getTotalDays(_date);
					for(var i = 1 ; i <= _gtd ; i++) {
						$btn = $("<button class='btn'>"+i+"</button>");
						$btn.appendTo($date_dates);

						// set target date as mark
						if(i == _date.getDate()) {
							$btn.addClass("btn-primary");
						}

						// click to reset date
						$btn.click(function(){
							$date_dates.find("button").removeClass("btn-primary");
							$(this).addClass("btn-primary");
							_date = new Date(genDate());
						});
					}
				}
				setDateView();

				// spliter
				if(enable_datepicker && enable_timepicker) {
					var $split = $("<div class='datepicker-split'></div>");
					$split.appendTo($datepicker);
				}

				// time model
				var $time = $("<div class='datepicker-time'>");
				function genTimeUnit(type, max) {
					var $unit = $("<div class='datepicker-"+type+"'>");
					var $input = $("<input type='text' maxlength='2' />");
					var $unit_minus = $("<button class='btn'><i class='icon-minus'></i></button>");
					var $unit_plus = $("<button class='btn'><i class='icon-plus'></i></button>");

					$input.data("max", max);
					$unit_minus.data("m", -1);
					$unit_plus.data("m", 1);

					function fresh() {
						var num = parseInt($input.val(), 10);
						if(isNaN(num)) num = 0;
						if(num < 0) num = 0;
						if(num >= max) num = max - 1;
						$input.val(dd(num));
					}

					$unit_minus.add($unit_plus).click(function(){
						var value = $(this).data("m");
						var max = $input.data("max");
						var num = parseInt($input.val(), 10);
						num += value;
						$input.val(dd(num));
						fresh();
					});

					$input.blur(function(){
						fresh();
					});

					$input.appendTo($unit);
					$unit_minus.appendTo($unit);
					$unit_plus.appendTo($unit);

					return $unit;
				}
				var $hour = $(genTimeUnit("hour", 24));
				var $minute = $(genTimeUnit("minute", 60));
				var $second = $(genTimeUnit("second", 60));
				var $span1 = $("<span>:</span>");
				var $span2 = $("<span>:</span>");
				$hour.find("input").val(dd(_date.getHours()));
				$minute.find("input").val(dd(_date.getMinutes()));
				$second.find("input").val(dd(_date.getSeconds()));

				$time.appendTo($datepicker);
				$hour.appendTo($time);
				$span1.appendTo($time);
				$minute.appendTo($time);
				$span2.appendTo($time);
				$second.appendTo($time);
				if(!enable_timepicker) $time.hide();

				// function gen date with UI view
				function genDate() {
					var str = $date_content.html()+"-"+dd($date_body.find(".btn-primary").html());
					str += " " + dd($hour.find("input").val()) + ":" + dd($minute.find("input").val()) + ":" + dd($second.find("input").val());
					return str;
				}

				// remove when click body content
				$datepicker.click(function(event){
					event.stopPropagation();
				});
				$(document).bind('click.datepicker' + _index, function(event){
					var _stop = my.data("stop");
					my.data("stop", null);

					if(_stop)
						return;

					$datepicker.remove();
					my.data("datepicker", null);
					$input.val(formatDate(getDate(genDate()), true));
					$(document).unbind('click.datepicker' + _index);
				});
			}
		});

		my.click(function(event){
			hideView();
		});
		function hideView() {
			if(my.data("datepicker") == true) {
				my.data("stop", true);
			} else {
			}
		}
	}
});