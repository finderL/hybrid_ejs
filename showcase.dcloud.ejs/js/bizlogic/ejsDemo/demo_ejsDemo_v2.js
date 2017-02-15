/**
 * 作者: dailc
 * 时间: 2017-01-06
 * 描述:  ejs-api示例
 * v2.0示例
 */
define(function(require, exports, module) {
	"use strict";
	
	var StorageTools = require('StorageTools_Core');

	var EjsDefaultLitemlate = require('bizlogic_common_ejs_default');

	
	new EjsDefaultLitemlate.Litemplate({
		isIndex: false,
		title: 'ejs demo(V2)',
		ejsApi: [{
			'id': 'demoVideoPlayFullScreen',
			'text': '直接全屏播放视频',
			'runCode': function() {
				ejs.page.openPage('http://app.epoint.com.cn/staticResource/video_demo.mp4', '视频播放', {}, {
					//横屏
					'orientation': '0',
					//隐藏导航栏
					'showNavigation': false
				});
			}
		}, {
			'id': 'demoVideoPlayWithAPI',
			'text': '通过api全屏播放',
			'runCode': function() {
				ejs.nativeComponents.playVideo({
					'videoUrl': 'http://app.epoint.com.cn/staticResource/video_demo.mp4',
					'thumbUrl': 'http://app.epoint.com.cn/staticResource/img_head.png',
					'title': '测试视频'
				}, function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				}, function(res) {
					EjsDefaultLitemlate.showTips('播放视频失败');
				});
			}
		}, {
			'id': 'demoVideoPlayWithPage',
			'text': '打开H5视频页面',
			'runCode': function() {
				ejs.page.openPage('html/video/demo_video_h5Video.html', '视频播放');
			}
		}, {
			'id': 'demoPulltoRefresh',
			'text': 'ejs下拉刷新',
			'runCode': function() {
				ejs.page.openPage('html/pullToRefresh/demo_pullRefresh_impl_list_type2.html', '下拉刷新');
			}
		}, {
			'id': 'setSkinThemeDay',
			'text': 'setSkinTheme("日间")',
			'runCode': function() {
				ejs.navigator.setSkinTheme('day');
				StorageTools.setStorageItem('ejs_simple_skin_key','day');
			}
		}, {
			'id': 'setSkinThemeNight',
			'text': 'setSkinTheme("夜间")',
			'runCode': function() {
				ejs.navigator.setSkinTheme('night');
				
				StorageTools.setStorageItem('ejs_simple_skin_key','night');
			}
		}, {
			'id': 'openSkinPage',
			'text': '打开皮肤示例页面',
			'runCode': function() {
				ejs.page.openPage('html/ejsDemo/demo_ejs_skin_dayAndNight.html', '皮肤示例页面');
				
			}
		}]
	});

});