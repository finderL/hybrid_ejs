/**
 * 作者: dailc
 * 时间: 2017-01-05
 * 描述:  ejs-api示例
 */
define(function(require, exports, module) {
	"use strict";
	
	
	var EjsDefaultLitemlate = require('bizlogic_common_ejs_default');

	
	new EjsDefaultLitemlate.Litemplate({
		isIndex: false,
		title: 'ejs Api(V2)',
		ejsApi: [{
			'id': 'page',
			'text': 'page模块',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v2_page.html');
			}
		},{
			'id': 'nativeUI',
			'text': 'nativeUI模块',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v2_nativeUI.html','ejs API(V2)');
			}
		},{
			'id': 'navigator',
			'text': 'navigator模块',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v2_navigator.html');
			}
		},{
			'id': 'runtime',
			'text': 'runtime模块',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v2_runtime.html','ejs API(V2)');
			}
		},{
			'id': 'device',
			'text': 'device模块',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v2_device.html','ejs API(V2)');
			}
		},{
			'id': 'sql',
			'text': 'sql模块',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v2_sql.html');
			}
		},{
			'id': 'oauth',
			'text': 'oauth模块',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v2_oauth.html');
			}
		},{
			'id': 'nativeComponents',
			'text': 'nativeComponents模块',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v2_nativeComponents.html');
			}
		}]
	});
});