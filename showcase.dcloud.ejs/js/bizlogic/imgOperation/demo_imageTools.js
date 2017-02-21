/**
 * 作者: dailc
 * 时间: 2016-05-25 
 * 描述: 图片操作工具展示-包括选择图片,摄像等 
 */
define(function(require, exports, module) {
	"use strict";

	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			initData();
		}
	});

	new LiTemplate({
		isIndex: false,
		title: '图片操作相关',
		jsFiles: ['css/libs/mui.previewimage.css',
			//图片预览的js,依赖于zoom
			'js/libs/mui.zoom.js',
			'js/libs/mui.previewimage.js'
		]
	});
	var CommonTools = require('CommonTools_Core');
	var WindowTools = require('WindowTools_Core');

	//记录附件
	var attachfileItems = {};
	var attachfileArray = [];

	/**
	 * @description 重新计算文件数组
	 */
	function caculateFileArray() {
		attachfileArray = [];
		for(var item in attachfileItems) {
			attachfileItems[item] && attachfileArray.push(attachfileItems[item]);
		}
	}
	/**
	 * @description 初始化数据,结合initReady使用
	 * plus情况为plusready
	 * 其它情况为直接初始化
	 */
	function initData() {
		//初始化预览
		mui.previewImage();
		initListeners();
	}

	/**
	 * @description 添加图片
	 * @param {String} b64
	 */
	function appendImgFileByB64(b64, file) {
		var uuid = CommonTools.uuid();
		attachfileItems[uuid] = {
			name: 'file' + uuid,
			file: file
		};
		caculateFileArray();
		//添加图片预览
		appendImg(b64, uuid);
	}
	/**
	 * @description 添加图片有关,获得图片模板
	 *  @param {String} path 路径
	 * @param {String} uuid uuid
	 */
	function getImgHtmlByPath(path, uuid) {
		
		var imgLitemplate =
			'<div class="mui-pull-left pic-div add-img" uuid="' + uuid + '"><img class="img-photo"src="' + path + '" data-preview-src="" data-preview-group="1"/><div class="closeLayer "><img src="../../img/imgOperation/img_delete_error.png"class="plus-pic"/></div></div>';
		return imgLitemplate;
	};
	/**
	 * @description 将图片添加进入容器中显示
	 * @param {String} path 路径
	 * @param {String} uuid uuid
	 */
	function appendImg(path, uuid) {
		var html = getImgHtmlByPath(path, uuid);
		var dom = document.getElementById('img-group');
		WindowTools.dom.appendHtmlChildCustom(dom, html);
	}
	
	/**
	 * @description 监听
	 */
	function initListeners() {
		//关闭监听
		mui('#img-group').on('tap', '.closeLayer', function(e) {
			console.log("移除图片" + this.classList);
			var uuid = this.parentNode.getAttribute('uuid') || '';
			attachfileItems[uuid] = null;
			caculateFileArray();
			//移除
			var imgItemDom = this.parentNode;
			imgItemDom.parentNode.removeChild(imgItemDom);
			
			console.log("文件:"+JSON.stringify(attachfileArray));
		});
		//图片的+号监听
		mui('.img-container').on('tap', '#addImg', function(e) {
			if(e.target.classList && e.target.classList.contains('plus-pic')) {
				console.log("关闭");
				return;
			}
			console.log("添加");
			appendImgFileByB64('../../img/img_test.jpg');
		});

	}
});