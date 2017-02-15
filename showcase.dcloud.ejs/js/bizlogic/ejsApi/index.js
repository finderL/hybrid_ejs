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
		title: 'ejs API',
		ejsApi: [{
			'id': 'ejs_v1',
			'text': '演示API(V1)',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v1.html','ejs API(V1)');
			}
		}, {
			'id': 'ejs_v2',
			'text': '演示API(V2)',
			'runCode': function() {
				ejs.page.openPage('html/ejsApi/demo_ejs_api_v2.html','ejs API(V2)');
			}
		}]
	});
});