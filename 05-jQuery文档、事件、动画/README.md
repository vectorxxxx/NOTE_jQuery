> 笔记来源：[尚硅谷jQuery教程(jquery从入门到精通)](https://www.bilibili.com/video/BV1ts411E7ag)

[TOC]

# jQuery文档、事件、动画

## 1、文档处理-增删改

|          | 文档处理方法     | 描述                                                         |
| :------- | :--------------- | :----------------------------------------------------------- |
| 内部插入 | `append()`       | 向每个匹配的元素内部追加内容                                 |
|          | `appendTo()`     | 把所有匹配的元素追加到另一个指定的元素元素集合中             |
|          | `prepend()`      | 向每个匹配的元素内部前置内容                                 |
|          | `prependTo()`    | 把所有匹配的元素前置到另一个、指定的元素元素集合中           |
| 外部插入 | `after()`        | 在每个匹配的元素之后插入内容                                 |
|          | `before()`       | 在每个匹配的元素之前插入内容                                 |
|          | `insertAfter()`  | 把所有匹配的元素插入到另一个、指定的元素元素集合的后面       |
|          | `insertBefore()` | 把所有匹配的元素插入到另一个、指定的元素元素集合的前面       |
| 包裹     | `wrap()`         | 把所有匹配的元素用其他元素的结构化标记包裹起来               |
|          | `unwrap()`       | 这个方法将移出元素的父元素                                   |
|          | `wrapAll()`      | 将所有匹配的元素用单个元素包裹起来                           |
|          | `wrapInner()`    | 将每一个匹配的元素的子内容(包括文本节点)用一个HTML结构包裹起来 |
| 替换     | `replaceWith()`  | 将所有匹配的元素替换成指定的HTML或DOM元素                    |
|          | `replaceAll()`   | 用匹配的元素替换掉所有 selector匹配到的元素                  |
| 删除     | `empty()`        | 删除匹配的元素集合中所有的子节点                             |
|          | `remove()`       | 从DOM中删除所有匹配的元素                                    |
|          | `detach()`       | 从DOM中删除所有匹配的元素                                    |
| 克隆     | `clone()`        | 克隆匹配的DOM元素并且选中这些克隆的副本                      |

### append、appendTo

```js
// 1.向id为ul1的ul下添加一个span（最后）
// $('#ul1').append('<span>append添加的span</span>');
$('<span>appendTo添加的span</span>').appendTo($('#ul1'));
```

![image-20210901210912658](https://i.loli.net/2021/09/01/vloghYpD6xq4t51.png)

### prepend、prependTo

```js
// 2.向id为ul1的ul下添加一个span（最前）
// $('#ul1').prepend('<span>prepend添加的span</span>');
$('<span>prependTo添加的span</span>').prependTo($('#ul1'));
```

![image-20210901210949733](https://i.loli.net/2021/09/01/spTLvoElmdD9Pqa.png)

### before、insertBefore

```js
// 3.在id为ul1的ul下的li（title为hello）的前面添加span
// $('#ul1').children('li[title=hello]').before('<span>before添加的span</span>');
$('<span>insertBefore添加的span</span>').insertBefore($('#ul1').children('li[title=hello]'));
```

![image-20210901211041264](https://i.loli.net/2021/09/01/8qzxleJcC1ugZtR.png)

### after、insertAfter

```js
// 4.在id为ul1的ul下的li（title为hello）的后面添加span
// $('#ul1').children('li[title=hello]').after('<span>after添加的span</span>');
$('<span>insertAfter添加的span</span>').insertAfter($('#ul1').children('li[title=hello]'));
```

![image-20210901211118536](https://i.loli.net/2021/09/01/pL1HBhuIXZe2VTw.png)

### replaceWith、replaceAll

```js
// 5.将id为ul2的ul下的li（title为hello）全部替换为p
// $('#ul2').children('li[title=hello]').replaceWith('<p>replaceWith替换的p</p>');
$('<p>replaceWith替换的p</p>').replaceAll($('#ul2').children('li[title=hello]'));
```

![image-20210901211202564](https://i.loli.net/2021/09/01/Tqg6rboa3jHnp9R.png)

### empty、remove、detach

```js
// 6.移除id为ul2的ul下的所有li
$('#ul2').children('li').empty(); // ul2下li的内容被清空
```

![image-20210901211305628](https://i.loli.net/2021/09/01/niLpdYyofMK8QW2.png)

```js
// $('#ul2').empty(); // 所有子元素均被删除
// $('#ul2>*').remove(); // 所有子元素均被删除
// $('#ul2').children('li').remove();
$('#ul2').children('li').detach();
```

![image-20210901211319158](https://i.loli.net/2021/09/01/ch3Lslfo9VgtbJd.png)



## 练习：添加删除员工

HTML 代码

```html
<table id="employeeTable">
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Salary</th>
        <th>&nbsp;</th>
    </tr>
    <tr>
        <td>Tom</td>
        <td>tom@tom.com</td>
        <td>5000</td>
        <td><a href="deleteEmp?id=001">Delete</a></td>
    </tr>
    <tr>
        <td>Jerry</td>
        <td>jerry@sohu.com</td>
        <td>8000</td>
        <td><a href="deleteEmp?id=002">Delete</a></td>
    </tr>
    <tr>
        <td>Bob</td>
        <td>bob@tom.com</td>
        <td>10000</td>
        <td><a href="deleteEmp?id=003">Delete</a></td>
    </tr>
</table>

<div id="formDiv">
    <h4>添加新员工</h4>
    <table>
        <tr>
            <td class="word">name:</td>
            <td class="inp">
                <input type="text" name="empName" id="empName"/>
            </td>
        </tr>
        <tr>
            <td class="word">email:</td>
            <td class="inp">
                <input type="text" name="email" id="email"/>
            </td>
        </tr>
        <tr>
            <td class="word">salary:</td>
            <td class="inp">
                <input type="text" name="salary" id="salary"/>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <button id="addEmpButton" value="abc">
                    Submit
                </button>
            </td>
        </tr>
    </table>
</div>
```

jQuery 代码

```js
// 添加
$('#addEmpButton').click(function () {
    // 获取输入
    var $empName = $('#empName');
    var $email = $('#email');
    var $salary = $('#salary');
    var empName = $empName.val();
    var email = $email.val();
    var salary = $salary.val();
    // 插入输入
    $('<tr></tr>')
        .append('<td>' + empName + '</td>')
        .append('<td>' + email + '</td>')
        .append('<td>' + salary + '</td>')
        .append('<td><a href="deleteEmp?id=' + Date.now() + '">Delete</a></td>')
        .appendTo($('#employeeTable').children('tbody')); // 插入到默认生成的tbody下
    // 清除输入
    $empName.val('');
    $email.val('');
    $salary.val('');
});

// 删除
// 使用事件委派，这样即使是后续添加的元素也会被绑定对应的事件
// 否则，就需要在新增元素时手动添加单击事件，比较麻烦。下面会学到事件代理/委派/委托相关知识
$('#employeeTable').delegate('a', "click", function () { 
    var $tr = $(this).parent().parent();
    var name = $tr.children(':first').html();
    if (confirm('确定删除' + name + '的相关信息吗？')) {
        $tr.remove();
    }
    return false;
});
```

**效果**

![添加删除员工](https://i.loli.net/2021/09/01/KZ6b2mdR9qVsuUQ.gif)



## 2、事件处理

|          | 事件方法               | 描述                                                         |
| :------- | :--------------------- | :----------------------------------------------------------- |
| 页面载入 | `ready()`              | 当DOM载入就绪可以查询及操纵时绑定一个要执行的函数            |
| 事件处理 | `on()`                 | 在选择元素上绑定一个或多个事件的事件处理函数                 |
|          | `off()`                | 在选择元素上移除一个或多个事件的事件处理函数                 |
|          | `bind()`               | 为每个匹配元素的特定事件绑定事件处理函数                     |
|          | `unbind()`             | bind()的反向操作，从每一个匹配的元素中删除绑定的事件         |
|          | `one()`                | 为每一个匹配元素的特定事件（像click）绑定一个一次性的事件处理函数 |
|          | `trigger()`            | 在每一个匹配的元素上触发某类事件                             |
|          | `triggerHandler()`     | 这个特别的方法将会触发指定的事件类型上所有绑定的处理函数。但不会执行浏览器默认动作，也不会产生事件冒泡 |
| 事件委派 | `delegate()`           | 指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数 |
|          | `undelegate()`         | 删除由 delegate() 方法添加的一个或多个事件处理程序           |
| 事件切换 | `hover()`              | 一个模仿悬停事件（鼠标移动到一个对象上面及移出这个对象）的方法 |
|          | `toggle()`             | 用于绑定两个或多个事件处理器函数，以响应被选元素的轮流的 click 事件 |
| 事件     | `focus()`、`focusin()` | 当元素获得焦点时，触发 focus、focusin 事件                   |
|          | `blur()`、`focusout()` | 当元素失去焦点时，触发 blur、focusout 事件                   |
|          | `change()`             | 当元素的值发生改变时，会发生 change 事件                     |
|          | `click()`              | 触发每一个匹配元素的click事件                                |
|          | `dblclick()`           | 当双击元素时，会发生 dblclick 事件                           |
|          | `error()`              | 当元素遇到错误（没有正确载入）时，发生 error 事件            |
|          | `mousedown()`          | 当鼠标指针移动到元素上方，并按下鼠标按键时，会发生 mousedown 事件 |
|          | `mouseup()`            | 当在元素上放松鼠标按钮时，会发生 mouseup 事件                |
|          | `mouseenter()`         | 当鼠标指针穿过元素时，会发生 mouseenter 事件                 |
|          | `mouseleave()`         | 当鼠标指针离开元素时，会发生 mouseleave 事件                 |
|          | `mouseover()`          | 当鼠标指针位于元素上方时，会发生 mouseover 事件              |
|          | `mouseout()`           | 当鼠标指针从元素上移开时，发生 mouseout 事件                 |
|          | `mousemove()`          | 当鼠标指针在指定的元素中移动时，就会发生 mousemove 事件      |
|          | `keypress()`           | 当键盘或按钮被按下时，发生 keypress 事件                     |
|          | `keydown()`            | 当键盘或按钮被按下时，发生 keydown 事件                      |
|          | `keyup()`              | 当按钮被松开时，发生 keyup 事件                              |
|          | `resize()`             | 当调整浏览器窗口的大小时，发生 resize 事件                   |
|          | `scroll()`             | 当用户滚动指定的元素时，会发生 scroll 事件                   |
|          | `select()`             | 当 textarea 或文本类型的 input 元素中的文本被选择时，会发生 select 事件 |
|          | `submit()`             | 当提交表单时，会发生 submit 事件                             |
|          | `unload()`             | 在当用户离开页面时，会发生 unload 事件                       |

### click、on、bind

```js
// 1.给.out绑定点击监听（用两种方法绑定）
// $('.outer').click(function () {
//   alert('click outer');
// });
// $('.outer').on('click', function () {
//     alert('click outer');
// });
$('.outer').bind('click', function () {
    alert('click outer');
});
```

### mouseenter、mouseleave、hover

```js
// 2.给.inner绑定鼠标移入和移出的事件监听
// $('.inner')
//     .mouseenter(function () {
//         alert('mouse enter');
//     })
//     .mouseleave(function () {
//         alert('mouse leave');
//     });
$('.inner').hover(
    function () {
        alert('mouse enter');
    }, function () {
        alert('mouse leave');
    });
```

### mouseover、mouseout

`mouseover`/`mouseout`与`mouseenter`/`mouseleave`的区别在于**子元素**

- `mouseover`/`mouseout`进入和离开子元素会再次触发
- `mouseenter`/`mouseleave`进入和离开子元素不会再次触发

```js
$('.outer')
    .bind('mouseover', function () {
    console.log('mouse over');
})
    .bind('mouseout', function () {
    console.log('mouse out');
});
```

### off、unbind

```js
// 3.点击btn1解除.inner上的所有事件监听
$('#btn1').on('click', function () {
    // $('.inner').off();
    $('.inner').unbind();
});

// 4.点击btn2解除.inner上的mouseenter事件
$('#btn2').on('click', function () {
    // $('.inner').off('mouseenter');
    $('.inner').unbind('mouseenter');
});
```

**额外的知识点**

### offsetX、offsetY、pageX、pageY、clientX、clientY

- `offsetX`、`offsetY`：相对于触发事件对象的坐标
- `pageX`、`pageY`：相对于视口的坐标
- `clientX`、`clientY`：相对于屏幕的坐标

```js
// 5.点击btn3得到事件坐标
$('#btn3').on('click', function (event) {
    console.log('[' + event.offsetX + ', ' + event.offsetY + ']'); // [54, 8]
    console.log('[' + event.pageX + ', ' + event.pageY + ']'); // [349, 259]
    console.log('[' + event.clientX + ', ' + event.clientY + ']'); // [349, 59]
});
```

### stopPropagation、preventDefault

```js
// 6.点击.inner区域，外部点击监听不响应
$('.inner').on('click', function (event) {
    alert('click inner');
    event.stopPropagation(); // 停止冒泡
});

// 7.点击链接，如果当前时间是偶数不跳转
$('#test4').on('click', function (event) {
    if (Date.now() % 2 === 0) {
        event.preventDefault(); // 阻止默认行为
    }
})
```



## 3、事件委托（委派/代理）

在 *<练习：添加删除员工>* 中，我们已经使用过事件委托了。**那么到底什么是事件委托呢？**

### 事件委托

将多个子元素的事件监听委托给父辈元素处理，监听回调是加在了父辈元素上

当操作任何一个子元素时，事件会 <mark>冒泡</mark> 到父辈元素

父辈元素不会直接处理事件，而是根据`event.target`得到发生事件的子元素，通过这个子元素调用回调函数

### 事件委托的好处

- 添加新的子元素，自动有事件响应处理
- 减少事件监听的数量：n==>1

### 事件委托API

#### delegate、undelegate

- 设置事件委托：`$(parentSelector).delegate(childrenSelector, eventName, callback)`
- 移除事件委托：`$(parentSelector).undelegate(eventName)`

```js
// 点击li背景就会变为红色
$('ul').delegate('li', 'click', function () {
    this.style.backgroundColor = 'red';
});

// 点击btn1就添加一个li
$('#btn1').on('click', function () {
    $('ul').append('<li>新增的li...</li>');
});

$('#btn2').on('click', function () {
    $('ul').undelegate('click');
});
```

![事件委托](https://i.loli.net/2021/09/03/S3msTdDhHf1ZOW8.gif)



## 练习：切图

HTML 代码

```html
<div id="container">
    <div id="list">
        <img src="img/5.jpg" alt="5"/>
        <img src="img/1.jpg" alt="1"/>
        <img src="img/2.jpg" alt="2"/>
        <img src="img/3.jpg" alt="3"/>
        <img src="img/4.jpg" alt="4"/>
        <img src="img/5.jpg" alt="5"/>
        <img src="img/1.jpg" alt="1"/>
    </div>
    <div id="pointsDiv">
        <span index="1" class="on"></span>
        <span index="2"></span>
        <span index="3"></span>
        <span index="4"></span>
        <span index="5"></span>
    </div>
    <a href="javascript:;" id="prev" class="arrow"><</a>
    <a href="javascript:;" id="next" class="arrow">></a>
</div>
```

jQuery 代码

```js
/**
 * 动画
 *
 * @param element 元素
 * @param styleName 样式名
 * @param targetValue 目标值
 * @param targetDuration 目标时长
 * @param frameCount 帧数
 */
function moveAnimation(element, styleName, targetValue, targetDuration, frameCount, callback) {
    var $element = $(element);
    // 初始值
    var initValue = parseFloat($element.css(styleName));
    // 增量值
    var incrementValue = parseFloat(targetValue) - parseFloat(initValue);
    // 帧矢量
    var frameValue = parseFloat(incrementValue) / parseFloat(frameCount); // test:30
    // 帧时长
    var frameTime = parseFloat(targetDuration) / parseFloat(frameCount); // test:10
    // 开启定时器
    clearInterval($element.frameTimer);
    $element.frameTimer = setInterval(function () {
        // 计算过程值
        var processValue = parseFloat($element.css(styleName)) + frameValue;
        $element.css(styleName, processValue);
        // 达到目标值
        if ((frameValue > 0 && processValue >= targetValue) ||
            (frameValue < 0 && processValue <= targetValue)) {
            // 停止定时器
            clearInterval($element.frameTimer);
            // 修正目标值
            $element.css(styleName, targetValue);
            // 回调函数
            callback && callback();
        }
    }, frameTime);
}

/**
 * 左偏移量动画
 * @param element
 * @param targetValue
 * @param callback
 */
function leftAnimation(element, targetValue, callback) {
    moveAnimation(element, 'left', targetValue, 200, 20, callback);
}

// 1.点击向右（左）的图标，平滑切换到下（上）一页
// 2.无限循环切换：第一页的上一页为最后页，最后一页的下一页是第一页
// 3.每隔3s自动滑动到下一页
// 4.当鼠标进入图片区域时，自动切换停止，当鼠标离开后，又开始自动切换
// 5.切换页面时，下面的圆点也同步更新
// 6.点击圆点图标切换到对应的页
var $container = $('#container');
var $list = $('#list');
var $pointsDiv = $('#pointsDiv > span');
var $prev = $('#prev');
var $next = $('#next');
var lastIndex = 1;

/**
 * 切换图片
 * @param targetIndex
 */
function switchPic(targetIndex) {
    // 防止不是数字
    targetIndex = parseInt(targetIndex);
    // 防止因点击过快造成问题
    if (targetIndex < 0 || targetIndex > 6) {
        return;
    }
    // 切换图片
    leftAnimation($list, getTargetPosition(targetIndex), function () {
        // 第0张实际上是第5张
        if (targetIndex <= 0) {
            targetIndex = 5;
            $list.css('left', getTargetPosition(targetIndex));
        }
        // 第6张实际上是第1张
        if (targetIndex >= 6) {
            targetIndex = 1;
            $list.css('left', getTargetPosition(targetIndex));
        }
        // 圆点同步更新
        $pointsDiv.filter('[index=' + lastIndex + ']').removeClass('on');
        $pointsDiv.filter('[index=' + targetIndex + ']').addClass('on');
        lastIndex = targetIndex;
    });

    /**
     * 目标位
     *
     * @param targetIndex
     * @returns {number}
     */
    function getTargetPosition(targetIndex) {
        var picWidth = $container.css('width');
        return -targetIndex * parseFloat(picWidth);
    }
}

// 自动切图
autoPic();
var timer;

function autoPic() {
    clearInterval(timer);
    timer = setInterval(function () {
        switchPic(lastIndex + 1);
    }, 3000);
}

// 悬浮切换
$container.hover(function () {
    clearInterval(timer);
}, function () {
    autoPic();
});

// 原点切图
$pointsDiv.on('click', function () {
    clearInterval(timer);
    switchPic(this.getAttribute('index'));
});

// 切上一张图
$prev.on('click', function () {
    clearInterval(timer);
    switchPic(lastIndex - 1);
});
// 切下一张图
$next.on('click', function () {
    clearInterval(timer);
    switchPic(lastIndex + 1);
});
```

**效果**

![切图](https://i.loli.net/2021/09/05/padUqft8BshFm7g.gif)



## 4、动画

|          | 动画            | 描述                                                         |
| :------- | :-------------- | :----------------------------------------------------------- |
| 基本     | `show()`        | 显示隐藏的匹配元素                                           |
|          | `hide()`        | 隐藏显示的元素                                               |
|          | `toggle()`      | 用于绑定两个或多个事件处理器函数，以响应被选元素的轮流的 click 事件 |
| 滑动     | `slideDown()`   | 通过高度变化（向下增大）来动态地显示所有匹配的元素，在显示完成后可选地触发一个回调函数 |
|          | `slideUp()`     | 通过高度变化（向上减小）来动态地隐藏所有匹配的元素，在隐藏完成后可选地触发一个回调函数 |
|          | `slideToggle()` | 通过高度变化来切换所有匹配元素的可见性，并在切换完成后可选地触发一个回调函数 |
| 淡入淡出 | `fadeIn()`      | 通过不透明度的变化来实现所有匹配元素的淡入效果，并在动画完成后可选地触发一个回调函数 |
|          | `fadeOut()`     | 通过不透明度的变化来实现所有匹配元素的淡出效果，并在动画完成后可选地触发一个回调函数 |
|          | `fadeTo()`      | 把所有匹配元素的不透明度以渐进方式调整到指定的不透明度，并在动画完成后可选地触发一个回调函数 |
|          | `fadeToggle()`  | 通过不透明度的变化来开关所有匹配元素的淡入和淡出效果，并在动画完成后可选地触发一个回调函数 |
| 自定义   | `animate()`     | 用于创建自定义动画的函数                                     |
|          | `stop()`        | 停止所有在指定元素上正在运行的动画                           |
|          | `finish()`      | 停止当前正在运行的动画，删除所有排队的动画，并完成匹配元素所有的动画 |
|          | `delay()`       | 设置一个延时来推迟执行队列中之后的项目                       |

### fadeIn、fadeOut、fadeToggle

淡入淡出：不断改变元素的透明度（`opacity`）来实现的

- `fadeIn()`：带动画的显示
- `fadeOut()`：带动画隐藏
- `fadeToggle()`：带动画切英显示/隐藏

```js
var $div1 = $('.div1');
// 1.点击btn1，缓慢淡出
//  *无参
// $('#btn1').click(function () {
//     $div1.fadeOut();
// });
//  *有参
//    *字符参数
//    *数字参数
// $('#btn1').click(function () {
//     $div1.fadeOut('slow');
// });
$('#btn1').click(function () {
    $div1.fadeOut(1000);
});
// 2.点击btn2，缓慢淡入
$('#btn2').click(function () {
    $div1.fadeIn('slow');
});
// 3.点击btn3，淡出/淡入切换，动画结束时提示“动画结束”
$('#btn3').click(function () {
    $div1.fadeToggle('slow', 'linear', function () {
        alert('动画结束');
    });
});
```

![fadeOut、fadeIn、fadeToggle](https://i.loli.net/2021/09/05/iokqpnIrT3bcfRg.gif)

### slideUp、slideDown、slideToggle

滑动动画：不断改变元素的高度（`height`）实现

- `slideDown()`：带动画的展开
- `slideUp()`：带动画的收缩
- `slideToggle()`：带动画的切换展开/收缩

```js
var $div1 = $('.div1');
// 1.点击btn1，向上滑动
$('#btn1').click(function () {
    $div1.slideUp(1000);
});
// 2.点击btn3，向下滑动
$('#btn2').click(function () {
    $div1.slideDown('slow');
});
// 3.点btn3，向上/向下切换
$('#btn3').click(function () {
    $div1.slideToggle('slow', 'linear', function () {
        alert('动画结束');
    });
});
```

![slideUp、slideDown、slideToggle](https://i.loli.net/2021/09/05/5KrgvmidEXLWqwt.gif)

### show、hide、toggle

显示隐藏，默认没有动画，动画（`opacity`/`height`/`width`）

- `show()`：（不）带动画的显示
- `hide()`：（不）带动画的隐藏
- `toggle()`：（不）带动画的切换显示/隐藏

```js
var $div1 = $('.div1');
// 1.点击btn1，立即显示
$('#btn1').click(function () {
    $div1.show();
});
// 2.点击btn2，慢慢显示
$('#btn2').click(function () {
    $div1.show('slow');
});
// 3.点击btn3，慢慢隐藏
$('#btn3').click(function () {
    $div1.hide('slow');
});
// 4.点击btn4，切换显示/隐藏
$('#btn4').click(function () {
    $div1.toggle();
});
```

![show、hide、toggle](https://i.loli.net/2021/09/05/YiyxuZpPNvKMGoV.gif)



## 练习：导航栏动态显示效果

HTML 代码

```js
<div id="navigation">
    <ul>
        <li><a href="#">首页</a></li>
        <li>
            <a href=“#">衬衫</a>
            <ul>
                <li><a href="#">短袖衬衫</a></li>
                <li><a href="#">长袖衬衫</a></li>
                <li><a href="#">无袖衬衫</a></li>
            </ul>
        </li>
        <li>
            <a href="#">卫衣</a>
            <ul>
                <li><a href="#">开襟卫衣</a></li>
                <li><a href="#">套头卫衣</a></li>
            </ul>
        </li>
        <li>
            <a href="#">裤子</a>
            <ul>
                <li><a href="#">休闲裤</a></li>
                <li><a href="#">卡其裤</a></li>
                <li><a href="#">牛仔裤</a></li>
                <li><a href="#">短裤</a></li>
            </ul>
        </li>
        <li><a href="#">联系我们</a></li>
    </ul>
</div>
```

jQuery 代码

```js
var $navigation = $('#navigation >ul>li:has(ul)');
$navigation.hover(function () {
    $(this).children('ul').stop().slideDown();
}, function () {
    $(this).children('ul').stop().slideUp();
});
```

**效果**

![导航栏动态显示效果](https://i.loli.net/2021/09/05/WjKhFEtl8TseNkU.gif)



## 5、多库共存

问题：如果有 2 个库都有`$`，就存在冲突

解决：`jQuery`库可以释放`$`的使用权，让另一个库可以正常使用，此时`jQuery`库只能使用`jQuery`了

API：`jQuery.noconflict()`

```js
//释放的使用衣
jQuery.noConflict();
//调用myLib中的s
$(); 
//要想使用jQuery的功能，只能使用jQuery
jQuery(function () {
    console.log('文档加载完成');
});
console.log('+++++');
```

![image-20210905192122518](https://i.loli.net/2021/09/05/W5rfqUiD8Z2zBQv.png)



## 6、onload与ready

区别：`window.onload`与`$(document).ready()`

`window.onload`

- 包括页面的图片加载完后才会回调（晚）
- 只能有 **一个监听回调**

` $(document).ready()`

- 等同于：`$(function(){})`
- 页面加载完就回调（早）    
- 可以有 **多个监听回调**

```js
// 1.直接打印img的宽度,观察其值
console.log('直接', $('#logo').width()); // 直接 0

// 2.在$(function(){})中打印img的宽度
$(function () {
    console.log('ready', $('#logo').width()); // ready 0
});

// 3.在window.onload中打印img的宽度
window.onload = function () {
    console.log('onload', $('#logo').width()); // onload 190
};

// 4.在img加载完成后打印宽度
$('#logo').on('load', function () {
    console.log('img load', $('#logo').width()); // img load 190
});
```

