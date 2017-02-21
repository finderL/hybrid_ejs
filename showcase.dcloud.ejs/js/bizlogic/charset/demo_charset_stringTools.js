/**
 * 作者: dailc
 * 时间: 2016-06-08
 * 描述: 字符串工具类 
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
		title: '字符串工具'
	});
	
	var StringTools = require('StringTools_Core');
	/**
	 * @description 监听
	 */
	function initListeners() {
		
		//判断字符串是否是身份证
		mui('.mui-content').on('tap', '.btnIsIdCard18Strict', function() {
			var input1 = document.getElementById('inputvalue1');
			if (input1.value.toString() == "") {
				input1.value ="512501197203035172";
			}
			var tips = "判定条件：" + document.querySelector('.btnIsIdCard18Strict').innerText + "\n输入值：" + input1.value + "\n判定结果: 【" + StringTools.validateUserIdendity(input1.value) + "】";
			console.log(tips);
			mui.alert(tips);

		});
		//隐藏身份证号显示
		mui('.mui-content').on('tap', '.btngetEncodeIdCardType', function() {
			var input1 = document.getElementById('inputvalue1');
			var input2 = document.getElementById('inputvalue2');
			if (input1.value == "") {
				input1.value = '512501197203035172';
			}
			var tips = '';
			if (StringTools.validateUserIdendity(input1.value) == true) {
				input2.value = StringTools.getEncodeIdCardType(input1.value);
				tips = "判定条件：" + document.querySelector('.btngetEncodeIdCardType').innerText + "\n输入值：" + input1.value + "\n输出值: 【" + StringTools.getEncodeIdCardType(input1.value) + "】";
			} else {
				tips = "请输入合法的身份证号！！";
			}
			console.log(tips);
			mui.alert(tips);
		});
		//判断是否为手机
		mui('.mui-content').on('tap', '.btnIsPhoneNumber', function() {
			var input1 = document.getElementById('inputvalue1');
			if (input1.value.toString() == "") {
				input1.value = '15062133128';
			}
			var tips = "判定条件：" + document.querySelector('.btnIsPhoneNumber').innerText + "\n输入值：" + input1.value + "\n判定结果: 【" + StringTools.isPhoneNumber(input1.value) + "】";
			console.log(tips);
			mui.alert(tips);
		});
		//判断是否是邮箱
		mui('.mui-content').on('tap', '.btnIsEmail', function() {
			var input1 = document.getElementById('inputvalue1');
			if (input1.value.toString() == "") {
				input1.value = '511327004@qq.com';
			}
			var tips = "判定条件：" + document.querySelector('.btnIsEmail').innerText + "\n输入值：" + input1.value + "\n判定结果: 【" + StringTools.isEmail(input1.value) + "】";
			console.log(tips);
			mui.alert(tips);
		});
		//判断两个整数，返回一个较大的值
		mui('.mui-content').on('tap', '.btngetMaxValue', function() {
			var input1 = document.getElementById('inputvalue1');
			var input2 = document.getElementById('inputvalue2');
			if (input1.value.toString() == "" || input2.value.toString() == "") {
				input1.value = 88;
				input2.value = 99;
			}
			var tips = "判定条件：" + document.querySelector('.btngetMaxValue').innerText + "\n输入值1：" + input1.value + "\n输入值2：" + input2.value + "\n判定结果: 【" + StringTools.getMaxValue(input1.value, input2.value) + "】";
			console.log(tips);
			mui.alert(tips);		
		});
		// 随机生成一串随机数
		mui('.mui-content').on('tap', '.btngetRandomRowGuid', function() {
			var input1 = document.getElementById('inputvalue1');
			var input2 = document.getElementById('inputvalue2');
			input1.value = StringTools.getGuidGenerator();
			input2.value = StringTools.getGuidGenerator();
		});
		// 检查字符串是否是数字
		mui('.mui-content').on('tap', '.btnIsNumber', function() {
			var input1 = document.getElementById('inputvalue1');
			if (input1.value.toString() == "") {
				input1.value = "0";
			}
			var tips = "判定条件：" + document.querySelector('.btnIsNumber').innerText + "\n输入值：" + input1.value + "\n判定结果: 【" + StringTools.isNumber(input1.value) + "】";
			console.log(tips);
			mui.alert(tips);		
		
		});
	}
});