/**
 * @description  window 操作相关工具 
 * @author dailc
 * @version 4.0
 * @time 2017-01-18
 */
define(function(require, exports, module) {
	var CommonTools = require('CommonTools_Core');
	//屏幕分辨率相关
	(function(exports) {
		/**
		 * @description 获取滚动条在Y轴上的滚动距离
		 * @return {Number} 返回具体距离
		 */
		exports.getScrollTop = function() {
			var scrollTop = 0,
				bodyScrollTop = 0,
				documentScrollTop = 0;
			if(document.body) {
				bodyScrollTop = document.body.scrollTop || 0;
			}
			if(document.documentElement) {
				documentScrollTop = document.documentElement.scrollTop || 0;
			}
			scrollTop = (bodyScrollTop > documentScrollTop) ? bodyScrollTop : documentScrollTop;
			return scrollTop;
		}

		/**
		 * @description 获取文档的总高度
		 * @return {Number} 返回具体高度
		 */
		exports.getScrollHeight = function() {
			var scrollHeight = 0,
				bodyScrollHeight = 0,
				documentScrollHeight = 0;
			if(document.body) {
				bodyScrollHeight = document.body.scrollHeight;
			}

			if(document.documentElement) {
				documentScrollHeight = document.documentElement.scrollHeight;
			}
			scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
			return scrollHeight;
		};
		/**
		 * @description 浏览器视口的高度
		 * @return {Number} 返回具体高度
		 */
		exports.getWinHeight = function() {
			var windowHeight = 0;
			if(document.compatMode == "CSS1Compat") {
				windowHeight = document.documentElement.clientHeight;
			} else {
				windowHeight = document.body.clientHeight;
			}
			return windowHeight;
		};
		/**
		 * @description 浏览器视口的宽度
		 * @return {Number} 返回具体宽度
		 */
		exports.getWinWidth = function() {
			var windowWidth = 0;
			if(document.compatMode == "CSS1Compat") {
				windowWidth = document.documentElement.clientWidth;
			} else {
				windowWidth = document.body.clientWidth;
			}
			return windowWidth;
		};
		/**
		 * @description 得到窗口的宽和高,返回JSON配对
		 * @return {JSON} 返回配对{width:0,height:0}
		 * @example 常用于h5中
		 */
		exports.getWinSize = function() {
			var client = {
				width: 0,
				height: 0
			};

			if(typeof document.compatMode != 'undefined' && document.compatMode == 'CSS1Compat') {
				client.width = document.documentElement.clientWidth;
				client.height = document.documentElement.clientHeight;
			} else if(typeof document.body != 'undefined' && (document.body.scrollLeft || document.body.scrollTop)) {
				client.width = document.body.clientWidth;
				client.height = document.body.clientHeight;
			}

			return client;
		};
		/**
		 * @description 获取元素的宽度
		 */
		exports.getElW = function(elem) {
			elem = app.dom.getDom(elem);
			return elem.offsetWidth;
		};
		/**
		 * @description 获取元素的高度
		 */
		exports.getElH = function(elem) {
			elem = app.dom.getDom(elem);
			return elem.offsetHeight;
		};
	})(exports.dimensions = {});
	//offset模块
	(function(exports) {
		exports.getTop = function(elem) {
			elem = app.dom.getDom(elem);
			return elem.offsetParent ? (elem.offsetTop + exports.getTop(elem.offsetParent)) : elem.offsetTop;
		};
		exports.getLeft = function(elem) {
			elem = app.dom.getDom(elem);
			return elem.offsetParent ? (elem.offsetLeft + exports.getLeft(elem.offsetParent)) : elem.offsetLeft;
		};
		exports.getOffset = function(elem) {
			elem = app.dom.getDom(elem);
			return {
				left: exports.getLeft(elem),
				top: exports.getTop(elem),
			};
		};
	})(exports.offset = {});

	//html相关
	(function(exports) {
		/**
		 * @description 得到子元素的个数  目标必须是html dom对象
		 * @param {HTMLElement} targetObj 必须是原生dom对象
		 */
		exports.getChildElemLength = function(targetObj) {
			if(!(targetObj instanceof HTMLElement)) {
				return 0;
			}
			return targetObj.children.length;
		};
		/**
		 * @description 将string字符串转为html对象,默认创一个div填充
		 * @param {String} strHtml 目标字符串
		 * @return {HTMLElement} 返回处理好后的html对象,如果字符串非法,返回null
		 */
		exports.pareseStringToHtml = function(strHtml) {
			if(strHtml == null || typeof(strHtml) != "string") {
				return null;
			}
			//创一个灵活的div
			var i, a = document.createElement("div");
			var b = document.createDocumentFragment();
			a.innerHTML = strHtml;
			while(i = a.firstChild) b.appendChild(i);
			return b;
		};
		/**
		 * @description给html对象添加子元素
		 * @param {HTMLElement} targetObj 目标dom，必须是原生对象
		 * @param {HTMLElement||String} childElem 目标html的字符串或者是dom对象
		 */
		exports.appendHtmlChildCustom = function(targetObj, childElem) {
			if(typeof targetObj === 'string') {
				targetObj = document.querySelector(targetObj);
			}
			if(targetObj == null || childElem == null || !(targetObj instanceof HTMLElement)) {
				return;
			}
			if(childElem instanceof HTMLElement) {
				targetObj.appendChild(childElem);
			} else {
				//否则,创建dom对象然后添加
				var tmpDomObk = exports.pareseStringToHtml(childElem);
				if(tmpDomObk != null) {
					targetObj.appendChild(tmpDomObk);
				}
			}
		};
		/**
		 * @description 在一段字符串中屏蔽脚本
		 * 为了安全起见 所有的富文本都会屏蔽脚本
		 * @param {String} content 富文本字符串
		 */
		exports.ShiedScript = function(content) {
			content = content || '';
			/**
			 * 先去除obj
			 */
			content = content.replace(new RegExp('<object[^]*>[\\s\\S]*?</' + 'object>', 'gi'), '');
			return content.replace(new RegExp('<script[^]*>[\\s\\S]*?</' + 'script>', 'gi'), '');
		};
		/**
		 * @description 处理包含富文本的htmldom中所有的
		 * <a>标签-将所有的href添加点击回调事件
		 * embed标签-插件相关
		 * script标签-这里是运行后才移除的,所以正常来说,添加为html之前就得去除脚本
		 * object标签
		 * img标签-将所有src中的资源路径换入data-img-localcache属性中,方便本地缓存图片
		 * @param {HTMLElement} complexTextDom 包含富文本的htmldom对象
		 * @param {Function} hrefClickCB href的点击下载回调,回调参数为对应的路径,下载地址
		 */
		exports.HandleComplexTextHtml = function(complexTextDom, hrefClickCB) {
			/**
			 * 先处理img
			 */
			var imgs = complexTextDom.querySelectorAll('img');
			//alert('富文本里面图片数目:'+imgs.length);
			CommonTools.each(imgs, function(key, value) {
				//获取src
				var srcStr = this.getAttribute('src');
				this.setAttribute('src', '');
				//默认处理的是data-img-localcache
				this.setAttribute('data-img-localcache', srcStr);
			});
			/**
			 * 处理<a>
			 */
			var alink = complexTextDom.querySelectorAll('a');
			//alert('富文本里面连接数目:'+alink.length);
			CommonTools.each(alink, function(key, value) {
				var hrefStr = this.getAttribute('href');
				//href设为空,然后target-link-url设为路径
				this.setAttribute('href', 'javascript:void(0)');
				this.setAttribute('target-link-url', hrefStr);
				//console.log('处理后的附件路径:'+hrefStr);
				this.addEventListener('click', function() {
					if(hrefClickCB && typeof(hrefClickCB) == 'function') {
						hrefClickCB(hrefStr);
					}
				});
			});
			/**
			 * 处理<embed>
			 */
			var embeds = complexTextDom.querySelectorAll('embed');
			//alert('富文本里面连接数目:'+alink.length);
			CommonTools.each(embeds, function(key, value) {
				var srcStr = this.getAttribute('src');
				this.setAttribute('src', '');
			});

			/**
			 * 屏蔽脚本 dom对象后
			 */
			var mediaObjs = complexTextDom.querySelectorAll('object');
			CommonTools.each(mediaObjs, function(key, value) {
				//移除
				this.parentNode.removeChild(this);
				//console.log('移除一个Object多媒体对象');
			});
		};
		/**
		 * @description 将一段字符串作为富文本html添加进入相应的dom中
		 * @param {HTMLElement} targetDom 目标dom,
		 * 可以是 #id形式或者是原生dom对象
		 * @param {String} complexStr 富文本字符串
		 * @param {Function} hrefClickCB href的点击回调,回调href的路径
		 */
		exports.appendComplexHtml = function(targetDom, complexStr, hrefClickCB) {
			if(!(targetDom instanceof HTMLElement)) {
				console.error('目标dom不为htmldom,添加错误');
				return;
			}
			complexStr = complexStr || '';
			complexStr = exports.ShiedScript(complexStr);
			exports.appendHtmlChildCustom(targetDom, complexStr);
			exports.HandleComplexTextHtml(targetDom, hrefClickCB);
		};
		/**
		 * @description 去除html标签中的换行符和空格
		 * @param {String} html html字符串
		 * @example 常用于h5中
		 */
		exports.clearHtml = function(html) {
			return html.replace(/(\r\n|\n|\r)/g, "")
				.replace(/[\t ]+\</g, "<")
				.replace(/\>[\t ]+\</g, "><")
				.replace(/\>[\t ]+$/g, ">");
		};
		/**
		 * @description 释放iframe所占内存，并从dom树中移除
		 * @param {HTMLElement} $Iframe Iframe的父节点
		 * @example 常用于h5中
		 */
		exports.clearIframe = function($Iframe) {
			var iframe = $Iframe[0];

			iframe.src = 'about:blank';

			// 跨域时无法获取iframe的contentWindow            
			try {
				iframe.contentWindow.document.write('');
				iframe.contentWindow.document.close();
			} catch(e) {}
			// 移除iframe
			try {
				iframe.parentNode.removeChild(iframe);
			} catch(e) {
				$Iframe.remove();
			}
		};
	})(exports.dom = {});

	//事件相关
	(function(exports) {
		/**
		 * 5+ event(5+没提供之前我自己实现)
		 * 接收到全局触发事件,之后触发事件
		 * @param {type} eventType
		 * @param {type} data
		 * @returns {undefined}
		 */
		exports.receive = function(eventType, data) {
			if(eventType) {
				try {
					if(data) {
						data = JSON.parse(data);
					}
				} catch(e) {}
				exports.trigger(document, eventType, data);
			}
		};
		/**
		 * @description trigger event,这里为h5的实现
		 * @param {HTMLElement} element 目标元素,默认为整个document
		 * @param {string} eventType
		 * @param {JSON} eventData 额外的数据
		 * @returns {Global}
		 */
		exports.trigger = function(element, eventType, eventData) {

			element.dispatchEvent(new CustomEvent(eventType, {
				detail: eventData,
				bubbles: true,
				cancelable: true
			}));
			return this;
		};
		/**
		 * @description 一些windowUtil带来的全局影响
		 * 1.自定义CustomEvent 事件
		 * 2.给每一个window加上一个id (H5PageId这个参数)
		 * 只要引用了WindowUtil就会有
		 */
		(function() {
			function CustomEvent(event, params) {
				params = params || {
					bubbles: false,
					cancelable: false,
					detail: undefined
				};
				//createEvent()方法返回新创建的Event对象，支持一个参数，表示事件类型，具体如下：
				//参数			事件接口	        初始化方法
				//HTMLEvents	HTMLEvent	initEvent()
				//MouseEvents	MouseEvent	initMouseEvent()
				//UIEvents		UIEvent		initUIEvent()

				var evt = document.createEvent('HTMLEvents');
				var bubbles = true;
				for(var name in params) {
					(name === 'bubbles') ? (bubbles = !!params[name]) : (evt[name] = params[name]);
				}
				evt.initEvent(event, bubbles, true);
				return evt;
			};
			CustomEvent.prototype = window.Event.prototype;
			if(typeof window.CustomEvent === 'undefined') {
				window.CustomEvent = CustomEvent;
			}

		})();
	})(exports.event = {});
	/**
	 * @description 获取url hash值
	 * 格式：#key1=val1|key2=val2|key3=val3
	 * @param {String} key
	 * @return {String} 返回对应的Hash值
	 * 
	 */
	exports.getHashParams = function(key) {
		var hash = location.hash.substr(1),
			arr = hash.split('|');

		var map = {};

		CommonTools.each(arr, function(i, item) {
			var tmp = item.split('=');
			map[tmp[0]] = tmp[1];
		});

		if(key) {
			return map[key];
		} else {
			return null;
		}
	};
	/**
	 * @description 设置url hash值-格式：#key=value
	 * @param {String} key
	 * @param {String} value
	 */
	exports.setUrlHash = function(key, value) {
		var loc = window.location;
		// key不存在，置空
		if(!key) {
			loc.hash = '';
			return;
		}
		window.location.hash = (key + '=' + value);
	};
	/**
	 * @description url是否属于外部url
	 * 以下规则，一律以新窗口打开，不再文档框架内部打开
	 * 第三方地址：http://xxx.xx
	 * @param {String} url
	 * @return {Boolean} 判断的结果
	 */
	exports.isExternalUrl = function(url) {
		if(/^(http|https|ftp|file)/g.test(url)) {
			return true;
		}
	};

	/**
	 * @description 通过传入key值,得到页面key的初始化传值
	 * plus情况为plus.webview.currentWebview.***
	 * h5情况为 window.location.href 中的参数的值
	 * @param {String} key
	 */
	exports.getExtraDataByKey = function(key) {
		if(!key) {
			return null;
		}
		var value = exports.getUrlParamsValue(window.location.href, key);
		if(value === 'undefined') {
			value = null;
		}
		return value;
	};
	/**
	 * @description 普通的html href通过传入参数名,得到对应的参数值
	 * @param {String} url 目标url
	 * @param {String} paramName 参数名
	 * @return {String} 返回对应的参数值
	 */
	exports.getUrlParamsValue = function(url, paramName) {
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		var paraObj = {}
		var i, j;
		for(i = 0; j = paraString[i]; i++) {
			paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
		}
		var returnValue = paraObj[paramName.toLowerCase()];
		//需要解码浏览器编码
		returnValue = decodeURIComponent(returnValue);
		if(typeof(returnValue) == "undefined") {
			return null;
		} else {
			return returnValue;
		}
	};
	/**
	 * @description 将参数添加到url中, 返回新的url
	 * @param {String} url
	 * @param {JSON} jsonObj
	 */
	exports.appendParams = function(url, jsonObj) {
		var baseWithSearch = url.split('#')[0];
		var hash = url.split('#')[1];
		//将jsonObj拼接到url上
		var extrasDataStr = '';
		if(jsonObj) {
			for(var item in jsonObj) {
				if(extrasDataStr.indexOf('?') == -1 && url.indexOf('?') == -1) {
					extrasDataStr += '?';
				} else {
					extrasDataStr += '&';
				}
				extrasDataStr += item + '=' + jsonObj[item];
			}
		}
		url = baseWithSearch + extrasDataStr;
		if(hash) {
			url += '#' + hash;;
		}

		return url;
	};

});