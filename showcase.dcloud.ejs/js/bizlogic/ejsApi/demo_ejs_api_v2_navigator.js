/**
 * 作者: dailc
 * 时间: 2017-01-06
 * 描述:  ejs-api示例
 * v2.0示例
 */
define(function(require, exports, module) {
	"use strict";
	

	var EjsDefaultLitemlate = require('bizlogic_common_ejs_default');
	
	
	new EjsDefaultLitemlate.Litemplate({
		isIndex: false,
		title: 'navigator模块',
		ejsApi: [{
			'id': 'showNavigation',
			'text': 'showNavigation',
			'runCode': function() {
				ejs.navigator.showNavigation();
			}
		}, {
			'id': 'hideNavigation',
			'text': 'hideNavigation',
			'runCode': function() {
				ejs.navigator.hideNavigation();
			}
		}, {
			'id': 'setTitle',
			'text': 'setTitle',
			'runCode': function() {
				ejs.navigator.setTitle('ejs自定义标题', function(result, msg, detail) {
					EjsDefaultLitemlate.showTips(JSON.stringify(detail));
				});
			}
		}, {
			'id': 'setRightTextBtn',
			'text': 'setRightTextBtn',
			'runCode': function() {
				EjsDefaultLitemlate.isPopWindow = false;
				//需要页面实现onClickNBRightEJS
				ejs.navigator.setRightTextBtn('右侧按钮');
			}
		}, {
			'id': 'setRightImageBtn',
			'text': 'setRightImageBtn',
			'runCode': function() {
				EjsDefaultLitemlate.isPopWindow = false;
				var img = 'frm_search_boom';
				if(ejs.os.ios) {
					img = 'EJS_nav_bulb';
				}
				//需要页面实现onClickNBRightEJS，根据先后顺序覆盖
				ejs.navigator.setRightImageBtn(img);
			}
		}, {
			'id': 'hideBackButton',
			'text': 'hideBackButton',
			'runCode': function() {
				//有延迟
				ejs.navigator.hideBackButton();
			}
		}, {
			'id': 'showSearchBar',
			'text': 'showSearchBar',
			'runCode': function() {
				//需要实现onSearchEJS
				ejs.navigator.showSearchBar();
			}
		}, {
			'id': 'hideSearchBar',
			'text': 'hideSearchBar',
			'runCode': function() {
				ejs.navigator.hideSearchBar();
			}
		}, {
			'id': 'rightTopMenuHorizontal',
			'text': '右上角下拉菜单(横向)',
			'runCode': function() {
				EjsDefaultLitemlate.isPopWindow = true;
				EjsDefaultLitemlate.isHorizontal = true;
				ejs.navigator.setRightTextBtn('横向弹出窗');
			}
		}, {
			'id': 'rightTopMenuPortrait',
			'text': '右上角下拉菜单(纵向)',
			'runCode': function() {
				EjsDefaultLitemlate.isPopWindow = true;
				EjsDefaultLitemlate.isHorizontal = false;
				ejs.navigator.setRightTextBtn('纵向弹出窗');
			}
		}, {
			'id': 'setBgColor',
			'text': 'setBgColor("1a1a1a")',
			'runCode': function() {
				ejs.navigator.setBgColor('1a1a1a');
			}
		}, {
			'id': 'setNbBarThemeSky',
			'text': 'setNbBarTheme("theme_sky")',
			'runCode': function() {
				ejs.navigator.setNbBarTheme('theme_sky');
			}
		}, {
			'id': 'setNbBarThemeRed',
			'text': 'setNbBarTheme("theme_red")',
			'runCode': function() {
				ejs.navigator.setNbBarTheme('theme_red');
			}
		}, {
			'id': 'setNbBarThemeWater',
			'text': 'setNbBarTheme("theme_water")',
			'runCode': function() {
				ejs.navigator.setNbBarTheme('theme_water');
			}
		}, {
			'id': 'setNbBarThemeMount',
			'text': 'setNbBarTheme("theme_mount")',
			'runCode': function() {
				ejs.navigator.setNbBarTheme('theme_mount');
			}
		}, {
			'id': 'setNbBarThemeBlack',
			'text': 'setNbBarTheme("theme_black")',
			'runCode': function() {
				ejs.navigator.setNbBarTheme('theme_black');
			}
		}, {
			'id': 'setNbBarThemeDefault',
			'text': 'setNbBarTheme("theme_default_blue")',
			'runCode': function() {
				ejs.navigator.setNbBarTheme('theme_default_blue');
			}
		}, {
			'id': 'setSkinThemeDay',
			'text': 'setSkinTheme("日间")',
			'runCode': function() {
				ejs.navigator.setSkinTheme('day');
			}
		}, {
			'id': 'setSkinThemeNight',
			'text': 'setSkinTheme("夜间")',
			'runCode': function() {
				ejs.navigator.setSkinTheme('night');
			}
		}]
	});

	window.onClickNBRightEJS = function() {
		if(!EjsDefaultLitemlate.isPopWindow) {
			EjsDefaultLitemlate.showTips('监测到按钮点击');
		} else {
			var orientation = '';
			if(EjsDefaultLitemlate.isHorizontal) {
				orientation = 'horizontal';
			}
			ejs.nativeUI.popWindow({
				'titleItems': ['立花泷', '宫水三叶'],
				'iconItems': ['frm_tab_tipstext_bg', 'frm_round_right_blue'],
				'orientation': orientation
			}, function(result, msg, detail) {
				EjsDefaultLitemlate.showTips(JSON.stringify(detail));
			});
		}

	};

	window.onChangeSegEJS = function(which) {
		EjsDefaultLitemlate.showTips('选择Seg:' + which, true);
	};

	window.onSearchEJS = function(key) {
		EjsDefaultLitemlate.showTips('搜索:' + key, true);
	};
});