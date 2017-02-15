/**
 * 作者: dailc
 * 时间: 2017-01-09
 * 描述: 首页 
 */
define(function(require, exports, module) {
	"use strict";
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	
	
	var EjsDefaultLitemlate = require('bizlogic_common_ejs_default');

	new EjsDefaultLitemlate.Litemplate({
		isIndex: true,
		title: 'ejs 示例',
		ejsApi: [{
			'id': 'ejs_api',
			'text': 'ejs API演示',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/index.html','ejs API');
			}
		},{
			'id': 'ejs_demo',
			'text': 'ejs Demo演示',
			'runCode': function() {
				ejs.page.openPage('html/ejsDemo/index.html','ejs Demo');
			}
		},{
			'id': 'h5_demo',
			'text': 'H5 Demo演示',
			'runCode': function() {
				ejs.page.openPage('html/demo_h5_simple.html','H5 Demo');
			}
		},{
			'id': 'freshmanual',
			'text': '新人手册演示',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/index.html','新人手册');
			}
		}]
	});

});