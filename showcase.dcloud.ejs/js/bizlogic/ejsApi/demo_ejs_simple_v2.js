/**
 * 作者: dailc
 * 时间: 
 * 描述:  ejs-api示例
 */
define(function(require, exports, module) {
	"use strict";

	var EjsDefaultLitemlate = require('bizlogic_common_default');
	
	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function(){
			this._super();
			initListeners();
			setTimeout(function(){
				ejs.nativeUI.closeWaiting();
			},3000);
		}
	});
	
	new LiTemplate({
		isIndex: false,
		//title: 'ejs示例页面',
		ejsApi: null
	});
	
	
	/**
	 * @description 添加监听
	 */
	function initListeners() {
		//实现onNBRight()点击
		window.onClickNBRightEJS = function() {
			ejs.nativeUI.alert('提示','点击右侧按钮');
		};
		window.onSearchEJS = function(key){
			ejs.nativeUI.alert('搜索',key);
		};
		window.onChangeSegEJS = function(which){
			ejs.nativeUI.alert('选择Seg',which);
		};
		
		var first = null;
		var tips = '再按一次退出应用';
		window.onClickNBBackEJS = function(type){
			if(type == 1){
				tips ='再按一次退出应用~系统返回';
			}else {
				tips ='再按一次退出应用~按钮返回';
			}
			if(!first) {
				first = new Date().getTime();
				ejs.nativeUI.toast(tips);
				setTimeout(function() {
					first = null;
				}, 1000);
			} else {
				if(new Date().getTime() - first < 1000) {
					ejs.page.closePage();
				}
			}
		};
		mui('.mui-content').on('tap','#closeWithResult',function(){
			//关闭时传入回调信息
			ejs.page.closePage({
				'test':'测试信息2333'
			},function(){
				
			});
		});
		mui('.mui-content').on('tap','a',function(){
			var href = this.getAttribute('href');
			window.location.href = href;
		});
	}
});