> 笔记来源：[尚硅谷jQuery教程(jquery从入门到精通)](https://www.bilibili.com/video/BV1ts411E7ag)

[TOC]

# jQuery 简介

## 1、jQuery 初识

### What?

- `jQuery`官网：[http://jquery.com/](http://jquery.com/)
- 一个优秀的 JS 函数库
- 使用了`jQuery`的网站超过 90%
- 中大型 WEB 项目开发首选
- `Write Less，Do More！！！`

### Why?

- HTML 元素选取（选择器）
- HTML 元素操作
- CSS 操作
- HTML 事件处理
- JS 动画效果
- **链式调用** a().b().c()...
- **读写合一**
- 浏览器兼容
- 易扩展插件
- ajax 封装

### How?

#### 1. 引入`jQuery`库

```html
<!-- 引入jQuery -->
<!--服务器本地库-->
<script src="js/jquery-3.6.0.js"></script>
<!--CDN远程库-->
<!--<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>-->
```

#### 2. 使用`jQuery`

- `jQuery`核心函数：`$`/`jQuery`
- `jQuery`核心对象：执行`$()`返回的对象

```js
// 绑定文档加载完成的监听
$(function () {
    // 绑定监听事件
    var $btn02 = $("#btn02");
    $btn02.click(function () {
        var username = $("#username").val();
        username && alert(username);
    });
})
```

![jQuery的基本使用](https://i.loli.net/2021/08/23/B2ynVFUa9CgNDIq.gif)

#### 区别 2 种 JS 库文件

- 开发版（测试版）
- 生产版（压缩版）

#### 区别 2 种引用 JS 库的方式

- 服务器本地库
- CDN远程库
  - 项目上线时，一般使用比较靠谱的CDN资源库，减轻服务器负担
  - [https://www.bootcdn.cn/](https://www.bootcdn.cn/)：搜索`jQuery`，复制`<script>`标签到项目中即可使用

#### 区别`jQuery`的不同版本

- 1.x
  - 兼容老版本 IE
  - 文件更大
- 2.x
  - 部分 IE8 及以下支持
  - 文件小，执行效率更高
- 3.x
  - 完全不再支持 IE8 及以下版本
  - 提供了一些新的 API
  - 提供不包含 ajax / 动画 API 的版本



## 2、jQuery 的 2 把利器

```js
// jQuery核心代码
(function(window){
    var jQuery = function(){
        return new jQuery.fn.init();
    }
    window.$ = window.jQuery = jQuery
})(window)
```

### jQuery 核心函数

简称：`jQuery`函数（`$`/`jQuery`），`jQuery`库向外直接暴露的就是`$`/`jQuery`

引入`jQuery`库后，直接使用即可

- 当函数用：`$(xxx)`

- 当对象用：`$.xxx()`

```js
// jQuery函数：直接可用
console.log($, typeof $);  // ƒ ( selector, context ) {}    function
console.log(jQuery === $); // true
```

### jQuery 核心对象

简称：`jQuery`对象

得到`jQuery`对象：执行`jQuery`函数返回的就是`jQuery`对象

使用`jQuery`对象：`$obj.xxx()`

```js
// jQuery对象：执行jQuery函数得到它
console.log($(), typeof $(), $() instanceof Object); // jQuery.fn.init {} "object" true
```

![image-20210823214249792](https://i.loli.net/2021/08/23/qiELvA1Pnhx68B4.png)



## 3、jQuery 函数的使用

作为一般函数调用：`$(param)`

1. 参数为函数：当 DOM 加载完成后，执行此回调函数
2. 参数为选择器字符：查找所有匹配的标签并将它们封装成`jQuery`对象
3. 参数为 DOM 对象：将 dom 对象封装成`jQuery`对象
4. 参数为 html 标签字符串（用得少）：创建标签对象并封装成`jQuery`对象

作为对象使用：`$.xxx()`

- `$.each()`：隐式遍历数组
- `$.trim()`：去除两端的空格

```js
// 需求1.点击按钮：显示按钮的文本，显示一个新的输入框
// 1、参数为函数：当 DOM 加载完成后，执行此回调函数
$(function () { // 绑定文档加藏完成的监听
    // 2、参数为选择器字符：查找所有匹配的标签并将它们封装成`jQuery`对象
    $("#btn").click(function () {
        // alert(this.innerHTML); // this是什么？发生事件的dom元素（<button>）
        // 3、参数为 DOM 对象：将 dom 对象封装成`jQuery`对象
        alert($(this).html());
        // 4、参数为 html 标签字符串（用得少）：创建标签对象并封装成`jQuery`对象
        $('<input type="text" name="msg3"><br/>').appendTo("div");
    });
    
    // 需求2.遍历输出数组中所有元素值
    var arr = [3, 7, 4];
    $.each(arr, function (index, item) {
        console.log(index, item); // 0 3    1 7    2 4
    });

    // 需求3.去掉“my atguigu”两端的空格
    var str = "    my atguigu   ";
    console.log('===' + str + '===');           // ===    my atguigu   ===
    console.log('===' + str.trim() + '===');    // ===my atguigu===
    console.log('===' + $.trim(str) + '===');   // ===my atguigu===
})
```



## 4、jQuery 对象的使用

### 理解

即执行`jQuery`核心函数返回的对象

`jQuery`对象内部包含的是 dom 元素对象的伪数组（可能只有一个元素）

`jQuery`对象拥有很多有用的属性和方法，让程序员能方便的操作 dom

### 属性和方法

- 基本行为：操作标签的基本方法
- 属性：操作内部标签的属性或值

- CSS：操作标签的样式

- 文档：对标签进行增删改操作

- 筛选：根据指定的规则过滤内部的标签

- 事件：处理事件监听相关

- 效果：实现一些动画效果

这里我们先学习`jQuery`对象的基本行为，其他的不放在当前章节中

#### 基本行为

- `size()`/`length`：包含的 DOM 元素个数
- `[index]`/`get(index)`：得到对应位置的 DOM 元素
- `each()`：遍历包含的所有 DOM 元素
- `index()`：得到在所在兄弟元素中的下标

```js
// 需求1.统计一共有多少个按钮
// `size()`/`length`：包含的 DOM 元素个数
var $buttons = $('button');
console.log($buttons.length); // 4

// 需求2.取出第2个button的文本
console.log($('button:nth-child(2)').text()); // 测试二
// `[index]`/`get(index)`：得到对应位置的 DOM 元素
console.log($buttons[1].innerHTML, $buttons.get(1).innerHTML); // 测试二 测试二

// 需求3.输出所有button标签的文本
// `each()`：遍历包含的所有 DOM 元素
// $buttons.each(function (index, domEle) {
//     console.log(index, domEle.innerHTML); // 0 "测试一"   1 "测试二"   2 "测试三"    3 "测试四"
// });
$buttons.each(function () {
    console.log(this.innerHTML); // 测试一 测试二 测试三 测试四
});

// 需求4.输出’测试三’按钮是所有按钮中的第几个
console.log($("#btn3").index()); // 2
```

**伪数组**

- `Object`对象
- `length`属性
- 数值下标属性
- 没有数组特别的方法：`forEach()`，`push()`，`pop()`，`splice()`

```js
// 伪数组
console.log($buttons instanceof Array); // false
//自定义一个伪数组
var weiArr = {}
weiArr.length = 0;
weiArr[0] = 'atguigu';
weiArr.length = 1;
weiArr[1] = 123;
weiArr.length = 2;
for (var i = 0; i < weiArr.length; i++) {
    var obj = weiArr[i];
    console.log(i, obj); // 0 "atguigu"    1 123
}
console.log(weiArr.forEach, $buttons.forEach); //undefined undefined
```
