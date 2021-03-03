<?php
namespace common\helpers;
use Yii;
use common\models\Stocks;
use common\models\Orders;


class StocksHelperApiFacade
{

    /*
    * Получаем вывиодимы список доступных акций
    */
    public static function getStocksListInBasket($cart, $activeOnly = false)
    {
        $stocks = StocksHelper::getStocksListInBasket($cart);

        $ajaxStocks = [];

        foreach ($stocks as $id => $stock) {
            $active = $stock['activ'];

            if ($activeOnly && !$active) {
                unset($stocks[$id]);
            }
        }

        return $stocks;
    }

}

