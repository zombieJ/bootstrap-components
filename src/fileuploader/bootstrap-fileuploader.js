/* options:
	type:		one				enable only one file to upload[default]
				muti			enable muti files to upload

	max:		<number>		Set maximun number of files
*/

// init function
$.fn.extend({
	fileuploader:function(options){
		// get options
		var vars = $._bc.vars(options);
		var _options = vars.options;

		var _muti_upload = false;
		var _max = $._bc.get(_options, "max", -1);

		if($._bc.get(_options, "type", "one") == "muti") {
			_muti_upload = true;
		}

		var my = $(this);
		my.hide();

		var $label = $("<label class='fileuploader'>");
		var $button = $("<button class='btn file' type='button'>File</button>");
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

		function refreshEnable() {
			if(_muti_upload) {
				var _fileNum = $files_region.find(".fileuploader-item input[type='file']").length;
				if(_max != -1 && _fileNum >= _max) {
					$button.attr("disabled", "disabled");
				} else {
					$button.removeAttr("disabled");
				}
				if(_fileNum == 0)
					$tips.html("Select File");
				else
					$tips.html(_fileNum + " files selected");
			}
		}

		if(!_muti_upload) {		// if enable upload one file
			markUploader(my, function(){
				var filename = getFilename($(this).val());
				$tips.html(filename);
			});
			if(my.val() != "") {
				var filename = getFilename(my.val());
				$tips.html(filename);
			}
		} else {
			$region.insertAfter($label);
			$files_region.appendTo($region);

			var tmp_my = my.clone();
			my.remove();
			my = tmp_my;
			my.removeAttr("multiple");

			refreshEnable();
		}

		$button.click(function(){
			if(_muti_upload) {
				var $file = my.clone();
				markUploader($file, function(){
					var filename = getFilename($(this).val());
					var $div_file = $("<div class='fileuploader-item'>");
					var $rm = $("<button class='close' type='button'>&times;</button>");
					var $filename = $("<span class='tips'>");

					var has = false;
					$(".fileuploader-item input[type='file']").each(function(){
						var _filename = getFilename($(this).val());
						if(filename == _filename) has = true;
					});
					if(has) {
						alert("Can't upload same file.");
						return;
					}

					$filename.html(filename);
					$(this).attr("multiple", "multiple");
					$rm.click(function(){
						$div_file.remove();
						refreshEnable();
					});

					$div_file.appendTo($files_region);
					$(this).appendTo($div_file);
					$rm.appendTo($div_file);
					$filename.appendTo($div_file);

					refreshEnable();
				});

				$file.click();
			} else {
				my.click();
			}
		});

		return $label;
	}
});