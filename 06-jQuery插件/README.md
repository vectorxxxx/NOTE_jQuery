> 笔记来源：[尚硅谷jQuery教程(jquery从入门到精通)](https://www.bilibili.com/video/BV1ts411E7ag)

[TOC]

# jQuery插件

| 插件机制             | 描述                                                 |
| :------------------- | :--------------------------------------------------- |
| `jQuery.fn.extend()` | 扩展 jQuery 元素集来提供新的方法（通常用来制作插件） |
| `jQuery.extend()`    | 扩展jQuery对象本身                                   |



## 1、自定义 jQuery 插件

---

**my_jQuery-plugin.js**

```js
// 1.给添加4个工具方法：
//      *min(a,b)：返回较小的值
//      *max(c,d)：返回较大的值
//      *leftTrim()：去掉字符串左边的空格
//      *rightTrim()：去掉字符串右边的空格
// 2.给jQuery对象添加3个功能方法：
//      *checkAll()：全选
//      *unCheckAll()：全不选
//      *reverseCheck()：全反选

// 立即执行函数
(function () {
    // 扩展$核心函数的方法
    $.extend({
        min: function (a, b) {
            return a < b ? a : b;
        },
        max: function (c, d) {
            return c > d ? c : d;
        },
        leftTrim: function (str) {
            // var blankStr = str.match(/\s+/)[0];
            // return str.substring(blankStr.length, str.length - 1);
            return str.replace(/^\s+/, '');
        },
        rightTrim: function (str) {
            // var blankArr = str.match(/\s+/g);
            // let blankStr = blankArr[blankArr.length - 1];
            // return str.substring(0, blankStr.length);
            return str.replace(/\s+$/, '');
        }
    });
    // 扩展jQuery对象的方法
    $.fn.extend({
        checkAll: function () {
            this.prop('checked', true); // this是调用该方法的对象，所以这里是jQuery对象
        },
        unCheckAll: function () {
            this.prop('checked', false);
        },
        reverseCheck: function () {
            this.each(function () {
                this.checked = !this.checked; // 这里的this是dom对象
            })
        }
    })
})()
```

**调用扩展方法**

```js
// 扩展jQuery的工具方法
console.log($.min(2, 4), $.max(2, 4)); // 2 4
var str = '   ddd      ';
console.log('---' + $.leftTrim(str) + '---');  // ---ddd      ---
console.log('---' + $.rightTrim(str) + '---'); // ---   ddd---

// 扩展jQuery对象的方法
let $items = $(':checkbox[name=items]');
$('#checkedAllBtn').click(function () {
    $items.checkAll();
});
$('#checkedNoBtn').click(function () {
    $items.unCheckAll();
});
$('#reverseCheckedBtn').click(function () {
    $items.reverseCheck();
});
```

**效果**

![扩展插件](https://i.loli.net/2021/09/06/hAiIO8v4zFcPr2K.gif)



## 2、jQuery插件

---

- 基于 jQuery 编写的扩展库
- [http://plugins.jquery.com/](http://plugins.jquery.com/)

### validation

- [https://github.com/jquery-validation/jquery-validation/releases](https://github.com/jquery-validation/jquery-validation/releases)

**HTML 代码**

```html
<form action="xxx" id="myForm">
    <p>用户名（必须，最小6位）：<input id="uname" name="username" type="text" required minlength="6"></p>
    <p>密码（必须，6到8位）：<input id="pwd1" name="pwd1" type="password" required rangelength="[6,8]"></p>
    <p>确认密码（与密码相同）：<input id="pwd2" name="pwd2" type="password" required equalTo="#pwd1"></p>
    <p><input type="submit" value="注册"></p>
</form>
```

**jQuery 代码**

```js
// 声明式验证：程序员只需要声明各种验证规则，可以自定义验证错误信息
$('#myForm').validate({
    messages: {
        username: {
            required: '用户名不能为空',
            minlength: '用户名最少6位'
        },
        pwd1: {
            required: '密码不能为空',
            rangelength: '用户名6到8位'
        },
        pwd2: {
            required: '确认密码不能为空',
            equalTo: '确认密码不相同'
        },
    }
});
```

**效果**

![jQuery-vaildation](https://i.loli.net/2021/09/06/gSlWcDq1Qh4rpFY.gif)

### ui

- [http://jqueryui.com/](http://jqueryui.com/)

#### Accordion：手风琴

**HTML 代码**

```html
<!-- 1、Accordion：手风琴 -->
<h2 class="demoHeaders">Accordion</h2>
<div id="accordion">
    <h3>First</h3>
    <div>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
    <h3>Second</h3>
    <div>Phasellus mattis tincidunt nibh.</div>
    <h3>Third</h3>
    <div>Nam dui erat, auctor a, dignissim quis.</div>
</div>
```

**jQuery 代码**

```js
// 1、Accordion：手风琴
$('#accordion').accordion();
```

**效果**

![jQuery-accordion](https://i.loli.net/2021/09/07/SKtsqjl39a8VwUB.gif)

#### Autocomplete：自动搜索匹配

**Html 代码**

```html
<!-- 2、Autocomplete：自动搜索匹配 -->
<h2 class="demoHeaders">Autocomplete</h2>
<div>
    <input id="autocomplete" title="type &quot;a&quot;">
</div>
```

**jQuery 代码**

```js
// 2、Autocomplete：自动搜索匹配
var availableTags = [
    "Html",
    "Css",
    "JavaScript",
    "C",
    "C++",
    "C#",
    "Java",
    "Python",
    "PHP",
    "Ruby"
];
$("#autocomplete").autocomplete({
    source: availableTags
});
```

**效果**

![jQuery-autocomplete](https://i.loli.net/2021/09/07/ZEso3P2JgkDVxhQ.gif)

#### Tabs：选项卡

**HTML 代码**

```html
<!-- 3、Tabs：选项卡 -->
<h2 class="demoHeaders">Tabs</h2>
<div id="tabs">
    <ul>
        <li><a href="#tabs-1">First</a></li>
        <li><a href="#tabs-2">Second</a></li>
        <li><a href="#tabs-3">Third</a></li>
    </ul>
    <div id="tabs-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
    </div>
    <div id="tabs-2">Phasellus mattis tincidunt nibh. Cras orci urna, blandit id, pretium vel, aliquet ornare, felis.
        Maecenas scelerisque sem non nisl. Fusce sed lorem in enim dictum bibendum.
    </div>
    <div id="tabs-3">Nam dui erat, auctor a, dignissim quis, sollicitudin eu, felis. Pellentesque nisi urna, interdum
        eget, sagittis et, consequat vestibulum, lacus. Mauris porttitor ullamcorper augue.
    </div>
</div>
```

**jQuery 代码**

```js
// 3、Tabs：选项卡
$("#tabs").tabs();
```

**效果**

![jQuery-tabs](https://i.loli.net/2021/09/07/TnrozAJYNflcuKX.gif)

### laydate

- [http://www.layui.com/laydate/](http://www.layui.com/laydate/)

**HTML 代码**

```html
<input type="text" class="demo-input" placeholder="请选择日期" id="test1">
```

**jQuery 代码**

```js
//执行一个laydate实例
laydate.render({
    elem: '#test1' //指定元素
});
```

**效果**

![image-20210907222254777](https://i.loli.net/2021/09/07/3Jyx1KvRnb5MQdF.png)



## 3、终极练习

---

### 1）鼠标移入显示，移出隐藏

目标：手机京东，客户服务，网站导航，我的京东，去购物车结算，全部商品

```js
$('[name=show_hide]').hover(function () {
    $('#' + this.id + '_items').show();
}, function () {
    $('#' + this.id + '_items').hide();
});
```

![鼠标移入显示，移出隐藏](https://i.loli.net/2021/09/10/5wtQMh2usqUTYai.gif)



### 2）鼠标移动切换二级导航菜单的切换显示和隐藏

```js
var $cateItem = $('.cate_item');
$cateItem.hover(function () {
    $cateItem.children('.sub_cate_box').hide();
    $(this).children('.sub_cate_box').show();
}, function () {
    $cateItem.children('.sub_cate_box').hide();
});
```

![鼠标移动切换二级导航菜单的切换显示和隐藏](https://i.loli.net/2021/09/10/l8NnRYPhgTsxtHi.gif)



### 3）输入搜索关键字，列表显示匹配的结果

```js
$('#txtSearch').on('focus keyup', function () {
    if (this.value.trim()) {
        $('#search_helper').show();
    } else {
        $('#search_helper').hide();
    }
}).blur(function () {
    $('#search_helper').hide();
});
```

![输入搜索关键字，列表显示匹配的结果](https://i.loli.net/2021/09/10/HrlSRNEWDOZUYQh.gif)



### 4）点击显示或者隐藏更多的分享图标

```js
var isOpen = false;
var $shareMore = $('#shareMore');
$shareMore.click(function () {
    var $prevAll = $shareMore.prevAll('a:lt(2)');
    var $parent = $shareMore.parent();
    var $children = $shareMore.children('b');
    // 展开更多
    if (isOpen) {
        $prevAll.hide();
        $children.removeClass('backword');
        $parent.width(parseFloat($parent.width()) - 44);
    }
    // 隐藏更多
    else {
        $prevAll.show();
        $children.addClass('backword');
        $parent.width(parseFloat($parent.width()) + 44);
    }
    isOpen = !isOpen;
});
```

![点击显示或者隐藏更多的分享图标](https://i.loli.net/2021/09/10/E7KZzjQ4xd2HuPq.gif)



### 5）鼠标移入移出切换地址的显示隐藏

```js
var $storeSelect = $('#store_select');
$storeSelect.hover(function () {
    $storeSelect.children('div:gt(0)').show();
}, function () {
    $storeSelect.children('div:gt(0)').hide();
}).children(':last').mouseenter(function () {
    this.style.cursor = 'pointer';
}).click(function () {
    $(this).parent().children('div:gt(0)').hide();
});
```

![鼠标移入移出切换地址的显示隐藏](https://i.loli.net/2021/09/10/JLcXupHn7mE4sVd.gif)



### 6）点击切换地址tab

```js
var $storeTabs = $('#store_tabs>li');
$storeTabs.click(function () {
    var hover = $storeTabs.siblings('.hover')[0];
    if (hover !== this) {
        $(hover).removeClass('hover');
        $(this).addClass('hover');
    }
});
```

![点击切换地址tab](https://i.loli.net/2021/09/10/1CmdESjLqv8hJ4w.gif)



### 7）鼠标移入移出切换显示迷你购物车

```js
let $minicart = $('#minicart');
$minicart.hover(function () {
    $minicart.addClass('minicart');
    $minicart.children('div:last').show();
}, function () {
    $minicart.removeClass('minicart');
    $minicart.children('div:last').hide();
});
```

![鼠标移入移出切换显示迷你购物车](https://i.loli.net/2021/09/10/LOG2uIoK86zXNWh.gif)



### 8）点击切换产品选项（商品详情等显示出来）

```js
var $main_tabs_li = $('#product_detail>.main_tabs>li');
$main_tabs_li.click(function () {
    var current = $main_tabs_li.siblings('.current')[0];
    var $this = $(this);
    var $siblings = $('#product_detail').children('div').not('#minicart');
    // 切换current
    $(current).removeClass('current');
    $this.addClass('current');
    // 切换详情
    $siblings.hide();
    $siblings.eq($this.index()).show();
});
```

![点击切换产品选项（商品详情等显示出来）](https://i.loli.net/2021/09/10/jVOBwy15E9bWQpL.gif)



### 9）点击向右/左，移动当前展示商品的小图片

```js
var $iconList = $('#icon_list');
var LI_COUNT = $iconList.children('li').length;
var SHOW_COUNT = 5;
// 图片达到一定数量才显示相应效果
if (LI_COUNT > SHOW_COUNT) {
    var $a = $('#preview>h1>a');
    var $backward = $a.first();
    var $forward = $a.last();
    $forward.attr('class', 'forward');
    var FRAME_OFFSET = $iconList.find('li:first').width();
    var pointer = 0;
    // 下一张
    $forward.click(function () {
        // 最后一张
        if (pointer <= SHOW_COUNT - LI_COUNT) {
            return;
        }
        // 切换下一张
        pointer--;
        $iconList.css('left', pointer * FRAME_OFFSET);
        $backward.attr('class', 'backward');
        // 更新上一张按钮状态
        if (pointer <= SHOW_COUNT - LI_COUNT) {
            $forward.attr('class', 'forward_disabled');
        }
    });
    // 上一张
    $backward.click(function () {
        // 第一张
        if (pointer >= 0) {
            return;
        }
        // 切换上一张
        pointer++;
        $iconList.css('left', pointer * FRAME_OFFSET);
        $forward.attr('class', 'forward');
        // 更新下一张按钮状态
        if (pointer >= 0) {
            $backward.attr('class', 'backward_disabled');
        }
    });
}
```

![点击向右向左，移动当前展示商品的小图片](https://i.loli.net/2021/09/10/RPdOB59DFCtiXZo.gif)



### 10）当鼠标层停在某个小图上，在上方是示对应的中图

```js
$('#icon_list>li').hover(function () {
    var $img = $(this).children('img');
    $img.addClass('hoveredThumb');
    // 显示对应中图
    var src = $img.attr('src').replace('.jpg', '-m.jpg');
    $('#mediumImg').attr('src', src);
}, function () {
    $(this).children('img').removeClass('hoveredThumb');
});
```

![当鼠标层停在某个小图上，在上方是示对应的中图](https://i.loli.net/2021/09/10/FUxVsjaLdTZEAtN.gif)



### 11）当鼠标在中图上移动时，显示对应大图的附近部分区域

```js
var $maskTop = $('#maskTop');
var $mask = $('#mask');
var $largeImgContainer = $('#largeImgContainer');
var $largeImg = $('#largeImg');
var $mediumImg = $('#mediumImg');
$maskTop.hover(function () {
    var $loading = $('#loading');
    // 显示遮罩
    $mask.show();
    // 加载大图
    $loading.show(); // 大图未加载完毕时显示加载图标
    $largeImg.attr('src', $mediumImg.attr('src').replace('-m.jpg', '-l.jpg'));
    // 大图加载监听
    $largeImg.on('load', function () {
        // 显示大图
        $largeImg.show();
        // 隐藏加载图标
        $loading.hide();
        // 获取大图大小
        var LARGE_WIDTH = $largeImg.width();
        var LARGE_HEIGHT = $largeImg.height();
        // 获取中图大小
        var MASKTOP_WIDTH = $maskTop.width();
        var DESKTOP_HEIGHT = $maskTop.height();
        // 获取遮罩大小
        var MASK_WIDTH = $mask.width();
        var MASK_HEIGHT = $mask.height();
        // 计算遮罩偏移量范围
        var MAX_LEFT = MASKTOP_WIDTH - MASK_WIDTH;
        var MAX_TOP = DESKTOP_HEIGHT - MASK_HEIGHT;
        // 计算大图偏移量比例
        var SCALE_WIDTH = parseFloat(LARGE_WIDTH) / parseFloat(MASKTOP_WIDTH);
        var SCALE_HEIGHT = parseFloat(LARGE_HEIGHT) / parseFloat(DESKTOP_HEIGHT);
        // 设置大图容器尺寸
        $largeImgContainer.css({
            width: LARGE_WIDTH / SCALE_WIDTH,
            height: LARGE_HEIGHT / SCALE_WIDTH
        });
        $largeImgContainer.show();
        // 遮罩及大图位置跟随鼠标移动
        $maskTop.mousemove(function (event) {
            // 计算偏移量
            var offsetX = event.offsetX;
            var offsetY = event.offsetY;
            var left = offsetX - MASK_WIDTH / 2;
            var top = offsetY - MASK_HEIGHT / 2;
            // 偏移量范围
            if (left < 0) {
                left = 0;
            } else if (left > MAX_LEFT) {
                left = MAX_LEFT;
            }
            if (top < 0) {
                top = 0;
            } else if (top > MAX_TOP) {
                top = MAX_TOP;
            }
            // 遮罩移动
            $mask.css({
                left: left,
                top: top
            });
            // 大图移动
            $largeImg.css({
                left: -offsetX * SCALE_WIDTH,
                top: -offsetY * SCALE_HEIGHT
            });
        });
    });
}, function () {
    // 隐藏遮罩
    $mask.hide();
    // 隐藏大图
    $largeImgContainer.hide();
    $largeImg.hide();
    // 隐藏加载图标
    $loading.hide();
});
```

![当鼠标在中图上移动时，显示对应大图的附近部分区域](https://i.loli.net/2021/09/10/A9XCDYahNkMRxfz.gif)
