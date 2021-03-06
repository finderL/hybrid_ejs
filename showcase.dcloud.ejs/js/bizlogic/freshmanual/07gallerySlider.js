/**
 * 作者: dailc
 * 时间: 2017-01-17 
 * 描述:  新人手册->图片轮播示例
 */
define(function(require, exports, module) {
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	var WindowTools = require('WindowTools_Core');
	var GallerySliderTools = require('GallerySliderTools_Core');
	
	CommonTools.initReady(init);

	/**
	 * @description 初始化代码
	 */
	function init() {
		//引入需要的第三方js文件
		CommonTools.importFile([
			'js/libs/mui.min.js'
		],function(){
			//TODO: 做一些初始化事情
			initListeners();
			var type = WindowTools.getExtraDataByKey('type') || 'default';
			initGallerySlider(type);
		});
	}
	
	/**
	 * @description 初始化监听
	 */
	function initListeners(){
		//监听手动滑动翻页方法
		mui('.mui-content').on('swipeleft','#gallerySlider',function(e){
			console.log("翻页 ←");
			e.stopPropagation();
		});
		mui('.mui-content').on('swiperight','#gallerySlider',function(){
			console.log("翻页 →");
			e.stopPropagation();
		});
	}
	
	/**
	 * @description 初始化图片轮播
	 * @param {String} type 轮播类别
	 */
	function initGallerySlider(type) {
		if (type === 'default') {
			//默认类别
			createGallerySliderDefault();
		} else if (type === 'type1') {
			createGallerySliderType1();
		}
	}
	/**
	 * @description 创建默认图片轮播
	 */
	function createGallerySliderDefault() {
		//默认轮播数据
		var GalleryData = [{
			id: "testgallery1",
			title: "", //为空
			url: "../../img/gallery/img_testgallery1.jpg"
		}, {
			id: "testgallery2",
			title: "", //为空
			url: "../../img/gallery/img_testgallery2.jpg"
		}, {
			id: "testgallery3",
			title: "", //为空
			url: "../../img/gallery/img_testgallery3.jpg"
		}, {
			id: "testgallery4",
			title: "", //为空
			url: "../../img/gallery/img_testgallery4.jpg"
		}];
		var options = {
			isLoop: true,
			isAuto: true,
			autoTime: 3000,
			//图片的最大高度,可以不传
			maxImgHeight: '100%',
			//如果是每一个item有多张图,那么决定每一行显示几张图
			perLineItem: 2,
			//是否显示下面的Indicator
			isShowIndicator: true,
			//是否显示下面的翻页Indicator
			isShowPageIndicator: false
		};
		addGallery(GalleryData, options);
	}
	/**
	 * @description 创建图片轮播类别1
	 */
	function createGallerySliderType1() {
		//数组数据
		var GalleryData = [
			[{
				id: "testgallery1",
				title: "", //为空
				url: "../../img/gallery/img_testgallery1.jpg"
			}, {
				id: "testgallery11",
				title: "", //为空
				url: "../../img/gallery/img_testgallery1.jpg"
			}, {
				id: "testgallery13",
				title: "", //为空
				url: "../../img/gallery/img_testgallery1.jpg"
			}],
			[{
				id: "testgallery2",
				title: "", //为空
				url: "../../img/gallery/img_testgallery2.jpg"
			}, {
				id: "testgallery22",
				title: "", //为空
				url: "../../img/gallery/img_testgallery2.jpg"
			}],
			[{
				id: "testgallery3",
				title: "", //为空
				url: "../../img/gallery/img_testgallery3.jpg"
			}, {
				id: "testgallery33",
				title: "", //为空
				url: "../../img/gallery/img_testgallery3.jpg"
			}],
			[{
				id: "testgallery4",
				title: "", //为空
				url: "../../img/gallery/img_testgallery4.jpg"
			}, {
				id: "testgallery44",
				title: "", //为空
				url: "../../img/gallery/img_testgallery4.jpg"
			}]
		];
		var options = {
			isLoop: true,
			isAuto: true,
			autoTime: 3000,
			//图片的最大高度,可以不传
			maxImgHeight: '100%',
			//如果是每一个item有多张图,那么决定每一行显示几张图
			perLineItem: 2,
			//是否显示下面的Indicator
			isShowIndicator: false,
			//是否显示下面的翻页Indicator
			isShowPageIndicator: true
		};
		addGallery(GalleryData, options);
	}
	/**
	 * @description 添加轮播图片工具方法
	 * @param {JSON} GalleryData
	 * @param {JSON} options 对应参数
	 */
	function addGallery(GalleryData, options) {
		var myGallery = GallerySliderTools.addGalleryLandscape('#gallerySlider', GalleryData, function(e, id) {
			console.log("点击:" + id);
		}, options);
	}
});