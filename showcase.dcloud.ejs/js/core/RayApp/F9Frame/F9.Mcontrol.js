/**
 * 作者: dailc
 * 时间: 2017-02-08
 * 描述:  定义一些控件
 */
define(function(require, exports, module) {
    "use strict";
    //每一个页面都要引入的工具类
    //下拉刷新
    var PullToRefreshTools = require('PullToRefresh_Impl_Default_Core');

    // class与控件的对应关系
    var controlMap = {};

    var getControlClazz = function(control) {
        var clsName = control.className,
            clazz,
            matchs = clsName.match(/ep-mui-\w*/g);
        if (matchs.length > 0) {
            clazz = controlMap[matchs[0]];
        }
        
        if (!clazz) {
            console.warn('没有对应的控件类型', control);
        }

        return clazz;

    };
    // 实现对象继承
    function extend(child, parent, proto) {
        var F = function() {};　　　　
        F.prototype = parent.prototype;　　　　
        child.prototype = new F();　　　　
        child.prototype.constructor = child;　　　　
        child.super = parent.prototype;

        if (proto) {
            for (var i in proto) {
                child.prototype[i] = proto[i];
            }
        }
    }

    // 注册控件
    function register(control, className) {
        controlMap[className] = control;
    }

    // 控件基类
    var MControl = function(dom) {
        this.el = dom;

        var id = dom.id;
        // 自动生成id
        if (!id) {
            id = epm.generateId();
            dom.id = id;
        }
        this.id = id;

        this._init();
    };

    MControl.prototype = {
        constructor: MControl,

        // 控件初始化
        _init: function() {

        },

        getValue: function() {
            return this.value;
        },

        setValue: function(value) {
            this.value = value;
            if (this.el.value !== undefined) {
                this.el.value = value;
            } else {
                this.el.innerText = value;
            }
        },
        // 获取控件的数据模型
        getModule: function() {
            return {
                id: this.id
            };
        },
        getAttribute: function(attrName) {
            return this.el.getAttribute(attrName);
        }
    };

        var TextBox = function(dom) {
        TextBox.super.constructor.call(this, dom);
    };
    extend(TextBox, MControl, {
        type: 'textbox',
        _init: function() {
            this.bind = this.getAttribute('bind');

            var self = this;
            this.el.addEventListener('change', function(e) {
                self.value = self.el.value;
            });
        },
        getModule: function() {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                value: this.value
            };
        }
    });
    register(TextBox, 'ep-mui-textbox');

    var TextArea = function(dom) {
        TextArea.super.constructor.call(this, dom);
    };
    extend(TextArea, TextBox, {
        type: 'textarea'
    });
    register(TextArea, 'ep-mui-textarea');

    var DatePicker = function(dom) {
        DatePicker.super.constructor.call(this, dom);

    };

    extend(DatePicker, MControl, {
        _init: function() {
            var optionsJson = this.getAttribute('data-options') || '{}';
            var options = epm.parseJSON(optionsJson);

            if (options.beginDate) {
                options.beginDate = new Date(options.beginDate);
            }
            if (options.endDate) {
                options.endDate = new Date(options.endDate);
            }

            this.format = options.format || this.getAttribute('format') || 'yyyy-MM-dd';
            this.bind = this.getAttribute('bind');

            var self = this;

            this.el.addEventListener('tap', function() {
                var picker = new mui.DtPicker(options);
                picker.show(function(rs) {
                    self.setValue(rs.text);
                    picker.dispose();
                });
            }, false);
        },
        type: 'datepicker',
        getModule: function() {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                format: this.format,
                value: this.value
            };
        }
    });
    register(DatePicker, 'ep-mui-datepicker');

    var ComboBox = function(dom) {
        ComboBox.super.constructor.call(this, dom);
    };

    extend(ComboBox, MControl, {
        _init: function() {
            var optionsJson = this.getAttribute('data-options') || '{}';
            var options = epm.parseJSON(optionsJson);
            var opts = {};
            var data = this.getAttribute('data');

            if (options.buttons) {
                opts.buttons = options.buttons;

                delete options.buttons;
            }

            this.options = options;

            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');

            var self = this;
            this.picker = new mui.PopPicker(opts);

            // 客户端设置数据源
            if (data) {
                data = epm.parseJSON(data);
                this.setData(data);
            }
            this.el.addEventListener('tap', function(event) {
                self.picker.show(function(items) {
                    self.setValue(items[0].value);
                });
            }, false);

            // 绑定change事件，在值改变时同步text
            this.picker.body.addEventListener('change', function(e) {
                var item = e.detail.item,
                    text = item.text,
                    value = item.value;

                self.setText(text);
                self.value = value;
            });
        },
        type: 'combobox',
        setText: function(text) {
            this.el.innerText = text;
            this.text = text;
        },
        getText: function() {
            return this.text;
        },
        setValue: function(value) {
            this.value = value;

            if (this.picker.pickers[0]) {
                this.picker.pickers[0].setSelectedValue(value);
            }
        },
        setData: function(data) {
            this.data = data;
            this.picker.setData(data);
        },
        getData: function() {
            return this.data;
        },
        getModule: function() {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                value: this.value,
                dataOptions: this.options
            };
        }
    });
    register(ComboBox, 'ep-mui-combobox');

    var RadioButtonList = function(dom) {
        RadioButtonList.super.constructor.call(this, dom);
    };

        extend(RadioButtonList, MControl, {
        type: 'radiobuttonlist',
        _init: function() {
            var data = this.getAttribute('data');
            this.bind = this.getAttribute('bind');
            this.action = this.getAttribute('action');

            // 客户端设置数据源
            if (data) {
                data = epm.parseJSON(data);
                this.setData(data);
            }
        },
        _templ: '<div class="mui-input-row mui-radio"><label>{{text}}</label><input type="radio" name="{{name}}" value="{{value}}" {{#checked}}checked="checked"{{/checked}}></div>',
        setData: function(data) {
            var html = [];
            var val = this.value;

            for (var i = 0, l = data.length; i < l; i++) {
                if (val && val === data[i].value) {
                    data[i].checked = true;
                }
                data[i].name = this.id;
                html.push(Mustache.render(this._templ, data[i]));
            }
            this.el.innerHTML = html.join('');

            this.radios = mui('input[type="radio"]', this.el);

            // 绑定radio的change事件，保证value与radio的值一致
            var self = this;
            this.radios.each(function(index, item){
                item.addEventListener('change', function(e) {
                    self.value = e.target.value;
                });
            });

        },
        setValue: function(value) {
            this.value = value;

            if (this.radios) {
                var radios = this.radios;
                for (var i = 0, l = radios.length; i < l; i++) {
                    if (radios[i].value == value) {
                        radios[i].checked = true;
                        break;
                    }
                }
            }
        },
        getModule: function() {
            return {
                id: this.id,
                type: this.type,
                bind: this.bind,
                action: this.action,
                value: this.value
            };
        }
    });
    register(RadioButtonList, 'ep-mui-radiobuttonlist');

    var CheckboxList = function(dom) {
        CheckboxList.super.constructor.call(this, dom);
    };

    extend(CheckboxList, RadioButtonList, {
        type: 'checkboxlist',
        _templ: '<div class="mui-input-row mui-checkbox"><label>{{text}}</label><input type="checkbox" value="{{value}}" {{#checked}}checked="checked"{{/checked}}></div>',
        setData: function(data) {
            var html = [];
            var val = this.value;

            if (val) {
                val = ',' + val + ',';
            }

            for (var i = 0, l = data.length; i < l; i++) {
                if (val && val.indexOf(',' + data[i].value + ',') > -1) {
                    data[i].checked = true;
                }
                html.push(Mustache.render(this._templ, data[i]));
            }
            this.el.innerHTML = html.join('');

            this.checkboxs = mui('input[type="checkbox"]', this.el);

            // 绑定checkbox的change事件，保证value与checkbox的值一致
            var self = this;
            this.checkboxs.each(function(index, item){
                item.addEventListener('change', function(e) {
                    var target = e.target,
                    value;

                    if(target.checked) {
                        if(self.value) {
                            self.value += ',';
                        }

                        self.value += target.value;
                    } else {
                        value = ',' + self.value + ',';
                        value = value.replace(',' + target.value + ',', ',');

                        self.value = value.substr(1, value.length - 1);
                    }

                });
            });
        },
        setValue: function(value) {
            this.value = value;
            value = ',' + value + ',';

            if (this.checkboxs) {
                var checkboxs = this.checkboxs;
                for (var i = 0, l = checkboxs.length; i < l; i++) {
                    if (value.indexOf(checkboxs[i].value) > -1) {
                        checkboxs[i].checked = true;
                    }
                }
            }
        }
    });
    register(CheckboxList, 'ep-mui-checkboxlist');

    var OutputText = function(dom) {
        OutputText.super.constructor.call(this, dom);
    };
    extend(OutputText, MControl, {
        type: 'outputtext',
        _init: function() {
            this.bind = this.getAttribute('bind');
            this.options = this.getAttribute('data-options');
            if (this.options) {
                this.options = epm.parseJSON(this.options);
            }
        },
        setValue: function(value) {
            this.value = value;

            this.el.innerText = value;
        },
        getModule: function() {
            // 展示类的控件，不需要把value传回后台
            return {
                id: this.id,
                type: this.type,
                bind: this.bind
            };
        }
    });
    register(OutputText, 'ep-mui-outputtext');

    var List = function(dom) {
        List.super.constructor.call(this, dom);
    };

    extend(List, MControl, {
        type: 'datagrid',

        _init: function() {
            var tplNode = this.el.children,
                fields = this.getAttribute('fields'),
                onItemRender = this.getAttribute('onitemrender'),
                onItemClick = this.getAttribute('onitemclick');

            this.action = this.getAttribute('action');
            this.url = this.getAttribute('url');
            this.pageSize = parseInt(this.getAttribute('pageSize'));
            this.extraId = this.getAttribute('extraId');
            this.idField = this.getAttribute('idField');

            this.columns = [];

            if (tplNode[0]) {
                tplNode[0].id = '{{' + this.idField + '}}';
                this.template = tplNode[0].outerHTML.trim();

            }

            // 根据fields生成columns
            if (fields) {
                fields = fields.split(',');
                for (var i = 0, l = fields.length; i < l; i++) {
                    this.columns.push({
                        fieldName: fields[i]
                    });
                }
            }

            if (onItemRender && typeof window[onItemRender] == 'function') {
                this.onItemRender = window[onItemRender];
            }
            if (onItemClick && typeof window[onItemClick] == 'function') {
                this.onItemClick = window[onItemClick];
            }

            this.el.innerHTML = '';

            // 如果配置了pageSize，则说明有分页，自动绑定分页效果
            if (this.pageSize > 0) {
                var container = epm.closest(this.el, 'mui-scroll-wrapper');
                // 未配置下拉刷新的容器，则自动将.mui-content设为下拉容器
                if (!container) {
                    container = mui('.mui-content')[0];
                    // 构建最外层容器
                    if (container) {
                        container.classList.add('mui-scroll-wrapper');
                    }
                }
                if (!container.id) {
                    container.id = epm.generateId('pullrefresh');
                }
                this.scrollId = container.id;

                // 列表外包裹.mui-scroll的div
                var div = document.createElement('div');
                div.className = 'mui-scroll';

                this.el.parentNode.replaceChild(div, this.el);
                div.appendChild(this.el);

                // 绑定上拉加载事件
                this.initPullRefresh();

            }
        },
        /*
         * 设置数据
         * @params isRefresh 是否是刷新，为true时刷新整个列表，false则加载下一页
         */
        setData: function(data, isRefresh) {
            var html = [],
                item,
                div = document.createElement('div');

            for (var i = 0, l = data.length; i < l; i++) {
                // if (this.leafTemplate && data[i].isLeaf) {
                // item = Mustache.render(this.leafTemplate, data[i]);
                // } else {
                // item = Mustache.render(this.template, data[i]);
                // }
                if (this.onItemRender) {
                    item = this.onItemRender.call(this, data[i]);
                } else {
                    item = Mustache.render(this.template, data[i]);
                }
                if (isRefresh) {
                    html.push(item);
                } else {
                    div.innerHTML = item;

                    this.el.appendChild(div.childNodes[0]);
                }

            }

            if (isRefresh) {
                this.el.innerHTML = html.join('');
            }
        },

        setTotal: function(total) {
            this.total = total;
        },

        setUrl: function(url) {
            this.url = url;
            // url更新后需要同时更新对应pullToRefresh的url
            // 由于pullToRefresh的初始化是异步的，所以用一个变量来表示pullToRefresh的url是否与控件的url一致
            this._needUpdatePullRefreshUrl = true;
            if (this.pullToRefresh) {
                this.pullToRefresh.options.bizlogic.getUrl = url;
                this._needUpdatePullRefreshUrl = false;
            }
        },

        initPullRefresh: function() {
            var self = this;
            // 获得请求参数的回调
            var getData = function(pageIndex) {

                self.pageIndex = pageIndex;

                var data = {};

                if (self.onGetRequestData) {
                    data = self.onGetRequestData();
                }
                
                return data;
            };
            // 处理后台返回数据
            var changeResponseDataCallback = function(data) {
                data = epm.getSecondRequestData(data);
                return data;
            };
            // 数据请求成功回调
            var successRequestCallback = function(data, isRefresh) {

                var total = data.total;
                data = data.data;

                self.setTotal(total);

                self.setData(data, isRefresh);

                if (total <= self.pageSize * (self.pageIndex + 1)) {
                    self.pullToRefresh.isShouldNoMoreData = false;
                }

            };

            // 点击回调
            var onClickCallback = function(e) {
                if (self.onItemClick) {
                    self.onItemClick.call(this, e, this.id);
                }
            };

            // 初始化下拉刷新是异步进行的,回调后才代表下拉刷新可以使用
            // 因为用了sea.js中的require.async
            PullToRefreshTools.initPullDownRefresh({
                isDebug: true,
                bizlogic: {
                    defaultInitPageNum: 0,
                    getLitemplate: this.template,
                    getRequestDataCallback: getData,
                    itemClickCallback: onClickCallback,
                    changeResponseDataCallback: changeResponseDataCallback,
                    successRequestCallback: successRequestCallback,
                    listdataId: this.id,
                    pullrefreshId: this.scrollId,
                    isRendLitemplateAuto: false
                },
                skin: 'default'
            }, function(obj) {
                self.pullToRefresh = obj;
                if (self._needUpdatePullRefreshUrl) {
                    self.pullToRefresh.options.bizlogic.getUrl = self.url;
                }
            });
        },
        getModule: function() {
            var data = {
                id: this.id,
                type: this.type,
                action: this.action,
                columns: this.columns,
                idField: this.idField,
                isSecondRequest: false
            };

            if(this.pageSize > 0) {
                data.pageSize = this.pageSize;
                data.pageIndex = this.pageIndex;
            }
            return data;
        }
    });
    register(List, 'ep-mui-list');
    
    return {
        // 扫描页面，初始化所有控件·
        init: function(callback) {
            var controls = document.querySelectorAll('[class^="ep-mui-"]'),
                clazz,
                control;
            for (var i = 0, l = controls.length; i < l; i++) {
                clazz = getControlClazz(controls[i]);

                if (clazz) {
                    control = new clazz(controls[i]);
                    epm.set(control.id, control);

                    if(callback) {
                        callback(control);
                    }
                }
            }
        }
    };
});
