/**
 * 作者: dailc
 * 时间: 2017-01-12 
 * 描述:  新人手册->下拉刷新页面
 * 
 * 请勿必养成“时常格式化”的良好习惯
 * 
 * 由于接口返回格式符合规范，所以这里的下拉刷新是最简单的一种调用
 */
define(function(require, exports, module) {
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	var PullToRefreshTools = require('PullToRefresh_Impl_Default_Core');
	//下拉刷新对象
	var pullToRefreshObj;
	var searchValue = '';
	
	CommonTools.initReady(init);

	/**
	 * @description 初始化代码
	 */
	function init() {
		//引入需要的第三方js文件
		CommonTools.importFile([
			'js/libs/mui.min.js',
			'js/libs/mustache.min.js'
		],function(){
			//TODO: 做一些初始化事情
			initListeners();
			initPullRefreshList();
		});
	}
	
	/**
	 * @description 初始化监听
	 */
	function initListeners(){
		//防止change和btn同时触发
		var isSearch = false;
		//搜索栏的input change 监听
		mui('.mui-content').on('change','#input-searchName',function(){
			if(!isSearch){
				isSearch = true;
				searchAction();
			} else {
				isSearch = false;
			}
			
		});
		//确定按钮点击监听
		mui('.mui-content').on('tap','#searchBtn',function(){
			if(!isSearch){
				isSearch = true;
				searchAction();
			} else {
				isSearch = false;
			}
		});
	}
	
	/**
	 * @description 搜索事件
	 */
	function searchAction(){
		//获取input的值
		searchValue = document.getElementById('input-searchName').value;
		console.log("搜索:"+searchValue);
		pullToRefreshObj&&pullToRefreshObj.refresh();
	}
	/**
	 * @description 初始化下拉刷新
	 */
	function initPullRefreshList() {
		PullToRefreshTools.initPullDownRefresh({
			'isDebug': true,
			//type2皮肤在h5下做了兼容会自动切换成type0的
			//有多种皮肤可以选择，这里默认用了ejs下的下拉刷新皮肤
			'skin': 'type2',
			'bizlogic': {
				defaultInitPageNum: 0,
				getUrl: 'http://115.29.151.25:8012/request.php',
				getLitemplate: '<li class="mui-table-view-cell"id="{{InfoID}}"><p class="cell-title">{{Title}}</p><p class="cell-content"><span class="cell-content-subcontent"></span><span class="cell-content-time">{{InfoDate}}</span></p></li>',
				getRequestDataCallback: function(currPage) {
					var requestData = {};
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
					return requestData;
				},
				itemClickCallback: function(e) {
					console.log("点击:" + this.id);
				},
			}
		},function(pullToRefresh){
			pullToRefreshObj = pullToRefresh;
		});
	}
});