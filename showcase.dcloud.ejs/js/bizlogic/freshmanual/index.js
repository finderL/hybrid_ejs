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
		title: '新人手册',
		ejsApi: [{
			'id': 'helloworld',
			'text': 'helloworld示例',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/01helloWorld.html', 'helloworld示例');
			}
		},{
			'id': 'ajax1',
			'text': 'ajax示例(简单)',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/02ajaxSimple.html', 'ajax示例(简单)');
			}
		},{
			'id': 'formSubmit',
			'text': '表单提交示例',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/03formSubmit.html', '表单提交示例');
			}
		},{
			'id': 'pullToRefresh',
			'text': '下拉刷新示例',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/04pullToRefresh.html', '下拉刷新示例');
			}
		},{
			'id': 'fileupload',
			'text': '文件上传(简单)',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/05fileupload.html', '文件上传(简单)示例');
			}
		},{
			'id': 'fileupload2',
			'text': '文件上传(复杂)',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/05fileupload2.html', '文件上传(复杂)示例');
			}
		},{
			'id': 'customemodule',
			'text': '自定义模块示例',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/06customeModule.html', '自定义模块示例');
			}
		},{
			'id': 'gallerySlider',
			'text': '图片轮播示例(默认)',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/07gallerySlider.html', '图片轮播示例(默认)');
			}
		},{
			'id': 'gallerySliderType1',
			'text': '图片轮播示例(type1)',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/07gallerySlider.html?type=type1', '图片轮播示例(type1)');
			}
		},{
			'id': 'helloejs',
			'text': 'ejs新手示例',
			'runCode': function() {
				ejs.page.openPage('html/freshmanual/08helloEjs.html', 'ejs新手示例');
			}
		}]
	});

});