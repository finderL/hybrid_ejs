/**
 * 作者: dailc
 * 时间: 2017-01-10 
 * 描述: 下拉刷新默认实现---业务逻辑封装 
 * 
 * ejs中示例都是经过多次模板封装的
 * 新手可以直接参考freshmanual里的示例页面
 */
define(function(require, exports, module) {
	"use strict";

	var DefaultLitemplate = require('litemplate_pulltorefresh_biz_default');

	new DefaultLitemplate.Litemplate({
		isIndex: false,
		title: '下拉刷新默认',
		contentDom:'pullrefresh',
		"otherOptions": {
			'searchSelector': '#input-searchName,#searchBtn'
		},
		"searchAction": function(value) {
			window.searchValue = value;
		},
		"pullRefreshOptions": {
			'isDebug': false,
			'skin': 'default',
			'bizlogic': {
				defaultInitPageNum: 0,
				getUrl: 'http://115.29.151.25:8012/request.php',
				getLitemplate: '<li class="mui-table-view-cell"id="{{InfoID}}"><p class="cell-title">{{Title}}</p><p class="cell-content"><span class="cell-content-subcontent"></span><span class="cell-content-time">{{InfoDate}}</span></p></li>',
				getRequestDataCallback: function(currPage, callback) {
					var requestData = {};

					var searchValue = window.searchValue || '';
					//动态校验字段
					requestData.action = 'testPullrefreshListDemoV3';
					var data = {
						currentpageindex: currPage.toString(),
						pagesize: 10,
						tabType: 'tab1',
						//搜索值,接口里没有实现,这里可以打印代表搜索值已经获取到
						searchValue: searchValue
					};
					requestData.paras = data;
					//某一些接口是要求参数为字符串的
					//requestData = JSON.stringify(requestData);
					//console.log('url:' + url);
					//console.log('请求数据:' + JSON.stringify(requestData));
					console.log("搜素值:" + searchValue);

					//支持同步，也支持异步，注意，异步时不允许return 否则会请求多次

					//return requestData;
					callback && callback(requestData);
				},
				itemClickCallback: function(e) {
					console.log("点击:" + this.id);
				},
			}

		}
	});
});