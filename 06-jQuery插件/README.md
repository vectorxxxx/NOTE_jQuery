> jQuery工具、属性、CSS笔记来源：[尚硅谷jQuery教程(jquery从入门到精通)](https://www.bilibili.com/video/BV1ts411E7ag)

[TOC]

# jQuery插件

| 插件机制             | 描述                                                 |
| :------------------- | :--------------------------------------------------- |
| `jQuery.fn.extend()` | 扩展 jQuery 元素集来提供新的方法（通常用来制作插件） |
| `jQuery.extend()`    | 扩展jQuery对象本身                                   |

## 1、自定义 jQuery 插件

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
