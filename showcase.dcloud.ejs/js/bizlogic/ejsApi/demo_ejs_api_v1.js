/**
 * 作者: dailc
 * 时间: 
 * 描述:  ejs-api示例
 * 
 * v1版本的api和v2的调用方式有很大不同
 */
define(function(require, exports, module) {
	"use strict";
	
	
	var EjsDefaultLitemlate = require('bizlogic_common_default');
	
	
	
	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function(){
			this._super();
			initListeners();
		}
	});
	
	new LiTemplate({
		isIndex: false,
		title: 'ejs API(V1.0)',
		jsFiles: ['js/core/epoint.moapi.v1.js']
	});
	
	
	//requestCode -必须为整数
	var requestCodeGlobal = 101;
	/**
	 * @description 添加监听
	 */
	function initListeners() {
		//startForResult时,需要实现这个函数才能接收到回调信息
		//resultCode -1代表回调成功,可以不管它
		window.top.onPageResult = function(requestCode,resultCode,jsonStr){
			if(requestCode == requestCodeGlobal){
				var jsonObj;
				//如果是startForResult打开的
				if(typeof jsonStr ==='string'){
					jsonObj = JSON.parse(jsonStr);
				}
				//弹出提示信息
				mui.toast('接收到页面回调信息:' + JSON.stringify(jsonObj));
			}else{
				mui.toast('requestCode不对');
			}
		};
		//a标签
		mui('.mui-content').on('tap', '.openPage', function() {

			var id = this.id;
			var type = this.getAttribute('page-type');
			var url = '';
			var requestCode;
			if(type === 'net') {
				window.ejsForceLocal = false;
				url = 'html/ejsApi/demo_ejs_simple_v1.html';
			} else {
				//本地
				url = 'index.html';
				window.ejsForceLocal = true;
			}
			var jsonExtras = {};
			var title = '默认标题';
			if(id === 'openPage_net_0') {

			} else if(id === 'openPage_net_1') {
				jsonExtras = {
					"nbRightText": '按钮'
				};
			} else if(id === 'openPage_net_2') {
				jsonExtras = {
					//图片不要.png
					"nbRightImage": 'img_maildetail_option'
				};
			} else if(id === 'openPage_net_3') {
				jsonExtras = {
					"swipeRefreshEnable": true
				};
			} else if(id === 'openPage_net_4') {
				jsonExtras = {
					"navigationNoBackButton": false
				};
			} else if(id === 'openPage_net_5') {
				jsonExtras = {
					"noNavigation": true
				};
			} else if(id === 'openPage_net_6') {
				jsonExtras = {
					"showLoadProgress": false
				};
			}else if(id === 'openPage_net_7') {
				jsonExtras = {
					
				};
				//测试的requestCode
				requestCode = requestCodeGlobal;
			}
			if(url) {
				
				ejs.app.openPage(url, title, jsonExtras,requestCode);
			} else {
				mui.toast('页面为空');
			}
		});
		//关页面
		mui('.mui-content').on('tap', '.other', function() {
			var id = this.id;
			if(id === 'closePage') {
				ejs.app.closePage();
			} else if(id === 'setTitle') {
				ejs.app.setTitle('测试~');
			} else if(id === 'reloadPage') {
				ejs.app.reloadPage();
			} else if(id === 'getToken') {
				var token = ejs.app.getToken();
				mui.toast('token:' + token);
			} else if(id === 'toast') {
				ejs.toast.show('测试toast消息');
			} else if(id === 'progress') {
				ejs.progress.show();
				setTimeout(function() {
					ejs.progress.hide();
				}, 3000);
			}

		});
	}
});