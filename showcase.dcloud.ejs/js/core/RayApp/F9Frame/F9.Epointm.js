/**
 * 作者: dailc
 * 时间: 2017-02-08
 * 描述:  f9移动端适配文件
 */
define(function(require, exports, module) {
	"use strict";
	var UITools = require('UITools_Core'),
		MControl = require('MControl_F9');
	var isRestFul = false;
	var rootUrl;
	var actionUrl = '',restFulUrl = '';
	rootUrl = isRestFul?restFulUrl:actionUrl;
	
	//通用工具方法
	(function(win) {
		var epm = {
			// 保存所有new出来的mui组件，用id作为索引
			components: {},
			idIndex: 0,
			generateId: function(pre) {
				return(pre || 'epm-') + this.idIndex++;
			},
			// 根据id获取mui组件实例，主要用于commondto中实现建立页面dom元素与实际mui组件的联系
			get: function(id) {
				return epm.components[id] || null;
			},
			set: function(id, control) {
				this.components[id] = control;
			},
			// 显示遮罩
			showMask: function() {
				UITools.showMask();
			},
			// 关闭遮罩
			hideMask: function() {
				UITools.hideMask();
			},
			// 处理二次请求返回的数据
			getSecondRequestData: function(data) {
				var status = data.status;

				// 处理后台返回的状态码
				if(status) {
					var code = parseInt(status.code),
						text = status.text,
						url = status.url;

					if(code >= 300) {
						if(url) {
							win.location.href = this.getRightUrl(url);
						} else {
							UITools.alert(text, '提示', '我知道了');
						}
						return;
					}

				}

				if(data.controls) {
					data = data.controls[0];
				}

				return data;

			},
			// TODO: 应返回配置的服务器端地址 + 是否需要/rest/
			// 返回完整的WebContent根路径
			getRootPath: function() {
//				var loc = window.location,
//					host = loc.hostname,
//					protocol = loc.protocol,
//					port = loc.port ? (':' + loc.port) : '',
//					path = (window._rootPath !== undefined ? _rootPath : ('/' + loc.pathname.split('/')[1])) + '/';
//
//				var rootPath = protocol + '//' + host + port + path;

//				return rootPath;

				return rootUrl;
			},

			// 返回适合的url
			// 1.url为全路径，则返回自身
			// 2.url为，则返回自身
			// 3.url为WebContent开始的路径，则补全为完整的路径
			getRightUrl: function(url) {
				if(!url) return '';

				// 是否是相对路径
				var isRelative = url.indexOf('./') != -1 || url.indexOf('../') != -1;

				// 全路径、相对路径直接返回
				if(/^(http|https|ftp)/g.test(url) || isRelative) {
					url = url;
				} else {
					url = this.getRootPath() + url;
				}

				return url;
			},

			_pageLoagding: document.querySelector('body>.page-loading'),

			hidePageLoading: function() {
				if(this._pageLoagding && this._pageLoagding.length) {
					document.body.removeChild(this._pageLoagding[0]);
					this._pageLoagding = undefined;
				}
			},
			// 解析配置参数
			// 不用JSON.parse的方法是因为JSON.parse方法要求参数为严格的json格式
			// 而控件的配置参数我们之前是可以不加引号或用单引号的
			parseJSON: function(str) {
				return eval("(" + str + ")");
			},
			// 获取class为cls的最近父元素
			closest: function(dom, cls) {
				if(!dom || !cls) {
					return;
				}
				var parent = dom.parentNode,
					className = parent.className;

				if((' ' + className + ' ').indexOf(' ' + cls + ' ') >= 0) {
					return parent;
				} else if(parent.tagName === 'BODY') {
					return;
				} else {
					return this.closest(parent, cls);
				}
			}
		};

		win.epm = epm;
	})(window);

	//epointm内容
	(function() {
		// 先初始化页面上的控件
		MControl.init(function(control) {
			if(control.type == 'datagrid') {
				control.onGetRequestData = function() {
					// 获取自己的数据模型
					var data = new CommonDto(this.id).getData(true);
					data[0].isSecondRequest = true;

					// 拼上额外数据
					if(this.extraId) {
						data = data.concat(new CommonDto(this.extraId).getData(true));
					}

					return {
						commonDto: JSON.stringify(data)
					};
				};
			}
		});

		function dealUrl(url, isCommondto) {
			/*
	         * 不用加上页面路径了，移动端和pc端的页面路径是不一样的，而且有没有页面路径对于后台来说都是一样的
	         *
	        // action形式的url需要加上页面路径
	        // 例如在 "/pages/login/login.xhtml"中，url为"login.autoLoad"
	        // 则url会转换为 "/pages/login/login.autoLoad"
	         url = getRequestMapping() + '/' + url;
	         */

			// TODO: 应根据配置项决定是否需要将"a.b"类型的url转化为"a/b"
			// 将"a.b"类型的url转化为"a/b"
			//restFul形式才需要转换
			if(isRestFul&&url.indexOf('.') != -1 && url.indexOf('.jspx') == -1) {
				url = url.replace('.', '/');

			}
			// 加上页面地址中的请求参数
			var all = window.location.href;
			var index = all.indexOf('?');
			var hasParam = url.indexOf('?') > -1;

			if(index != -1) {
				if(hasParam) {
					url += '&' + all.substring(index + 1);
				} else {
					url += '?' + all.substring(index + 1);
				}

				if(isCommondto) {
					// 加上isCommondto标识
					// 用来给后台区分与其他不是通过epoint中的三个方法发送的请求
					url += '&isCommondto=true';
				}

			} else if(isCommondto) {
				if(hasParam) {
					url += '&isCommondto=true';
				} else {
					url += '?isCommondto=true';
				}
			}

			url = epm.getRightUrl(url);

			return url;
		}

		// 属性扩展
		var extendAttr = function(base, attrs) {
			for(var key in attrs) {
				if(attrs[key]) {
					base[key] = attrs[key];
				}
			}
		};

		var CommonDto = function(scope, action, initHook, initControl) {
			this.controls = {};

			// 页面action，用于拼接url
			this.action = action;
			this.initHook = initHook;

			var self = this;
			var i, l;

			var controls = [];

			function getControls(scope) {
				var $scope = mui('#' + scope);

				if($scope[0] && /ep-mui-\w*/g.test($scope[0].className)) {
					// 有以"ep-mui-"开头的class，说明它本身就是要处理的控件，直接返回其本身
					// 不考虑有控件嵌套的情况
					return $scope;
				} else {
					return mui('[class^="ep-mui-"]', $scope);
				}
			}

			if(scope != '@none') {
				if(!scope || scope === '@all') {
					controls = mui('[class^="ep-mui-"]');
				} else {
					if(Array.isArray(scope)) {
						for(i = 0, l = scope.length; i < l; i++) {
							controls = controls.concat(getControls(scope[i]));

						}
					} else {
						controls = controls.concat(getControls(scope));
					}
				}
			}

			for(i = 0, l = controls.length; i < l; i++) {
				var control = controls[i],
					mcontrol = epm.get(control.id);

				if(mcontrol) {
					self.controls[mcontrol.id] = mcontrol;

					// 根据控件action设置控件的url
					// 主要用于有二次请求的控件（表格）
					if(initControl && mcontrol.action && mcontrol.setUrl) {
						mcontrol.setUrl(dealUrl(this.action + '.' + mcontrol.action));
					}
				}
			}
		};

		CommonDto.prototype = {
			constructor: CommonDto,

			/*
			 * 获取控件数据
			 * @params original 控制是否返回原始数据，返回原始数据是为了方便外部操作控件字段
			 */
			getData: function(original) {
				var data = [],
					control;

				// 遍历所有控件
				for(var id in this.controls) {
					control = this.controls[id];

					data.push(control.getModule());

				}

				if(original) {
					return data;
				} else {
					return {
						commonDto: JSON.stringify(data)
					};
				}

			},

			setData: function(data, customData) {
				var id, control, item;
				for(var i = 0, l = data.length; i < l; i++) {
					item = data[i];

					id = item.id;
					control = this.controls[id];
					if(!control) {
						continue;
					}

					if(item.value !== undefined && control.setValue) {
						control.setValue(item.value);
					}
					if(item.data && control.setData) {
						control.setData(item.data);

						if(item.total && control.setTotal) {
							control.setTotal(item.total);
						}
					}

					if(this.initHook) {
						this.initHook.call(this, control, item, customData);
					}
				}
			},
			init: function(opts) {
				var self = this,
					data = this.getData();

				if(opts.params) {
					data.cmdParams = opts.params;
				}
				if(!opts.notShowLoading) {
					epm.showMask();
				}
				mui.ajax({
					// url在传入前外部已处理
					url: opts.url,
					type: opts.method || "post",
					dataType: 'json',
					data: data,
					success: function(data) {
						var status = data.status,
							controls = data.controls,
							custom = data.custom || '',

							code = parseInt(status.code),
							text = status.text,
							url = status.url;

						if(code >= 300) {
							if(url) {

								url = epm.getRightUrl(url);
								if(status.top) {
									top.window.location.href = url;
								} else {
									window.location.href = url;

								}
							} else {

								if(opts.fail) {
									opts.fail.call(self, text, status);

								} else {
									UITools.alert({
										message: text,
										title: '提示',
										buttonValue: '我知道了'
									});
								}

							}
						} else if(code >= 200) {
							controls.length && self.setData(controls, custom);

							opts.done && opts.done.call(self, custom);
						}

					},
					complete: function() {
						if(!opts.notShowLoading) {
							epm.hideMask();
						}

					}
				});

			}

		};

		var epointm = {
			/**
			 * 初始化页面
			 *
			 * @param url ajax请求地址(如果不传，默认为page_Load)
			 * @param ids  要回传的页面元素id，是个数组['tree', 'datagrid1']
			 * @param callback 回调事件
			 * @param opt 其他参数
			 *        isPostBack 是否是回传，默认为false
			 *        keepPageIndex 是否停留在当前页码 默认为false
			 *        initHook: 初始化时控件在setValue后的回调
			 */
			initPage: function(url, ids, callback, fail, opt) {
				var initHook;
				if(typeof fail === 'object' && opt === undefined) {
					opt = fail;
					fail = undefined;
				}

				opt = opt || {};
				if(typeof opt == 'function') {
					initHook = opt;
					opt = {};
				} else {
					initHook = opt.initHook;
				}

				var urlArr = url.split('?'),
					subUrl = urlArr[0],
					urlParam = urlArr[1];

				var len = subUrl.indexOf('.'),
					action = (len > 0 ? subUrl.substr(0, len) : subUrl);

				if(!this.getCache('action')) {
					this.setCache('action', action);
					this.setCache('urlParam', urlParam);
					this.setCache('callback', callback);

				}
				if(len < 0) {
					subUrl += ".page_Load";
				}

				url = subUrl + (urlParam ? '?' + urlParam : '');

				var params;
				if(ids && ids.constructor === Object) {
					params = ids;
					ids = undefined;
				}

				// 在new CommonDto时是否需要初始化控件与action相关的属性
				// 一般只需要在initPage方法中初始化，其他方法不需要
				var initControl = opt.initControl;
				if(initControl === undefined) {
					initControl = true;
				}

				//加载页面数据
				var commonDto = new CommonDto(ids, action, initHook, initControl);

				commonDto.init({
					url: dealUrl(url, true),
					params: params,
					done: function(data) {
						if(callback) {
							callback.call(this, data);
						}

						if(window.epoint_afterInit) {
							window.epoint_afterInit(data);
						}

						// 初始化完后隐藏pageloading
						epm.hidePageLoading();
					},
					fail: fail
				});
			},

			/**
			 * 刷新页面
			 *
			 * @param ids  要回传的页面元素id，是个数组['tree', 'datagrid1'],如果不传，默认为整个form
			 * @param callback 回调事件
			 */
			refresh: function(ids, callback) {
				var url = this.getCache('action') + '.page_Refresh';

				var urlParam = this.getCache('urlParam');

				if(urlParam) {
					url += '?' + urlParam;
				}

				if(typeof ids == 'function') {
					callback = ids;
					ids = '@all';
				}

				callback = callback || this.getCache('callback');

				this.initPage(url, ids, callback, {
					initControl: false
				});
			},

			/**
			 * 提交表单数据
			 *
			 * @param url ajax请求地址
			 * @param ids  要回传的页面元素id，是个数组['tree', 'datagrid1'],如果不传，默认为整个form
			 * @param callback 回调事件
			 * @param notShowLoading 是否不显示loading效果
			 */
			execute: function(url, ids, params, callback, notShowLoading) {
				var action,
					index = url.indexOf('.');

				// url不带'.'，则表示没带action，则自动加上initPage时的action
				if(index < 0) {
					action = this.getCache('action');

					url = action + '.' + url;
				} else {
					action = url.substr(0, index);
				}
				var commonDto = new CommonDto(ids, action);
				if(typeof params == 'function') {
					callback = params;
					params = null;
				}

				commonDto.init({
					url: dealUrl(url, true),
					params: (params ? (typeof params == 'string' ? params : mini.encode(params)) : null),
					done: callback,
					notShowLoading: notShowLoading
				});
			},

			alert: function(message, title, callback) {
				UITools.alert({
					content: message,
					title: title
				}, function() {
					if(callback) {
						callback();
					}
				});
			},

			confirm: function(message, title, okCallback, cancelCallback) {
				UITools.confirm({
					content: message,
					title: title,
					buttons: ['确定', '取消']
				}, function(index) {
					// 确定
					if(index === 0 && okCallback) {
						okCallback();
					} else if(cancelCallback) {
						cancelCallback();
					}
				});
			},

			// 在epoint上增加缓存操作
			_cache: {},

			setCache: function(key, value) {
				this._cache[key] = value;
			},

			getCache: function(key) {
				return this._cache[key];
			},

			delCache: function(key) {
				this._cache[key] = null;
				delete this._cache[key];
			}
		};

		exports.epointm = window.epointm = epointm;
	})();

});