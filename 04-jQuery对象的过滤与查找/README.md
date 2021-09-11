> 笔记来源：[尚硅谷jQuery教程(jquery从入门到精通)](https://www.bilibili.com/video/BV1ts411E7ag)

[TOC]

# jQuery对象的过滤与查找

## 1、对象的过滤

| 过滤方法     | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| `eq()`       | 获取第N个元素                                                |
| `first()`    | 获取第一个元素                                               |
| `last()`     | 获取最后一个元素                                             |
| `hasClass()` | 检查当前的元素是否含有某个特定的类，如果有，则返回true       |
| `filter()`   | 筛选出与指定表达式匹配的元素集合                             |
| `not()`      | 删除与指定表达式匹配的元素                                   |
| `is()`       | 根据选择器、DOM元素或 jQuery 对象来检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true |
| `has()`      | 保留包含特定后代的元素，去掉那些不含有指定后代的元素         |

### first()

```js
var $li = $('ul>li');
// 1.ul下li标签第一个
// $li[0].style.backgroundColor = 'red';
$li.first().css('background-color', 'red');
```

![image-20210830211113273](https://i.loli.net/2021/08/30/NfaVxELRmKY34wk.png)

### last()

```js
// 2.ul下li标签的最后一个
// $li[$li.length - 1].style.backgroundColor = 'red';
$li.last().css('background-color', 'red');
```

![image-20210830211723608](https://i.loli.net/2021/08/30/dBEUhgvkSiNJMte.png)

### eq()

```js
// 3.ul下li标签的第二个
// $li[1].style.backgroundColor = 'red';
$li.eq(1).css('background-color', 'red');
```

![image-20210830211409856](https://i.loli.net/2021/08/30/MREVy9vPf3Y4shZ.png)

### filter()

```js
// 4.ul下li标签中title属性为hello的
$li.filter('[title=hello]').css('background-color', 'red');
```

![image-20210830211542168](https://i.loli.net/2021/08/30/kpZKUqWX1sEVSIR.png)

### not()

```js
// 5.ul下li标签中title属性不为hello的
// $li.filter('[title!=hello]').css('background-color', 'red');
$li.not('[title=hello]').css('background-color', 'red');
```

![image-20210830211815479](https://i.loli.net/2021/08/30/hkwnYKF6NoWuPmO.png)

但上述的写法，将没有 title 属性的 li 元素也查询了出来，更符合题意的写法如下：

```js
// $li.filter('[title]').filter('[title!=hello]').css('background-color', 'red');
// $li.filter('[title!=hello]').filter('[title]').css('background-color', 'red');
$li.filter('[title][title!=hello]').css('background-color', 'red');
```

![image-20210830212011449](https://i.loli.net/2021/08/30/LRkXtPdApCW4ozi.png)

### has()

```js
// 6.ul下li标签中有span子标签的
$li.has('span').css('background-color', 'red');
```

![image-20210830212142202](https://i.loli.net/2021/08/30/wh6GgZVMvAb9IKJ.png)

### hasClass()、is()

```js
// 7.ul下li标签中class属性为box2的
// if ($li.filter('[class=box2]').hasClass('box2')) {
//     $li.filter('[class=box2]').css('background-color', 'red');
// }
if ($li.filter('[class=box2]').is('.box2')) {
    $li.filter('[class=box2]').css('background-color', 'red');
}
```

![image-20210830212616690](https://i.loli.net/2021/08/30/WtDjyoNX1kev63H.png)



## 2、对象的查找

| 查找方法         | 描述                                                         |
| :--------------- | :----------------------------------------------------------- |
| `children()`     | 取得一个包含匹配的元素集合中每一个元素的所有子元素的元素集合 |
| `find()`         | 搜索所有与指定表达式匹配的元素。这个函数是找出正在处理的元素的后代元素的好方法 |
| `siblings()`     | 取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合 |
| `next()`         | 取得一个包含匹配的元素集合中每一个元素紧邻的后一个同辈元素的元素集合 |
| `nextAll()`      | 查找当前元素之后所有的同辈元素                               |
| `nextUntil()`    | 查找当前元素之后所有的同辈元素，直到遇到匹配的那个元素为止   |
| `prev()`         | 取得一个包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合 |
| `prevAll()`      | 查找当前元素之前所有的同辈元素                               |
| `prevUntil()`    | 查找当前元素之前所有的同辈元素，直到遇到匹配的那个元素为止   |
| `offsetParent()` | 返回第一个匹配元素用于定位的父节点                           |
| `parent()`       | 取得一个包含着所有匹配元素的唯一父元素的元素集合             |
| `parentsUntil()` | 查找当前元素的所有的父辈元素，直到遇到匹配的那个元素为止     |

### children()

```js
var $ul = $('ul');
// 1.ul标签的第2个span子标签
$ul.children('span:eq(1)').css('background-color', 'red');   
```

![image-20210830214109835](https://i.loli.net/2021/08/30/txLno4PUbFas2eD.png)

### find()

```js
// 2.ul标签的第2个span后代标签
$ul.find('span:eq(1)').css('background-color', 'red');
```

![image-20210830214509558](https://i.loli.net/2021/08/30/bGgeELf3R84dOaF.png)

### parent()、offsetParent()

```js
// 3.ul标签的父标签
$ul.parent().css('background-color', 'red');
```

![image-20210830220319034](https://i.loli.net/2021/08/30/rKkAgln3w4YhFPD.png)

```js
// 3.ul标签的定位父标签
$ul.offsetParent().css('background-color', 'red');
```

![image-20210830220343975](https://i.loli.net/2021/08/30/YF7DQsVcHwMPvCg.png)

### prev()、prevAll()、next()、nextAll()

```js
// 4.id为cc的li标签的前一个li标签
$('#cc').prev('li').css('background-color', 'red');
```

![image-20210830215225088](https://i.loli.net/2021/08/30/dv2iSARtPf5sFHo.png)

```js
// 4.id为cc的li标签的前面所有li标签
$('#cc').prevAll('li').css('background-color', 'red');
```

![image-20210830220107143](https://i.loli.net/2021/08/30/F7LPzVQIDRnJsYM.png)

```js
// 4.id为cc的li标签的后一个li标签
$('#cc').next('li').css('background-color', 'red');
```

![image-20210830215617772](https://i.loli.net/2021/08/30/aNOEFRhLnfl8Cyx.png)

```js
// 4.id为cc的li标签的后面所有li标签
$('#cc').nextAll('li').css('background-color', 'red');
```

![image-20210830220155203](https://i.loli.net/2021/08/30/pqn8hSKU1NeZw6P.png)

### siblings()

```js
// 6.id为cc的li标签的所有兄弟li标签
$('#cc').siblings('li').css('background-color', 'red');
```

![image-20210830220233128](https://i.loli.net/2021/08/30/o1pviS3bgAcRXxM.png)



## 练习：爱好选择器

HTML 代码

```html
<form>
    你爱好的运动是？<input type="checkbox" id="checkedAllBox"/>全选/全不选
    <br/>
    <input type="checkbox" name="items" value="足球"/>足球
    <input type="checkbox" name="items" value="篮球"/>篮球
    <input type="checkbox" name="items" value="羽毛球"/>羽毛球
    <input type="checkbox" name="items" value="乒乓球"/>乒乓球
    <br/>
    <input type="button" id="checkedAllBtn" value="全选"/>
    <input type="button" id="checkedNoBtn" value="全不选"/>
    <input type="button" id="checkedRevBtn" value="反选"/>
    <input type="button" id="sendBtn" value="提交"/>
</form>
```

jQuery 代码

```js
var $checkedAllBox = $('#checkedAllBox'); // ID选择器
var $items = $(':checkbox[name=items]'); // 表单选择器、过滤选择器、交集选择器
// 1.点击'全选'：选中所有爱好
var $checkedAllBtn = $('#checkedAllBtn');
$checkedAllBtn.click(function () { // click函数
    $items.prop('checked', true); // prop操作属性
    $checkedAllBox.prop('checked', true);
});

// 2.点击'全不选'：所有爱好都不勾选
var $checkedNoBtn = $('#checkedNoBtn');
$checkedNoBtn.click(function () {
    $items.prop('checked', false);
    $checkedAllBox.prop('checked', false);
});

// 3.点击'反选'：改变所有爱好的匀选状态
var $checkedRevBtn = $('#checkedRevBtn');
$checkedRevBtn.click(function () {
    $items.each(function () { // each函数
        this.checked = !this.checked;
    });
    $checkedAllBox.prop('checked', $items.not(':checked').length === 0); // not过滤方法
});

// 4.点击'提交'：提示所有勾送的爱好
var $sendBtn = $('#sendBtn');
$sendBtn.click(function () {
    var arr = [];
    $items.filter(':checked').each(function () { // filter过滤方法
        arr.push(this.value); // 数组push方法
    });
    alert(arr.join(',')); // 数组join方法
});

// 5.点击'全选/全不选'：选中所有爱好，或者全不选中
var $checkedAllBox = $('#checkedAllBox');
$checkedAllBox.click(function () {
    $items.prop('checked', this.checked);
});

// 6.点击某个爱好时，必要时更新'全选/全不选'的选中状态
$items.click(function () {
    $checkedAllBox.prop('checked', $items.not(':checked').length === 0);
});
```

**效果**

![爱好选择器](https://i.loli.net/2021/08/30/KbATLo9JzXtj5ua.gif)

