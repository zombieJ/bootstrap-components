/* options:
	after:		[element]			float after target element, default null
	margin:		[number]			margin of target elment, default is 0
	collapse:	[boolean]			create a span to fill the ori element position, default is false
*/

// init env
$._bc.vals.multiselect = new Object();
$._bc.vals.multiselect.index = 1;

// init function
$.fn.extend({
	multiselect:function(options, callback){
		// get options
		var vars = $._bc.vars(options);
		var _options = vars.options;
		var _callback = vars.callback;

		$(this).each(function(){
			var my = $(this);

			var _index = $._bc.vals.multiselect.index;
			$._bc.vals.multiselect.index++;
			var _showList = false;

			// create input instead of ori-select
			var $input = $("<input type='text' />");
			$input.insertBefore(my);
			my.hide();

			// create show list
			var $list = $("<ul class='dropdown-menu multiselect-menu'>");
			$list.insertAfter($input);

			var $labels = $("<div class='multiselect-labels'>");
			$labels.insertAfter($input);

			// options list
			my.find("option").each(function(){
				var $li = $("<li>");
				var $a = $("<a>");
				$a.html($(this).html());
				$li.append($a);
				$list.append($li);
			});

			// refresh list by key
			function refreshList(key) {
				var _key = key.toUpperCase();

				$list.empty();
				my.find("option").each(function(){
					var _opt = $(this).html();

					if(_opt.toUpperCase().indexOf(_key) != -1) {
						var $li = $("<li>");
						var $a = $("<a>");
						$a.html(_opt);
						$li.append($a);
						$list.append($li);

						$li.click(function(){
							var $label = $("<div class='multiselect-tag alert'>");
							var $btn = $("<button type='button' class='close' data-dismiss='alert'>¡Á</button>");
							var $span = $("<span>");
							$span.html($(this).find("a").html());
							$label.append($btn);
							$label.append($span);
							$labels.append($label);
						});
					}
				});
			}

			$input.keyup(function(){
				// show tips
				if(!_showList) {
					_showList = true;

					$list.addClass("selected");
					$list.outerWidth($(this).outerWidth());
					var pos = $(this).position();
					$list.css("top", (pos.top + $(this).outerHeight()) + "px");
					$list.css("left", pos.left + "px");

					$(document).bind('click.multiselect' + _index, function(event){
						$list.removeClass("selected");
						_showList = false;
					});
				}

				// show related options
				refreshList($(this).val());
			});
		});
	}
});