/**
 * 作者: dailc
 * 时间: 2017-01-09
 * 描述: 页面通用模板
 */
define(function(require, exports, module) {
	"use strict";
	
	
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	
	var DefaultLitemplate = CommonTools.Class.extend({
		/**
		 * @description 初始化业务模板时,对象创建时会默认执行
		 */
		init: function(options) {
			
			var self = this;
			options = options || {};
			self.options = options;
			var title = options.title || '';
			CommonTools.initReady(function(isPlus) {
				var jsArray = [
					'js/libs/mui.min.js',
					'js/libs/mustache.min.js',
					'js/core/epoint.moapi.v2.js'
				];
				if(options.jsFiles&&Array.isArray(options.jsFiles)){
					jsArray = jsArray.concat(options.jsFiles);
				}
				//引入必备文件,下拉刷新依赖于mui与mustache
				CommonTools.importFile(jsArray, function() {
					self.appDom = document.getElementById(options.contentDom||'ejs-app');
					//ejs系统
					if(!CommonTools.os.ejs) {
						self.generateHeader(title);
					} else {
						if(title) {
							ejs.navigator.setTitle(title);
						}
						
					}
					//初始化默认业务
					self.initBiz();
				});
			});
		},
		/**
		 * @description 基于title生成头部
		 * @param {Strings} title
		 */
		generateHeader: function(title) {
			var self = this;
			var html = '';
			var leftBackClass = !self.options.isIndex ? 'mui-icon-left-nav' : '';
			html += '<header id="header" class="mui-bar mui-bar-nav ">' +
				'<a class="mui-action-back mui-icon ' + leftBackClass + '  mui-pull-left">' +
				'</a>' +
				'<h1 id="title" class="mui-title">' +
				title +
				'</h1>' +
				'<a id="info" class="mui-icon mui-icon-info-filled mui-pull-right">' +
				'</a>' +
				'</header>';
			var headerDom = document.createElement("div");
			headerDom.innerHTML = html;

			document.body.insertBefore(headerDom, self.appDom);
			self.appDom.style.marginTop = '44px';
		},
		/**
		 * @description 初始化
		 */
		initBiz: function() {
			var self = this;
			//info监听，默认的info监听
			mui('#header').on('tap', '#info', function() {
				var tips = '请务必在EJS环境中测试(公司OA即可)';

				mui.alert(tips, '提示', '我知道了');
			});
			
		},
	});

	exports.Litemplate = DefaultLitemplate;
});