/**
 * 作者: dailc
 * 时间: 2017-01-16 
 * 描述:  新人手册->文件上传示例
 * 
 * 最简单的文件上传-h5模式下
 */
define(function(require, exports, module) {
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	var UploadH5Tools = require('UpLoadH5Tools_Core');
	
	
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
		//上传按钮监听
		mui('.mui-content').on('tap','#btn-uploader',function(){
			var oFile = document.getElementById('testInput').files[0];
			if(!oFile){
				console.error("选择文件不能为空");
				mui.alert('选择文件不能为空');
				return ;
			}
			var files = [{
				name:'fileImage',
				file:oFile
			}];
			UploadH5Tools.upLoadFiles({
				url:'http://115.29.151.25:8012/webUploaderServer/testupload.php',
				//url:'http://218.4.136.118:8086/mockjs/55/testUpload',
				//url:'http://115.29.151.25:8012/webUploaderServer/fileupload.php',
				data: {
					'extra':'11'
				},
				files: files,
				beforeUploadCallback:function(){
					console.log("准备上传:"+JSON.stringify(files));
					setTips("准备上传");
				},
				successCallback:function(response,detail){
					console.log("上传成功:"+JSON.stringify(response));
					console.log("detail:"+detail);
					setTips(detail);
				},
				errorCallback:function(msg,detail){
					console.log("上传失败:"+msg);
					console.log("detail:"+detail);
					setTips(detail);
				},
				uploadingCallback:function(percent,msg,speed){
					console.log("上传中:"+percent+',msg:'+msg+',speed:'+speed);
					
				}
			});
		});
	}
	
	var tipsDom = document.getElementById('tips');
	/**
	 * @description 设置tips
	 * @param {String} msg 对应消息
	 */
	function setTips(msg) {
		document.getElementById('tips').innerHTML = msg;
	}
});