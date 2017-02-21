/**
 * 作者: dailc
 * 时间: 2016-05-31 
 * 描述:  普通h5文件上传
 */
define(function(require, exports, module) {
	"use strict";

	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			initListeners();
		}
	});

	new LiTemplate({
		isIndex: false,
		title: 'h5上传之webUploader'
	});
	
	var UITools = require('UITools_Core');
	var UploadH5Tools = require('UpLoadH5Tools_Core');

	/**
	 * @description 监听
	 */
	function initListeners() {
		
		//提示
		mui('.mui-content').on('tap', '#btn-uploader', function() {
			console.log("上传");
			var oFile = document.getElementById('testInput').files[0];
			if(!oFile){
				console.error("选择文件不能为空");
				return ;
			}
			UploadH5Tools.upLoadFiles({
				url:'http://115.29.151.25:8012/webUploaderServer/testupload.php',
				//url:'http://218.4.136.118:8086/mockjs/55/testUpload',
				//url:'http://115.29.151.25:8012/webUploaderServer/fileupload.php',
				data: {
					'extra':'11'
				},
				files: [{
					name:'fileImage',
					file:oFile
				}],
				beforeUploadCallback:function(){
					console.log("准备上传");
					document.getElementById('tips').innerHTML = '准备上传';
				},
				successCallback:function(response,detail){
					console.log("上传成功:"+JSON.stringify(response));
					console.log("detail:"+detail);
					document.getElementById('tips').innerHTML = detail;
					UITools.alert("上传成功:"+JSON.stringify(detail));
				},
				errorCallback:function(msg,detail){
					console.log("上传失败:"+msg);
					console.log("detail:"+detail);
					document.getElementById('tips').innerHTML = detail;
					UITools.alert("上传失败:"+JSON.stringify(detail));
				},
				uploadingCallback:function(percent,msg,speed){
					console.log("上传中:"+percent+',msg:'+msg+',speed:'+speed);
					
				}
			});
		});
	}
});