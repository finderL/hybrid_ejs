/**
 * 作者: dailc
 * 时间: 2017-01-10
 * 描述: div模式下拉刷新 -可以自定义
 */
define(function(require, exports, module) {
    var DefaultLitemlate = require('bizlogic_common_default');
	var PullToRefreshTools = require('PullToRefresh_Impl_Default_Core');
	
	var LiTemplate = DefaultLitemlate.Litemplate.extend({
		initBiz: function(){
			this._super();
			initPullRefreshList();
		}
	});
	
	new LiTemplate({
		isIndex: false,
		contentDom:'slider',
		title: '选项卡切换+下拉刷新'
	});
	
	
	/**
	 * @description 初始化下拉刷新
	 */
	function initPullRefreshList() {

		//两个下拉刷新对象
		var pullToRefresh1, pullToRefresh2;
		//默认为公用url和模板
		var url = 'http://115.29.151.25:8012/request.php';
		var litemplate =
			'<li class="mui-table-view-cell"id="{{InfoID}}"><p class="cell-title">{{Title}}</p><p class="cell-content"><span class="cell-content-subcontent"></span><span class="cell-content-time">{{InfoDate}}</span></p></li>';
		var pageSize = 10;
		//获得请求参数的回调
		var getData1 = function(currPage) {
			var requestData = {};
			//动态校验字段
			requestData.action = 'testPullrefreshListDemoV3';
			var data = {
				currentpageindex: currPage.toString(),
				pagesize: pageSize.toString(),
				tabType: 'tab1'
			};
			//console.log("当前页:"+currPage);
			requestData.paras = data;
			//某一些接口是要求参数为字符串的
			//requestData = JSON.stringify(requestData);
			//console.log('url:' + url);
			//console.log('请求数据:' + JSON.stringify(requestData));

			return requestData;
		};
		//获得请求参数的回调-党员
		var getData2 = function(currPage) {
			var requestData = {};
			//动态校验字段
			requestData.action = 'testPullrefreshListDemoV3';
			var data = {
				currentpageindex: currPage.toString(),
				pagesize: pageSize.toString(),
				tabType: 'tab2'
			};
			requestData.paras = data;
			//某一些接口是要求参数为字符串的
			//requestData = JSON.stringify(requestData);
			//console.log('url:' + url);
			//console.log('请求数据:' + JSON.stringify(requestData));

			return requestData;
		};
		//点击回调
		var onClickCallback = function(e) {
			console.log("点击:"+this.id);
		};
		//初始化下拉刷新是异步进行的,回调后才代表下拉刷新可以使用
		//因为用了sea.js中的require.async
		//第一个
		PullToRefreshTools.initPullDownRefresh({
			isDebug: true,
			up: {
				auto: true
			},
			bizlogic: {
				defaultInitPageNum: 0,
				getLitemplate: litemplate,
				getUrl: url,
				getRequestDataCallback: getData1,
				itemClickCallback: onClickCallback,
				listdataId: 'listdata1',
				pullrefreshId: 'pullrefresh1'
			},
			//三种皮肤
			//default -默认人的mui下拉刷新,webview优化了的
			//default只支持一个
			//type1 -自定义类别1的默认实现, 没有基于iscroll
			//type1_material1 -自定义类别1的第一种材质
			skin: 'type1'
		}, function(pullToRefresh) {
			pullToRefresh1 = pullToRefresh;
		});
		//第二个
		PullToRefreshTools.initPullDownRefresh({
			isDebug: true,
			up: {
				auto: true
			},
			bizlogic: {
				defaultInitPageNum: 0,
				getLitemplate: litemplate,
				getUrl: url,
				getRequestDataCallback: getData2,
				itemClickCallback: onClickCallback,
				listdataId: 'listdata2',
				pullrefreshId: 'pullrefresh2'
			},
			//三种皮肤
			//default -默认人的mui下拉刷新,webview优化了的
			//type1 -自定义类别1的默认实现, 没有基于iscroll
			//type1_material1 -自定义类别1的第一种材质
			skin: 'type1_material1'
		}, function(pullToRefresh) {
			pullToRefresh2 = pullToRefresh;
		});
	}
});