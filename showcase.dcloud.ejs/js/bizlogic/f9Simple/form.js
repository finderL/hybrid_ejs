/**
 * 作者: dailc
 * 时间: 2017-02-08
 * 描述:  f9 移动适配的示例
 */
define(function(require, exports, module) {
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');

	// EpointM依赖于mui，所以将EpointM的引入推迟到引入第三方js文件之后
	var Epointm;

	CommonTools.initReady(init);

	/**
	 * @description 初始化代码
	 */
	function init() {
		//引入需要的第三方js文件
		CommonTools.importFile([
			'js/libs/mui.min.js',
			'js/libs/mustache.min.js',
			'js/libs/mui.picker.min.js',
			'js/libs/mui.poppicker.js'
		], function() {
			
			//引入epointM
			Epointm = require('Epointm_F9');
			//TODO: 做一些初始化事情
			toDo();
		});
	}

	var cd;
	/**
	 * @description 需要做的事情
	 */
	function toDo() {
//		epointm.initPage('../../data/testForm.json');
		cd = new CommonDto();
		cd.init({
			url: '../../data/testForm.json',
			method:'GET'
		});

	}
	function getData() {
//		epointm.execute();
		epointm.alert(JSON.stringify(cd.getData()));
	}
});