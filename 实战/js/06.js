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