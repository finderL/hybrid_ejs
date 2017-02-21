/**
 * 作者: dailc
 * 时间: 2017-02-21
 * 描述:  sso 扫码授权登录页面
 */
define(function(require, exports, module) {
	"use strict";

	var UITools = require('UITools_Core');
	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			init();

		}
	});

	new LiTemplate({
		isIndex: false,
		title: 'SSO扫码登录页面',
		ejsApi: null
	});

	var oauthData = {};
	var result = document.getElementById('result');
	var btnLogin = document.getElementById('btn-login');
	var btnLogout = document.getElementById('btn-logout');
	var btnScan = document.getElementById('btn-scan');

	/**
	 * @description 初始化
	 */
	function init() {
		checkState();
		initListeners();
	}

	/**
	 * @description 检查状态
	 */
	function checkState() {
		if(oauthData.access_token) {
			btnScan.classList.remove('common-hidden');
			btnLogout.classList.remove('common-hidden');
			setMsg('扫一扫可以授权PC端登陆...',true);
		} else {
			btnLogin.classList.remove('common-hidden');
			btnScan.classList.add('common-hidden');
			btnLogout.classList.add('common-hidden');
			setMsg('请先登录...');
		}
	}
	/**
	 * @description 设置msg
	 * @param {String} msg
	 * @param {Boolean} isAppend 是否新添加
	 */
	function setMsg(msg, isAppend) {
		if(isAppend) {
			result.innerHTML += msg;
		} else {
			result.innerHTML = msg;
		}

	}
	/**
	 * @description 初始化监听
	 */
	function initListeners() {
		mui('.mui-content').on('tap', '#btn-login', function() {
			redirectToOauth();
		});
		mui('.mui-content').on('tap', '#btn-logout', function() {
			logout();
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

	}
	//登出
	function logout() {
		var oauthUrl = 'http://192.168.201.30:8090/EpointSSO/rest/oauth2/logout';
		var data = {
			"redirect_uri": 'http://app.epoint.com.cn/showcase.dcloud.ejs/html/oauth/demo_oauth_callback2.html'
		};
		oauthUrl = ejs.app.appendParams(oauthUrl, data);
		ejs.page.openPage(oauthUrl, '注销页面', {}, {
			'hrefEnable': true,
			'requestCode':1102
		}, function(result, msg, detail) {
			//ejs.nativeUI.alert('回调信息:' + JSON.stringify(detail));
			ejs.nativeUI.alert('注销成功');
			setMsg('注销成功:' + JSON.stringify(detail));
			oauthData.access_token = null;
			
			checkState();
			
		},function(res){
			ejs.nativeUI.alert('注销失败');
			setMsg('注销失败:' + JSON.stringify(res));
		});
		
	}

	function redirectToOauth() {
		var oauthUrl = 'http://192.168.201.30:8090/EpointSSO/rest/oauth2/authorize';
		var data = {
			'response_type': "code",
			"client_id": "4V7HBXq3m1kqjGQqblXqhBQkIXAa",
			"scope": "777",
			"redirect_uri": "http://app.epoint.com.cn/showcase.dcloud.ejs/html/oauth/demo_oauth_callback2.html"
		};
		oauthUrl = ejs.app.appendParams(oauthUrl, data);
		ejs.page.openPage(oauthUrl, 'oauth授权', {}, {
			'hrefEnable': true
		}, function(result, msg, detail) {
			ejs.nativeUI.alert('回调信息:' + JSON.stringify(detail));
			var resultData;
			if(result) {
				resultData = detail.result.resultData;
			} else {
				resultData = detail.resultData;
			}
			if(typeof resultData === 'string') {
				resultData = JSON.parse(resultData);
			}
			setMsg("请求token中..." + JSON.stringify(detail));
			ajaxToken(resultData.code);
		});

	}

	/**
	 * @description 通过code请求token
	 * @param {String} code
	 */
	function ajaxToken(code) {
		var url = 'http://192.168.201.30:8090/EpointSSO/rest/oauth2/token';
		var requestData = {
			"grant_type": "authorization_code",
			"client_id": "4V7HBXq3m1kqjGQqblXqhBQkIXAa",
			"client_secret": "92d0lMxl6Uu71fdnqj6ZcpXQyxsa",
			"code": code,
			"redirect_uri": 'http://app.epoint.com.cn/showcase.dcloud.ejs/html/oauth/demo_oauth_callback2.html'
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
					oauthData.access_token = response.access_token || '';
					setMsg('token:' + oauthData.access_token + ',正在请求loginid...');
					ajaxLoginidByToken(oauthData.access_token);

				}
			},
			error: function(error) {
				console.log("error");
				console.log(JSON.stringify(error))
				setMsg('请求错误:' + JSON.stringify(error), true);
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
					var html = 'token:' + token;
					html += '<br>其它:' + JSON.stringify(response);
					setMsg(html);
					oauthData.loginID = response;
					checkState();

				}
			},
			error: function(error) {
				console.log("error");
				console.log(JSON.stringify(error))
				var html = 'token:' + token;
				html += '请求错误:' + JSON.stringify(error);
				setMsg(html, true);
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

		var html = '授权PC登录中...';
		html += '<br>code:' + code;
		setMsg(html);
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
					var html = '登录成功';
					html += '<br>其它:' + JSON.stringify(response);
					setMsg(html, true);
				} else {
					var html = '登录成功';
					setMsg(html, true);
					ejs.nativeUI.alert('登录成功');
				}

			},
			error: function(error) {
				ejs.nativeUI.alert('登录失败:' + JSON.stringify(error));
				var html = '登录失败';
				html += '<br>其它:' + JSON.stringify(error);
				setMsg(html, true);
			}
		});
	}
});