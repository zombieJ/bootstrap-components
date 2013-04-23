$.extend({_bc: new Object()});
// init vars for bootstrap-component use
$._bc.vals = new Object();

// get the setting & callback
$._bc.vars = function(options, callback){
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
$._bc.get = function(options, key, defaultValue) {
	if(options != null) {
		if(options[key] != null) {
			return options[key];
		} else {
			return defaultValue;
		}
	} else {
		return defaultValue;
	}
}

// get the broswer version
var userAgent = navigator.userAgent.toLowerCase();
$._bc.browser = { 
version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1], 
safari: /webkit/.test( userAgent ), 
opera: /opera/.test( userAgent ), 
msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ), 
mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) 
};