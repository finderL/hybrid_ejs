/**
 * 作者: dailc
 * 时间: 2016-06-08
 * 描述: 字符操作-字符集操作
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
		title: '字符集操作'
	});
	
	var CharsetTools = require('CharsetTools_Core');
	
	/**
	 * @description 监听
	 */
	function initListeners() {
		//测试功能并打印
		mui('.mui-content').on('tap', '#testFunctionAndPrint', function() {
			var testStr =document.getElementById('testStr').value;

			var gbk_testStr = CharsetTools.utf16StrToGbkStr(testStr);
			var gbk_base64_testStr = CharsetTools.Base64.encodeGbk(testStr);
			var utf8_testStr = CharsetTools.utf16StrToUtf8Str(testStr);
			var utf8_base64_testStr = CharsetTools.Base64.encodeUtf8(testStr);

			var html = '';

			html += '原字符串:' + testStr + '<br />';
			html += '***' + '<br />';
			html += '转为gbk后:' + gbk_testStr + '<br />';
			html += '***' + '<br />';
			console.log('gbk:' + gbk_testStr);
			html += '转为utf8后:' + utf8_testStr + '<br />';
			html += '***' + '<br />';
			html += 'gbk型的base64码:' + gbk_base64_testStr + '<br />';
			html += '***' + '<br />';
			html += 'utf8型的base64码:' + utf8_base64_testStr + '<br />';
			html += '***' + '<br />';
			html += '从gbk转回utf16:' + CharsetTools.gbkStrToUtf16Str(gbk_testStr) + '<br />';
			html += '***' + '<br />';
			html += '从utf8转回utf16:' + CharsetTools.utf8StrToUtf16Str(utf8_testStr) + '<br />';
			html += '***' + '<br />';
			html += '从gbkBase64转回utf16:' + CharsetTools.Base64.decodeGbk(gbk_base64_testStr) + '<br />';
			html += '***' + '<br />';
			html += '从utd8Base64转回utf16:' + CharsetTools.Base64.decodeUtf8(utf8_base64_testStr) + '<br />';
			document.getElementById('testPrint').innerHTML = html;
		});
		//gbk base64加密
		mui('.mui-content').on('tap', '#encodeb64GBK', function() {
			var html = '';
			var value = document.getElementById('enDecodeStr').value;
			html = CharsetTools.Base64.encodeGbk(value);
			document.getElementById('testPrint').innerHTML = html;
			console.log('gbkb64:' + html);
		});
		//UTF base64加密
		mui('.mui-content').on('tap', '#encodeb64UTF', function() {
			var html = '';
			var value = document.getElementById('enDecodeStr').value;
			html = CharsetTools.Base64.encodeUtf8(value);
			document.getElementById('testPrint').innerHTML = html;
			console.log('utfb64:' + html);
		});
		//gbk base64解密
		mui('.mui-content').on('tap', '#decodeb64GBK', function() {
			var html = '';
			var value = document.getElementById('enDecodeStr').value;
			html = CharsetTools.Base64.decodeGbk(value);
			document.getElementById('testPrint').innerHTML = html;
			console.log('gbk解密:' + html);
		});
		//UTF base64解密
		mui('.mui-content').on('tap', '#decodeb64UTF', function() {
			var html = '';
			var value = document.getElementById('enDecodeStr').value;
			html = CharsetTools.Base64.decodeUtf8(value);
			document.getElementById('testPrint').innerHTML = html;
			console.log('utf解密:' + html);
		});
	}
});