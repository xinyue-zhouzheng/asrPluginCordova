if (typeof jQuery === 'undefined') {
  	throw new Error('asrPlugin\'s JavaScript requires jQuery')
}

+function ($) {
	'use strict';
	var version = $.fn.jquery.split(' ')[0].split('.')
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
		throw new Error('asrPlugin\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
	}
}(jQuery);

  
var AsrPlugin = {
	defaults: {
	    "x-app-key": "",		//捷通开发者应用appkey,必填
	    "x-sdk-version": "5.1",	//sdk版本，必填
	    "x-request-date": "",	//请求日期，必填
	    //asr识别配置串，必填
	    "x-task-config": "capkey=asr.cloud.freetalk,audioformat=",
	    "x-session-key": "",	//验证码，必填
	    "x-udid": "101:1234567890",	//udid，必填
	    // "x-tid": "12345678",
	},
	
	url: "http://api.hcicloud.com:8880/asr/Recognise",
	
	version: "1.0.0",

	init: function(options) {
		this.options = this.getOptions(options);
		// console.log(this.options);
	},

	getDefaults: function() {
		return this.defaults;
	},

	optionsVerify: function(options) {
		if (typeof options["appKey"] === "undefined" || !$.trim(options["appKey"])) {
			throw new Error("appKey couldn't be empty");
		} 

		if (typeof options["sessionKey"] === "undefined" || !$.trim(options["sessionKey"])) {
			throw new Error("sessionKey couldn't be empty");
		}

		if (typeof options["requestDate"] === "undefined" || !$.trim(options["requestDate"])) {
			throw new Error("requestDate couldn't be empty");
		}

	},

	getOptions: function(options) {

		this.optionsVerify(options);
		newOption = {};
		newOption["x-app-key"] = $.trim(options["appKey"]);
		newOption["x-request-date"] = $.trim(options["requestDate"]);
		newOption["x-session-key"] = $.trim(options["sessionKey"]);

		options = $.extend({}, this.getDefaults(), newOption);

		return options;
	},

	setAudioFormat: function(fileType) {
		this.options["x-task-config"] += fileType;		
	},
	
	recog: function(data, type){
		var result;
		this.setAudioFormat(type);
		$.ajax({
			headers: this.options,
			processData: false,
			type: "POST",
			url: this.url,
			data: data,
			async:false,
			success: function(res){
				result = res;
			}
		})
		return result
	},

}













