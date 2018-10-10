'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var LOOK = {
    zIndex: 100000
};





var Look = function Look() {
    this.defaultConfig = {
        left: 0,
        top: 0,
        width: 0,
        maxWidth: 0,
        height: 0,
        maxHeight: 0
    };
    this.container = "body";
    this.type = "text";
    this.icon = "" //  success|error|info|doubt|lock|face-success|face-error
    this.src = ""; // 只适用与iframe类型
    this.title = "温馨提示";
    this.content = ""; // 需要提醒的文字 不适用与iframe类型
    this.zIndex = null;
    this.height = "auto";
    this.width = "auto";
    this.minHeight = "auto";
    this.minWidth = "auto";
    this.maxHeight = "100%";
    this.maxWidth = "100%";
    this.animateType = "elastic"; // 默认elastic(有弹性)|shake(抖动)|move(移动)|zoom(缩放)|rotate(旋转)|gradually(逐渐的)|none(无动画)
    this.position = {}; // 弹窗定位 遵循css规则
    this.direction = "center"; //默认center 弹窗出现的方向 top/bottom/left/right/leftTop/rightTop/leftBottom/rightBottom
    this.windowResize = true; // 页面窗口变化的时候 重新设置大小 重新定位
    this.buttons = []; // 按钮的数组  {text:xxx,click:xxx,type:"green/blue/red"}
    this.titleBar = true; //是否渲染标题栏
    this.titleButtons = { // 头部按钮 close/small/large
        small: function small(that) {
            that.isMinSize ? that.reSize() : that.minSize();
        },
        large: function large(that) {
            that.isMaxSize ? that.reSize() : that.maxSize();
        },
        close: function close(that) {
            that.close(that);
        }
    };
    this.titleBarButtons = ["close"]; // 要显示的头部按钮 close/small/large
    this.autoClose = false; // 自动关闭  可以传毫秒数
    this.onClose = null;
    this.onOpen = null;
    this.buttonBar = true; //是否渲染按钮栏
    //可以写成对象配置遮罩层样式 遵循css规则 如果为null 则不渲染遮罩层
    this.showScreen = true; // 是否显示遮罩
    this.clickScreen = null; //点击遮罩层时的回调
    this.clickScreenClose = false; //点击遮罩层时 是否关闭弹窗
    this.style = null;
    this.isHideBar = false; // 是否去掉页面的滚动条

    this.wraphtml = {}; // wrap包裹的html结构
    this.isMaxSize = false; // 当前是否为全屏状态
    this.isMinSize = false; // 当前是否为最小化状态
    this.minWindowWidth = 150; // 最小化后的宽度
    this.isMove = false; // 是否手动移动过当前弹窗
    this.loadingImg = "data:image/png;base64,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"
};

Look.prototype.confirm = function (_config) {
    !_config && (_config = {});
    var that = this;
    var confirm = {
        type: "confirm",
        titleBar: false,
        minHeight: 100,
        minWidth: 200,
        maxWidth: "80%",
        content: _config.content || "",
        buttons: [{
            text: "确定",
            // type: "green",
            close: true,
            click: function click() {
                that.yes && that.yes();
            }
        }, {
            text: "关闭",
            close: true,
            click: function click() {
                that.no && that.no();
            }
        }]
    };
    switch (_config.skin) {
        case "0":
            confirm.minWidth = "auto";
            confirm.showScreen = false;
            confirm.titleBar = false;
            break;
    }

    if (typeof _config != "object") {
        confirm.content = _config;
    } else {
        $.extend(confirm, _config);
    }

    this.init(confirm);
    return this;
};
Look.prototype.prompt = function (_config) {
    !_config && (_config = {});
    var that = this;

    var prompt = {
        type: "prompt",
        titleBar: false,
        minHeight: 100,
        minWidth: 200,
        maxWidth: "80%",
        content: _config.content || "",
        buttons: [{
            text: "确定",
            // type: "green",
            click: function click() {
                that.value = that.$self.find(".look-input").val();
                that.yes && that.yes();
            }
        }, {
            text: "关闭",
            close: true,
            click: _config.no
        }]
    };
    switch (_config.skin) {
        case "0":
            prompt.minWidth = "auto";
            prompt.showScreen = false;
            prompt.titleBar = false;
            break;
    }

    if (typeof _config != "object") {
        prompt.content = _config;
    } else {
        $.extend(prompt, _config);
    }

    this.init(prompt);
    return this;
};
Look.prototype.alert = function (_config) {
    !_config && (_config = {});
    var that = this;
    var alert = {
        type: "alert",
        titleBar: false,
        minHeight: 100,
        minWidth: 200,
        maxWidth: "80%",
        content: _config.content || "",
        height: "auto",
        buttons: [{
            text: "确定",
            // type: "blue",
            close: true,
            click: function click() {
                that.ok && that.ok();
            }
        }]
    };
    switch (_config.skin) {
        case "0":
            alert.minWidth = "auto";
            alert.showScreen = false;
            alert.titleBar = false;
            break;
    }

    if (typeof _config != "object") {
        alert.content = _config;
    } else {
        $.extend(alert, _config);
    }

    this.init(alert);
    return this;
};
Look.prototype.msg = function (_config) {
    var that = this;
    this.close('msg');
    var msg = {
        type: "msg",
        skin: "0",
        // minHeight: 100,
        minWidth: 100,
        maxWidth: 200,
        direction: "top",
        titleBar: false,
        buttonBar: false,
        showScreen: false,
        width: "auto",
        content: _config && _config.content || "",
        autoClose: 1500
    };

    if (typeof _config != "object") {
        msg.content = _config;
    } else {
        $.extend(msg, _config);
    }

    this.init(msg);
    return this;
};
Look.prototype.success = function (_config) {
    var that = this;
    var success = {
        icon: "face-success",
    };
    if (typeof _config != "object") {
        success.content = _config;
    } else {
        $.extend(success, _config);
    }
    
    return this.msg(success);
};
Look.prototype.error = function (_config) {
    var that = this;
    var error = {
        icon: "face-error",
        animateType: "shake",
        direction: "center"
    };
    if (typeof _config != "object") {
        error.content = _config;
    } else {
        $.extend(error, _config);
    }
    
    return this.msg(error);;
};
Look.prototype.loading = function (_config) {
    var that = this;
    var loadingImg = "<img class='loading-img' src='" + this.loadingImg + "' />";
    var loading = {
        type: "loading",
        skin: "0",
        minHeight: 40,
        // minWidth: 100,
        maxHeight: "80%",
        maxWidth: "80%",
        titleBar: false,
        buttonBar: false,
        showScreen: {
            background: "none"
        },
        content: loadingImg
    };

    if (typeof _config != "object") {
        loading.content = loadingImg + (_config ? ("<p>" + _config + "</p>") : "");
    } else {
        $.extend(loading, _config);
        loading.content = loadingImg + (_config.content ? ("<p>" + _config.content + "</p>") : "");
    }

    this.init(loading);
    return this;
};
Look.prototype.wrap = function (_config) {
    !_config && (_config = {});
    // this.titleBarButtons = ["close", "small", "large"];
    var wrap = {
        type: "wrap",
        skin: 0,
        zIndex: 1000
    };
    if (typeof _config == "object" && _config.dom) {
        $.extend(wrap, _config);
    } else {
        wrap.dom = _config;
    }
    this.init(wrap);
    return this;
};
Look.prototype.iframe = function (_config) {
    !_config && (_config = {});
    // this.titleBarButtons = ["close", "small", "large"];
    var iframe = {
        type: "iframe",
        titleBar: false
        // titleBarButtons: this.titleBarButtons
    };

    if (typeof _config != "object") {
        iframe.src = _config;
    } else {
        $.extend(iframe, _config);
    }


    this.init(iframe);
    return this;
};

Look.prototype.init = function (config) {
    $.extend(this, config);
    this.render();
    this.rewindow();
    return this;
};

// 开始渲染弹窗结构到容器(默认body)中
Look.prototype.render = function () {
    this.lookId = this.randomNum(5);
    if (this.type != "wrap") {
        var html = this.create.getHtml(this);
        var container = $(this.container);
        container.append(html);
    } else {
        this.dom = typeof this.dom == "string" ? $(this.dom) : this.dom;
        if (this.dom && this.dom.parent(".look-body").length > 0) {
            // 如果wrap已经被包裹 则不再继续
            return this;
        }
        this.create.createWrap(this);
    }
    this.$self = this.getSelf();
    var that = this;
    this.style && this.$self.find(".look-box").css(this.style);
    if (this.isHideBar) {
        this.hideWindowBar();
    };
    that.renderComplete && that.renderComplete();

};

Look.prototype.setDefaultConfig = function () {
    var body_h = this.$self.find('.look-body')[0].innerHeight || 0;
    this.defaultConfig.height = body_h;
};

// 隐藏页面滚动条
Look.prototype.hideWindowBar = function () {
    !this.defHideBar && (this.defHideBar = $('html').css('overflow'));
    $('html').css('overflow', 'hidden');
};

// 恢复页面滚动条
Look.prototype.reWindowBar = function () {
    !this.defHideBar && (this.defHideBar = 'visible');
    $('html').css('overflow', this.defHideBar);
};




// 渲染完成
Look.prototype.renderComplete = function () {

    var that = this;


    // 先开始逐个去绑定事件
    this.bindEvent();

    // 再显示弹窗
    this.open();

    // 再配置大小
    this.autoSize();

    // 然后开始定位
    this.setPosition();



    // 记录最初始的大小，以便恢复大小
    this.setDefaultConfig();

    // 如果是ie7
    // this.ISIE(7, function () {
    //     setTimeout(function () {
    //         // 然后开始定位
    //         that.setPosition();
    //         // 再配置大小
    //         that.autoSize();
    //     }, 10);
    // });
    return this;
};

// 渲染完成去自动配置大小
Look.prototype.autoSize = function () {
    var that = this;
    var defaultConfig = this.defaultConfig;
    // that.IE(function () {
    // var de_box_h = that.$self.find(".look-box").height() || 300;
    // var de_box_w = that.$self.find(".look-box").outerWidth() || 300;
    var offset = that.$self.find(".look-box").offset();
    // (!that.height || that.height == "auto") && (that.height = de_box_h);
    // (!that.width || that.width == "auto") && (that.width = de_box_w);
    that.$self.find(".look-box").css({
        height: that.height,
        maxHeight: that.maxHeight,
        minHeight: that.minHeight,
        width: that.width,
        minWidth: that.minWidth,
        maxWidth: that.maxWidth
    });

    var $self = this.$self;
    var box = $self.find('.look-box');
    var head_h = box.find('.look-head').height() || 0;
    var floor_h = box.find('.look-floor').height() || 0;
    var box_h = box.height() || 0;
    var body_h = box_h - (head_h + floor_h);

    that.$self.find(".look-box .look-body").css({
        height: defaultConfig.height || body_h
    });
    // that.IE(function () {
    //     that.IE(function () {
    // var head_h = that.$self.find(".look-head").height() || 0;
    // var floor_h = that.$self.find(".look-floor").height() || 0;
    // var box_h = parseInt(that.height);
    // if ((that.height + "").indexOf("%") != -1 || that.height == "auto") {
    //     box_h = that.$self.find(".look-box").height();
    // }
    // var body_h = box_h - (head_h + floor_h);

    // 如果是ie 则去除多余的padding高度
    // if (that.ISIE(7)) {
    //     body_h -= (that.$self.find(".look-body").innerHeight() - that.$self.find(".look-body").height())

    //     console.log(body_h)
    // }
    // if (that.type == "iframe" || that.type == "wrap") {
    // if (that.height != "auto" || that.height) {
    //     that.$self.find(".look-box .look-body").css("height", body_h);
    // }
    if (!$.isEmptyObject(that.showScreen) && typeof that.showScreen != "boolean") {
        that.$self.find(".look-screen").css(that.showScreen);
    }
    // });
    //     });
    // });



    return that;

};



// 返回.look-container唯一自身
Look.prototype.getSelf = function () {
    return $(".look-container[data-id='" + this.lookId + "']");
}

// 当窗口变化时 重置定位与大小
Look.prototype.rewindow = function () {
    var that = this;
    if (this.windowResize) {
        var setEventName = this.eventName = 'lookResize' + that.lookId;

        $(window).on(setEventName, function () {

                if (that.isMaxSize || that.isMinSize) return;
                // 重新配置大小
                that.autoSize();

                //  重新开始定位
                that.setPosition();
            })
            .resize(function () {
                $(this).trigger(setEventName);
            });
    }

    return this;
}



// 给所有能点的 都加上事件
Look.prototype.bindEvent = function () {
    var $self = this.$self;
    var buttons = this.buttons;
    var that = this;

    // 给所有按钮加上事件
    if (this.buttonBar) {
        $self.find(".look-floor .look-floor-btns .floor-btn").each(function (index) {
            var btn = buttons[index];
            var callback = btn.click;
            $(this).click(function () {
                if (btn.close) {
                    that.close();
                }
                callback && callback(that, btn);
            });
        });
    };

    // 给标题按钮加事件
    $self.find(".look-head .title-btn").each(function () {
        $(this).click(function (e) {
            e.stopPropagation();
            var type = $(this).data("type");
            that.titleButtons[type] && that.titleButtons[type](that);
        });
    });

    $self.find(".mini-close").click(function () {
        var type = $(this).data("type");
        that.titleButtons.close && that.titleButtons.close(that);
    });

    // 给遮罩加点击事件
    $self.find(".look-screen").each(function () {
        $(this).click(function () {
            that.clickScreen && that.clickScreen(that);
            if (that.clickScreenClose) {
                that.close();
            }
        });
    });

    // 点击标题恢复最小化原始大小
    $self.find(".look-head").click(function () {
        if (that.isMinSize) {
            $self.removeClass('look-minsize');
            that.reSize();
        }
    });

    this.mousePull($self.find(".look-head"), $self.find(".look-box"));
    return this;
};


// 最小化
Look.prototype.minSize = function () {
    var $self = this.$self;

    var minsize = $(".look-container[minSize=true]");
    var sumLeft = $self.index('.look-container') * this.minWindowWidth;

    $self.find(".look-box").css({
        height: "auto",
        maxHeight: "auto",
        minHeight: "auto",
        width: this.minWindowWidth,
        left: sumLeft,
        top: "auto",
        bottom: 0,
        right: "auto"
    });
    $self.attr("minSize", true);
    $self.addClass('look-minsize');
    this.isMinSize = true;
    this.isMaxSize = !this.isMinSize;
    return this;
}

// 最大化
Look.prototype.maxSize = function () {
    this.hideWindowBar(); // 隐藏页面滚动条
    var $self = this.$self;
    var that = this;
    var head_h = that.$self.find(".look-head").height() || 0;
    var floor_h = that.$self.find(".look-floor").height() || 0;
    var add_h = (head_h + floor_h);
    var maxHeight = $(window).height() - add_h;
    $self.find(".look-box").css({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: "100%",
        maxHeight: "100%",
        minHeight: "100%"
    }).find(".look-body").css({
        height: maxHeight
    });
    $self.attr("maxSize", true);
    this.isMaxSize = true;
    this.isMinSize = !this.isMaxSize;
    $self.find(".look-head .look-title-btns .icon-large").html("&#xe605;");
    return this;
};
// 恢复大小
Look.prototype.reSize = function () {
    this.reWindowBar(); // 恢复页面滚动条
    var $self = this.$self;
    var that = this;

    $self.find(".look-box").css({
        left: this.position.left || "auto",
        top: this.position.top || "auto",
        right: this.position.right || "auto",
        bottom: this.position.bottom || "auto"
    });

    // 自动配置大小
    this.autoSize();
    // 将全屏状态改为false
    this.isMaxSize = false;
    // 将最小化状态改为false
    this.isMinSize = false;

    $self.attr("maxSize", false);
    $self.attr("minSize", false);
    $self.find(".look-head .look-title-btns .icon-large").html("&#xe616;");
    return this;
};

Look.prototype.open = function () {
    var $self = this.$self;
    var that = this;
    if (this.type == "wrap") {
        this.display = this.dom.css("display");
        this.dom.show();
    }
    // 将最新的显示层叠到最高
    this.maxShow();
    setTimeout(function () {
        $self.removeClass("look-hide");
        that.onOpen && that.onOpen();
        $self.find(".look-body .look-input").focus();
        that.autoClose && that.close(that.autoClose);
    }, 20);
    return this;
};

Look.prototype.close = function (_timeOrId) {
    this.reWindowBar(); // 恢复页面滚动条
    var $self = typeof _timeOrId == "string" ? _timeOrId : this.$self;
    if ($self == "all") {
        $self = $(".look-container");
    } else if (typeof _timeOrId == "string") {
        $self = $(".look-container[data-type='" + _timeOrId + "']");
    }
    var that = this;
    $self.each(function () {
        var othis = $(this);
        var type = othis.data("type");
        if (type == "wrap") {
            that.closeWrap(_timeOrId);
            return true;
        };
        setTimeout(function () {
            othis.addClass("look-hide look-hide-animate");
            setTimeout(function () {
                othis.remove();
                that.eventName && $(window).off(that.eventName);
                that.onClose && that.onClose();
            }, 300);
        }, typeof _timeOrId == "number" ? _timeOrId : 0);
    });
    return this;
};

// 关闭wrap类型的
Look.prototype.closeWrap = function (_timeOrId) {
    var $self = typeof _timeOrId == "string" ? _timeOrId : this.$self;
    if ($self == "all") {
        $self = $(".look-container");
    };
    var that = this;

    $self.each(function () {
        var othis = $(this);
        var type = othis.data("type");
        if (type != "wrap") {
            console.log(type)
            return true;
        };
        setTimeout(function () {
            othis.addClass("look-hide look-hide-animate");
            that.dom = othis.find(".look-body").children();
            setTimeout(function () {
                if (that.dom.parent('.look-body').length == 0) {
                    // 如果父级为look-body的时候再删除包裹元素，防止快速点击而误删其他元素
                    return
                };
                that.dom.unwrap();
                that.dom.prev().remove(".mini-close");
                that.dom.prev().remove(".look-head");
                that.dom.next().remove(".look-floor");
                that.dom.unwrap();
                that.dom.prev().remove(".look-screen");
                that.dom.unwrap();
                that.dom.css("display", that.display);
                that.eventName && $(window).off(that.eventName);
                that.onClose && that.onClose();
            }, 300);
        }, typeof _timeOrId == "number" ? _timeOrId : 0);
    });
    return this;
};

Look.prototype.create = {
    getHtml: function (that) {
        var screen = this.createScreen(that);
        var box = this.createBox(that);
        var container = "<div class=\"look-container look-hide\" data-id=\"" + that.lookId + "\" data-type=\"" + that.type + "\">\n                " + screen + "\n                " + box + "\n            </div>";
        return container;
    },
    createScreen: function (that) {
        if (!that.showScreen) {
            return "";
        }
        var screen = "<div class=\"look-screen\"></div>";
        return screen;
    },
    createIframe: function (that) {
        var iframe = "<iframe src=\"" + that.src + "\"  frameborder=\"0\" width=\"100%\" height=\"100%\" scrolling=\"auto\" ></iframe>";
        return iframe;
    },
    createBox: function (that) {

        var type = that.type || "text";
        var skin = that.skin || "skin";
        var animateType = that.animateType || "elastic";
        var head = this.createHead(that);
        var body = this.createBody(that);
        var floor = this.createFloor(that);
        var box = "<div class=\"look-box " + type + " look-animate-" + animateType + " skin-" + skin + "\"  >\n" + head + "\n" + body + "\n" + floor + "\n</div>";
        return box;
    },
    createHead: function (that) {
        if (!that.titleBar) {
            return "";
        };

        var titleButtonsHtml = "";
        var head = "";
        if (that.skin == "0") {
            titleButtonsHtml = this.createMiniCloseBtn(that);
            head = titleButtonsHtml;

        } else {
            titleButtonsHtml = this.createTitleBtns(that);
            head = "<div class=\"look-head\">\n<div class=\"look-title\">" + that.title + "</div>\n<div class=\"look-title-btns\">\n" + titleButtonsHtml + "\n</div>\n</div>";

        };
        return head;
    },
    createBody: function (that) {
        var type = that.type || "text";
        var cont = "";
        var icon = that.icon;
        switch (type) {
            case "iframe":
                cont = this.createIframe(that);
                break;
            case "prompt":
                cont = this.createInput(that);
                break;
            default:
                cont = that.content;
        };
        if (typeof cont == "object") {
            (cont = JSON.stringify(cont));
        }

        if (icon) {
            cont = '<div class="look-icon look-bg icon-' + icon + '"></div>' + cont
        }
        var ispadding = icon ? 'look-padding' : '';

        var body = "<div class=\"look-body " + ispadding + "\">" + cont + "</div>";
        return body;
    },
    createFloor: function (that) {
        if (!that.buttonBar || !that.buttons || that.buttons.length == 0) {
            return "";
        }
        var btnhtml = this.createBtns(that);
        var floor = "<div class=\"look-floor\">\n<div class=\"look-floor-btns\">\n" + btnhtml + "\n</div>\n</div>";
        return floor;
    },
    createBtns: function (that) {

        var buttons = that.buttons;
        var btnhtml = "";

        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            var type = btn.type || "";
            btnhtml += '<div class="floor-btn ' + type + ' ">' + btn.text + '</div>';
        };
        return btnhtml;
    },
    createTitleBtns: function (that) {
        var titleButtonsHtml = "";
        var titleButtons = that.titleButtons;
        var iconfont = "&#xe685;"; //关闭图标
        for (var key in titleButtons) {
            if (that.titleBarButtons != "all") {
                var isBtn = $.inArray(key, that.titleBarButtons) != -1;
                if (!isBtn) {
                    continue;
                }
            }
            var val = titleButtons[key];
            switch (key) {
                case "close":
                    iconfont = "&#xe685;";
                    break;
                case "large":
                    iconfont = "&#xe616;";
                    break;
                case "large-copy":
                    iconfont = "&#xe605;";
                    break;
                case "small":
                    iconfont = "&#xe71f;";
                    break;
            };
            titleButtonsHtml += '<div class="title-btn ' + key + ' " data-type="' + key + '" ><i class="look-iconfont icon-' + key + '">' + iconfont + '</i> </div>';
        };
        return titleButtonsHtml;
    },
    createMiniCloseBtn: function (that) {
        return "<div class=\"mini-close look-bg\"></div>";
    },
    createInput: function (that) {
        !that.value && (that.value = "");
        $.isEmptyObject(that.content) && (that.content = "");
        var html = "\n        <p>" + that.content + "</p>\n        <input class=\"look-input\" value=\"" + that.value + "\" />\n        ";
        return html;
    },
    createWrap: function (that) {
        if (!that.dom) {
            return that;
        };
        // that.dom = typeof that.dom == "string" ? $(that.dom) : that.dom;
        var dom = that.dom;

        var animateType = that.animateType || "elastic";
        var titleButtons = that.titleButtons;
        var iconfont = "&#xe685;"; //关闭图标
        var btnhtml = this.createBtns(that);
        var container = that.wraphtml.container = $("<div class=\"look-container look-hide\" data-id=\"" + that.lookId + "\" data-type=\"" + that.type + "\"></div>");
        var screen = that.wraphtml.screen = $(this.createScreen(that));
        var box = that.wraphtml.box = $("<div class=\"look-box wrap " + " look-animate-" + animateType + " \" ></div>");
        var head = that.wraphtml.head = $(this.createHead(that));
        var body = that.wraphtml.body = $(this.createBody(that));
        var floor = that.wraphtml.floor = $(this.createFloor(that));
        // var screen = $("<div class=\"look-screen\"></div>");
        dom.wrap(container).wrap(box).before(head).after(floor).wrap(body);
        dom.parents(".look-container[data-id='" + that.lookId + "']").prepend(screen);

    }
};

// 配置定位
Look.prototype.setPosition = function (_position) {

    var position = _position || this.position;
    // 只有将direction设置为false position里面的定位才会生效
    var direction = this.direction;

    var that = this;
    var e = that.$self.find(".look-box");
    var w = $(window).width(),
        h = $(window).height();
    var thisW = e[0].offsetWidth;
    var thisH = e[0].offsetHeight;
    var container = $(this.container);
    // var _eTop = container[0].scrollTop;
    // var _eLeft = container[0].scrollLeft;
    var centerX = (w - thisW) / 2; // 水平居中
    var centerY = (h - thisH) / 2; // 垂直居中
    var right = w - thisW;
    var bottom = h - thisH;
    if (direction) {
        switch (direction) {
            case "top":
                e.css({
                    'left': centerX,
                    'top': 0
                });
                that.position.left = centerX;
                that.position.top = 0;
                break;
            case "bottom":
                e.css({
                    'left': centerX,
                    'top': bottom
                });
                that.position.left = centerX;
                that.position.top = bottom;
                break;
            case "left":
                e.css({
                    'top': centerY,
                    'left': 0
                });
                that.position.left = 0;
                that.position.top = centerY;
                break;
            case "right":
                e.css({
                    'top': centerY,
                    'left': right
                });
                that.position.left = right;
                that.position.top = centerY;
                break;
            case "leftTop":
                e.css({
                    'top': 0,
                    'left': 0
                });
                that.position.left = 0;
                that.position.top = 0;
                break;
            case "rightTop":
                e.css({
                    'top': 0,
                    'left': right
                });
                that.position.left = right;
                that.position.top = 0;
                break;
            case "leftBottom":
                e.css({
                    'top': bottom,
                    'left': 0
                });
                that.position.left = 0;
                that.position.top = bottom;
                break;
            case "rightBottom":
                e.css({
                    'top': bottom,
                    'left': right
                });
                that.position.left = right;
                that.position.top = bottom;
                break;
            default:
                e.css({
                    'left': centerX,
                    'top': centerY
                });
                that.position.left = centerX;
                that.position.top = centerY;
                break;
        }
    } else {
        e.css(position);
    }


    return this;
};

// 将最新的显示层叠到最高
Look.prototype.maxShow = function () {
    LOOK.zIndex++;
    var zIndex = LOOK.zIndex;
    this.zIndex && (zIndex = this.zIndex);
    this.$self.find(".look-box").css("z-index", zIndex);
    this.$self.find(".look-screen").css("z-index", zIndex);
};

//拖拽
Look.prototype.mousePull = function (click, move) {
    //要点击的id，要拖动的id

    var isDown = false;
    var that = this;

    var box_X = 0;
    var box_Y = 0;

    click.click(function (e) {
        e.stopPropagation();
    });

    //按下后记录相对位置
    click.mousedown(function (e) {
        // 将最新的显示层叠到最高
        that.maxShow();

        var isMaxSize = that.isMaxSize;
        var isMinSize = that.isMinSize;
        if (isMaxSize || isMinSize) {
            isDown = false;
            return that;
        }

        box_X = e.pageX - move.offset().left + $(window).scrollLeft();
        box_Y = e.pageY - move.offset().top + $(window).scrollTop();
        move.css({
            right: that.position.right || "auto",
            bottom: that.position.bottom || "auto",
            left: move[0].offsetLeft,
            top: move[0].offsetTop
        });
        //asd
        isDown = true;
    });

    $(document).mousemove(function (e) {
        var rt = $(document).width() - (e.pageX + move.width() - box_X);
        var lf = e.pageX - box_X;
        var top = $(document).height() - (e.pageY + move.height() - box_Y);
        var bot = e.pageY - box_Y;
        if (isDown == true) {
            if (!that.isMove) {
                that.isMove = true;
            }
            if (rt < 0) {
                that.position.left = $(document).width() - move.width();
                move.css('left', that.position.left + 'px');
            } else if (lf < 0) {
                move.css('left', 0);
                that.position.left = 0;
            } else {
                that.position.left = e.pageX - box_X;
                move.css('left', that.position.left + 'px');
            }
            if (top < 0) {
                that.position.top = $(document).height() - move.height();
                move.css('top', that.position.top + 'px');
            } else if (bot < 0) {
                move.css('top', 0);
                that.position.top = 0;
            } else {
                that.position.top = e.pageY - box_Y;
                move.css('top', that.position.top + 'px');
            }
        };
    });
    $(document).mouseup(function (e) {
        isDown = false;
    });
};

Look.prototype.randomNum = function (len) {
    var m = "";
    for (var i = 0; i < len; i++) {
        m += Math.floor(Math.random() * 10);
    }
    return m;
};

// 校验ie 如果不传 则校验是不是ie  如果传参数 7，8，9，10，11 则校验是不是对应的ie版本
Look.prototype.ISIE = function (_ver, callback) {
    var ie = navigator.appName == "Microsoft Internet Explorer"; //是否IE
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    callback && callback();
    return _ver ? fIEVersion == _ver : ie;
};

Look.prototype.IE = function (_callback) {
    if (this.ISIE()) {
        setTimeout(function () {
            _callback && _callback();
        }, 0);
    } else {
        _callback && _callback();
    }
};

window.look = new Look();

window.look.msg = function (_obj) {
    var msg = new Look();
    msg.msg(_obj);
    return msg;
};
window.look.success = function (_obj) {
    var success = new Look();
    success.success(_obj);
    return success;
};
window.look.error = function (_obj) {
    var error = new Look();
    error.error(_obj);
    return error;
};
window.look.alert = function (_obj) {
    var alert = new Look();
    alert.alert(_obj);
    return alert;
};
window.look.confirm = function (_obj) {
    var confirm = new Look();
    confirm.confirm(_obj);
    return confirm;
};
window.look.prompt = function (_obj) {
    var prompt = new Look();
    prompt.prompt(_obj);
    return prompt;
};
window.look.iframe = function (_obj) {
    var iframe = new Look();
    iframe.iframe(_obj);
    return iframe;
};
window.look.wrap = function (_obj) {
    var wrap = new Look();
    wrap.wrap(_obj);
    return wrap;
};