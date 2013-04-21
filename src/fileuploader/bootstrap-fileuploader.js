/* options:
	type:		one				enable only one file to upload[default]
				muti			enable muti files to upload

	date:		Date()			to set the date time. Default is now.
*/

// init function
$.fn.extend({
	fileuploader:function(options){
		// get options
		var vars = $._bc.vars(options);
		var _options = vars.options;

		var _muti_upload = false;

		if($._bc.get(_options, "type", "one") == "muti") {
			_muti_upload = true;
		}

		var my = $(this);
		my.hide();

		var $label = $("<label class='fileuploader'>");
		var $button = $("<button class='btn file'>File</button>");
		var $tips = $("<span class='tips'>Select File</span>");
		var $region = $("<div>");
		var $files_region = $("<div class='fileuploader-items'>");

		$label.insertAfter(my);
		$button.appendTo($label);
		$tips.appendTo($label);

		function getFilename(filepath) {
			var filename = filepath.replace(/^.*[\\\/]/, '');
			return filename;
		}

		function markUploader(input, callback) {
			var _callback = callback;
			input.change(function(){
				if(_callback != null) _callback.call($(this));
			});
		}

		if(!_muti_upload) {		// if enable upload one file
			markUploader(my, function(){
				var filename = getFilename($(this).val());
				$tips.html(filename);
			});
		} else {
			$region.insertAfter($label);
			$files_region.appendTo($region);

			var tmp_my = my.clone();
			my.remove();
			my = tmp_my;
		}

		$button.click(function(){
			if(_muti_upload) {
				var $file = my.clone();
				markUploader($file, function(){
					var filename = getFilename($(this).val());
					var $div_file = $("<div class='fileuploader-item'>");
					var $rm = $("<button class='close'>&times;</button>");
					var $filename = $("<span class='tips'>");
					$filename.html(filename);

					$rm.click(function(){
						$div_file.remove();
					});

					$div_file.appendTo($files_region);
					$(this).appendTo($div_file);
					$rm.appendTo($div_file);
					$filename.appendTo($div_file);
				});

				$file.click();
			} else {
				my.click();
			}
		});

		return $label;
	}
});