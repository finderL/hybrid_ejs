/**
 * 作者: dailc
 * 时间: 2017-01-10 
 * 描述:  新人手册->ajax示例
 * 
 * 最简单的ajax使用，当接口符合规范时用框架统一处理接口数据
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
			'js/libs/mui.min.js'
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
			setState('开始请求');
			ajaxData(function(data) {
				console.log("最终结果:"+JSON.stringify(data));
				setState(JSON.stringify(data),false,true);
			});
		});
	}

	/**
	 * @description 请求测试数据,请求完毕后通过回调回传
	 * 这里请求的是一个测试接口，返回格式符合V6规范
	 * @param {Function} callback 回调函数
	 */
	function ajaxData(callback) {
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
		setState('请求url:'+url+'\n请求参数:'+JSON.stringify(data),true);
		requestData.paras = data;
		mui.ajax(url, {
			data: requestData,
			dataType: "json",
			timeout: "6000",
			type: "POST",
			async: true,
			success: function(response) {
				//				   		console.log("成功回调");
				setState('~~请求成功~~',true);
				
				//1代表通用列表,2代表通用详情,0代表通用提交
				var result = CommonTools.handleStandardResponse(response,1);
				
				//返回处理结果
				callback&&callback(result.data)
				
			},
			error: function(error) {
				setState('请求失败:'+JSON.stringify(error));
			}

		});
	}
	
	var stateDom = document.getElementById('state');
	var resultDom = document.getElementById('result');
	/**
	 * @description 设置请求状态,新手可以不用理会
	 * @param {String} msg
	 * @param {Boolean} isAppend 是否是额外添加
	 * @param {Boolean} isResult 是否是结果
	 */
	function setState(msg,isAppend,isResult){
		var dom = isResult?resultDom:stateDom;
		
		var dateTime = (new Date()).toLocaleString();
		
		msg += '\n-时间:'+dateTime+'\n\n';
		if(isAppend) {
			dom.innerText += msg;
		} else {
			dom.innerText = msg;
		}
		
	}

});