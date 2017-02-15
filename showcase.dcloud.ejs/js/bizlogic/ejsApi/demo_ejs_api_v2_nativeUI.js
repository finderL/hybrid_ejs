/**
 * 作者: dailc
 * 时间: 2017-01-06
 * 描述:  ejs-api示例
 * v2.0示例
 */
define(function(require, exports, module) {
	"use strict";
	
	//引用uitools 来增强ejs 的ui模块
	require('UITools_Core');
	
	var EjsDefaultLitemlate = require('bizlogic_common_ejs_default');
	
	
	
	var litemplate = new EjsDefaultLitemlate.Litemplate({
		isIndex: false,
		title: 'nativeUI模块',
		ejsApi: [{
			'id': 'toast',
			'text': 'toast',
			'runCode': function() {
				ejs.nativeUI.toast({
					"message": '测试toast消息'
				});
				//也可以如下使用-快速使用的兼容模式
				//ejs.nativeUI.toast('测试toast消息');
			}
		}, {
			'id': 'alert',
			'text': 'alert',
			'runCode': function() {
				ejs.nativeUI.alert({
					'title': '提示',
					'message': '测试alert信息'
				});
				//也可以如下使用-快速使用的兼容模式
				//ejs.nativeUI.alert('测试alert信息','提示');
			}
		}, {
			'id': 'confirm',
			'text': 'confirm',
			'runCode': function() {
				ejs.nativeUI.confirm({
					'title': 'confirm',
					'message': '你的名字。',
					'btn1': '立花泷',
					'btn2': '宫水三叶',
					//默认为可取消
					'cancelable': 0,
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
				//兼容以下写法
				//							ejs.nativeUI.confirm('问题描述?','标题', function(result, msg, detail) {
				//								EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				//							});
				//							ejs.nativeUI.confirm('问题描述?',function(result, msg, detail) {
				//								EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				//							});
			}
		}, {
			'id': 'confirmAlert',
			'text': 'confirm(模拟alert)',
			'runCode': function() {
				ejs.nativeUI.confirm({
					'title': 'confirm',
					'message': '你的名字。',
					'btn1': '确定',
					//必须传null
					'btn2':null,
					//默认为可取消
					'cancelable': 0,
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
				
			}
		}, {
			'id': 'prompt',
			'text': 'prompt(3行)',
			'runCode': function() {
				ejs.nativeUI.prompt({
					'title': 'prompt',
					'hint': '你的名字',
					'text': '立花泷',
					'cancelable': 0,
					'lines': 3,
					'maxLength': 10000
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'promptSingle',
			'text': 'prompt(单行)',
			'runCode': function() {
				ejs.nativeUI.prompt({
					'title': 'prompt',
					'hint': '你的名字',
					'text': '立花泷',
					'cancelable': 0,
					'lines': 1,
					'maxLength': 20
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'actionSheet',
			'text': 'actionSheet',
			'runCode': function() {
				ejs.nativeUI.actionSheet({
					'items': ['立花泷', '宫水三叶'],
					'cancelable': 0
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'popWindowHorizontal',
			'text': 'popWindow(横向)',
			'runCode': function() {
				ejs.nativeUI.popWindow({
					'titleItems': ['立花泷', '宫水三叶'],
					'iconItems': ['frm_tab_tipstext_bg', 'frm_round_right_blue'],
					'orientation': 'horizontal'
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'popWindow',
			'text': 'popWindow(竖向)',
			'runCode': function() {
				
				
				ejs.nativeUI.popWindow({
					'titleItems': ['立花泷', '宫水三叶'],
					'iconItems': ['frm_tab_tipstext_bg', 'frm_round_right_blue']
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'select',
			'text': 'select(多选)',
			'runCode': function() {
				//多选时必须如果有chooseArray，必须一一对应，如果少了，会报错
				ejs.nativeUI.select({
					'title': 'select',
					'items': ['远野贵树', '篠原明里', '澄田花苗', '立花泷', '宫水三叶'],
					'checkState': ['0', '0', '0', '1', '1'],
					//默认为可取消
					'cancelable': 0,
					'isMultiSelect': true,
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'selectSingle',
			'text': 'select(单选)',
			'runCode': function() {
				ejs.nativeUI.select({
					'title': 'select',
					'items': ['远野贵树', '篠原明里', '澄田花苗', '立花泷', '宫水三叶'],
					'checkState': ['0', '0', '0', '0', '1'],
					//默认为可取消
					'cancelable': 0,
					'isMultiSelect': false,
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'selectSingleSP',
			'text': 'select(单选九宫格)',
			'runCode': function() {
				ejs.nativeUI.select({
					'title': 'select',
					'items': ['远野贵树', '篠原明里', '澄田花苗', '立花泷', '宫水三叶'],
					'checkState': ['0', '0', '0', '0', '1'],
					//默认为可取消
					'cancelable': 0,
					'isMultiSelect': false,
					'type':1,
					'columns':3
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'pickDate',
			'text': 'pickDate',
			'runCode': function() {
				ejs.nativeUI.pickDate({
					'title': 'pickDate',
					'datetime': '2016-12-05'
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});

			}
		}, {
			'id': 'pickTime',
			'text': 'pickTime',
			'runCode': function() {
				ejs.nativeUI.pickTime({
					'title': 'pickTime',
					'datetime': '10:20'
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});

			}
		}, {
			'id': 'pickDateTime',
			'text': 'pickDateTime',
			'runCode': function() {
				ejs.nativeUI.pickDateTime({
					'title1': '选择日期',
					'title2': '选择时间',
					'datetime': '2016-12-05 10:20'
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'showWaiting',
			'text': 'showWaiting',
			'runCode': function() {
				ejs.nativeUI.showWaiting();
				setTimeout(function() {
					ejs.nativeUI.closeWaiting();
				}, 1000);
			}
		}, {
			'id': 'showMask',
			'text': 'showMask',
			'runCode': function() {
				ejs.nativeUI.showMask();
				setTimeout(function() {
					ejs.nativeUI.hideMask();
				}, 1000);
			}
		}, {
			'id': 'pullToRefresh',
			'items': [{
				'id': 'pullToRefresh_disable',
				'text': 'pullToRefresh_disable',
				'runCode': function() {
					ejs.nativeUI.pullToRefresh.disable();
				}
			}, {
				'id': 'pullToRefresh_enable',
				'text': 'pullToRefresh_enable(3秒消失)',
				'runCode': function() {
					ejs.nativeUI.pullToRefresh.enable(function() {
						setTimeout(function() {
							ejs.nativeUI.pullToRefresh.stop();
						}, 3000);
					});
				}
			}]
		}]
	});

	setTimeout(function(){
		//这个按钮用来定位popwindow，需要先进行锚点定位
		//等待ejs加载完毕
		ejs.navigator.setRightTextBtn('右侧锚点');
	},500);

});