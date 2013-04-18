$.extend({_bc: new Object()});
$.extend({
	_bc:function(options, callback){
		var vars = new Object();
		if(typeof(options) == 'object') {
			vars.options = options;
		} else if(typeof(options) == 'object') {
			vars.callback = options;
		}
		if(typeof(callback) == 'function') {
			vars.callback = callback;
		}
		return vars;
	}
});