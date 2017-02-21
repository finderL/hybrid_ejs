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
		isIndex: false,
		title: 'H5 Demo',
		ejsApi: [{
			'id': 'demo_video',
			'text': 'H5视频播放',
			'runCode': function() {
				ejs.page.openPage('html/video/demo_video_h5Video.html','H5视频播放');
			}
		},{
			'id': 'demo_pullToRefresh_default',
			'text': '下拉刷新默认',
			'runCode': function() {
				ejs.page.openPage('html/pullToRefresh/demo_pullRefresh_impl_list.html','下拉刷新默认');
			}
		},{
			'id': 'demo_pullToRefresh_type',
			'text': '下拉刷新(ejs、dd)',
			'runCode': function() {
				ejs.page.openPage('html/pullToRefresh/demo_pullRefresh_impl_list_type2.html','下拉刷新(ejs、dd)');
			}
		},{
			'id': 'demo_pullToRefresh_div',
			'text': '选项卡切换+下拉刷新',
			'runCode': function() {
				ejs.page.openPage('html/pullToRefresh/demo_pullRefresh_div_custom.html','选项卡切换+下拉刷新');
			}
		},{
			'id': 'demo_pullToRefresh_base_default',
			'text': '下拉刷新基础类(default)',
			'runCode': function() {
				var skin = 'default';
				ejs.page.openPage('html/pullToRefresh/demo_pullRefresh_base_list.html?skin='+skin,'下拉刷新基础类');
			}
		},{
			'id': 'demo_pullToRefresh_base_type0',
			'text': '下拉刷新基础类(type0)',
			'runCode': function() {
				var skin = 'type0';
				ejs.page.openPage('html/pullToRefresh/demo_pullRefresh_base_list.html?skin='+skin,'下拉刷新基础类');
			}
		},{
			'id': 'demo_pullToRefresh_base_type1',
			'text': '下拉刷新基础类(type1)',
			'runCode': function() {
				var skin = 'type1';
				ejs.page.openPage('html/pullToRefresh/demo_pullRefresh_base_list.html?skin='+skin,'下拉刷新基础类');
			}
		},{
			'id': 'demo_pullToRefresh_base_type1_material1',
			'text': '下拉刷新基础类(type1_material1)',
			'runCode': function() {
				var skin = 'type1_material1';
				ejs.page.openPage('html/pullToRefresh/demo_pullRefresh_base_list.html?skin='+skin,'下拉刷新基础类');
			}
		},{
			'id': 'demo_pullToRefresh_base_type2',
			'text': '下拉刷新基础类(type2)',
			'runCode': function() {
				var skin = 'type2';
				ejs.page.openPage('html/pullToRefresh/demo_pullRefresh_base_list.html?skin='+skin,'下拉刷新基础类');
			}
		},{
			'id': 'demo_fileupload_h5',
			'text': '文件上传示例',
			'runCode': function() {
				
				ejs.page.openPage('html/upload/demo_uploadFile_h5_uploadH5.html','文件上传H5');
			}
		}]
	});

});