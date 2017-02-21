/**
 * 作者: dailc
 * 时间: 2016-06-08
 * 描述:  字符操作-md5加密
 */
define(function(require, exports, module) {
	"use strict";

	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			initListeners();
		}
	});

	new LiTemplate({
		isIndex: false,
		title: 'md5加密'
	});
	var Md5Tools = require('Md5Tools_Core');
	
	/**
	 * @description 监听
	 */
	function initListeners() {
		//hex_sha1加密
		mui('.mui-content').on('tap', '#hex_sha1Md5', function() {
			var html = '';
			
			var value = document.getElementById('encodeStr').value;
			html = Md5Tools.hex_sha1(value);
			
			document.getElementById('testPrint').innerHTML = html;
			console.log('hex_sha1Md5加密:' + html);
		});
		//b64_sha1Md5加密
		mui('.mui-content').on('tap', '#b64_sha1Md5', function() {
			var html = '';
			var value = document.getElementById('encodeStr').value;
			html = Md5Tools.b64_sha1(value);
			document.getElementById('testPrint').innerHTML = html;
			console.log('b64_sha1Md5加密:' + html);
		});
		//str_sha1Md5加密
		mui('.mui-content').on('tap', '#str_sha1Md5', function() {
			var html = '';
			var value = document.getElementById('encodeStr').value;
			html = Md5Tools.str_sha1(value);
			document.getElementById('testPrint').innerHTML = html;
			console.log('str_sha1Md5加密:' + html);
		});
	}
});