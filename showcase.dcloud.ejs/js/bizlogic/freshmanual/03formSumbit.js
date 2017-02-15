/**
 * 作者: dailc
 * 时间: 2017-01-10 
 * 描述:  新人手册->helloworld页面
 * 
 * 请勿必养成“时常格式化”的良好习惯
 */
define(function(require, exports, module) {
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');

	CommonTools.initReady(init);

	/**
	 * @description 初始化代码
	 */
	function init() {
		//引入需要的第三方js文件
		CommonTools.importFile([
			'js/libs/mui.min.js'
		], function() {
			//TODO: 做一些初始化事情
			initListeners();
		});
	}

	/**
	 * @description 初始化监听
	 */
	function initListeners() {

		//使用mui来进行监听
		//需要注意的是,mui的监听 mui(容器).on(事件,选择器,回调)
		//其中 容器和选择器都不可省略
		//加上loading按钮效果 
		mui('.mui-content').on('tap', '.btn-submit', function() {
			var self = this;
			mui(self).button('loading');
			setTimeout(function() {
				//第一个参数代表是否要进行数据校验
				getInputdata(true, function(data, isSuccess) {
					mui(self).button('reset');
					//如果成功
					if(isSuccess) {
						console.log("数据:" + JSON.stringify(data));
						mui.alert('成功提交，数据:'+JSON.stringify(data));
						//TODO: 实际中，可以用这个data进行接口提交等
					}
				});

			}, 100);

		});
	}

	/**
	 * @description 获取input的值
	 * @param {Boolean} isCheck 是否对input进行校验
	 * @param {Function} callback 获取值，并校验完毕后会进行回调
	 */
	function getInputdata(isCheck, callback) {
		var data = {};
		var changeNodeListToArray = function(nodeList) {
			var arr = [];
			for(var i = 0, len = nodeList.length; i < len; i++) {
				arr.push(nodeList[i]);
			}
			return arr;
		};
		//获取所有input的值
		var inputs = document.querySelectorAll('input');
		//获取所有textArea的值
		var textAreas = document.querySelectorAll('textarea');
		//获取所有的select
		var selects = document.querySelectorAll('select');

		//合并所有的input,如果是checkBox和radio需要被选中
		var allInputs = changeNodeListToArray(inputs).concat(changeNodeListToArray(textAreas)).concat(changeNodeListToArray(selects));

		//for循环遍历
		for(var i = 0, len = allInputs.length; i < len; i++) {
			var el = allInputs[i];
			var id = el.id;
			var value = el.value;
			//包括!==undefined 和 null
			if(id != null && id != '') {
				if(el.getAttribute('type')==='checkbox'||el.getAttribute('type')==='radio') {
					//checkbox必须被选中
					if(!el.checked) {
						continue;
					}
				}
				data[id] = value;
			}
		}
		//获取所有的单选，目前通过radio-type 来判断，可自定义
		//单选和普通的input取值不一样
		var radios = document.querySelectorAll('.radio-type');
		for(var i = 0, len = radios.length; i < len; i++) {
			var el = radios[i];
			var id = el.id;
			//包括!==undefined 和 null
			if(id != null && id != '') {
				var value = '';
				var radiosInput = el.querySelectorAll('input');
				for(var i = 0, len = radiosInput.length; i < len; i++) {
					var item = radiosInput[i];
					if(item.checked) {
						value = item.value;
					}
				}
				data[id] = value;
			}
		}

		//检查输入,具体实际可以换为项目相应的提升与校验
		var checkInput = function(data) {
			var arr = '';
			var flag = true;
			if(!data.account) {
				arr += '\n账号不能为空';
			} else if(!data.password) {
				arr += '\n密码不能为空';
			} else if(!data.description) {
				arr += '\n说明不能为空';
			} else if(!data.isChoose) {
				arr += '\n必须选择checkBox';
			}
			if(arr) {
				arr = arr.substring(1);
				flag = false;
				if(!flag) {
					mui.alert(arr,'错误','我知道了');
				}
			}
			return flag;
		};
		callback && callback(data, isCheck?checkInput(data):true);
	}
});