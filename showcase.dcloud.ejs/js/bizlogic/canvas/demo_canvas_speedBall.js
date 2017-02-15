/**
 * 作者: dailc
 * 时间: 2016-9-12 
 * 描述: canvas实现360加速球效果 
 */
define(function(require, exports, module) {
	"use strict";
	var UITools = require('UITools_Core');
	require('js/libs/SpeedBall.js');
	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			initListeners();
			initCanvas();
		}
	});

	new LiTemplate({
		isIndex: false,
		title: '360加速球效果'
	});
	var ball1, ball2;
	/**
	 * @description 监听
	 */
	function initListeners() {
		
		document.getElementById('banjie').addEventListener('input', function() {
			var value = this.value;
			ball1.percent = parseInt(value) / 100;
			ball1.change();
		});
		document.getElementById('chaoqi').addEventListener('input', function() {
			var value = this.value;
			ball2.percent = parseInt(value) / 100;
			ball2.change();
		});

		document.getElementById('mySpeedBall').addEventListener('click', function() {
			//抖动
			ball1.shake(10, 2000);
		});
		document.getElementById('mySpeedBall2').addEventListener('click', function() {
			//抖动
			ball2.shake(3, 2000);
		});
		var lastTime = new Date().getTime(); //获取当前时间戳
		var lastX, lastY, lastZ;
		var SHAKE_THRESHOLD = 100; //定义一个摇动的阈值
		//目前手机运动感应误差还是比较大
		function deviceMotionHandler(event) {
			//获取含重力加速
			var acceleration = event.accelerationIncludingGravity;
			if(!acceleration){
				//不支持的情况下
				return ;
			}
			var x = acceleration.x,
			y = acceleration.y,
			z = acceleration.z;
			var curTime = new Date().getTime(); //获取当前时间戳
			var diffTime = curTime - lastTime;
			//一秒钟才会触发一次摇一摇
			if(diffTime > 1000) {
				
				//必须大于100毫秒间隔
				var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000; //计算阈值
				speed = speed || 0;
				//轻轻摇一下相当于60
				//稍微用力为100
				//这里阈值为100
				if(speed > SHAKE_THRESHOLD) {
					//开始摇一摇，这里的表现为shake小球
					var frenq = parseInt((speed/100)*8);
					ball1.shake(frenq, 2000);
					ball2.shake(frenq, 2000);
					//alert('摇一摇:'+speed);
				}
				lastX = x;
				lastY = y;
				lastZ = z;
				lastTime = curTime;
			}
		};
		if(!window.DeviceOrientationEvent){
			UITools.alert('您的设备不支持DeviceOrientationEvent,无法使用摇一摇感应!');
		}else if(!window.DeviceMotionEvent){
			UITools.alert('您的设备不支持DeviceMotionEvent,无法使用摇一摇感应!');
		}
		//添加运动传感器事件监听
		window.addEventListener('devicemotion', deviceMotionHandler, false);
		window.addEventListener('deviceorientation',function(event){
			var alpha = event.alpha;
			var beta = event.beta;
			var gamma = event.gamma;
			//alert('alpha:'+alpha+',beta:'+beta+',gamma:'+gamma);
		});
	}

	/**
	 * @description 初始化canvas
	 */
	function initCanvas() {
		ball1 = SpeedBall.generate('#mySpeedBall', {
			txt: '办结率',
			//进度的字体,默认为30px italic
			percentFont: '30px italic',
			//文字的字体,默认为16px Arial
			txtFont: '16px Arial',
			//是否字体是空心的,默认为 false
			isPercentTxtHollow:true,
			isTxtHollow:false,
			isShowPercent: true,
			percent: .2,
			//默认为1/20,并且大于90%和小于10%后会有递减
			wavePercent: 1 / 20,
			//强制使用自定义的颜色,使用了后,颜色不再是默认的渐变了
			colorInner: '#b8e0fc',
			colorOutter: '#5ab1ef',
			colorTxt: '#208ddb',
			//内圈和外圈的线宽
			lineWInner: 1,
			lineWOutter: 3,
			//文字的线宽
			lineWTxt: 1,
			//强制不使用动画,默认会使用动画
			isAnimation: false
		});
		ball2 = SpeedBall.generate('#mySpeedBall2', {
			txt: '超期率',
			isShowPercent: true,
			percent: .05
		});
	}

});