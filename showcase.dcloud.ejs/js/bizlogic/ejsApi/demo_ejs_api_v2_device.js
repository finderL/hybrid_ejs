/**
 * 作者: dailc
 * 时间: 2017-01-06
 * 描述:  ejs-api示例
 * v2.0示例
 */
define(function(require, exports, module) {
	"use strict";

	var EjsDefaultLitemlate = require('bizlogic_common_ejs_default');

	new EjsDefaultLitemlate.Litemplate({
		isIndex: false,
		title: 'device模块',
		ejsApi: [{
			'id': 'getMacAddress',
			'text': 'getMacAddress(仅Android)',
			'runCode': function() {
				ejs.device.getMacAddress(function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'getNetWorkType',
			'text': 'getNetWorkType',
			'runCode': function() {
				ejs.device.getNetWorkType(function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'getDeviceId',
			'text': 'getDeviceId',
			'runCode': function() {
				ejs.device.getDeviceId(function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'callPhone',
			'text': 'callPhone',
			'runCode': function() {
				ejs.device.callPhone({
					'phoneNum': '18262280461',
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
				//支持以下兼容
				//						ejs.device.callPhone('18262280461',function(result,msg,detail){
				//							EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				//						});
			}
		}, {
			'id': 'sendMsg',
			'text': 'sendMsg',
			'runCode': function() {
				ejs.device.sendMsg({
					'phoneNum': '18262280461',
					'message': 'ejs测试短信'
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
				//支持以下兼容
				//						ejs.device.sendMsg('18262280461','ejs测试短信',function(result,msg,detail){
				//							EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				//						});
			}
		}, {
			'id': 'isTablet',
			'text': 'isTablet',
			'runCode': function() {
				ejs.device.isTablet(function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'setOrientation0',
			'text': '设置横屏',
			'runCode': function() {
				ejs.device.setOrientation('0');
			}
		}, {
			'id': 'setOrientation1',
			'text': '设置竖屏',
			'runCode': function() {
				ejs.device.setOrientation('1');
			}
		}, {
			'id': 'setOrientationOther',
			'text': '设置系统默认方向',
			'runCode': function() {
				ejs.device.setOrientation();
			}
		}, {
			'id': 'getPixel',
			'text': '获取屏幕分辨率',
			'runCode': function() {
				ejs.device.getPixel(function(result,msg,detail){
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'getUAinfo',
			'text': '获取设备厂商以及型号',
			'runCode': function() {
				ejs.device.getUAinfo(function(result,msg,detail){
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}]
	});

});