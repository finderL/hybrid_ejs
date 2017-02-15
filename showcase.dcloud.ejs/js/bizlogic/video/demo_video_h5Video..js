/**
 * 作者: dailc
 * 时间: 2016-06-07
 * 描述: h5视频播放 
 */
define(function(require, exports, module) {
	"use strict";

	var EjsDefaultLitemlate = require('bizlogic_common_default');

	var LiTemplate = EjsDefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			initListeners();
		}
	});

	new LiTemplate({
		isIndex: false,
		title: 'Video播放页面'
	});

	//是否采用内联播放模式
	var isInlinePlay = true;
	var videoMedia = document.getElementById('videoMedia');
	//获取视频应该得宽和高
	var videoWidth = document.getElementById('videoContainer').offsetWidth;
	var videoHeight = document.getElementById('videoContainer').offsetHeight;
	console.log('视频宽:' + videoWidth + ',高:' + videoHeight);

	/**
	 * @description 监听
	 */
	function initListeners() {

		document.addEventListener("resume", function() {
			console.log('Page resume事件');
		});
		document.addEventListener("pause", function() {
			console.log('Page pause事件');
		});
		document.addEventListener("resize", function() {
			console.log('Page resize事件');
		});
		//选择类别
		mui('.mui-content').on('tap', '.switchBtn', switchPlayType);
		//给视频也点击播放,用来在内联时控制某些android的暂停
		//因为某些机型被改的控制栏自动隐藏了
		mui('.mui-content').on('tap', '#videoMedia', function() {
			play();
		});
		mui('.mui-content').on('tap', '#videoMediaDefaultImg', function() {
			play();
		});
		//这个监听为监听到获取元数据
		videoMedia.addEventListener('loadedmetadata', function() {
			console.log('loadedmetadata,获取到元数据');
			logProperties();
		});
		//这个监听为监听到loadstart
		videoMedia.addEventListener('loadedmetadata', function() {
			console.log('loadstart');
			logProperties();
		});
		//这个监听为监听到 suspend
		videoMedia.addEventListener('suspend', function() {
			console.log('suspend');
			logProperties();
		});
		//这个监听为监听到 play
		videoMedia.addEventListener('play', function() {
			console.log('play');
			logProperties();
		});
		//这个监听为监听到 waiting
		videoMedia.addEventListener('waiting', function() {
			console.log('waiting');
			logProperties();
		});
		//这个监听为监听到 durationchange
		videoMedia.addEventListener('durationchange', function() {
			console.log('durationchange:' + '获取到视频长度');
			logProperties();
		});
		//这个监听为监听到 loadeddata
		videoMedia.addEventListener('loadeddata', function() {
			console.log('loadeddata');
			logProperties();
		});
		//这个监听为监听到 canplay
		videoMedia.addEventListener('canplay', function() {
			console.log('canplay');
			logProperties();
		});
		//这个监听为监听到 playing
		videoMedia.addEventListener('playing', function() {
			console.log('playing:' + '开始播放');
			logProperties();
		});
		//这个监听为监听到 canplaythrough
		videoMedia.addEventListener('canplaythrough', function() {
			console.log('canplaythrough:' + '可以流畅播放');
			logProperties();
		});
		//这个监听为监听到 progress
		videoMedia.addEventListener('progress', function() {
			console.log('progress:' + '持续下载');
			logProperties();
		});
		//这个监听为监听到 timeupdate
		videoMedia.addEventListener('timeupdate', function() {
			//		console.log('timeupdate:' + '播放进度变化');
			//		logProperties();
		});
		//这个监听为监听到 seeking
		videoMedia.addEventListener('seeking', function() {
			console.log('seeking:');
			logProperties();
		});
		//这个监听为监听到 seeked
		videoMedia.addEventListener('seeked', function() {
			console.log('seeked:' + '播放完毕');
			logProperties();
		});
		//这个监听为监听到 resize
		videoMedia.addEventListener('resize', function() {
			console.log('resize:');
			logProperties();
		});

	}
	/**
	 * @description 播放视频
	 */
	function play() {
		console.log('readyState:' + videoMedia.readyState);

		//Android app,内联播放时,隐藏图片,非内联直接就用原生播放器打开了
		//iOS APP和浏览器下都是内联隐藏图片,非内联时,直接播放
		//普通浏览器下都是内联隐藏图片,非内联时,直接播放
		//		if (isInlinePlay || !(window.plus && plus.os.name == 'Android')) {
		//			switchDefaultImgShow(false);
		//		}
		//if (isInlinePlay) {

		switchDefaultImgShow(false);
		//}
		var url = videoMedia.getElementsByTagName('source')[0].src;
		playHtml5Video(url, videoMedia, function(isPlay) {
			if(isPlay) {
				console.log('播放了');
			} else {
				console.log('暂停了');
			}
		}, isInlinePlay);
	};

	function playHtml5Video(url, mediaTarget, callback, isInlinePlay) {
		if(!url || !mediaTarget) {
			//url 和video元素不存在
			return;
		}
		isInlinePlay = isInlinePlay || false;

		if(!isInlinePlay) {
			//如果是非内敛,ios需要去除内联样式
			mediaTarget.removeAttribute('webkit-playsinline');
		} else {
			mediaTarget.setAttribute('webkit-playsinline', 'webkit-playsinline');
		}
		if(mediaTarget.paused || mediaTarget.ended) {
			//暂停时播放
			if(mediaTarget.ended) {
				mediaTarget.currentTime = 0;
			}
			mediaTarget.play();
			callback && callback(true);
		} else {
			//播放时暂停
			mediaTarget.pause();
			callback && callback(false);
		}
	}
	/**
	 * @description 更换视频默认图的显示,内联模式下隐藏
	 * 否则显示
	 * @param {Boolean} isShow
	 */
	function switchDefaultImgShow(isShow) {
		if(isShow) {
			document.getElementById('videoMediaDefaultImg').style.display = 'block';

			document.getElementById('videoMedia').style.width = '1px';
			document.getElementById('videoMedia').style.height = '1px';
		} else {
			document.getElementById('videoMediaDefaultImg').style.display = 'none';
			document.getElementById('videoMedia').style.width = videoWidth + 'px';
			document.getElementById('videoMedia').style.height = videoHeight + 'px';
		}
	};
	/**
	 * @description 更换播放类型
	 * @param {Event} e
	 */
	function switchPlayType(e) {
		var brothers = e.target.parentNode.children;
		for(var i = 0, len = brothers.length; i < len; i++) {
			brothers[i].classList.remove('choosed');
		}
		e.target.classList.add('choosed');
		if(e.target.id == 'inlinePlayBtn') {
			//内联播放
			isInlinePlay = true;
		} else {
			//非内联
			isInlinePlay = false;

			videoMedia.pause();
		}
		//这个模式隐藏video,防止点击重复冲突,并暂停
		switchDefaultImgShow(true);
	};
	/**
	 * @description 打印属性
	 */
	function logProperties() {
		console.log('readyState:' + videoMedia.readyState);
		console.log('currentTime :' + videoMedia.currentTime);
		console.log('duration   :' + videoMedia.duration);
		console.log('buffered  :' + (videoMedia.buffered.length > 0 && videoMedia.buffered.end(0)) || 0);
		console.log('ended:' + videoMedia.ended);
		console.log('paused:' + videoMedia.paused);
		console.log('networkState:' + videoMedia.networkState);
		console.log('*******************');
	};
});