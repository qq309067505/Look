# Look
一个自定义非常强大又简约漂亮的弹窗

预览地址：
http://api.quyikai.com/look2.0/

EVENT

窗口打开：onOpen


窗口关闭：onClose


点击遮罩层：clickScreen


点击确定：ok(仅适用于alert类型)


点击确定/关闭：yes/no(仅适用于其他类型)

(更多按钮请参考下面的：buttons)



ATTRIBUTE

图标：icon [string] 可选值： success | error | info | doubt | lock | face-success | face-error


标题：title [string]


弹窗内容：content [string]


层级：zIndex [string | number]


高度：height [string | number] （string类型需要加单位，例如：'px'）


宽度：width [string | number] （string类型需要加单位，例如：'px'）


最大宽度：maxWidth [string | number] （string类型需要加单位，例如：'px'）


最大高度：maxHeight [string | number] （string类型需要加单位，例如：'px'）


最小宽度：minWidth [string | number] （string类型需要加单位，例如：'px'）


最小高度：minHeight [string | number] （string类型需要加单位，例如：'px'）


动画类型：animateType [string] （默认：elastic） 可选值：elastic(有弹性) | shake(抖动) | move(移动) | zoom(缩放) | rotate(旋转) | gradually(逐渐的) | none(无动画)


窗口定位：position [object] （注：需要将direction设置为false才能起作用） 可选值：遵循css规则


窗口位置（不可与窗口定位同时使用）：direction [string] （默认：center）可选值：top | bottom | left | right | leftTop | rightTop | leftBottom | rightBottom


窗口缩放时，是否重新定位：windowResize [boolean] 默认：true


自定义按钮：buttons [array] 例如： { text:string, click:function, type:"green | blue | red" }


开启标题栏：titleBar [boolean] 默认：true


要显示的头部按钮：titleBarButtons [array] 可选值：close | small | large


显示遮罩：showScreen [boolean] 默认：true


点击遮罩层时，是否关闭弹窗：clickScreenClose [boolean] 默认：false


是否去除页面滚动条：isHideBar [boolean] 默认：false


ps：还有一些比较深的属性没写，如有需要，以后再贴
