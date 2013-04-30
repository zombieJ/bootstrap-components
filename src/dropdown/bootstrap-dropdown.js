// init function
!function ($) {
	// drop down trigger for selector
	$(document).on("click.bootstrapcomponent.dropdown", "ul.dropdown-menu li a", function(event){
		var $parent = $(this).parent();
		for(var i = 0 ; i < 5 ; i++) {
			if($parent.hasClass("btn-group")) {
				break;
			}
			$parent = $parent.parent();
		}

		var $tgt = $parent.find("[data-type='selector']");
		var value = $(this).attr("value");
		if(value == undefined) value = $(this).html();
		$tgt.val(value);
		$tgt.find(".dropdown-value").html($(this).html());
	});
}(window.jQuery);