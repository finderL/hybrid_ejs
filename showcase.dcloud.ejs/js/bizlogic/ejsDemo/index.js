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
		title: 'ejs demo',
		ejsApi: [{
			'id': 'demo_v2',
			'text': '演示Demo(V2)',
			'runCode': function() {
				ejs.page.openPage('html/ejsDemo/demo_ejsDemo_v2.html', 'ejs demo(V2)');
			}
		}]
	});

});