/**
 * 作者: 
 * 时间: 
 * 描述:  
 */
define(function(require, exports, module) {
	"use strict";

	var UITools = require('UITools_Core');
	var CommonTools = require('CommonTools_Core');
	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			init();
		}
	});

	new LiTemplate({
		isIndex: false,
		title: 'SSO授权回调页面',
		ejsApi: null
	});
	/**
	 * @description 初始化监听
	 */
	function initListeners() {
		mui('.mui-content').on('tap', '#btn-login', function() {
			redirectToOauth();
		});
	}
	/**
	 * @description 初始化
	 */
	function init() {
		var result = {
			"pageUrl": window.location.href,
			"code": ejs.app.getExtraDataByKey('code', true) || ''
		};

		var html = '';
		var litemplate = document.getElementById('userinfo-container').innerHTML;
		html = Mustache.render(litemplate, result);
		document.getElementById('userinfo-container').innerHTML = html;
		//result.code = "5b38ae7e73e9c0da6fffea8db6656435";
		console.log("code:" + result.code);
		ajaxToken(result.code);
		if(CommonTools.os.plus) {
			//alert('plus');
			var indexPage = plus.webview.getWebviewById(plus.runtime.appid);
			if(indexPage) {
				mui.fire(indexPage, 'success', {
					code: result.code
				});
				mui.toast('授权成功');
				setTimeout(function() {
					ejs.page.closePage();
				}, 1000);
			} else {
				alert(plus.runtime.appid + '页面不存在');
			}
		} else if(CommonTools.os.ejs) {
			ejs.page.closePage({
				'code': result.code,
				'url': window.location.href
			});
			//alert('非plus');
		}
	}

	/**
	 * @description 通过code请求token
	 * @param {String} code
	 */
	function ajaxToken(code) {
		var href = window.location.href;
		var url = 'http://192.168.202.6:8088/EpointSSO/rest/oauth2/token';
		if(href.indexOf('callback2') !== -1) {
			url = 'http://192.168.201.30:8090/EpointSSO/rest/oauth2/token';
		}

		var requestData = {
			"grant_type": "authorization_mobile",
			"client_id": "4V7HBXq3m1kqjGQqblXqhBQkIXAa",
			"client_secret": "92d0lMxl6Uu71fdnqj6ZcpXQyxsa",
			"code": code
		};
		mui.ajax(url, {
			data: requestData,
			dataType: "json",
			timeout: "9000",
			type: "POST",
			async: true,
			success: function(response) {
				console.log("success");
				console.log(JSON.stringify(response));
				if(response) {
					document.querySelector('#token').innerHTML = 'token信息:' + JSON.stringify(response);

				}
			},
			error: function(error) {
				console.log("error");
				console.log(JSON.stringify(error))
			}
		});
	}

});