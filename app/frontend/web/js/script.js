const price = $('.js-backet-price').text();
console.log(parseFloat(price))
if(  parseFloat(price) == 0 ) {
    $('.cart-box').removeClass('fixedBasket')
} else {
    $('.cart-box').addClass('fixedBasket')
}

$('body').append('<div id="ajaxBusy"><p><img src="../../img/bx_loader.gif"></p></div>');
$('#ajaxBusy').css({ display: "none", position: "fixed", top: "50%", left: "50%", marginLeft: "-16px" });
$(document).ready(function () {
    var lang = $('.b-lang__item .active').data('lang');
    if (lang == 'uk') {
        lang = '';
    } else {
        lang = '/' + lang;
    }

    window.bxslider_mouse_over_slide=null;
    $(function() {
        $('.js--bxSlider_1 a').mouseover(
            function(event) {
                console.log('im oooover');
                window.bxslider_mouse_over_slide=$(this);
            });

    });
    $('.js--bxSlider_1').parent().on({
        mousedown: function(e) {
            window.leftPos  = e.pageX;
            window.topPos   = e.pageY;

            console.log(window.leftPos, window.topPos);
        },
        mouseup: function(e) {
            console.log(e.pageX, e.pageY);
            if (window.leftPos != e.pageX || window.topPos != e.pageY) {

            } else {
                if ((window.bxslider_mouse_over_slide!=null)){
                    window.location = window.bxslider_mouse_over_slide.attr('href');
                }
            }
        }
    });

    $(document).on('click', '.js-ajax-request', function (e) {
        e.preventDefault();
        $('body').addClass('loader_active');
        $('#ajaxBusy').show();
        var id = $(e.currentTarget).data('id');
        $.ajax({
            type: "post",
            dataType: 'json',
            url: lang + '/ajax-request',
            data: { id: id },
            success: function (response) {
                $('#ajaxBusy').hide();
                $('body').removeClass('loader_active');
                $('.js-row').stop().animate({ "opacity": "0" }, 100, function () {
                    $(this).html(response).animate({ opacity: 1 });
                });
                $(".js-ajax-request").removeClass("active");
                $(".js-category-" + id).addClass("active");
                window.history.pushState({ "ajaxId": id }, "3piroga", "/?cid=" + id);
            },
            error: function (jqXhr) {
            }
        });
    });

    window.onpopstate = function (e) {
        if (e.state && e.state.ajaxId || window.location.href.toString().split(window.location.host)[1] === "/") {
            e.preventDefault();
            $('body').addClass('loader_active');
            $('#ajaxBusy').show();
            var id = (window.location.href.toString().split(window.location.host)[1] === "/") ? 0 : e.state.ajaxId;

            $.ajax({
                type: "post",
                dataType: 'json',
                url: lang + '/ajax-request',
                data: { id: id },
                success: function (response) {
                    $('#ajaxBusy').hide();
                    $('body').removeClass('loader_active');
                    $('.js-row').stop().animate({ "opacity": "0" }, 100, function () {
                        $(this).html(response).animate({ opacity: 1 });
                    });
                    $(".js-ajax-request").removeClass("active");
                    $(".js-category-" + id).addClass("active");
                },
                error: function (jqXhr) {
                }
            });
        }
    };

    $(document).on('click', '.js-ajax-page', function (e) {
        e.preventDefault();
        $('body').addClass('loader_active');
        $('#ajaxBusy').show();
        var id = $(e.currentTarget).data('id');
        var page = $(e.currentTarget).data('page');
        $.ajax({
            type: "post",
            dataType: 'json',
            url: lang + '/ajax-request/page/' + page,
            data: { id: id, page: page },
            success: function (response) {
                $('body').removeClass('loader_active');
                $('#ajaxBusy').hide();
                $('.js-row').stop().animate({ "opacity": "0" }, 100, function () {
                    $(this).html(response).animate({ opacity: 1 });
                });
                $(".js-ajax-request").removeClass("active");
                $(".js-category-" + id).addClass("active");
                window.history.pushState(page, "#piroga", "/" + page);
            },
            error: function (jqXhr) {
            }
        });
    });
    $(document).on('click', '.js-add-to-cart', function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).data('id');
        //var params = $('.catalog_list .js-category-' + id + ' .item.active').data('id');
        var params = $(this).parents('.cart_goods_small').find('.js-category-' + id + ' .item.active').data('id');

        if(typeof params == "undefined"){
            var params = $(this).parents('.cart_goods').find('.js-category-' + id + ' .item.active').data('id');
        }
        if(typeof params == "undefined"){
            var params = $(this).parents('.padding_left_media').find('.js-category-' + id + ' .item.active').data('id');
        }

        var langurl = '/' + $('html').attr('lang');
        if(langurl === '/ua'){ langurl = ''; }


        var count = $(e.currentTarget).parents('.product_share').find('.js-count-add-' + id).val();
        if(typeof count == "undefined"){
            count = $(e.currentTarget).parents('.line_1').find('.js-count-add-' + id).val();

        }
        console.log('kjkjkjkj', count);
        var method = 'add';
        $.ajax({
            type: "post",
            dataType: 'json',
            url: langurl + '/cart/request',
            data: { count: count, id: id, params: params, method: method },
            success: function (response) {
                response.cost = response.cost.toFixed(2);
                //console.log(params);
                $(".cart-box").addClass('fixedBasket');
                $('.js-backet-price').text(response.cost);
                $('.skdop_minibsket_backet_all span').text(response.cost);
                $('.js-backet-count').text(response.cart_count);
                $('.content_personal_account_sk').html(response.cart_info);
                $(".shk").show();
                if ($("input").is("#surrenderwith")) {
                    $('.content_personal_account').html(response.cart_info);
                    location.reload();
                } else {
                    //$(".shk").html('');

                }
                //upd_discount($('.isDAlabel input.isDA').val(), '', $("input#pay_bonus").val());
            },
            error: function (jqXhr) {
            }
        });
    });
    $(document).on('click', '.js-add-to-cart-ajax', function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).data('id');
        var params = $('.js-category-' + id + ' .item.active').data('id');
        var count = $('.js-count-add-' + id).val();
        var method = 'add';
        $.ajax({
            type: "post",
            dataType: 'json',
            url: '/cart/request',
            data: { count: count, id: id, params: params, method: method },
            success: function (response) {
                $(".cart-box").addClass('fixedBasket');
                $('.js-backet-price').text(response.cost);
                $('.skdop_minibsket_backet_all span').text(response.cost);
                $('.js-backet-count').text(response.cart_count);
                $('.header__basket').addClass('basket_show');

                $('.content_personal_account_sk').html(response.cart_info);
                $(".shk").show();


                setTimeout(function () {
                    $('.header__basket').removeClass('basket_show');
                }, 3000);
            },
            error: function (jqXhr) {
            }
        });
    });
    $("form#sign-up").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/auth/sign-up',
            data: $(this).serialize(),
            success: function (data) {
                if (data == 'success') {
                    $('#sign-up').trigger("reset");
                    $('.js-registration-answer').text('Спасибо за регистрацию. На Вашу почту отправлено подтверждение регистрации!');
                } else {
                    $('.js-registration-answer').text(data);
                }
            }, error: function (error) {
                $('form#callback').find('.bad-msg').fadeIn();
            }
        });
    });
    $("form#sign-in").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST', url: '/auth/sign-in', data: $(this).serialize(), success: function (data) {
                if (data.answer == 'success') {
                    location.href = data.url;
                } else {
                    $('.js-answer-status').text(data);
                }
            }, error: function (error) {
                $('form#callback').find('.bad-msg').fadeIn();
            }
        });
    });
    $("form#change-settings").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST', url: lang + '/user/change-settings', data: $(this).serialize(), success: function (data) {
//                console.log(data);
                if (data.status == true) {
                    $('.js-successs').text(data.answer);
                    $('#modal_1_success').modal('toggle');
                } else {
                    $('.js-registration-answer').text(data);
                }
            }, error: function (error) {
                $('form#callback').find('.bad-msg').fadeIn();
            }
        });
    });
    $(document).on('click', '.js-change-password', function (e) {
        e.preventDefault();
        var password = $('#password').val()
        $.ajax({
            type: "post",
            dataType: 'json',
            url: lang + '/user/change-password',
            data: { password: password },
            success: function (response) {
                $('.js-successs').text(response.answer);
                $('#modal_1_success').modal('toggle');
            },
            error: function (jqXhr) {
                console.log("Ошибка: " + jqXhr.statusText + " (" + jqXhr.readyState + ", " + jqXhr.status + ", " + jqXhr.responseText + ")");
            }
        });
    });
    $(document).on('click', '.js-delivery-add', function (e) {
        e.preventDefault();
        var address = $('#address').val();
        $.ajax({
            type: "post",
            dataType: 'json',
            url: '/user/add-address',
            data: { address: address },
            success: function (response) {
                $(response).appendTo('.js-render');
                $('.js-successs').text('успешно');
                $('#modal_1_success').modal('toggle');
            },
            error: function (jqXhr) {
            }
        });
    });
    $(document).on('click', '.js-delete-address', function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).data('id');
        $.ajax({
            type: "post",
            dataType: 'json',
            url: '/user/delete-address',
            data: { id: id },
            success: function (response) {
                $('.js-none-' + id).remove();
                $('.js-successs').text('удалено');
                $('#modal_1_success').modal('toggle');
            },
            error: function (jqXhr) {
            }
        });
    });
    $(document).on('click', '.js-change-address', function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).data('id');
        var address = $('.js-change-' + id).val();
        $.ajax({
            type: "post",
            dataType: 'json',
            url: '/user/change-address',
            data: { id: id, address: address },
            success: function (response) {
                $('.js-successs').text('Изменено');
                $('#modal_1_success').modal('toggle');
            },
            error: function (jqXhr) {
                console.log("Ошибка: " + jqXhr.statusText + " (" + jqXhr.readyState + ", " + jqXhr.status + ", " + jqXhr.responseText + ")");
            }
        });
    });

    $(document).on('click', '.js-change-count', function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).data('id');
        var count = $('.js-count-requst-' + id).val();
        var delliv = $('#in_costDelivery').val();
        var in_freeDelivery = $('#in_freeDelivery').val();

        $.ajax({
            type: "post",
            dataType: 'json',
            url: '/cart/change-count',
            data: { id: id, count: count, delivery: delliv, freeDelivery: in_freeDelivery },
            success: function (response) {
                console.log(response);
//                console.log(id);
                $(".cart-box").addClass('fixedBasket');
                $('.js-backet-count').text(response.cart_count);
                $('.skdop_minibsket_backet_all span').text(response.cost);
                $('.js-backet-price').text(response.cost);
                $('.js-change-price-' + id).text(response.param_summ);

                $('.js-order-price').text(response.cost);
                $('.js-order-price').attr('data-price', response.cost);
                $('.js-order-price').attr('data-delivery', response.delliv);

                $('#all_count').text(response.cost);
                $('.js-order-delivery').text(response.delliv);
                $('#address-input').val('');
                $('#js-delivery-price').text('');
                $("input#all_count").val(response.cost);
                upd_bonus();
                var items = parseInt($(".js-backet-count").html());
                get_stocs(items, 'plus', 1);
            },
            error: function (jqXhr) {
            }
        });
    });



   






    $(document).on('click', '.js-delete-from-backet', function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).data('id'), langurl = '/' + $('html').attr('lang');
        if(langurl === '/ua'){ langurl = ''; }
        $.ajax({
            type: "post",
            dataType: 'json',
            url: langurl + '/cart/delete-from-backet',
            data: { id: id },
            success: function (response) {
                $(".cart-box").addClass('fixedBasket');
                $('.js-remove-from-backet-' + id).remove();
                $('.js-backet-price').text(response.cost);
                $('.skdop_minibsket_backet_all span').text(response.cost);
                $('.js-backet-count').text(response.cart_count);
                $('.content_personal_account_sk').html(response.cart_info);
                $('#address-input').val('');
                $('#js-delivery-price').text('');
                $('.js-order-price').text(response.cost);
                $('.js-order-price').attr('data-price', response.cost);
                $('.js-order-price').attr('data-delivery', response.delliv);

                $('#all_count').text(response.cost);
                if (response.cost < 1) {
                    $(".shk").hide();
                }
                $("input#all_count").val(response.cost);
                upd_bonus();
            },
            error: function (jqXhr) {
            }
        });
    });
    $(document).on('click', '.js-change-price', function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).data('id');
        var c = $('.js-count-add-' + id).val();

        var count = $(e.currentTarget).parents('.cart_goods').find('.js-count-add-' + id).val();
        if(typeof count == "undefined"){
            c = $('.js-count-add-' + id).val();
        }
        var prices = $(e.currentTarget).data('price') * c;

        if (c) {
            $('.js-count-view-' + id).html(skPriceLetter(prices));
        } else {
            var price = $(e.currentTarget).data('price');
            $('.js-count-view-' + id).html(skPriceLetter(price));
        }
    });
    $(".js-qty-input").on("change paste keyup blur", function (e) {
        var count = $(this).val();
        var id = $(e.currentTarget).data('id');
        var price = $('.js-category-' + id + ' .item.active .js-change-price').data('price');
        if (count > 0) {
            var outPrice = (price * count).toFixed(2),
                newOutPrice = skPriceLetter(outPrice);
            $(this).closest('.cart_goods').find('.js-count-view-' + id).html(newOutPrice);
            $(this).closest('.cart_goods_small').find('.js-count-view-' + id).html(newOutPrice);
            $(this).closest('.product_share').find('.js-count-view-' + id).html(newOutPrice);
        }
    });
    $(".js-qty-input-ajax").on("change paste keyup blur", function (e) {
        var count = $(this).val();
        var id = $(e.currentTarget).data('id');
        var price = $('.js-category-' + id + ' .item.active .js-change-price-ajax').data('price');
        if (count > 0) {
            //$('.js-count-view-' + id).text(price * count);
            var outPrice = (price * count).toFixed(2),
                newOutPrice = skPriceLetter(outPrice);
            $('.js-count-view-' + id).html(newOutPrice);
        }
    });
    $(document).on('click', '.cart_goods .js-count-in-catalog', function (e) {
        var id = $(e.currentTarget).data('id');
        var count = $('.cart_goods .js-count-add-' + id).val();
        console.log(count, id, 'tttt');
        var price = $('.cart_goods .js-category-' + id + ' .item.active .js-change-price').data('price');
        if (count > 0) {
            //$('.js-count-view-' + id).text(price * count);
            var outPrice = (price * count).toFixed(2),
                newOutPrice = skPriceLetter(outPrice);
                $('.cart_goods .js-count-view-' + id).html(newOutPrice);
        } else {
            $(this).val(1);
        }
    });

    $(document).on('click', '.cart_goods_small .js-count-in-catalog', function (e) {
        var id = $(e.currentTarget).data('id');
        var count = $(e.currentTarget).closest('.cart_goods_small').find('.js-count-add-' + id).val();
        var price = $(e.currentTarget).closest('.cart_goods_small').find('.js-category-' + id + ' .item.active .js-change-price').data('price');
        console.log('jjjj', count, price);
        if (count > 0) {
            //$('.js-count-view-' + id).text(price * count);
            var outPrice = (price * count).toFixed(2),
                newOutPrice = skPriceLetter(outPrice);
            $(e.currentTarget).closest('.cart_goods_small').find('.js-count-view-' + id).html(newOutPrice);
        } else {
            $(this).val(1);
        }
    });

    $(".js-qty-input").on("change keyup input click", function (e) {
        var number = parseInt($(this).val());
        if (this.value.length > 1) {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
            if (number > 100) {
                this.value = 100;
            }
        } else {
            if (this.value.match(/[^1-9]/g)) {
                this.value = this.value.replace(/[^1-9]/g, '');
            }
        }
    });
    var v = window.location.href;

    $(document).ready(function () {
        if ($("#liqpay").prop('checked')) {
            $("#surrenderwith").hide();
            if (v === 'https://3piroga.ua/backet') {
                $("#confirm_order").text('Перейти до оплати ');
            } else if (v === 'https://3piroga.ua/ru/backet') {
                $("#confirm_order").text('Перейти к оплате ');
            } else if (v === 'https://3piroga.ua/en/backet') {

                $("#confirm_order").text('Pay ');
            }
        }
        $("#liqpay").click(function () {
            $("#surrenderwith").hide();
            if (v === 'https://3piroga.ua/backet') {
                $("#confirm_order").text('Перейти до оплати ');
            } else if (v === 'https://3piroga.ua/ru/backet') {
                $("#confirm_order").text('Перейти к оплате ');
            } else if (v === 'https://3piroga.ua/en/backet') {

                $("#confirm_order").text('Pay ');
            }

        });
    });


    $("#other0").click(function () {
        if (this.checked) {
            $("#surrenderwith").show();
            if (v === 'https://3piroga.ua/backet') {
                $("#confirm_order").text('Оформити замовленя');
            } else if (v === 'https://3piroga.ua/ru/backet') {
                $("#confirm_order").text('Оформить заказ ');
            } else if (v === 'https://3piroga.ua/en/backet') {

                $("#confirm_order").text('To order ');
            }
        }
    });
    $("#other1").click(function () {
        if (this.checked) {
            $("#surrenderwith").show();
            if (v === 'https://3piroga.ua/backet') {
                $("#confirm_order").text('Оформити замовленя');
            } else if (v === 'https://3piroga.ua/ru/backet') {
                $("#confirm_order").text('Оформить заказ ');
            } else if (v === 'https://3piroga.ua/en/backet') {

                $("#confirm_order").text('To order ');
            }
        }
    });
    $("#other2").click(function () {
        if (this.checked) {
            $("#surrenderwith").show();
            if (v === 'https://3piroga.ua/backet') {
                $("#confirm_order").text('Оформити замовленя');
            } else if (v === 'https://3piroga.ua/ru/backet') {
                $("#confirm_order").text('Оформить заказ ');
            } else if (v === 'https://3piroga.ua/en/backet') {

                $("#confirm_order").text('To order ');
            }
        }
    });


    $("form#js-feedback").on('submit', function (e) {
        e.preventDefault();
        var mark = $('.user_rating').data('star');
        var name = $('#name').val();
        var email = $('#email').val();
        var product_id = $('.product_id').val();
        var text = $('.msg_reviews').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: lang + '/forms/feedback',
            data: { mark: mark, name: name, text: text, product_id: product_id, email: email },
            success: function (data) {
                if (data.status == true) {
                    $('#js-feedback').trigger("reset");
                    $('.js-successs').text(data.answer);
                    $('#modal_1_success').modal('toggle');
                } else {
                    $('.js-successs').text(data);
                    $('#modal_1_success').modal('toggle');
                }
            },
            error: function (error) {
                $('form#callback').find('.bad-msg').fadeIn();
            }
        });
    });
    $(document).on('click', '.js-clear', function (e) {
        $.ajax({
            type: "post", dataType: 'json', url: '/cart/clear', success: function (response) {
                location.href = response;
            }, error: function (jqXhr) {
                console.log("Ошибка: " + jqXhr.statusText + " (" + jqXhr.readyState + ", " + jqXhr.status + ", " + jqXhr.responseText + ")");
            }
        })
    });

    $(".js-delivery").on("change paste keyup", function (e) {
        if ($('.js-delivery:checked').val() == 7) {
            $('.js-courier').css('display', 'none');
            $('.js-order-request').removeClass('disabled-click');
            var price = $('.js-order-price').data('price');
            $('.js-order-price').text(price);
            $('.js-order-price').attr('data-price', price);
            $('.js-cost-delivery').css('display', 'none');
        } else {
            $('.js-courier').css('display', '');
            $('.js-order-request').addClass('disabled-click');
            $('.js-cost-delivery').css('display', '');
        }
        upd_bonus();
    });
    $("form#js-ordering_form").on('submit', function (e) {
        e.preventDefault();
        // disable button

        var v = window.location.href;

        if (!$('#checkbox-personal-data').prop('checked')) {
            if (v === 'https://3piroga.ua/backet') {
                $("#error-personal-div").html('Будь ласка, погодьтесь з договором');
            } else if (v === 'https://3piroga.ua/ru/backet') {
                $("#error-personal-div").html('Пожалуйста, согласитесь с договором');
            } else if (v === 'https://3piroga.ua/en/backet') {
                $("#error-personal-div").html('Please, confirm the agreement');
            }
            $("#error-personal-div").css('display', 'block');
            return;
        } else {
            $("#error-personal-div").html('').css('display', 'none');
        }

        $(".spinner-load").css('display', 'inline');
        $('#confirm_order').addClass('disabled-click');

        var username = $('.js-name').val();
        var phone = $('.js-phone').val();
        var email = $('.js-email').val();
        var address = $('.js-address').val();
       // var build = $('.js-build').val();
        var parad = $('.js-parad').val();
        var floar = $('.js-floar').val();
        var kvartira = $('.js-kvartira').val();
        var deliveryDate = $('.js-deliveryDate').val();
        var code_c = $('.js-code_c').val();
        var pay_type = $('.js-pay:checked').val();
        var delivery_type = $('.js-delivery:checked').val();
        var register = $('#checkbox-register:checked').val();
        var comment = $('.js-comment').val();
        var time = $('.js-time').val();
        var surrenderwith = $('.js-surrenderwith').val();
        var placeId = $('#placeId').val();
        var persons = $('.js-persons').val();
        var bonus = $('.js-bonus').val();
        var stocks_id = $('input[name=stocks]:checked').val();
        var sk_Discount = $('#sk_Discount').val();
        var delivery = $('.js-order-price').data('delivery');
        var price = $('.js-order-price').data('price');
        var all_count = $("#all_count").val();
        var certificate = $('.js-certificate').val();
        $.ajax({
            type: "post",
            scriptCharset: "utf-8",
            dataType: 'json',
            url: lang + '/cart/new-order?v=' + (Math.random() * (99999 - 1) + 1),
            data: {
                username: username,
                phone: phone,
                email: email,
                address: address,
                //build: build,
                parad: parad,
                floar: floar,
                kvartira: kvartira,
                placeId: placeId,
                deliveryDate: deliveryDate,
                code_c: code_c,
                pay_type: pay_type,
                delivery_type: delivery_type,
                comment: comment,
                price: price,
                delivery: delivery,
                bonus: bonus,
                time: time,
                persons: persons,
                surrenderwith: surrenderwith,
                sk_Discount: sk_Discount,
                stocks_id: stocks_id,
                all_count: all_count,
                register: register,
                certificate: certificate
            },
            success: function (response) {
                if (response.status == 'liqpay') {
                    $('#confirm_order').removeClass('disabled-click');
                    $("form#js-ordering_form").off("submit");
                    $(response.liqpay_button).appendTo('.js-button-liqpay').submit();
                    console.log(response);
                } else if (response.status == true) {
                    $('#confirm_order').removeClass('disabled-click');
                    location.href = response.url;
                    console.log(response);
                } else {
                    console.log(response);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $('#confirm_order').removeClass('disabled-click');
                $(".spinner-load").css('display', 'none');
                console.log(xhr.responseText)
            }
        })
    });
    $("form#js-question").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST', url: '/user/save-question', data: $(this).serialize(), success: function (data) {
                if (data == true) {
                    $('#js-question').trigger("reset");
                    $('.js-successs').text('вопрос успешно отправлен');
                    $('#modal_1_success').modal('toggle');
                } else {
                    $('.js-successs').text('произошла ошибка');
                    $('#modal_1_success').modal('toggle');
                }
            }, error: function (error) {
                $('form#callback').find('.bad-msg').fadeIn();
            }
        });
    });
    $("form#js-callback").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST', url: '/forms/callback', data: $(this).serialize(), success: function (data) {
                if (data == true) {
                    $('#js-callback').trigger("reset");
                    $('.js-successs').text('Благодарим за обращение. Ожидайте обратной связи');
                    $('#myModal').fadeOut();
                    $('.modal-backdrop').fadeOut();
                    $('#modal_1_success').modal('toggle');
                } else {
                    $('.js-successs').text(data);
                    $('#modal_1_success').modal('toggle');
                }
            }, error: function (error) {
                $('form#callback').find('.bad-msg').fadeIn();
            }
        });
    });
    $("form#js-mail").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST', url: '/forms/mail', data: $(this).serialize(), success: function (data) {
                if (data == true) {
                    $('#js-mail').trigger("reset");
                    $('.js-successs').text('Благодарим за обращение. Ожидайте обратной связи');
                    $('#contacts_page').fadeOut();
                    $('.modal-backdrop').fadeOut();
                    $('#modal_1_success').modal('toggle');
                } else {
                    $('.js-successs').text(data);
                    $('#modal_1_success').modal('toggle');
                }
            }, error: function (error) {
                $('form#callback').find('.bad-msg').fadeIn();
            }
        });
    });
});
$(document).ready(function () {
    var lang = $('.b-lang__item .active').data('lang');
    if (lang == 'uk') {
        lang = '';
    } else {
        lang = '/' + lang;
    }
    $(document).on('click', '.js-click', function (e) {
        e.preventDefault();
        var email = $('#email').val();
        $.ajax({
            type: 'POST', url: lang + '/auth/reset', data: { email: email }, success: function (data) {
                if (data != false) {
                    $('#reset').trigger("reset");
                    $('.js-answer-status').text(data);
                } else {
                    $('.js-answer-status').text('Не удалось восстановить пароль');
                }
            }, error: function (error) {
                $('form#callback').find('.bad-msg').fadeIn();
            }
        });
    });
});
$(document).ready(function () {
    var lang = $('.b-lang__item .active').data('lang');
    if (lang == 'uk') {
        lang = '';
    } else {
        lang = '/' + lang;
    }
    $(document).on('click', '.js-click-click', function (e) {
        e.preventDefault();
        var password = $('#password').val();
        var crfs = $('#crfs').val();
        $.ajax({
            type: 'POST',
            url: lang + '/auth/reset-password',
            data: { password: password, crfs: crfs },
            success: function (data) {
                if (data != false) {
                    $('#reset').trigger("reset");
                    $('.js-answer-status').text(data);
                } else {
                    $('.js-answer-status').text('Не удалось восстановить пароль');
                }
            },
            error: function (error) {
                $('form#callback').find('.bad-msg').fadeIn();
            }
        });
    });

    if ($(window).width() < 995) {

        var owl = $('.owl-carousel');
        owl.owlCarousel({
            loop: true,
            nav: false,
            onDragged: sk_owl_carousel_callback,
            URLhashListener: true,
            dots: true,
            responsiveClass: true,
            margin: 0,
            center: true,
            responsive: {
                0: {
                    items: 3,
                    margin: 25,
                    center: false,
                    autoWidth: true,
                },
                400: {
                    items: 5,
                    margin: 5,
                    center: false,
                    autoWidth: true,
                },
                600: {
                    items: 5,
                    margin: 0,
                    center: false,
                    autoWidth: true,
                    dots: true,
                },
                960: {
                    items: 6,
                    margin: 0,
                    nav: false,
                    dots: false,
                    loop: false,
                    center: false,
                },
                1200: {
                    items: 6,
                    nav: false,
                    dots: false,
                    loop: false,
                    center: false,
                }
            }
        });

    }

});


$(window).resize(function () {
    if ($(window).width() < 995) {

        var owl = $('.owl-carousel');
        owl.owlCarousel({
            loop: true,
            onDragged: sk_owl_carousel_callback,
            mouseDrag: false,
            URLhashListener: true,
            nav: false,
            dots: true,
            responsiveClass: true,
            margin: 0,
            center: true,
            responsive: {
                0: {
                    items: 3,
                    margin: 25,
                    center: false,
                    autoWidth: true,
                },
                400: {
                    items: 5,
                    margin: 5,
                    center: false,
                    autoWidth: true,
                },
                600: {
                    items: 5,
                    margin: 0,
                    center: false,
                    autoWidth: true,
                    dots: true,
                },
                960: {
                    items: 6,
                    margin: 0,
                    nav: false,
                    dots: false,
                    loop: false,
                    center: false,
                },
                1200: {
                    items: 6,
                    nav: false,
                    dots: false,
                    loop: false,
                    center: false,
                }
            }
        });

    }
});


function sk_owl_carousel_callback(event) {
//    console.log(event.item.index);//.find(".item").eq(current).find("a").attr('href')
}

$("#pay_bonus").on("click", function () {
    upd_bonus();
});
$("#pay_bonus").on("keyup", function () {
    upd_bonus();
});
var all = parseInt($('#sk-b span').html());

function upd_bonus(noit) {


    var price = $("input#all_count").val(),
        value_b = $("input#pay_bonus").val(),
        max = $('input.js-bonus').attr('max');
    var stok = $('.isDAlabel input.isDA').val();
    if (typeof stok === 'undefined') {
        stok = 0;
    }

    /*if(value_b > all && stok === 0){
        alert('Достигнут максимум!');
        var ret = upd_discount(stok, 1, value_b);

    } else if(parseInt($(".js-order-price").html()) <= 0 && stok > 0){
        alert('Достигнут максимум!');
        var ret = upd_discount(stok, 1, value_b);

    } else { */
    if (all > 0) {
        if(value_b > all) {
            value_b = all;
        }
        $('#sk-b span').html((all - value_b));
    }
    //}

    upd_discount(stok, '', value_b);

}

$(".skOrders").on("click", function () {
    var id = $(this).attr('data-id');
    if ($("#order_" + id).css('display') == 'none') {
        $(".scroll_box").hide(500);
        $("#order_" + id).show(500);
    }
});


//$ = jQuery;

$('body').on('mousedown', '.sk_label_radio label.sk_labe', function (e) {
    console.log($(this).attr("class"));
    if ($(this).attr("class") === 'sk_label_noact sknock') return false;
    var id = $(this).attr('data-id');

    if ($(this).hasClass("isDAlabel") == true) {

        $(this).find('input[name=stocks]').removeClass('isDA');
        $(this).removeClass('isDAlabel');

        var uncheck = function () {
            setTimeout(function () {
                $(this).find('input[name=stocks]').removeAttr('checked');
                $(this).find('input[name=stocks]').prop('checked', false);
                $(this).find('input[name=stocks]').set("checked", false);
            }, 10000);
        };
        var unbind = function () {
            $(this).find('input[name=stocks]').unbind('mouseup', up);
        };
        var up = function () {
            uncheck();
            unbind();
        };
        $(this).find('input[name=stocks]').bind('mouseup', up);
        $(this).find('input[name=stocks]').one('mouseout', unbind);

    } else {
        $('input[name=stocks]').removeClass('isDA');
        $(this).find('input[name=stocks]').addClass('isDA');
        $('.sk_label_radio label').removeClass('isDAlabel');
        $(this).addClass('isDAlabel');
    }

    upd_bonus();

});


function get_stocs(items, types, ids) {

    return false;

    $.ajax({
        type: "get",
        dataType: 'json',
        url: '/cart/request-stoks',
        data: { total: $("#all_count").val(), count: items, type: types, ids: ids },
        success: function (response) {
            console.log(response);
            console.log('here we go11111');

            response.forEach(function (item, i, response) {
                var id = item.split('-');
                //$("#oneStoc_"+id[0]+" label input").addClass('isDA');
                if (id[1] === '0') {
                    console.log('here we go', id);
                    $("#oneStoc_" + id[0] + " label").attr('class', 'sk_label_noact');
                    $("#oneStoc_" + id[0] + " label input").attr('disabled', 'disabled');
                    $("#oneStoc_" + id[0] + " label").removeClass('isDAlabel');
                    $("#oneStoc_" + id[0] + " label input").removeClass('isDA');
                    $("#oneStoc_" + id[0] + " label").addClass('sknock');

                } else {
                    $("#oneStoc_" + id[0] + " label").addClass('sk_labe');
                    $("#oneStoc_" + id[0] + " label").removeClass('sk_label_noact');
                    $("#oneStoc_" + id[0] + " label input").removeAttr('disabled');
                    $("#oneStoc_" + id[0] + " label").removeClass('sknock');
                }

                console.log(id[0]);
                id = [];
            });
            console.log(response);
        }
    });
}

// $(".js-qty-plus").on('click', function () {
//     var items = parseInt($(".js-backet-count").html());
//     get_stocs(items, 'plus', $(this).data('id'));
//     return true;
// });
//
// $(".js-qty-minus").on('click', function () {
//     if ($('.js-count-requst-' + $(this).data('id')).val() === '1') return false;
//     var items = parseInt($(".js-backet-count").html());
//     get_stocs(items, 'minus', $(this).data('id'));
//     return true;
// });

function upd_discount(id, retur, bonus) {
    var price = $(".js-order-price").attr('data-price');
    var certificate = $('.certificate-field-wrap input[name=certificate]').val();
    //bonus = $("#pay_bonus").val();
    //console.log(bonus);
    //if(id){

    $.ajax({
        type: "get",
        dataType: 'json',
        url: '/cart/request-discount',
        data: { diskount_id: id, sum: price, bonus: bonus, certificate_code: certificate},
        success: function (response) {
            if (retur) {
                return response.price;
            }
            $(".cart-box").addClass('fixedBasket');

          var  dost = $("#in_Delyvery").val();
            $(".js-backet-price").text( parseInt(response.price) + parseInt(dost));
            $('.skdop_minibsket_backet_all span').text( parseInt(response.price) + parseInt(dost));
            $(".js-order-price").text( parseInt(response.price) + parseInt(dost));
            if (parseInt($("#sk-b span").html()) > parseInt(response.price) + parseInt(dost)) {
                $("#sk_dr").text(response.price);
            } else {
                $("#sk_dr").text($("#sk-b span").html());
            }

            $(".js-order-price9").text(response.discount);
            $("#sk_Discount").val(response.discount);
            console.log(response);
            if (parseInt(response.bonus) > 0) {
                $("input#pay_bonus").val(response.bonus);
            }

            // скрыть варианты оплаты, если сумма "0"
            if(!parseInt(response.price)){
                //$('.js-pay').prop('checked', false);
                //$('.js-pay').prop('disabled', true);
                $('.payment-wrap').hide();
                $('.surrender-wrap').hide();
            } else {
                //$('.js-pay').prop('disabled', false);
                $('.payment-wrap').show();
                $('.surrender-wrap').show();
            }

            //console.log(response);
        },
        error: function (jqXhr) {
        }
    });
    /*}else{
        $(".js-backet-price").text(price);
        $(".js-order-price").text(price);
        $(".js-order-price9").text('0');
        $("#sk_Discount").val('0');
    }*/
}

$(function () {
    //задание заполнителя с помощью параметра placeholder
    $("#date_birthday").mask("99.99.9999", { placeholder: "дд.мм.гггг" });
});

function skPriceLetter(price) {
    //var oldP = price.indexOf('.');
    var prices = price.toString();
    if (prices.indexOf('.') != -1) {
        //return price;
        var oldPrice = prices.split('.'),
            newPrice = oldPrice[0] + "<span class='skCents'>" + oldPrice[1].slice(0, 2) + "</span>";
        return newPrice;
    } else {
        return price;
    }
}

$(".skpf").on("click", function () {
    $(".sk_h_row").toggle();
});
if ($(window).width() < 750) {
    $(".desk_bl .close").on("click", function () {
        $(this).parent().hide();
    });
    $(".sk_labe .label").on("click", function () {
        var id = $(this).data('id');
        if ($(this).parent().parent('label').attr('class') !== 'sk_labe') {
            $("#desk_bl_" + id).show();
        }
    });
}


if ($(window).width() < 901) {
    $(".buttons_group .left_sk").appendTo($(".right_sk"));
}
/* $(document).ready( function(){
    $.fn.snow({ minSize: 5, maxSize: 20, newOn: 500 });
});*/
$("form.ordering_form input.sk-coock-add, .js-comment, .js-surrenderwith").focusout(function () {
    sk_upd_coock();
});
/*
$(".my_input, .item_form_sk_check").on("mouseout, mouseup",function() {
    sk_upd_coock();
});*/

$(".js-pay, #checkbox-register").change(function () {
    sk_upd_coock();
});

function sk_upd_coock() {
//    console.log('1');
    $('form.ordering_form input.sk-coock-add').each(function (nf, form) {
        //if($(this).val() != ''){
        if (getCookie('order_' + $(this).attr('name')) != $(this).val()) {
            skAddCoockie('order_' + $(this).attr('name'), $.trim($(this).val()));
        }
        //}
    });

    if (getCookie('order_comment') != $('.js-comment').val()) {
        skAddCoockie('order_comment', $.trim($('.js-comment').val()));
    }
    if (getCookie('order_surrenderwith') != $('.js-surrenderwith').val()) {
        skAddCoockie('order_surrenderwith', $.trim($('.js-surrenderwith').val()));
    }
//    console.log($('#checkbox-register:checked').val());
    if ($('#checkbox-register:checked').val() === '1') {
        skAddCoockie('order_register', '1');
    } else {
        skAddCoockie('order_register', '');
    }

    skAddCoockie('order_pay', $('.js-pay:checked').val());

}

function skAddCoockie(name, value) {
    var date = new Date(new Date().getTime() + 600 * 1000000);
    document.cookie = "" + name + "=" + value + "; path=/; expires=" + date.toUTCString();
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var $page = $('html, body');
$('.btn_checkout.mod_1').click(function () {
    if ($(window).width() < 430) {
        $page.animate({
            scrollTop: $('.head_section_1').offset().top + 150
        }, 800);
    } else if ($(window).width() < 550) {
        $page.animate({
            scrollTop: $('.head_section_1').offset().top + 120
        }, 800);
    } else if ($(window).width() < 1200) {
        $page.animate({
            scrollTop: $('.head_section_1').offset().top + 80
        }, 800);
    } else {
        $page.animate({
            scrollTop: $('.head_section_1').offset().top + 150
        }, 800);
    }

    return false;
});

$(".mod_1").on('click', function () {
    $(this).addClass('mod_233');
});

function getLang() {
    return $('.b-lang__item .active').data('lang');
}

function getNotice() {
    const notices = {
        'uk': 'Не знайшлася вулиця. Введіть назву вручну.',
        'ru': 'Не смогли найти улицу. Введите название вручную.',
        'en': "Can't find street. Please type full name of the street.",
    };
    return notices[getLang()];
}

// $('.js-address').on('click', function () {
//     const holders = {
//         'uk': 'Введіть назву вулиці та номер будинку.',
//         'ru': 'Введите улицу и номер дома.',
//         'en': "Typing street name and build number.",
//     };
//
//     if ($('.js-address').val().length === 0) {
//         $('.js-address').attr("placeholder", holders[getLang()]);
//     }
// });
// $('.js-address').autocomplete({
//     showNoSuggestionNotice: true,
//     noSuggestionNotice: getNotice(),
// lookup: function (query, done) {
//     // Do Ajax call or lookup locally, when done,
//     // call the callback and pass your results:
//     var lang = $('.b-lang__item .active').data('lang');
//     if (lang == 'uk') {
//         lang = '';
//     } else {
//         lang = '/' + lang;
//     }
//
//     $.get({
//         url: lang + "/ajax-street-autocomplete",
//         data: {
//             "query": query,
//         },
//         success: function (res) {
//             // var result = {
//             //     suggestions: [
//             //         { "value": "United Arab Emirates", "data": "AE" },
//             //         { "value": "United Kingdom",       "data": "UK" },
//             //         { "value": "United States",        "data": "US" }
//             //     ]
//             // };
//             var result = res.map(function (row) {
//                 return { "value": row.street_name }
//             });
//             done({ "suggestions": result });
//         },
//     });
//
// }
// ,
// onSelect: function (suggestion) {
// },
//
// })
// ;

// $('.js-address').on('click',function () {
//     var lang = $('.b-lang__item .active').data('lang');
//     if (lang == 'uk') {
//         lang = '';
//     } else {
//         lang = '/' + lang;
//     }
//     var query = $('js-address').val();
//     $.get({
//         url: lang + "/ajax-google-geo?query=",
//         data: {
//             "query": query,
//         },
//         success: function (res) {
//             // var result = {
//             //     suggestions: [
//             //         { "value": "United Arab Emirates", "data": "AE" },
//             //         { "value": "United Kingdom",       "data": "UK" },
//             //         { "value": "United States",        "data": "US" }
//             //     ]
//             // };
//            console.log(res);
//         },
//     });
// });



if ($(window).width() < 768) {
    $(".shk").addClass('shk2');
    $(".shk2").removeClass('shk');
}/*
    $(".cart-box").on('click', function(){
        $(".shk").hide();
        location.href = 'https://3piroga.ua/backet';
    });*/


$(document).ready(function () {
    $(function () {
        $("#container-sk").clickCarousel({ margin: 10 });
    });
});

$(document).ready(function () {
    $(".sk-bask-del").on('click', function (e) {

        $.ajax({
            type: "post", dataType: 'json', url: '/cart/clear', success: function (response) {

            }
        });

        $('#skbac').hide();
        $(".cart-box").removeClass('fixedBasket');
        $(".js-backet-price").html("0");
        $(".js-backet-count").html("0");
        e.preventDefault();
    });
});


$('#confirm_order').on('click', function (e) {
    const el = this
    const errEl = $('#js-ordering_form input:invalid').filter(':first')
    const $page = $('html, body');
    $($page).animate({
        scrollTop: errEl.offset().top - 150
    }, 100);
})

// check certificate

$(document).ready(function(){

    $('.certificate-field-wrap .js-certificate').on('keyup', function(){
        var val = $(this).val().replace(/_/g, '');
        var lang = $('html').attr('lang');
        if(val.length != 19){
            $('.certificate-field-wrap .btn_checkcert').prop('disabled', true);
            $('.certificate-field-wrap .btn_checkcert').val('check-cert');
            if(lang == 'ua'){
                $('.certificate-field-wrap .btn_checkcert').html('Застосувати');
            }
            if(lang == 'ru'){
                $('.certificate-field-wrap .btn_checkcert').html('Применить');
            }
            if(lang == 'en'){
                $('.certificate-field-wrap .btn_checkcert').html('Apply');
            }
        }
    });

    $('.certificate-field-wrap .js-certificate').mask('9999-9999-9999-9999', {autoclear: false, completed: function(){
        $('.certificate-field-wrap .btn_checkcert').prop('disabled', false);
    }});

    $('#js-add-cert-link').click(function(){
        $('#js-add-cert-field').show();
        $('.stocks_wrap').hide();
        $('.isDAlabel input.isDA').prop('checked', false).removeClass('isDA');
        upd_bonus();
        $('#js-add-cert-link').hide();
        return false;
    });

    $('#js-hide-cert-link').click(function(){
        var lang = $('html').attr('lang');

        if($('.certificate-field-wrap .js-certificate').prop( "disabled")){
            $('.certificate-field-wrap .js-certificate').prop( "disabled", false);
            $('.certificate-field-wrap .btn_checkcert').prop( "disabled", false);
            $('.certificate-field-wrap .btn_checkcert').val('check-cert');
            if(lang == 'ua'){
                $('.certificate-field-wrap .btn_checkcert').html('Застосувати');
            }
            if(lang == 'ru'){
                $('.certificate-field-wrap .btn_checkcert').html('Применить');
            }
            if(lang == 'en'){
                $('.certificate-field-wrap .btn_checkcert').html('Apply');
            }
            $('.certificate-field-wrap input[name=certificate]').val('');
            upd_bonus();
            $('.certificate-field-wrap .msg').html('');
        } else {
            $('#js-add-cert-field').hide();
            $('.stocks_wrap').show();
            $('#js-add-cert-link').show();
        }
        return false;
    });

    $('.certificate-field-wrap .btn_checkcert').on('click', function(e) {
        // поле с сертификатом
        var cert = $('.js-certificate').val();
        var $this = this;

        // определение языка
        var lang = $('html').attr('lang');

        if(lang == 'ua'){
            $('.certificate-field-wrap .msg').html('Перевірка...');
        }
        if(lang == 'ru'){
            $('.certificate-field-wrap .msg').html('Проверка...');
        }
        if(lang == 'en'){
            $('.certificate-field-wrap .msg').html('Testing...');
        }

        // проверка на пустоту
        if(!cert) {
            if(lang == 'ua'){
                $('.certificate-field-wrap .msg').html('Введіть будь-ласка код сертифікату!');
            }
            if(lang == 'ru'){
                $('.certificate-field-wrap .msg').html('Введите пожалуйста код сертификата!');
            }
            if(lang == 'en'){
                $('.certificate-field-wrap .msg').html('Please, enter certificate code!');
            }
        } else {
            $.ajax({
                type: "post",
                dataType: 'json',
                url: (lang == 'ua'? '': '/'+lang) + '/cart/check-certificate',
                data: { cert: cert },
                success: function (response) {
                    response = $.parseJSON(response);
                    $('.certificate-field-wrap .msg').html(response.msg);
                    if (response.nominal > 0){

                        if($($this).val() == 'check-cert'){
                            $($this).val('apply-cert');
                            if(lang == 'ua'){
                                $($this).html('Оплатити');
                            }
                            if(lang == 'ru'){
                                $($this).html('Оплатить');
                            }
                            if(lang == 'en'){
                                $($this).html('Pay');
                            }
                        } else {
                            if($($this).val() == 'apply-cert'){
                                $('.certificate-field-wrap input[name=certificate]').val(cert);
                                // отображаем скидку
                                upd_bonus();

                                // скрываем возможность выбора акции
                                //$('.radio_stok').prop('checked', false);
                                //$('.sk_labe .radio_stok').prop('disabled', true);
                                //$('.sk_labe').addClass('sk_label_noact');

                                // дисейблим форму ввода сертификата
                                $('.certificate-field-wrap .js-certificate').prop( "disabled", true );
                                $('.certificate-field-wrap .btn_checkcert').prop( "disabled", true );
                            }
                        }
                    }
                },
                error: function (jqXhr) {
                }
            });
        }

        return false;
    });
});

// blog pagination

function blogPaginationInit()
{
    $('.pagination_list .list_item span.list_link').parent().css('display', 'none');

    $('.blog_page .pagination_block .list_link').click(function(){
        var href = $(this).attr('href');
        var page = $(this).attr('data-page');
        if(href){
            $('#content').load(href, function(){
                $('body,html').animate({scrollTop: 0}, 400);
                //history.pushState(null, null, document.location.pathname+'#page'+page);
                blogPaginationInit();
            });
        }
        return false;
    });
}
blogPaginationInit();
