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