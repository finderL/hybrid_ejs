/**
 * @description  UITools
 * @author dailc
 * @version 4.0
 * @time 2017-01-18
 * 这个工具是使用插拔式对  ejs进行拓展
 * 不会覆盖以前的ejs功能，只是针对h5下做增强
 */
define(function(require, exports, module) {
	"use strict";
	var CommonTools = require('CommonTools_Core');
	var ejs = require('Ejs_Core');

	function extendFucObj(moduleName, obj) {
		ejs.extendFucObj(moduleName, obj);
		for(var item in obj) {
			//对外暴露api
			exports[item] = obj[item];
		}
	}
	//单例对话框对象 h5情况
	var h5DialogObj = null;
	/**
	 * h5的 waiting dialog模块
	 */
	(function(obj) {
		obj.showWaiting = function(title, options) {
			return new H5WaitingDialog(title, options);
		};
		/**
		 * @description h5版本waiting dialog的构造方法
		 * @constructor
		 */
		function H5WaitingDialog(title, options) {
			//h5版本,构造的时候生成一个dialog
			this.loadingDiv = createLoading();
			document.body.appendChild(this.loadingDiv);
			this.setTitle(title);
			if(options && options.padlock == true) {
				//如果设置了点击自动关闭
				var that = this;
				this.loadingDiv.addEventListener('click', function() {
					that.close();
				});
			}
		};
		/**
		 * @description 设置提示标题方法,重新显示
		 */
		H5WaitingDialog.prototype.setTitle = function(title) {
			title = title || '';
			if(this.loadingDiv) {
				//只有存在对象时才能设置
				this.loadingDiv.style.display = 'block';
				this.loadingDiv.querySelector('.tipsContent').innerText = title;
			} else {
				console.error('h5 dialog对象已经销毁,无法再次显示');
			}
		};
		/**
		 * @description 关闭后执行的方法,这里只是为了扩充原型
		 */
		H5WaitingDialog.prototype.onclose = function() {

		};
		/**
		 * @description 设置关闭dialog
		 */
		H5WaitingDialog.prototype.close = function() {
			if(this.loadingDiv) {
				this.loadingDiv.style.display = 'none';
				this.onclose();
			}
		};
		/**
		 * @description 销毁方法
		 */
		H5WaitingDialog.prototype.dispose = function() {
			//将loadingDiv销毁
			this.loadingDiv && this.loadingDiv.parentNode && this.loadingDiv.parentNode.removeChild(this.loadingDiv);
		};
		/**
		 * @description 通过div和遮罩,创建一个H5版本loading动画(如果已经存在则直接得到)
		 * 基于mui的css
		 */
		function createLoading() {
			var loadingDiv = document.getElementById("MFRAME_LOADING");
			if(!loadingDiv) {
				//如果不存在,则创建
				loadingDiv = document.createElement("div");
				loadingDiv.id = 'MFRAME_LOADING';
				loadingDiv.className = "mui-backdrop mui-loading";
				//自己加了些样式,让loading能够有所自适应,并且居中
				loadingDiv.innerHTML = '<span class=" mui-spinner mui-spinner-white" style=" width: 20%;height: 20%;max-width:46px;max-height: 46px;position:absolute;top:46%;left:46%;"></span><span class="tipsContent" style="position:absolute;font-size: 14px;top:54%;left:46%;text-align: center;">加载中...</span>';
			}
			return loadingDiv;
		};
	})(exports.h5WaitingDialog = {});

	//actionsheet
	(function() {
		function createActionSheetH5(options) {
			options = options || {};
			var finalHtml = '';
			var idStr = options.id ? 'id="' + options.id + '"' : '';
			finalHtml += '<div ' + idStr + ' class="mui-popover mui-popover-action mui-popover-bottom">';
			//加上title
			if(options.title) {
				finalHtml += '<ul class="mui-table-view">';
				finalHtml += '<li class="mui-table-view-cell">';
				finalHtml += '<a class="titleActionSheet"><b>' + options.title + '</b></a>';
				finalHtml += '</li>';
				finalHtml += '</ul>';
			}
			finalHtml += '<ul class="mui-table-view">';
			//添加内容
			if(options.items && Array.isArray(options.items)) {
				for(var i = 0; i < options.items.length; i++) {
					var title = options.items[i] || '';
					finalHtml += '<li class="mui-table-view-cell">';

					finalHtml += '<a >' + title + '</a>';

					finalHtml += '</li>';
				}
			}
			finalHtml += '</ul>';
			//加上最后的取消
			finalHtml += '<ul class="mui-table-view">';
			finalHtml += '<li class="mui-table-view-cell">';
			finalHtml += '<a class="cancelActionSheet"><b>取消</b></a>';
			finalHtml += '</li>';
			finalHtml += '</ul>';

			//补齐mui-popover
			finalHtml += '</div>';
			return finalHtml;
		};
		//基于options 创建h5 actionsheet
		exports.createActionSheetShow = function(options, callback) {
			options.id = options.id || 'defaultActionSheetId';
			var html = createActionSheetH5(options);
			//console.log('添加html:'+html);
			if(document.getElementById('actionSheetContent') == null) {
				//不重复添加
				var wrapper = document.createElement('div');
				wrapper.id = 'actionSheetContent';
				wrapper.innerHTML = html;
				document.body.appendChild(wrapper);
				mui('body').on('shown', '.mui-popover', function(e) {
					//console.log('shown:'+e.detail.id, e.detail.id); //detail为当前popover元素
				});
				mui('body').on('hidden', '.mui-popover', function(e) {
					//console.log('hidden:'+e.detail.id, e.detail.id); //detail为当前popover元素
				});
				//监听
				mui('body').on('tap', '.mui-popover-action li>a', function(e) {
					var title = this.innerText;

					//console.log('class:' + mClass);
					//console.log('点击,title:' + title + ',value:' + value);
					if(this.className.indexOf('titleActionSheet') == -1) {
						//排除title的点击
						mui('#' + options.id).popover('toggle');
						if(this.className.indexOf('cancelActionSheet') == -1) {
							//排除取消按钮,回调函数
							callback && callback(title);
						}
					}
				});
			} else {
				//直接更改html
				document.getElementById('actionSheetContent').innerHTML = html;
			}
			//显示actionsheet
			mui('#' + options.id).popover('toggle');
		};
	})();

	//所有参数和ejs保持一致就行了
	extendFucObj('nativeUI', {
		'toast': function(options) {
			if(CommonTools.os.ejs) {
				return;
			}
			var msg = '';
			options = options || {};
			if(typeof options === 'string') {
				msg = options;
			} else {
				msg = options.message;
			}
			//非ejs环境
			if(!CommonTools.os.ejs) {
				mui.toast(msg);
			}
		},
		'alert': function(options) {
			if(CommonTools.os.ejs) {
				return;
			}
			var title = '',
				msg = '';
			options = options || {};
			if(typeof options === 'string') {
				msg = options;
				title = arguments[1] || '';
			} else {
				msg = options.message;
				title = options.title;
			}
			//非ejs环境
			if(!CommonTools.os.ejs) {
				mui.alert(msg, title);
			}
		},
		'confirm': function(options, callback) {
			if(CommonTools.os.ejs) {
				return;
			}
			options = options || {};
			if(typeof options === 'string') {
				options = {
					'message': options
				};
				if(typeof arguments[1] === 'string') {
					options.title = arguments[1];
					callback = arguments[2];
				}
			}
			var btnArray = [];
			var btn1 = options.btn1 || '取消';
			var btn2 = options.btn2 || (options.btn2 !== null ? '确定' : '');
			btn1 && btnArray.push(btn1);
			btn2 && btnArray.push(btn2);

			mui.confirm(options.message || '', options.title, btnArray, function(e) {
				//index得转成ejs相应的index
				var index = -1 * (e.index + 1);
				var res = {
					'code': 1,
					'msg': '',
					'result': {
						"which": index
					}
				};
				callback && callback(res.result, res.msg, res);
			});
		},
		'prompt': function(options, callback) {
			if(CommonTools.os.ejs) {
				return;
			}
			options = options || {};
			options['text'] = options['text'] || '';
			options['title'] = options['title'] || '您好';
			options['hint'] = options['hint'] || '请输入内容';
			//目前只有h5中支持定制button
			options['buttons'] = options['buttons'] || ['确定', '取消'];

			mui.prompt(options['text'], options['hint'], options['title'], options['buttons'], function(e) {
				//index得转成ejs相应的index
				var index = -1 * (e.index + 1);
				var res = {
					'code': 1,
					'msg': '',
					'result': {
						"which": index,
						"content": e.value
					}
				};
				callback && callback(res.result, res.msg, res);
			})

		},
		'actionSheet': function(options, callback) {
			if(CommonTools.os.ejs) {
				return;
			}
			options = options || {};
			options.items = options.items || [];
			exports.createActionSheetShow(options, function(title) {
				var index = options.items.indexOf(title);
				var res = {
					'code': 1,
					'msg': '',
					'result': {
						"which": index,
						"content": title
					}
				};
				callback && callback(res.result, res.msg, res);
			});
		},
		//ejs下暂时没有title与options属性这个属性
		//padlock  点击自动关闭--目前只有这个兼容h5版本
		'showWaiting': function(title, options) {
			if(CommonTools.os.ejs) {
				return;
			}
			title = title || '';
			if(h5DialogObj == null) {
				h5DialogObj = exports.h5WaitingDialog.showWaiting(title, options);
			} else {
				h5DialogObj.setTitle(title);
			}
			return h5DialogObj;
		},
		'closeWaiting': function() {
			if(CommonTools.os.ejs) {
				return;
			}
			if(h5DialogObj) {
				h5DialogObj.dispose();
				h5DialogObj = null;
			}
		},
		'showMask':function(){
			
		},
		'hideMask':function(){
			
		},
	});
});