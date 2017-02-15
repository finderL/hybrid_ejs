/**
 * 作者: dailc
 * 时间: 2017-01-17 
 * 描述:  新人手册->ajax示例
 * 
 * ajax请求详情并展示
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
			ajaxDetail();
		});
	}

	

	/**
	 * @description 请求测试数据,请求完毕后渲染数据
	 * 这里请求的是一个测试接口，返回格式符合V6规范
	 */
	function ajaxDetail() {
		var url = 'http://115.29.151.25:8012/webUploaderServer/request.php';
		//var url = 'http://192.168.114.35:8016/webUploaderServer/request.php';
		var requestData = {};
		//动态校验字段
		requestData.action = 'testDetail';
		var data = {
			
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
				var data = CommonTools.handleStandardResponse(response,2).data;
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
		if(!data){return;}
		//获取html中的模板
		var litemPlate = 
			document.getElementById('result').innerHTML.toString();
			
		var html = Mustache.render(litemPlate,data);
		
		if(html) {
			var resultDom = document.getElementById('result');
			//如果有数据
			resultDom.innerHTML = html;
			resultDom.classList.remove('common-hidden');
			
			//找到content,因为富文本需要手动渲染
			var contentDom = resultDom.querySelector('.news-content');
			contentDom.innerHTML = data.Content||'';
		}
	}
	
});