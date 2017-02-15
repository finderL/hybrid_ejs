/**
 * 作者: dailc
 * 时间: 2017-01-16
 * 描述: 新人手册的自定义模块
 */
define(function(require, exports, module) {
	"use strict";
	
	exports.hello = function(){
		mui.alert('hello custome module');
	};
});