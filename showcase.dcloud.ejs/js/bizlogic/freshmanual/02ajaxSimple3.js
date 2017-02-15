/**
 * 作者: dailc
 * 时间: 2017-01-10 
 * 描述:  新人手册->ajax示例
 * 
 * 最简单的ajax使用，但是接口返回数据通过自定义来获取
 * 
 * setState仅仅起来显示作用，与业务没有关系
 */
define(function(require, exports, module) {
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');

	CommonTools.initReady(init);

	/**
	 * @description 初始化代码
	 */
	function init() {
		//引入需要的第三方js文件
		CommonTools.importFile([
			'js/libs/mui.min.js',
			'js/libs/mustache.min.js',
		], function() {
			//TODO: 做一些初始化事情
			initListeners();
		});
	}

	/**
	 * @description 初始化监听
	 */
	function initListeners() {
		//使用mui来进行监听
		//需要注意的是,mui的监听 mui(容器).on(事件,选择器,回调)
		//其中 容器和选择器都不可省略
		mui('.mui-content').on('tap', '.btn-ajax', function() {
			ajaxData();
		});
	}

	/**
	 * @description 请求测试数据,请求完毕后通过回调回传
	 * 这里请求的是一个测试接口，返回格式符合V6规范
	 */
	function ajaxData() {
		var url = 'http://115.29.151.25:8012/request.php';
		var requestData = {};
		//动态校验字段
		requestData.action = 'testPullrefreshListDemoV3';
		var data = {
			currentpageindex: 0,
			pagesize: 10,
			tabType: 'tab1',
			//搜索值,接口里没有实现,这里可以打印代表搜索值已经获取到
			searchValue: ''
		};
		
		requestData.paras = data;
		mui.ajax(url, {
			data: requestData,
			dataType: "json",
			timeout: "6000",
			type: "POST",
			async: true,
			success: function(response) {
				//通过统一工具进行处理获取数据
				var data = CommonTools.handleStandardResponse(response,1).data;
				console.log("数据:"+JSON.stringify(data));
				renderData(data);
			},
			error: function(error) {
				//失败
			}

		});
	}
	
	/**
	 * @description 渲染数据
	 * @param {Object} data
	 */
	function renderData(data) {
		var html = '';
		//需要映射的模板,不同项目根据接口业务不同，模板也不同
		var litemPlate = 
			'<li class="mui-table-view-cell"id="{{InfoID}}"><p class="cell-title">{{Title}}</p><p class="cell-content"><span class="cell-content-subcontent"></span><span class="cell-content-time">{{InfoDate}}</span></p></li>';
		if(data && Array.isArray(data)) {
			for(var i = 0, len = data.length; i < len; i++) {
				html += Mustache.render(litemPlate,data[i]);
			}
		}
		
		if(html) {
			//如果有数据
			document.getElementById('result').innerHTML = html;
		}

	}
	
});