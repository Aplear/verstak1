<?php
namespace common\helpers;
use Yii;
use common\models\Stocks;
use common\models\Orders;


class StocksHelperAjaxFacade
{

    /*
    * Получаем вывиодимы список доступных акций
    */
    public static function getStocksListInBasket($cart)
    {
        $stocks = StocksHelper::getStocksListInBasket($cart);

        $ajaxStocks = [];

        foreach ($stocks as $stock) {
            $id = $stock['id'];
            $active = $stock['activ'];
            $ajaxStocks[] = "$id-$active";
        }

        return $ajaxStocks;
    }

}

