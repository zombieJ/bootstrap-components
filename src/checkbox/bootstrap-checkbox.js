// init function
!function ($) {
	$(document).on("change.bootstrapcomponent.checkbox", "input[type='checkbox']", function(event){
		var _value = $(this).prop('checked');

		var $parent = $(this).parent();
		var $checkbox = $parent.find(".btn.mark");
		if(_value) {
			$checkbox.addClass("checked");
		} else {
			$checkbox.removeClass("checked");
		}
	});
}(window.jQuery);