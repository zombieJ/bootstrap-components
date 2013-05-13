/* options:
	type:		single			enable only one file to upload[default]
				multi			enable multi files to upload

	max:		<number>		Set maximun number of files
*/

// init function
$.fn.extend({
	fileuploader:function(options){
		// get options
		var vars = $._bc.vars(options);
		var _options = vars.options;

		var _multi_upload = false;
		var _max = $._bc.get(_options, "max", -1);

		if($._bc.get(_options, "type", "single") == "multi") {
			_multi_upload = true;
		}

		var my = $(this);
		my.hide();

		var _name = my.attr("name");

		var $div = $("<div class='fileuploader'>");
		var $label = $("<label class='fileuploader-region'>");
		var $button = $("<button class='btn file' type='button'>File</button>");
		var $tips = $("<span class='tips'>Select File</span>");
		var $region = $("<div>");
		var $files_region = $("<div class='fileuploader-items'>");

		$div.insertAfter(my);
		$div.append(my);
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
			if(_multi_upload) {
				var _fileNum = $files_region.find(".fileuploader-item input[type='file']").length;
				if(_max != -1 && _fileNum >= _max) {
					$button.attr("disabled", "disabled");
					if($._bc.browser.msie) my.attr("disabled", "disabled");
				} else {
					$button.removeAttr("disabled");
					if($._bc.browser.msie) my.removeAttr("disabled");
				}
				if(_fileNum == 0)
					$tips.html("Select File");
				else
					$tips.html(_fileNum + " files selected");
			}
		}

		function ieSuck() {
			if($._bc.browser.msie) {
				my.show();
				$label.prepend(my);
				$div.addClass("ie");
				my.css("width", $button.css("width"));
				my.css("height", $button.css("height"));
				my.addClass("fileuploader-ori");
				$button.insertBefore($label);
				var $tmp_lbl = $("<label>");
				$tmp_lbl.insertAfter($button);
				$tmp_lbl.append($button);

				return true;
			}
			return false;
		}

		if(!_multi_upload) {		// if enable upload one file
			markUploader(my, function(){
				var filename = getFilename($(this).val());
				$tips.html(filename);
				if(filename == "") $tips.html("Select File");
			});

			ieSuck();	// IE SUCKS

			// init tips if page loaded has already has selected one
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

			if(ieSuck()) {						// IE SUCKS
				my.removeAttr("name");

				markUploader(my, function(){
					if(addFileMark($(this))) {
						my = $(this).clone(true);
						$(this).hide();
						$(this).attr("name", _name);
						$label.prepend(my);

						refreshEnable();
					}
				});
			}
		}

		function addFileMark($input) {
			var filename = getFilename($input.val());
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
				return false;
			}

			$filename.html(filename);
			$input.attr("multiple", "multiple");
			$rm.click(function(){
				$div_file.remove();
				refreshEnable();
			});

			$div_file.appendTo($files_region);
			$input.appendTo($div_file);
			$rm.appendTo($div_file);
			$filename.appendTo($div_file);

			return true;
		}

		$button.click(function(){
			if(_multi_upload) {
				var $file = my.clone();
				markUploader($file, function(){
					addFileMark($(this));

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