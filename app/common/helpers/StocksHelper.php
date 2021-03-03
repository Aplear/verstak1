<?php
namespace common\helpers;
use Yii;
use common\models\Stocks;
use common\models\CatalogProducts;
use common\models\Orders;


class StocksHelper
{

    /*
    * Получаем вывиодимы список доступных акций
    */
    public static function getStocksListInBasket($cart)
    {

        $lang = Yii::$app->language;

        if($lang == "uk"){
            $lang = "ua";
        }else{
            $lang = Yii::$app->language;
        }
        $stocks = Stocks::find()/*->select('title_'.$lang.', id')*/->where(['status'=>1])->asArray()->all();




        $stocki = [];
        $today = getdate();
        foreach($stocks as $stock){


            $totalPriceN = $cart['cost'];
            $cartCountN = $cart['count'];

            $all_days = [];

            // Проверяем категорию-исключение
            if(!empty($stock['not_cat'])){
                $not_cat = explode(',', $stock['not_cat']);
            } else {
                $not_cat = [];
            }

            // Проверяем вес
            if(!empty($stock['condition_weight'])){
                $weights = explode(',', $stock['condition_weight']);
            } else {
                $weights = false;
            }

            // Проверяем вес
            if(!empty($stock['condition_product_id'])){
                $conditionIds = explode(',', $stock['condition_product_id']);
            } else {
                $conditionIds = false;
            }

            $backet = $cart;
            foreach ($backet['params'] as $item)
            {
                $weight[] = $item['weight'];
                if(in_array($item['category_id'], $not_cat)){
                    $cartCountN -= $item['count'];
                    $totalPriceN -= $item['price'] * $item['count'];
                    continue;
                }

                if($weights && !in_array($item['weight'], $weights)){
                    $cartCountN -= $item['count'];
                    $totalPriceN -= $item['price'] * $item['count'];
                    continue;
                }

                if($conditionIds && !in_array($item['id'], $conditionIds)){
                    $cartCountN -= $item['count'];
                    $totalPriceN -= $item['price'] * $item['count'];
                    continue;
                }
            }

            if(!empty($stock['condition_days'])){
                $all_days = explode(',', $stock['condition_days']);
            }

            $stocki[$stock['id']] = $stock;
            $stocki[$stock['id']]['title'] = $stock['title_'.$lang];
            $stocki[$stock['id']]['text'] = stripslashes($stock['text_'.$lang]);

            $stocki[$stock['id']]['activ'] = 1;

            // Если у нас нет товаров, подходящих под базовые условия
            if ($cartCountN <= 0) {
                $stocki[$stock['id']]['activ'] = 0;
                continue;
            }

            if(!empty($stock['condition_num']) && $stock['condition_num'] > $cartCountN){
                $stocki[$stock['id']]['activ'] = 0;
                continue;
            }
            if(!empty($stock['condition_price']) && $stock['condition_price'] > $totalPriceN){
                $stocki[$stock['id']]['activ'] = 0;
                continue;
            }
            if(!empty($stock['condition_first']) && $stock['condition_first'] > $today['hours']){
                $stocki[$stock['id']]['activ'] = 0;
                continue;
            }
            if(!empty($stock['condition_last']) &&  $stock['condition_last'] <= $today['hours']){
                $stocki[$stock['id']]['activ'] = 0;
                continue;
            }
            if(!empty($stock['condition_days']) && !in_array($today['wday'], $all_days)){
                $stocki[$stock['id']]['activ'] = 0;
                continue;
            }



        }

        if($stocki){
            return $stocki;
        }else{
            return false;
        }

    }


    /*
    * Получаем вывиодимы список доступных акций для ajaxA
    */
    public static function getStocksListInBasketAjax($totalPrice = 0, $cartCount = 0, $api = false, $apiItems = false)
    {

        $cartCount = 0;
        $lang = Yii::$app->language;

        $stocks = Stocks::find()/*->select('title_'.$lang.', id')*/->where(['status'=>1])->asArray()->all();


        $totalPriceN = 0;//$totalPrice;
        $cartCountN = 0;//$cartCount;
        $stocki = [];
        $today = getdate();
        foreach($stocks as $stock){
            $all_days = [];
            $not_cat = [];
            $weight =  [];

            if(!empty($stock['not_cat'])){
                $not_cat = explode(',', $stock['not_cat']);
            } else {
                $not_cat  = [];
            }

            $backet = Orders::getCartInfo();
            foreach ($backet['params'] as $item)
            {
                $weight[] = $item['weight'];
                if(!in_array($item['category_id'], $not_cat)){

                    $cartCountN += $item['count'];

                    $totalPriceN += $item['price'] * $item['count'];
                }
            }


            if(!empty($stock['condition_days'])){
                $all_days = explode(',', $stock['condition_days']);
            }



            if(!empty($stock['condition_num']) && $stock['condition_num'] > $cartCountN){
                $stocki[] = $stock['id'].'-0';
                continue;
            }
            if(!empty($stock['condition_price']) && $stock['condition_price'] > $totalPriceN){
                $stocki[] = $stock['id'].'-0';
                continue;
            }
            if(!empty($stock['condition_first']) && $stock['condition_first'] > $today['hours']){
                $stocki[] = $stock['id'].'-0';
                continue;
            }
            if(!empty($stock['condition_last']) &&  $stock['condition_last'] <= $today['hours']){
                $stocki[] = $stock['id'].'-0';
                continue;
            }
            if(!empty($stock['condition_days']) && !in_array($today['wday'], $all_days)){
                $stocki[] = $stock['id'].'-0';
                continue;
            }
            if(!empty($stock['condition_weight'])){
                $cond_weights = explode(',', $stock['condition_weight']);
                $active = false;
                foreach ($cond_weights as $cond_weight) {
                    if (in_array($cond_weight,$weight)) {
                        $active = true;
                        break;
                    }
                }
                if (!$active) {
                    $stocki[] = $stock['id'].'-0';
                    continue;
                }

            }



            $stocki[] = $stock['id'].'-1';
            $cartCountN = 0;
            $totalPriceN = 0;
        }

        if($stocki){
            return $stocki;
        }else{
            return false;
        }

    }


    /*
    * Получаем скидку в грн
    */
    public static function getDiscountByStock($sum = 0, $diskount_id, $cartCount = 0, $item = null)
    {

        $session = Yii::$app->session;

        $cartCount = 0;
        $sum = 0;
        $megaMenu = 0;

        $stock = Stocks::find()->where(['id'=>$diskount_id])->asArray()->one();
        $all_days = [];
        $not_cat = [];
        $weight = [];
        if(!empty($stock['not_cat'])){
            $not_cat = explode(',', $stock['not_cat']);
        }

        //return $not_cat;

        if(!$item && $session->isActive && $session->has('cart') && !empty($session['cart']) || $item)
        {

            $items = [];
            if(!$item){
                $backet = Orders::getCartInfo();
            }else{
                $backet = Orders::getCartInfoApi($item);
            }


            foreach ($backet['params'] as $item)
            {
                $weight[] = $item['weight'];
                if(in_array($item['category_id'], $not_cat)){

                    $megaMenu += $item['price'] * $item['count'];
                }
                if(!in_array($item['category_id'], $not_cat)) {
                    $cartCount += $item['count'];
                    $sum += $item['price'] * $item['count'];
                    $x=0;
                    while ($x++<$item['count']) $items[] = $item;
                }else{
                    $cartCount += $item['count'];
                    $sum += $item['price'] * $item['count'];
                    $x=0;
                    //while ($x++<$item['count']) $items[] = $item;
                }

            }

            foreach ($items as $key => $row)
            {
                while ($x++<$row['count']) $price[] = $row['price'];
                $price[$key] = $row['price'];
            }
            array_multisort($price, SORT_DESC, $items);

        }

        //print_r($items);
        $outSum['discount'] = 0;
        $outSum['price'] = $sum;
        $outSum['all_price'] = $sum;
        $outSum['sd'] = $backet;
        if(count($backet['params']) == 0) return $outSum;





        if(!empty($stock['condition_days'])){
            $all_days = explode(',', $stock['condition_days']);
            if(!$all_days || strlen($stock['condition_days']) == 1){
                $all_days[] = $stock['condition_days'];
            }
        }


        if(!empty($stock['condition_product_id']) ){

            foreach (explode(',', $stock['condition_product_id']) as $productId) {
                $current_disc = '';

                $p = $productId;
                $p_dop = $stock['condition_prod_dop_id'];
                $result = isset($backet['params'][$p]) ? $backet['params'][$p] : null;
                //$result_dop = isset($backet['params'][$p_dop]) ? $backet['params'][$p_dop] : null;
                //  print_r($backet['params']);
                $all_price = '';
                $all_count = '';
                $count_res = '';
                if(!empty($result) /* && !empty($result_dop) */){
//                    $all_price = $result['price'] + $result_dop['price'];
//                    $all_count = $result['count'] + $result_dop['count'];
                      $all_price = $result['price'];
                      $all_count = $result['count'];
                      $count_res = $all_count;
                }

                if(!empty($all_price)){
                    if(!empty($stock['condition_discount_sum'])){
                        if(($count_res & 1) == false){
                            $current_disc = $stock['condition_discount_sum'] * $count_res;
                        }else{
                            $current_disc = $stock['condition_discount_sum'];

                        }

                    }  else {
                        $current_disc = $stock['percent']/100 * ($all_price * $all_count);
                    }
                }
                $outSum['discount'] += number_format($current_disc, 2, '.', '');
                $outSum['price'] -= number_format($current_disc, 2, '.', '');
            }
            return $outSum;
        }

        //return $all_days;
        $today = getdate();
        if($stock['percent'] > 0){





            if(!empty($stock['condition_price']) && $stock['condition_price'] > $sum){

                return $outSum;
            }
            if(!empty($stock['condition_first']) && $stock['condition_first'] > $today['hours']){
                return $outSum;
            }
            if(!empty($stock['condition_last']) &&  $stock['condition_last'] <= $today['hours']){
                return $outSum;
            }
            if(!empty($stock['condition_days']) && !in_array($today['wday'], $all_days)){
                //  print_r($outSum);
                return $outSum;
            }

            if(!empty($stock['condition_weight'])){

                $count = [];
                $sums = [];
                $cond_weight_array = explode(',', $stock['condition_weight']);
                foreach ($backet['params'] as $val){
                    if(in_array($val['weight'], $cond_weight_array)){
                        if($val['count'] > 0){
                            for($i = 0; $i < $val['count']; $i++){
                                $count[] = 1;
                                $sums[] = $val['cost']/$val['count'];
                            }

                        }




                    }

                }

                if(!empty($stock['condition_num']) || in_array($item['category_id'], $not_cat) != false){
                    asort($sums);


                    $num = floor(array_sum($count)/$stock['condition_num']);
                    $summa =   array_sum(array_slice($sums, 0, $num));


                    $current_disc = $summa/ 100 * $stock['percent'];

                    $outSum['discount'] += number_format($current_disc, 2, '.', '');
                    $outSum['price'] -= number_format($current_disc, 2, '.', '');


                }else{
                    $current_disc = array_sum($sums)/ 100 * $stock['percent'];

                    $outSum['discount'] += number_format($current_disc, 2, '.', '');
                    $outSum['price'] -= number_format($current_disc, 2, '.', '');

                }
                //  print_r($sum );

                return $outSum;
            }



            if(!empty($stock['condition_num']) && $stock['condition_num'] > $cartCount){
                return $outSum;
            }else{
                $number_all = 0;
                if($stock['condition_num'] > 0){

                    foreach (range(0, count($items), $stock['condition_num']) as $number) {
                        $number_all++;
                    }
                    $number_all--;

                    $items = array_reverse($items);
                    $a = 0;
                    for($n=0;$n<count($items);$n++)
                    {
                        $outSum['nuall'] += 1;
                        if(in_array($items[$n]['category_id'], $not_cat)) continue;
                        $a++;
                        if($a <= $number_all) {
                            $current_disc = $items[$n]['price'] / 100 * $stock['percent'];
                            $outSum['discount'] += number_format($current_disc);
                            $outSum['price'] -= number_format($current_disc);
                        }

                    }

                    $outSum['number_all'] = $number_all;
                    return $outSum;
                }

                /*else{
                        return $outSum;
                    }*/
            }

            $outSum['discount'] = (($sum - $megaMenu) / 100 * $stock['percent']);
            $outSum['price'] = number_format(($sum - $outSum['discount']), 2, '.', '');
            $outSum['items'] = $items;
            $outSum['prices'] = $price;
            $outSum['number_all'] = $number_all;
        }

        return $outSum;

    }

    public static function getDiscountName($id)
    {
        $stocks = Stocks::findOne($id)->title_ru;
        return $stocks;
    }


    public static function getDiscountTagName($id)
    {
        $tag = Stocks::find()->select('tag')->where(['id'=>$id])->asArray()->one()['tag'];
        return $tag;
    }
}

