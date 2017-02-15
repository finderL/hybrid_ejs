/**
 * 作者: dailc
 * 时间: 2016-11-22
 * 描述: 下拉刷新默认实现---业务逻辑封装 模板
 */
define(function(require, exports, module) {
	"use strict";
	
	var DefaultLitemlate = require('bizlogic_common_default');
	var PullToRefreshTools = require('PullToRefresh_Impl_Default_Core');
	
	var litemplate = DefaultLitemlate.Litemplate.extend({
		/**
		 * @description 初始化
		 */
		initBiz: function() {
			var self = this;
			self._super();
			
			self.initParams();
			self.initSearch();
			self.initPullRefreshList();
		},
		/**
		 * @description 初始化参数
		 */
		initParams: function() {
			var self = this;
			self.searchValue = '';
		},
		/**
		 * @description 初始化监听
		 */
		initSearch: function() {
			var self = this;
			if(self.options && self.options.otherOptions && self.options.otherOptions.searchSelector) {
				//搜索
				mui('.mui-content').on('change', self.options.otherOptions.searchSelector, function() {
					self.searchAction();
				});
			}

		},
		/**
		 * @description 搜索事件
		 */
		searchAction: function() {
			var self = this;
			self.searchValue = document.getElementById('input-searchName').value;
			self.options.searchAction && self.options.searchAction(self.searchValue);
			//刷新
			self.pullToRefreshObj && self.pullToRefreshObj.refresh();

		},

		/**
		 * @description 获取下拉刷新的参数
		 * @param {JSON} 返回一个配置
		 */
		getPullRefreshOptions: function() {
			//				var options = {
			//					isDebug:false,
			//					defaultInitPageNum:0,
			//					url: 'http://115.29.151.25:8012/request.php',
			//					litemplate: '<li class="mui-table-view-cell"id="{{InfoID}}"><p class="cell-title">{{Title}}</p><p class="cell-content"><span class="cell-content-subcontent"></span><span class="cell-content-time">{{InfoDate}}</span></p></li>',
			//					pageSize: 10,
			//					getData: function(currPage) {
			//						var requestData = {};
			//						//动态校验字段
			//						requestData.action = 'testPullrefreshListDemoV3';
			//						var data = {
			//							currentpageindex: currPage.toString(),
			//							pagesize: options.pageSize.toString(),
			//							tabType: 'tab1',
			//							//搜索值,接口里没有实现,这里可以打印代表搜索值已经获取到
			//							searchValue: self.searchValue
			//						};
			//						requestData.paras = data;
			//						//某一些接口是要求参数为字符串的
			//						//requestData = JSON.stringify(requestData);
			//						//console.log('url:' + url);
			//						//console.log('请求数据:' + JSON.stringify(requestData));
			//
			//						return requestData;
			//					},
			//					onClickCallback: function(e){
			//						console.log("点击:" + this.id);
			//					},
			//					skin: 'default',
			//					
			//				};
			var options = null;
			return options;
		},
		/**
		 * @description 初始化下拉刷新
		 */
		initPullRefreshList: function() {
			var self = this;
			//初始化传入也行
			var options = self.options.pullRefreshOptions || self.getPullRefreshOptions();
			if(!options) {
				return;
			}
			PullToRefreshTools.initPullDownRefresh(options, function(pullToRefresh) {
				//console.log("生成下拉刷新成功");
				self.pullToRefreshObj = pullToRefresh;
				setTimeout(function() {
					//console.log("刷新");
					//已经auto了，所以不必再手动刷新
					//self.pullToRefreshObj.refresh();
				}, 1000);
			});
		},
	});

	
	exports.Litemplate = litemplate;
});