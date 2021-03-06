/**
 * 作者: dailc
 * 时间: 2017-01-06
 * 描述:  ejs-api示例
 * v2.0示例
 */
define(function(require, exports, module) {
	"use strict";
	

	var EjsDefaultLitemlate = require('bizlogic_common_ejs_default');
	
	var pageAddress = 'html/ejsApi/demo_ejs_simple_v2.html';
	
	new EjsDefaultLitemlate.Litemplate({
		isIndex: false,
		title: 'page模块',
		ejsApi: [{
				'id': 'openPage',
				'text': 'openPage(默认)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, '默认打开', {
						//页面额外参数
						"testKey": 'testValue'
					}, {
						//页面配置参数
						'isDebug': true
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips('1:'+JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageRightBtn',
				'text': 'openPage(右侧按钮)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, 'With右侧按钮', {}, {
						//页面配置参数
						"nbRightText": '右侧按钮'
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips('2:'+JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageRightBtnImage',
				'text': 'openPage(右侧图片按钮)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					var img = 'frm_search_boom';
					if(ejs.os.ios) {
						img = 'EJS_nav_bulb';
					}
					ejs.page.openPage(pageAddress, 'With右侧图片按钮', {}, {
						//图片不要.png
						"nbRightImage": img
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips('3:'+JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageHideBack',
				'text': 'openPage(隐藏返回按钮)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, 'With隐藏返回按钮', {}, {
						"showBackButton": false
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageHideNavigation',
				'text': 'openPage(隐藏导航栏)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, 'With隐藏导航栏', {}, {
						"showNavigation": false
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageEnableSearch',
				'text': 'openPage(显示搜索栏)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, 'With显示搜索栏', {}, {
						"showSearchBar": true
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageHideWaiting',
				'text': 'openPage(不显示waiting)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, 'With隐藏waiting', {}, {
						"showLoadProgress": false
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageHideWaitingManual',
				'text': 'openPage(3秒后手动关闭waiting)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, 'With隐藏waiting', {}, {
						"autoHideLoading": false
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageListenerNBBack',
				'text': 'openPage(监听返回按钮)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, 'With隐藏waiting', {}, {
						//需要实现 onClickNBBackEJS()来监听，注意，只是左上角的返回
						"isListenerNBBack": true,
						"isListenerSysBack": true
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageFinishAfterOpen',
				'text': 'openPage(打开后关闭本页面)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, 'With打开后关闭', {}, {
						"finishAfterOpen": "1"
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageLocal',
				'text': 'openPage(打开本地页面)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = true;
					ejs.page.openPage('index.html', '本地页面', {}, {

					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openPageMultiSeg',
				'text': 'openPage(多个Seg)',
				'runCode': function() {
					//使用远程方式打开
					window.ejsForceLocal = false;
					ejs.page.openPage(pageAddress, '标题1,标题2', {}, {

					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}
			//		, {
			//			'id': 'openMultiPage',
			//			'text': 'openPageMulti(打开多个页面)',
			//			'runCode': function() {
			//				//使用远程方式打开
			//				window.ejsForceLocal = false;
			//				ejs.page.openPageMulti([{
			//					'url': pageAddress,
			//					'title': '页面1',
			//					'jsonObj': {
			//						'testKey': 'testValue'
			//					},
			//					'options': {
			//						"nbRightText": '测试按钮'
			//					}
			//				}, {
			//					'url': pageAddress,
			//					'title': '页面2',
			//					'jsonObj': {
			//						'testKey': 'testValue2'
			//					},
			//					'options': {
			//						"nbRightText": '测试按钮2'
			//					}
			//				}], {
			//					'requestCode': 101,
			//					'finishAfterOpen': '0'
			//				}, function(result, msg, detail) {
			//					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
			//				});
			//			}
			//		}
			, {
				'id': 'openLocal',
				'text': 'openLocal(打开原生页面)',
				'runCode': function() {
					var className = 'com.epoint.mobileoa.actys.MOAAboutActivity';
					if(ejs.os.ios) {
						className = 'MOAAboutUsViewController';
					}
					ejs.page.openLocal(className, {
						'testKey': 'testValue'
					}, {

					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'openLocalFinishAfterOpen',
				'text': 'openLocal(打开后关闭)',
				'runCode': function() {
					var className = 'com.epoint.mobileoa.actys.MOAAboutActivity';
					if(ejs.os.ios) {
						className = 'MOAAboutUsViewController';
					}
					ejs.page.openLocal(className, {
						'testKey': 'testValue'
					}, {
						"finishAfterOpen": '1'
					}, function(result, msg, detail) {
						EjsDefaultLitemlate.showTips(JSON.stringify(detail));
					});
				}
			}, {
				'id': 'setResumeCallback',
				'text': 'setResumeCallback(页面恢复监听)',
				'runCode': function() {
					ejs.page.setResumeCallback(function(result, msg, detail) {
						EjsDefaultLitemlate.showTips('页面恢复', true);
					});
				}
			}, {
				'id': 'reloadPage',
				'text': 'reloadPage(刷新页面)',
				'runCode': function() {
					ejs.page.reloadPage();
				}
			}
		]
	});

});