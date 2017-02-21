/**
 * 作者: dailc
 * 时间: 2017-01-09
 * 描述:  oauth页面
 */
define(function(require, exports, module) {
	"use strict";

	var UITools = require('UITools_Core');
	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			initListeners();
		}
	});

	new LiTemplate({
		isIndex: false,
		title: 'Oauth授权页面',
		ejsApi: null
	});
	var oauthData = {};
	/**
	 * @description 初始化监听
	 */
	function initListeners() {
		mui('.mui-content').on('tap', '#btn-login', function() {
			redirectToOauth();
		});
		mui('.mui-content').on('tap', '#btn-login2', function() {
			redirectToOauth(true);
		});
		mui('.mui-content').on('tap', '#btn-scan', function() {
			if(!oauthData.access_token) {
				ejs.nativeUI.alert('提示', '尚未登录，请先登录获取token');
			} else {
				ejs.nativeComponents.openScan({

				}, function(result, msg, detail) {
					//mui.alert('扫码结果:' + JSON.stringify(detail));
					//ejs.nativeUI.toast('扫码成功');
					ejs.nativeUI.alert('扫码结果:' + JSON.stringify(detail));
					var content = result.content;
					ejs.nativeUI.confirm({
						'title': '登录',
						'message': '是否授权PC端登录',
						'btn1': '取消',
						'btn2': '确定'
					}, function(result, msg, detail) {
						if(result.which == -2) {
							loginByCode(content);
						}
					});

				});

			}

		});

		//var token = '538a3dd9965ccdaeed6f5d01e10ab4d2';
		//ajaxLoginidByToken(token);
		
		var code = '10810505';
		oauthData.loginID = 'admin';
		oauthData.access_token = '06983fb5e23f03db16970c0674dc45f2';
		loginByCode(code);
	}

	var resultDom = document.getElementById('result');

	function redirectToOauth(is30) {
		var oauthUrl = 'http://192.168.202.6:8088/EpointSSO/rest/oauth2/authorize';
		var data = {
			'response_type': "mobile",
			"client_id": "4V7HBXq3m1kqjGQqblXqhBQkIXAa",
			"scope": "test1"
		};
		if(is30) {
			oauthUrl = 'http://192.168.201.30:8090/EpointSSO/rest/oauth2/authorize';
			data = {
				'response_type': "code",
				"client_id": "4V7HBXq3m1kqjGQqblXqhBQkIXAa",
				"scope": "777",
				"redirect_uri": "http://app.epoint.com.cn/showcase.dcloud.ejs/html/oauth/demo_oauth_callback2.html"
			};
		}
		oauthUrl = ejs.app.appendParams(oauthUrl, data);
		ejs.page.openPage(oauthUrl, 'oauth授权', {}, {
			'hrefEnable': true
		}, function(result, msg, detail) {
			ejs.nativeUI.alert('回调信息:' + JSON.stringify(detail));
			if(resultDom) {
				var resultData;
				if(result) {
					resultData = detail.result.resultData;
				} else {
					resultData = detail.resultData;
				}
				if(typeof resultData === 'string') {
					resultData = JSON.parse(resultData);
				}
				resultDom.innerHTML = "请求token中..." + JSON.stringify(detail);
				ajaxToken(resultData.code, true);
			}
		});

	}

	/**
	 * @description 通过code请求token
	 * @param {String} code
	 */
	function ajaxToken(code, is30) {
		var url = 'http://192.168.202.6:8088/EpointSSO/rest/oauth2/token';
		var requestData = {
			"grant_type": "authorization_code",
			"client_id": "4V7HBXq3m1kqjGQqblXqhBQkIXAa",
			"client_secret": "92d0lMxl6Uu71fdnqj6ZcpXQyxsa",
			"code": code
		};
		if(is30) {
			url = 'http://192.168.201.30:8090/EpointSSO/rest/oauth2/token';
			requestData.redirect_uri = 'http://app.epoint.com.cn/showcase.dcloud.ejs/html/oauth/demo_oauth_callback2.html';
		}

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
					oauthData.access_token = response.access_token || '';
					if(resultDom) {
						resultDom.innerHTML = 'token:' + oauthData.access_token + ',正在请求loginid...';
					}
					ajaxLoginidByToken(oauthData.access_token);

				}
			},
			error: function(error) {
				console.log("error");
				console.log(JSON.stringify(error))
				if(resultDom) {
					resultDom.innerHTML = '请求错误:' + JSON.stringify(error);
				}
			}
		});
	}

	/**
	 * @description 通过token换取loginId
	 * @param {Object} token
	 */
	function ajaxLoginidByToken(token) {
		var url = 'http://192.168.201.30:8090/EpointSSO/rest/oauth2/loginid';
		var requestData = {};
		mui.ajax(url, {
			data: requestData,
			dataType: "text",
			timeout: "9000",
			type: "POST",
			headers: {
				'Authorization': 'Bearer ' + token
			},
			async: true,
			success: function(response) {
				if(response) {
					if(resultDom) {
						var html = 'token:' + token;
						html += '<br>其它:' + JSON.stringify(response);
						resultDom.innerHTML = html;
						oauthData.loginID = response;
					}
					document.getElementById('btn-scan').classList.remove('common-hidden');

				}
			},
			error: function(error) {
				console.log("error");
				console.log(JSON.stringify(error))
				if(resultDom) {
					var html = 'token:' + token;
					html += '请求错误:' + JSON.stringify(error);
					resultDom.innerHTML = html;
				}
			}
		});
	}

	/**
	 * @description 通过二维码中的code,使的PC端登录，实现扫一扫登录效果
	 * @param {String} code
	 */
	function loginByCode(code) {
		var url = 'http://192.168.201.30:8090/EpointSSO/rest/oauth2/qrloginconfirm?code=' + code;
		var requestData = {
			'Code': code,
			'loginid': oauthData.loginID
		};
		if(resultDom) {
			var html = '请求PC登录';
			html += '<br>code:' + code;
			resultDom.innerHTML = html;
		}
		mui.ajax(url, {
			data: requestData,
			dataType: "json",
			timeout: "9000",
			type: "POST",
			headers: {
				'Authorization': 'Bearer ' + oauthData.access_token
			},
			async: true,
			success: function(response) {
				
				if(response) {
					if(resultDom) {
						var html = '登录成功';
						html += '<br>其它:' + JSON.stringify(response);
						resultDom.innerHTML = html;
					}
				} else {
					ejs.nativeUI.alert('登录成功');
				}
				
			},
			error: function(error) {
				ejs.nativeUI.alert('登录失败:' + JSON.stringify(error));
				if(resultDom) {
					var html = '登录失败';
					html += '<br>其它:' + JSON.stringify(error);
					resultDom.innerHTML = html;
				}
			}
		});
	}
	//http://192.168.201.30:8090/EpointSSO/rest/oauth2/authorize?response_type=code&client_id=4V7HBXq3m1kqjGQqblXqhBQkIXAa&scope=777&redirect_uri=http://app.epoint.com.cn/showcase.dcloud.ejs/html/oauth/demo_oauth_callback.html

	//http://192.168.201.30:8090/EpointFrameSSO
});