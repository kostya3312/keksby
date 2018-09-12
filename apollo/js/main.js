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
});