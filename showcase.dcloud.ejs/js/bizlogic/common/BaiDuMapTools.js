/**
 * 作者: dailc
 * 时间: 2016-11-02 
 * 描述:  map对象
 */
define(function(require, exports, module) {
	//判断当前浏览器为http还是https
	//如果是https,会用自带的定位进行定位
	var ishttps = 'https:' == document.location.protocol ? true : false;
	var BaiDuMap = {
		/**
		 * @description 百度地图类的初始化
		 * @param {String} domId 显示地图的目标dom的id
		 * @param {JSON} options 一些配置参数
		 * @param {Function} success 成功回调
		 * @param {Function} error (msg) 失败回调
		 */
		init: function(domId, options, success, error) {
			var self = this;
			options = options || {};
			options.longitude = options.longitude || 120.61990712;
			options.latitude = options.latitude || 31.31798737;
			//默认不开放谷歌定位,因为实际上谷歌定位有很多机型不支持
			options.isSupportGeolocation = options.isSupportGeolocation || false;
			//是否强制使用钉钉  isForceDD,默认为false,使用钉钉的原始定位
			options.isForceDD = options.isForceDD || false;
			self.domId = domId;
			// 创建地图实例  
			self.options = options;
			//默认定位
			self.locationDefault(function() {
				//如果强制使用钉钉定位，会使用钉钉获取原始坐标然后再转换为百度点
				if(self.options.isForceDD && window.dd) {
					self.locationByDD(function() {
						success && success();
					}, function(msg) {
						error && error(msg);
					});

				} else if(navigator.geolocation && ishttps && self.options.isSupportGeolocation) {
					//如果是https,并且是移动端，采用locationByGeolocation
					self.locationByGeolocation(function() {
						success && success();
					}, function(msg) {
						error && error(msg);
					});
				} else {
					//否则采用浏览器定位
					self.locationByBrowserBD(function() {
						success && success();
					}, function(msg) {
						error && error(msg);
					});
				}
				//否则采用普通的浏览器定位
			});
		},
		/**
		 * @description 默认的定位，初始化定位一个地点
		 * @param {Function} success 成功回调，回调中请求周围热点
		 */
		locationDefault: function(success) {
			var self = this;
			var domId = self.domId;
			self.map = new BMap.Map(domId);
			//创建地址解析实例
			self.myGeo = new BMap.Geocoder();
			var point = new BMap.Point(self.options.longitude, self.options.latitude);
			self.currPoint = point;
			self.map.centerAndZoom(point, 12);
			success && success();
		},
		/**
		 * @description 百度的浏览器定位
		 * @param {Function} success 成功回调，回调中请求周围热点
		 * @param {Function} error 失败回调，(msg)
		 */
		locationByBrowserBD: function(success, error) {
			//两个this指针别混淆
			var self = this;
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r) {
				var map = self.map;
				if(this.getStatus() == BMAP_STATUS_SUCCESS) {
					var mk = new BMap.Marker(r.point);
					map.addOverlay(mk);
					map.panTo(r.point);
					self.currPoint = r.point;
					success && success();
					//alert('您的位置：' + r.point.lng + ',' + r.point.lat);
				} else {
					error && error('failed' + this.getStatus());
				}
			}, {
				enableHighAccuracy: true
			})
		},
		/**
		 * @description 根据Geolocation定位
		 * @param {Function} success 成功回调，回调中请求周围热点
		 * @param {Function} error 失败回调，(msg)
		 */
		locationByGeolocation: function(success) {
			var self = this;
			self.getLocationByGeolocation(function(longitude, latitude) {
				self.changeBDPointByGeolocationLocation(longitude, latitude, function(point) {
					//地图初始化
					var bm = self.map;
					bm.centerAndZoom(point, 16);
					bm.enableScrollWheelZoom(true);
					//暂时不需要导航栏控件
					//bm.addControl(new BMap.NavigationControl());
					//地图上添加点
					var localmark = new BMap.Marker(point);
					bm.addOverlay(localmark);
					bm.panTo(point);
					self.currPoint = point;
					success && success();
				});
			}, function(msg) {
				//定位失败，继续走百度浏览器定位
				locationByBrowserBD(domId, success, error);
			});
		},
		/**
		 * 根据自带的navigator.geolocation获取经纬度
		 * iOS 10 开始必须使用https 否则无法使用
		 * @param {Function} success 成功回调(longitude,latitude)
		 * @param {Function} error 失败回调 (msg)
		 */
		getLocationByGeolocation: function(success, error) {
			navigator.geolocation.getCurrentPosition(function(position) {
				//alert("纬度: " + position.coords.latitude + "经度: " + position.coords.longitude);
				success && success(position.coords.longitude, position.coords.latitude);
			}, function(error) {
				switch(error.code) {
					case error.PERMISSION_DENIED:
						error && error("用户拒绝对获取地理位置的请求");
						break;
					case error.POSITION_UNAVAILABLE:
						error && error("位置信息是不可用的。");
						break;
					case error.TIMEOUT:
						error && error("请求用户地理位置超时。");
						break;
					case error.UNKNOWN_ERROR:
						error && error("未知错误。");
						break;
				}
			});
		},
		/**
		 * @description 通过已经获取到的谷歌经纬度(或原始坐标)转换为百度左边
		 * @param {String} longitude
		 * @param {String} latitude
		 * @param {Function} success 成功回调 (point)
		 * @param {Boolean} 是否是原始坐标，原始坐标和谷歌坐标有些偏差
		 */
		changeBDPointByGeolocationLocation: function(longitude, latitude, success,isOrigin) {
			//默认为谷歌坐标
			isOrigin = isOrigin || false;
			//一个geolocation的point
			var ggpoint = new BMap.Point(longitude, latitude);
			//百度坐标点转换器
			var convertor = new BMap.Convertor();
			var pointArr = [];
			pointArr.push(ggpoint);
			//原始坐标为1，谷歌坐标为3
			//一般钉钉，谷歌定位出来的都是谷歌坐标(标准坐标)
			var type = isOrigin?1:3;
			//左边转换，异步进行
			convertor.translate(pointArr, type, 5, function(data) {
				var tmpPoint = ggpoint;
				if(data && data.status === 0 && data.points) {
					tmpPoint = data.points[0];
				}
				success && success(tmpPoint);
			});
		},
		/**
		 * @description 搜索最近热点
		 * @param {JSON} options 需要的配置参数
		 * @param {Function} success 成功回调
		 */
		searchHotPoint: function(options, success) {
			var self = this;
			options = options || {};
			//默认搜索1000米内的POI
			options.poiRadius = options.poiRadius || 1000;
			//默认列举个12POI
			options.numPois = options.numPois || 12;

			self.myGeo.getLocation(self.currPoint, function(rs) {
				//console.log(JSON.stringify(rs));
				var allPois = rs.surroundingPois; //获取全部POI（例如该点半径为100米内有6个POI点）
				//有title，address属性
				success && success(allPois);
			}, options);
		},
		/**
		 * @description 根据钉钉的原始定位
		 * @param {Function} success 成功回调，回调中请求周围热点
		 * @param {Function} error 失败回调，(msg)
		 */
		locationByDD: function(success, error) {
			var self = this;
			dd.device.geolocation.get({
				//误差默认为200 m
				targetAccuracy: 200,
				//标准坐标，获取后经过百度转换
				coordinate: 0,
				//由于只需要用到经纬度，所以不需要逆地理编码
				withReGeocode: false,
				onSuccess: function(result) {
					/* 高德坐标 result 结构
					{
					    longitude : Number,
					    latitude : Number,
					    accuracy : Number,
					    address : String,
					    province : String,
					    city : String,
					    district : String,
					    road : String,
					    netType : String,
					    operatorType : String,
					    errorMessage : String,
					    errorCode : Number,
					    isWifiEnabled : Boolean,
					    isGpsEnabled : Boolean,
					    isFromMock : Boolean,
					    provider : wifi|lbs|gps,
					    accuracy : Number,
					    isMobileEnabled : Boolean
					}
					*/
					//alert('钉钉定位:' + JSON.stringify(result));
					//都有默认值可以使用
					var longitude = result.longitude || self.options.longitude;
					var latitude = result.latitude || self.options.latitude;
					self.changeBDPointByGeolocationLocation(longitude, latitude, function(point) {
						//地图初始化
						var bm = self.map;
						//层级越高越精确
						bm.centerAndZoom(point, 16);
						bm.enableScrollWheelZoom(true);
						//暂时不需要导航栏控件
						//bm.addControl(new BMap.NavigationControl());
						//地图上添加点
						var localmark = new BMap.Marker(point);
						bm.addOverlay(localmark);
						bm.panTo(point);
						self.currPoint = point;
						success && success();
					});
				},
				onFail: function(err) {
					//alert('定位失败:'+JSON.stringify(err));
					//定位失败，用浏览器再次定位
					self.locationByBrowserBD(success, error);
				}
			});
		}
	};

	exports.BaiDuMap = BaiDuMap;
});