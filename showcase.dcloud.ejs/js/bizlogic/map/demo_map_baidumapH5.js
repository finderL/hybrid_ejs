/**
 * 作者: dailc
 * 时间: 2016-08-17
 * 描述: 百度地图示例
 */
define(function(require, exports, module) {
	"use strict";

	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			initData();
		}
	});

	new LiTemplate({
		isIndex: false,
		title: '百度地图for-js',
	});

	var BaiDuMapTools = require('BaiDuMap_Tools');
	var UITools = require("UITools_Core");

	function initData() {
		initListeners();
		initBaduMap();
	}
	/**
	 * @description 监听
	 */
	function initListeners() {
		//前端的监听
		mui('#listdata').on('tap', '.mui-table-view-cell', function() {
			var content = this.querySelector('.locationName').innerText;
			UITools.confirm({
				'message': '在' + content + '签到？',
				'title': '确认',
				'btn1': '取消',
				'btn2': '签到'
			}, function(result, msg, res) {
				if(result.which == -2) {
					UITools.toast('签到成功:'+content);
				}
			});
		});
	}

	/**
	 * @description 初始化
	 */
	function initBaduMap() {
		if(!ejs.os.ejs) {
			document.getElementById('container').style.top = '44px';
		}
		UITools.showWaiting('加载中...');
		//设置百度地图，强制使用钉钉的定位，因为普通百度定位不准
		var bMap = BaiDuMapTools.BaiDuMap;
		bMap.init('container', {
			isForceDD: true
		}, function() {
			//搜索热点
			bMap.searchHotPoint({
				poiRadius: 500, //半径为1000米内的POI,默认100米
				numPois: 12 //列举出50个POI,默认10个
			}, function(allPois) {
				UITools.closeWaiting();
				var html = '';
				//添加数据
				for(var i = 0; i < allPois.length; ++i) {
					html += ('<li class="mui-table-view-cell"><div class="locationName">' + allPois[i].title + '</div><div class="locationAddress">' + allPois[i].address + '</div></li>');
					//	                map.addOverlay(new BMap.Marker(allPois[i].point));                
				}
				document.getElementById('listdata').innerHTML = html;
			});
		}, function(msg) {
			UITools.closeWaiting();
			UITools.alert(msg, '错误', '我知道了');
		});
	}

});