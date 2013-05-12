// init function
!function ($) {
	$(document).on("change.bootstrapcomponent.radio", "input[type='radio']", function(event){
		var _name = $(this).attr("name");
		$("label input[type='radio'][name='" + _name + "']").each(function(){
			var _value = $(this).prop('checked');

			var $parent = $(this).parent();
			var $checkbox = $parent.find(".radio-mark");
			if(_value) {
				$checkbox.addClass("checked");
			} else {
				$checkbox.removeClass("checked");
			}
		});
	});
}(window.jQuery);