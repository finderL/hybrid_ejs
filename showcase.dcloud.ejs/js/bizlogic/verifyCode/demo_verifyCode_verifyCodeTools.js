/**
 * 作者: dailc
 * 时间: 2016-06-12 
 * 描述:  图形验证码-dom方式
 */
define(function(require, exports, module) {
	"use strict";

	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			initData();
			
		}
	});

	new LiTemplate({
		isIndex: false,
		title: '图形验证码-dom方式'
	});
	var VerifyCodeTools = require('VerifyCodeTools_Core');
	//两个code
	var code1,code2;
	/**
	 * @description 初始化数据,结合initReady使用
	 * plus情况为plusready
	 * 其它情况为直接初始化
	 */
	function initData() {
		initVerifyCode();
		initListeners();
	}
	/**
	 * @description 监听
	 */
	function initListeners() {
		//按钮1监听
		mui('.mui-content').on('tap','#btn1',function(){
			var result = code1.verify(document.getElementById("code1").value);
			mui.alert(''+result);
		});
		//按钮2监听
		mui('.mui-content').on('tap','#btn2',function(){
			var result = code2.verify(document.getElementById("code2").value);
			mui.alert(''+result);
		});
	}
	/**
	 * @description 初始化验证码
	 */
	function initVerifyCode() {
		var container1 = document.getElementById("vCode1");
		code1 = VerifyCodeTools.generateVerifyCode(container1);
		//这里只是为了测试dispose方法有效
		code1.dispose();
		code1 = VerifyCodeTools.generateVerifyCode(container1);
		var container2 = document.getElementById("vCode2");
		code2 = VerifyCodeTools.generateVerifyCode(container2, {
			len: 4,
			bgColor: "#444444",
			colors: [
				"#DDDDDD",
				"#DDFF77",
				"#77DDFF",
				"#99BBFF",
				//"#7700BB",
				"#EEEE00"
			]
		});
	}
});