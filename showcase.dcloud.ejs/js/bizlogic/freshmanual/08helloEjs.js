/**
 * 作者: dailc
 * 时间: 2017-01-17 
 * 描述:  新人手册->ejs hello world示例
 * 只展示了部分，更多请参考ejs api示例
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
			'js/core/epoint.moapi.v2.js'
		],function(){
			//TODO: 做一些初始化事情
			initListeners();
		});
	}
	
	/**
	 * @description 初始化监听
	 */
	function initListeners(){
		// api 监听
		mui('.mui-content').on('tap','.btn-api',function(){
			
			var text = this.innerText;
			
			var runCode = 'ejs.nativeUI.'+text;
			console.log(runCode);
			eval(runCode);
			
		});
		
		//打开ejs api页面
		mui('.mui-content').on('tap','.btn-more',function(){
			ejs.page.openPage('html/ejsApi/demo_ejs_api_v2.html','ejs api(V2)')
		});
	}
});