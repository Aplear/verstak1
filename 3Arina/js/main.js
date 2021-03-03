$(document).ready(function() {
    $('a[href^="#"]').on('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 2000);
    });
    if($('.slider').length) {
        $('.slider').slick({
            dots: true,
            padding: '10',
            mobileFirst: true,
            variableWidth: true,
            infinite: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        centerMode: true,
                        padding: '50',
                        arrows: true,
                    }
                }
            ]
        });
    }
    if($('.recommend').length) {
        $('.recommend').slick({
            dots: false,
            slidesToShow: 1,
            mobileFirst: true,
            infinite: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 4,
                    }
                },
            ]
        });
    }
    $('.quantity .down').on('click', function () {
        let $this = this;
        if($(this).next().val() >= '1') {
            $(this).next().val(+$($this).next().val() - 1);
        }
    });
    $('.quantity .up').on('click', function () {
        let $this = this;
        $(this).prev().val(+$($this).prev().val() + 1);
    });

    let parseCart = parseInt($('.in-cart .items-val').text());
    if(parseCart > 0) {
        $('.order-btn').show();
    }

    if ($(window).width() < 768) {
        $('.contacts-button').click(function () {
            $(this).parent().find('.list').slideToggle('150');
        });
    }

    $('.contacts-button .item a').click(function () {
        $(this).next().slideUp('150');
    });

    $(window).click(function() {
        $('.contacts .arrow').removeClass('active');
        $('.contacts .list').slideUp('150');
    });

    $('.contacts').click(function(event){
        event.stopPropagation();
    });

    if ($(window).width() > 767) {
        $('.contacts-button .arrow').click(function () {
            $(this).toggleClass('active');
            $(this).parents('.contacts').find('.list').slideToggle('150');
        });
    }

    $('.custom-dropdown .arrow, .custom-dropdown span').click(function () {
        $(this).parent().find('.list').slideToggle('100');
        $(this).parent().find('.arrow').toggleClass('active');
    });
    $('.custom-dropdown .list').click(function () {
        $('.custom-dropdown .arrow').removeClass('active').next().slideUp('150');
    });

    $(window).click(function() {
        $('.custom-dropdown .arrow').removeClass('active');
        $('.custom-dropdown .list').slideUp('150');
    });

    $('.custom-dropdown').click(function(event){
        event.stopPropagation();
    });

    $('.hum').click(function () {
        if($(window).width() < 767) {
            $('body').addClass('body-hidden');
            $('.info-menu').addClass('open');
        }
        else {
            $("html, body").animate({ scrollTop: 0 }, '');
            $(this).toggleClass('active');
            if($(this).hasClass('active')) {
                $('body').addClass('body-hidden');
                $('.info-menu').addClass('open');
            } else {
                $('body').removeClass('body-hidden');
                $('.info-menu').removeClass('open');
            }
            return false;
        }
    });
    $('.close-menu').click(function () {
        $('body').removeClass('body-hidden');
        $('.info-menu').removeClass('open');
        $('.hum').removeClass('active');
    });

    /*Modals*/
    $('.open-modal').click(function (e) {
        e.preventDefault();
        $('.overlay').slideDown('150');
    });
    $('.modal .close-modal, .overlay').click(function () {
        $('.overlay').slideUp('150');
        $('.modal').removeClass('open');
    });
    $('.open-modal__sign-in').click(function (e) {
        e.preventDefault();
        $('.modal__sign-in').addClass('open');
    });
    $('.open-modal__sign-up').click(function (e) {
        e.preventDefault();
        $('.modal__sign-up').addClass('open');
    });
    $('.open-modal__message').click(function (e) {
        e.preventDefault();
        $('.modal__message').addClass('open');
    });
    $('.open-modal__restore-password').click(function (e) {
        e.preventDefault();
        $('.modal__sign-in').removeClass('open');
        $('.modal__restore-password').addClass('open');
    });
    $('.tabs__nav').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });
});



