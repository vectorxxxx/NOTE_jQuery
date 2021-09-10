$(function () {
    // 1.鼠标移入显示，移出隐藏
    //      目标：手机京东，客户服务，网站导航，我的京东，去购物车结算，全部商品
    $('[name=show_hide]').hover(function () {
        $('#' + this.id + '_items').show();
    }, function () {
        $('#' + this.id + '_items').hide();
    });

    // 2.鼠标移动切换二级导航菜单的切换显示和隐藏
    var $cateItem = $('.cate_item');
    $cateItem.hover(function () {
        $cateItem.children('.sub_cate_box').hide();
        $(this).children('.sub_cate_box').show();
    }, function () {
        $cateItem.children('.sub_cate_box').hide();
    });

    // 3.输入搜索关键字，列表显示匹配的结果
    $('#txtSearch').on('focus keyup', function () {
        if (this.value.trim()) {
            $('#search_helper').show();
        } else {
            $('#search_helper').hide();
        }
    }).blur(function () {
        $('#search_helper').hide();
    });

    // 4.点击显示或者隐藏更多的分享图标
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

    // 5.鼠标移入移出切换地址的显示隐藏
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
    // 6.点击切换地址tab
    var $storeTabs = $('#store_tabs>li');
    $storeTabs.click(function () {
        var hover = $storeTabs.siblings('.hover')[0];
        if (hover !== this) {
            $(hover).removeClass('hover');
            $(this).addClass('hover');
        }
    });

    // 7.鼠标移入移出切换显示迷你购物车
    let $minicart = $('#minicart');
    $minicart.hover(function () {
        $minicart.addClass('minicart');
        $minicart.children('div:last').show();
    }, function () {
        $minicart.removeClass('minicart');
        $minicart.children('div:last').hide();
    });
    // 8.点击切换产品选项（商品详情等显示出来）
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

    // 9.点击向右/左，移动当前展示商品的小图片
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

    // 10.当鼠标层停在某个小图上，在上方是示对应的中图
    $('#icon_list>li').hover(function () {
        var $img = $(this).children('img');
        $img.addClass('hoveredThumb');
        // 显示对应中图
        var src = $img.attr('src').replace('.jpg', '-m.jpg');
        $('#mediumImg').attr('src', src);
    }, function () {
        $(this).children('img').removeClass('hoveredThumb');
    });

    // 11.当鼠标在中图上移动时，显示对应大图的附近部分区域
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
            // left:[0, MASKTOP_WIDTH-MASK_WIDTH]
            // top:[0, MASKTOP_HEIGHT-MASK_HEIGHT]
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
})