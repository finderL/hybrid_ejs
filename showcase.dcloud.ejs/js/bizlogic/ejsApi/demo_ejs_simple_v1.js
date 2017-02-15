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
		}
	});
	
	new LiTemplate({
		isIndex: false,
		title: 'ejs 示例展示',
		jsFiles: ['js/core/epoint.moapi.v1.js']
	});
	/**
	 * @description 添加监听
	 */
	function initListeners() {
		//实现onNBRight()点击
		window.onNBRight = function() {
			mui.alert('点击右侧按钮');
		};
		
		mui('.mui-content').on('tap','#closeWithResult',function(){
			//关闭时传入回调信息
			ejs.app.closePage({
				'test':'测试信息'
			});
		});
	}
});