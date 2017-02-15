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
		title: 'runtime模块',
		ejsApi: [{
			'id': 'launchApp',
			'text': 'launchApp(打开第三方应用)',
			'runCode': function() {
				ejs.runtime.launchApp({
					'PackageName': '',
					'ClassName': '',
					'ActionName': '',
					'Scheme': '',
					//string类型的额外参数
					'Param': 'extraData',
				}, function(result, msg, detail) {
					self.showTips(JSON.stringify(detail));
				});
			}
		},{
			'id': 'getVersionName',
			'text': 'getVersionName(获取系统版本号)',
			'runCode': function() {
				ejs.runtime.getVersionName({
					
				}, function(result, msg, detail) {
					self.showTips(JSON.stringify(detail));
				});
			}
		}]
	});

});