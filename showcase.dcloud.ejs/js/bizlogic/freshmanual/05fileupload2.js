/**
 * 作者: dailc
 * 时间: 2017-01-16 
 * 描述:  新人手册->文件上传示例
 * 
 * 最简单的文件上传-支持图片预览，兼容ejs模式
 */
define(function(require, exports, module) {
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	var UploadH5Tools = require('UpLoadH5Tools_Core');
	var FileTools = require('FileTools_Core');
	var WindowTools = require('WindowTools_Core');
	//全局的文件对象
	var fileAttaches = {};
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
		//设置文件选择
		setFilesSelect('#testInput');
		//关闭
		mui('#img-group').on('tap', '.closeLayer', function() {
			console.log("移除图片" + this.classList);
			//移除
			var imgItemDom = this.parentNode;
			imgItemDom.parentNode.removeChild(imgItemDom);
			var uuid = imgItemDom.getAttribute('data-uuid');
			removeFile(uuid);
		});
		//关闭监听
		mui('.img-container').on('tap', '.closeLayer', function(e) {
			console.log("移除图片" + this.classList);
			//移除
			var imgItemDom = this.parentNode;
			imgItemDom.parentNode.removeChild(imgItemDom);
		});
		//图片的+号监听
		mui('.img-container').on('tap', '#addImg', function(e) {
			if(e.target.classList && e.target.classList.contains('plus-pic')) {
				return;
			}
			document.getElementById('testInput').click();
		});
		//上传按钮监听
		mui('.mui-content').on('tap', '#btn-uploader', function() {
			uploadFiles();
		});
	}
	/**
	 * @description 设置文件选择
	 * @param {HTMLElement||String} dom
	 */
	function setFilesSelect(dom) {
		//设置文件选择为图片,相册选择
		FileTools.setSelectImageCameraFromDisks(dom, function(b64, file) {
			console.log("选择:" + file);
			appendImgFileByB64(b64,file);
		}, {
			isMulti: false
		});
	}
	/**
	 * @description 上传文字
	 */
	function uploadFiles() {
		var oFile = document.getElementById('testInput').files[0];
		if(!oFile) {
			console.error("选择文件不能为空");
			mui.alert('选择文件不能为空');
			return;
		}
		var fileArray = [];
		for(var item in fileAttaches) {
			fileAttaches[item]&&fileArray.push(fileAttaches[item]);
		}
		UploadH5Tools.upLoadFiles({
			url: 'http://115.29.151.25:8012/webUploaderServer/testupload.php',
			//url: 'http://192.168.114.35:8016/webUploaderServer/testupload.php',
			//url:'http://218.4.136.118:8086/mockjs/55/testUpload',
			//url:'http://115.29.151.25:8012/webUploaderServer/fileupload.php',
			data: {
				'extra': '11'
			},
			files: fileArray,
			beforeUploadCallback: function() {
				console.log("准备上传:"+JSON.stringify(fileArray));
				setTips("准备上传");
			},
			successCallback: function(response, detail) {
				console.log("上传成功:" + JSON.stringify(response));
				console.log("detail:" + detail);
				setTips(detail);
			},
			errorCallback: function(msg, detail) {
				console.log("上传失败:" + msg);
				console.log("detail:" + detail);
				setTips(detail);
			},
			uploadingCallback: function(percent, msg, speed) {
				console.log("上传中:" + percent + ',msg:' + msg + ',speed:' + speed);

			}
		});
	}
	/**
	 * @description 添加图片
	 * @param {String} b64
	 */
	function appendImgFileByB64(b64, file) {
		var uuid = CommonTools.uuid();
		file = file || null;
		//添加图片
		fileAttaches[uuid] = {
			name: 'file' + uuid,
			file: file
		};
		//添加图片预览
		appendImg(b64, uuid);
	}
	/**
	 * @description 将图片添加进入容器中显示
	 * @param {String} path 路径
	 * @param {Number} uuid 文件uuid
	 */
	function appendImg(path, uuid) {
		var html = getImgHtmlByPath(path, uuid);
		var dom = document.getElementById('img-group');
		WindowTools.dom.appendHtmlChildCustom(dom, html);
	}
	/**
	 * @description 添加图片有关,获得图片模板
	 *  @param {String} path 路径
	 * @param {String} uuid 文件uuid
	 */
	function getImgHtmlByPath(path, uuid) {
		var imgLitemplate =
			'<div class="mui-pull-left pic-div add-img" data-uuid="' + uuid + '"><img class="img-photo"src="' + path + '" data-preview-src="" data-preview-group="1"/><div class="closeLayer "><img src="../../img/imgOperation/img_delete_error.png"class="plus-pic"/></div></div>';
		return imgLitemplate;
	};
	
	/**
	 * @description 移除文件
	 * @param {String} uuid 文件uuid
	 */
	function removeFile(uuid) {
		fileAttaches[uuid] = null;
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