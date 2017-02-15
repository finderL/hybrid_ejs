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
		title: 'sql模块',
		ejsApi: [{
			'id': 'getConfigValue',
			'text': 'getConfigValue(test_ejs_key)',
			'runCode': function() {
				ejs.sql.getConfigValue('test_ejs_key', function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'setConfigValue',
			'text': 'setConfigValue(test_ejs_key)',
			'runCode': function() {
				ejs.sql.setConfigValue('test_ejs_key', 'testValue', function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}]
	});

});