> 笔记来源：[尚硅谷jQuery教程(jquery从入门到精通)](https://www.bilibili.com/video/BV1ts411E7ag)

[TOC]

## 1、jQuery 工具方法

![image-20210828220857665](https://i.loli.net/2021/08/28/DtSQK1IrRCVmUq6.png)

不过，我们常用的工具方法并不多

| 工具方法                    | 描述                                 |
| :-------------------------- | :----------------------------------- |
| `$.each(object,[callback])` | 通用例遍方法，可用于例遍对象和数组   |
| `$.type(obj)`               | 检测obj的数据类型                    |
| `$.isArray(obj)`            | 测试对象是否为数组                   |
| `$.isFunction(obj)`         | 测试对象是否为函数                   |
| `$.isNumeric(value)`        | 测试对象是否为数字                   |
| `$.parseJSON(json)`         | 接受一个JSON字符串，返回解析后的对象 |

### $.each()

```js
// 1、$.each()：遍历数组或对象中的数据
var obj = {
    name: 'Tom',
    setName: function (name) {
        this.name = name;
    }
}
$.each(obj, function (key, value) {
    console.log(key, value); // name Tom   setName ƒ (name) {}
});
```

### $.trim()

```js
// 2、$.trim()：去除字符两边的空格
var str = '    ddd ';
console.log($.trim(str)); // ddd
```

### $.type()

```js
// 3、$.type(obj)：得到数据的类型
console.log($.type($), $.type($())); // function object
```

### $.isArray()

```js
// 4、$.isArray(obj)：判断是否是数组
console.log($.isArray($('body')), $.isArray([])); // false true
```

### $.isFunction()

```js
// 5、$.isFunction(obj)：判断是否是函数
console.log($.isFunction($), $.isFunction($())); // true false
```

### $.isNumberic()

```js
// 6、$.isNumberic(obj)：判断是否是数字
console.log($.isNumeric('a'), $.isNumeric('2'), $.isNumeric(2)); // false true true
```

### $.parseJSON()

```js
// 7、$.parseJSON(json)：解析json字符转换为js对象/数组
var jsonObj = '{"name":"Tom", "age": 18}';
console.log($.parseJSON(jsonObj)); // {name: "Tom", age: 18}
var jsonArr = '[{"name":"Tom", "age": 18}, {"name":"Jack", "age": 28}]';
console.log($.parseJSON(jsonArr)); // (2) [{…}, {…}]
```

