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
    // 扩展jQuery的工具方法
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
