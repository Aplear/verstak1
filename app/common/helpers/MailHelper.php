<?php

namespace common\helpers;


class MailHelper
{

    /*
    * Отправляем письма о успешном заказе
    */
    public static function sendMails($order, $cart, $post)
    {
        if ($post['pay_bonus'] > 0) {
            $pay_bonus = ' Заказ частичто оплачен бонусами (' . (int)$post['bonus'] . ').';
        } else {
            $pay_bonus = '';
        }

        $headers = "From:info@3piroga.ua";
        $message = "Ваш заказ на 3piroga.ua\r\n";
        foreach ($cart["params"] as $item) {
            $message .= "=================\r\n";
            $message .= "Название: " . $item["name"] . "\r\n";
            $message .= "Объем/диаметр: " . $item["weight"] . "\r\n";
            $message .= "Количество: " . $item["count"] . " шт.\r\n";
            $message .= "Цена: " . $item["price"] . " грн.\r\n";
            $message .= "=================\r\n";

        }
        $sdaka = $post['surrenderwith'] ? trim(strip_tags($post['surrenderwith'])) : 0;
        $message .= "Общая цена: " . $order->total . " грн.\r\n";
        $message .= "Имя клиента: " . $order->name . "\r\n";
        $message .= "Телефон: " . $order->phone . "\r\n";
        $message .= "Почта: " . $order->email . "\r\n";
        $message .= "=================\r\n";
        $message .= "АДРЕС ДОСТАВКИ: \r\n";
        $message .= "Улица: " . $order->address . "\r\n";
        $message .= "№ дома: " . $order->build . "\r\n";
        $message .= "№ парадного: " . $order->parad . "\r\n";
        $message .= "Этаж: " . $order->floar . "\r\n";
        $message .= "№ квартиры: " . $order->kvartira . "\r\n";
        $message .= "Дата доставки: " . $order->deliveryDate . "\r\n";


        //$message .= "Код двери: ".$order->code_c."\r\n";
        $message .= "Время доставки: " . $order->time . "\r\n";
        $message .= $pay_bonus . "\r\n";
        $message .= "Сдача с: " . $sdaka . " грн.\r\n";
        $message .= "Количество персон: " . $order->persons . "\r\n";
        $message .= "Скидка по акции: " . $order->discount . " грн.\r\n";
        if ($post["stocks_id"] > 0) {
            $message .= "Акция: " . StocksHelper::getDiscountName($post["stocks_id"]) . "\r\n";
        }
        $message .= 'Тип оплаты: ' . \common\models\OrdersParams::find()->byId($order->pay_id)->limit(1)->one()->name . "\r\n";

        $message .= "=================\r\n";
        $message .= "Следите за нашими акциями и специальными предложениями.\r\n";
        $message .= "https://3piroga.ua/discounts";

        if ($_SERVER['REMOTE_ADDR'] != '193.93.77.121' && $order->pay_id != 11) {
            $EmailFrom = "info@3piroga.ua";

            $maill = mail("info@3piroga.ua", '=?utf-8?B?' . base64_encode("Новый заказ на 3piroga.ua") . '?=', $message, "From: <$EmailFrom>\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit");

            $maill2 = mail($order->email, '=?utf-8?B?' . base64_encode("Ваш заказ") . '?=', $message, $headers);
        }
    }

}

