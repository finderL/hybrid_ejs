/**
 * 作者: dailc
 * 时间: 2017-01-10
 * 描述:  下拉刷新最基本的使用
 * 这里提供了一个较为完整的示例
 */
define(function(require, exports, module) {
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	var WindowTools = require('WindowTools_Core');
	var DefaultLitemlate = require('bizlogic_common_default');
	var PullToRefreshTools = require('PullToRefresh_Impl_Default_Core');
	
	var LiTemplate = DefaultLitemlate.Litemplate.extend({
		initBiz: function() {
			this._super();
			var skin = WindowTools.getExtraDataByKey('skin') || 'default';
			initSearch();
			initPullToRefreshBySkin(skin);
		}
	});

	new LiTemplate({
		isIndex: false,
		contentDom: 'pullrefresh',
		title: '下拉刷新基础类'
	});

	//下拉刷新基类
	var pullToRefreshBase;
	//下拉刷新对象
	var pullToRefresh1;
	//以下几个是测试加载更多,没有更多数据功能的
	//当前页
	var currpage = 0;
	//每页大小
	var pageSize = 10;
	//总共大小，这里用来判断是否可以上拉加载
	//实际业务中，可以不基于totalcount判断的，直接根据接口返回的数据进行判断
	var totalCount = 21;

	/**
	 * @description 初始化
	 */
	function initSearch() {
		mui('#pullrefresh').on('change', '#input-searchName', function() {
			var searchValue = document.getElementById('input-searchName').value;

			console.log("搜索:" + searchValue);
			refreshPullToRefresh();
		});

	}

	/**
	 * @description 刷新下拉刷新
	 */
	function refreshPullToRefresh() {
		//清空dom
		document.getElementById('listdata').innerHTML = '';
		currpage = -1; //这个必须要变
		//手动将状态设为可以加载更多
		if(pullToRefresh1.finished) {
			pullToRefresh1.refresh(true);
		}
		pullToRefresh1 && pullToRefresh1.pullupLoading();
	}

	/**
	 * @description 初始化时通过skin来决定使用哪一种下拉刷新
	 * 注意；初始化下拉刷新请在初始化时使用,重复使用无效
	 * 这里面是异步引入
	 * @param {String} skin
	 */
	function initPullToRefreshBySkin(skin) {
		var generatePullToRefreshCallback = function(targetPullToRefresh) {
			pullToRefreshBase = targetPullToRefresh;
			initPullRefreshList();
		};
		if(skin === 'default') {
			require.async('PullToRefresh_Base_Default_Core', generatePullToRefreshCallback);
		} else if(skin === 'type0') {
			require.async('PullToRefresh_Base_Type0_Core', generatePullToRefreshCallback);
		} else {
			//其它皮肤都需要引入css
			CommonTools.importFile('js/core/ejs/tools/Tools.PullToRefresh.css');
			if(skin === 'type1') {
				require.async('PullToRefresh_Base_Type1_Core', generatePullToRefreshCallback);
			} else if(skin === 'type1_material1') {
				require.async('PullToRefresh_Base_Type1__Material1_Core', generatePullToRefreshCallback);
			} else if(skin === 'type2') {
				require.async('PullToRefresh_Base_Type2_Core', generatePullToRefreshCallback);
			} else {
				console.error("错误:传入的下拉刷新皮肤错误,超出范围!");
			}
		}

	}
	/**
	 * @description 测试添加数据
	 * 真实情况添加的数据要根据接口返回数据映射
	 * @param {Number} count 数量
	 * @param {Boolean} isPullDown 是否是下拉刷新
	 */
	function testAppendData(count, isPullDown) {
		isPullDown = isPullDown || false;
		var fragment = document.createDocumentFragment();

		var li;
		for(var i = 0; i < count; i++) {
			li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.id = 'id_' + i;
			li.innerHTML = '测试item' + currpage + '-' + (i + 1);
			fragment.appendChild(li);
		}

		var dataContainer = document.getElementById('listdata');
		//添加-下拉刷新时先清除数据
		if(isPullDown) {
			dataContainer.innerHTML = '';
		}
		dataContainer.appendChild(fragment);
	}
	/**
	 * @description 重置状态
	 * @param {Boolean} isPullDown 是否是上拉加载
	 */
	function resetState(isPullDown) {
		if(isPullDown) {
			pullToRefresh1.endPullDownToRefresh();
			if(pullToRefresh1.finished) {
				pullToRefresh1.refresh(true);
			}
		}
		//判断当前页的数据是否已经大于totalCount
		var itemLength = document.getElementById('listdata').children.length;
		if(itemLength >= totalCount) {
			pullToRefresh1.endPullUpToRefresh(true);
		} else {
			pullToRefresh1.endPullUpToRefresh(false);
		}
	}
	/**
	 * @description 初始化下拉刷新
	 * 这时候,基类对象已经可以了
	 */
	function initPullRefreshList() {

		var pullUpRefreshCallback1 = function() {
			var self = this;
			console.log("上拉加载");
			setTimeout(function() {
				//请求数据
				//当前页++
				currpage++;
				//测试每次添加10条
				testAppendData(10, false);
				resetState(false);
			}, 500);

		};
		var pullDownRefreshCallback1 = function() {
			var self = this;
			console.log("下拉刷新");
			setTimeout(function() {
				//下拉刷新当前页变为0
				currpage = 0;
				//测试每次添加10条
				testAppendData(10, true);
				resetState(true);
			}, 1000);
		};
		var element = '#pullrefresh';

		//列表监听
		mui(element).on('tap', 'li', function() {
			console.log("点击:" + this.id);
		});

		//初始化下拉刷新
		pullToRefresh1 = pullToRefreshBase.initPullToRefresh({
			//下拉有关
			down: {
				callback: pullDownRefreshCallback1,
			},
			//down为null表示不要下拉刷新
			//down: null,
			//上拉有关
			up: {
				//是否自动上拉加载-初始化是是否自动
				auto: true,
				//距离底部高度(到达该高度即触发)
				offset: 100,
				//是否隐藏那个加载更多动画,达到默认加载效果
				show: true,
				callback: pullUpRefreshCallback1
			},
			element: element
		});
	}
});