/**
 * 作者: dailc
 * 时间: 2017-01-16 
 * 描述:  新人手册->自定义sea.js模块
 * 
 * 请勿必养成“时常格式化”的良好习惯
 */
define(function(require, exports, module) {
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	//自定义的sea.js模块，需要去config/seaBizConfig.js 里定义别名
	var CustomeModule = require('freshmanual_customeModule');
	
	CommonTools.initReady(init);

	/**
	 * @description 初始化代码
	 */
	function init() {
		//引入需要的第三方js文件
		CommonTools.importFile([
			'js/libs/mui.min.js'
		],function(){
			//TODO: 做一些初始化事情
			initListeners();
		});
	}
	
	/**
	 * @description 初始化监听
	 */
	function initListeners(){
		//使用mui来进行监听
		//需要注意的是,mui的监听 mui(容器).on(事件,选择器,回调)
		//其中 容器和选择器都不可省略
		mui('.mui-content').on('tap','.btn-helloworld',function(){
			//这个模块目前只暴露了一个hello方法
			CustomeModule.hello();
		});
	}
});