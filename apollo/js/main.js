$(document).ready(function() {
    $nav = $('.navigation');
    $menu = $('.navigation__list');
    $button = $('#navigation-button');

    $button.click(function () {
        $menu.slideToggle('fast', function () {
            if ($(this).is(':visible')) {
                $(this).css('display','flex');
            }
        });
        $(this).toggleClass('navigation__button--active');
    });

    $('.navigation__item').click(function () {
        if ($(window).width() < 992) {
            $menu.slideUp();
            $button.removeClass('navigation__button--active');
        }
    });

    prevWidth = $(window).width();
    $(window).resize(function () {
        var currWidth = $(window).width();
        if (prevWidth <= 992 && currWidth > 992 && $menu.is(':hidden')) {
            $menu.css('display', 'flex');
        }
        if (prevWidth > 992 && currWidth <= 992) {
            $menu.removeAttr('style');
            $button.removeClass('navigation__button--active');
        }
        prevWidth = currWidth;
    });

    $(document).mouseup(function (e) {
        if ( $(window).width() < 992 && !$nav.is(e.target) // if the target of the click isn't the container...
            && $nav.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $menu.slideUp();
            $button.removeClass('navigation__button--active');
        }
    });

    // owlcarousel
    $('.slider__slides').slick({
        dots: false,
        arrows: true,
        prevArrow: $('.slider__arrow--prev'),
        nextArrow: $('.slider__arrow--next'),
        appendDots: '.slider__dots',
        customPaging : function(slider, i) {
            return "<div class='slider__dots-item'></div>";
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    dots: true
                }
            }
        ]
    });

    // pagescroll2id
    $(".navigation a").mPageScroll2id({
        offset: 65
    });

    // sticky nav bar
    var $nav = $('.header__navigation');
    var navTopPos = $nav.offset().top;
    var $window = $(window);
    $window.scroll(function() {
        $nav.toggleClass('header__navigation--sticky', $window.scrollTop() > navTopPos);
    });
});