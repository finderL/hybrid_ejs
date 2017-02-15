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
		title: 'oauth模块',
		ejsApi: [{
			'id': 'getToken',
			'text': 'getToken',
			'runCode': function() {
				ejs.oauth.getToken(function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'getAppGuid',
			'text': 'getAppGuid',
			'runCode': function() {
				ejs.oauth.getAppGuid(function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}]
	});

});