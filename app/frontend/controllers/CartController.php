<?php

namespace frontend\controllers;

use common\helpers\StocksHelperAjaxFacade;
use Yii;
use common\components\BaseController;
use common\models\CatalogParams;
use common\models\Orders;
use common\models\OrdersItems;
use common\components\SeoComponent;
use yii\helpers\Url;
use yii\filters\VerbFilter;
use yii\web\BadRequestHttpException;
use common\models\CatalogCategories;
use common\models\CatalogProducts;
use common\models\SpecialStikers;

use common\models\UserBonusStats;
use common\models\User;
use common\models\UserSettings;
use common\models\Stocks;
use common\helpers\StocksHelper;
use common\models\Certificates;
use common\helpers\CertificateHelper;

use common\components\XmlRpc\XmlRpc;


class CartController extends BaseController
{

    public function beforeAction($action) {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }


    public function behaviors() {
        return [
            'verbs' => [
                'class'   => VerbFilter::className(),
                'actions' => [
                    'index' => ['get'],
                    'order' => ['get'],
                    'new-order' => ['post'],
                    'request'   => ['post'],
                    'change-count'  => ['post'],
                    'delete-from-backet'    => ['post'],
                    'clear'                 => ['post'],
                    'new-order-from-catalog'	=> ['get'],
                    'new-order-catalog' 		=> ['get'],
                    'request-discount'	=> ['get'],
                    'check-certificate' => ['post'],
                ]
            ]
        ];
    }



    public function actionRequestStoks($total, $count, $type, $ids)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        return StocksHelperAjaxFacade::getStocksListInBasket(Orders::getCartInfo());

    }
    public function actionRequest()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $post = Yii::$app->request->post();
        $answer = [
            'result' => 'ok',
            'count' => 0,
            'cost' => 0,
            'products' => [],
            'man' => "$('.cart-count').html(answer.count);"
                ."$('.cart-cost').html(answer.cost);"
                ."if(answer.count>0)$('.cart-box').removeClass('empty');else $('.cart-box').addClass('empty');"
                ."for(var p in answer.products){ $('.cart-cost-'+p).html(answer.products[p].cost); $('.cart-count-'+p).val(answer.products[p].count); }"
        ];

        if (isset($post))
        {
            switch ($post['method'])
            {
                case 'add':
                    if (isset($post['params']))
                    {
                        if (!is_array($post['params']))
                        {
                            $post['params'] = [$post['params']];
                        }

                        $post['params'] = array_map('intval', $post['params']);

                        if (!isset($post['count']) || $post['count'] < 1)
                        {
                            $post['count'] = 1;
                        }

                        foreach ($post['params'] as $id)
                        {
                            //  Ищу товар по ID
                            $product = CatalogParams::find()->byId($id)->one();
                            //  Если товар есть в наличии, выполняю добавление в корзину
                            if ($product->id == $id && $id > 0)
                            {
                                if (!isset($_SESSION['cart'][$id]))
                                {
                                    $_SESSION['cart'][$id] = 0;
                                }
                                $_SESSION['cart'][$id] += (int)$_POST['count'];
                                $cart_count = 0;
                                $summ=0;
                                foreach ($_SESSION['cart'] as $item_id => $item_count) {
                                    $summ += (CatalogParams::find()->where(['id'=>$item_id])->limit(1)->one()->price*$item_count);
                                    $cart_count +=$item_count;
                                }

                                $session = Yii::$app->session;
                                $params_all = [];
                                if($session->isActive && !empty($session['cart'])) {
                                    $cart = $session['cart'];
                                    $sum = 0;
                                    foreach ($cart as $item_id => $item_count) {
                                        $type = '';
                                        $params = CatalogParams::find()->byId($item_id)->asArray()->one();
                                        $params_obj = CatalogParams::find()->byId($item_id)->one();
                                        $params['count_order'] = $item_count;
                                        $params['simg'] = $params_obj->parent->simg;
                                        $params['url'] = $params_obj->parent->url;
                                        $params['title'] = $params_obj->parent->info->title;
                                        $params['full_price'] = $params['price'] * $item_count;
                                        $params['weight'] = $params_obj->values->value;
                                        $params['weight2'] = $params_obj->weight;
                                        $params['type'] = $params_obj->nameValue->info->value;
                                        $params_all[] = $params;
                                        $sum += (int)$params['price'] * $item_count;
                                    }
                                }
                                $cart_info='';
                                //$cart_info.='<div class="scroll_box mod">';
                                //$cart_info.='<div class="basket_box">';
                                //$cart_info.='<div class="content_basket">';
                                $cart_info.='<div class="content_personal_account">';
                                foreach ($params_all as $param)
                                {
                                    $weight = '';
                                    $types = $params['type'];
                                    if((int)$param['weight2'] > 20)  $types = $this->view->params['sm'];
                                    if($param['weight2']) $weight = ' / '.$param['weight2'].''.$this->view->params['gramm'];
                                    $cart_info.='<div class="item_basket js-remove-from-backet-"'.$param['id'].'">
												<ul class="item_basket_list">
													<li class="item">
														<a href="'.$param['url'].'" class="link_item">
                                                        <span class="img sk_img_b">
                                                            <img src="'.$param['simg'].'" alt="">
                                                        </span>
															<span class="txt">'.$param['title'].'</span>
														</a>
													</li>
                                                    <li class="item">'.$param['weight'].' '.$types . $weight . '</li>
                                            
													<li class="item">'.$param['price'].' '.$this->view->params['grn'].'</li>
													<li class="item">
														<div class="b-product__qty">
															<span  data-id="'.$param['id'].'" class="js-qty-minus js-change-count"><i class="fas fa-minus-circle"></i></span>
															<input type="text" name="count" data-price="800" class="js-qty-input js-count-requst-'.$param['id'].'" value="'.$param['count_order'].'" disabled>
															<span data-id="'.$param['id'].'" class="js-qty-plus js-change-count"><i class="fas fa-plus-circle"></i></span>
														</div>
													</li>
													<li class="item "><span class="js-change-price-'.$param['id'].'">'.$param['full_price'].'</span>'.$this->view->params['grn'].'</li>
													<li class="item js-delete-from-backet" data-id="'.$param['id'].'"><i class="fa fa-times" aria-hidden="true"></i></li>
												</ul>
											</div>';

                                }




                                //$cart_info.='</div>';
                                //$cart_info.='</div>';
                                //$cart_info.='</div>';
                                $cart_info.='</div>';
                                return ['cart_count' => $cart_count,'cost' => $summ, 'cart_info' => $cart_info];

                            }
                        }

//                        $answer['popup'] = '@app/views/cart/added.twig';
                    }
                    break;

                case 'change':
                    if (isset($_POST['product_id']) && $_POST['product_id'] > 0 && isset($_SESSION['cart'][$_POST['product_id']]) && isset($_POST['count']) && $_POST['count'] > 0)
                    {
                        //  Ищу товар по ID
                        $product = CatalogProducts::find()->byId($_POST['product_id'])->one();
                        if ($product->id > 0 && $product->available > 0)
                        {
                            $_SESSION['cart'][$product->id] = (int)$_POST['count'];
                            if ($_SESSION['cart'][$product->id] > $product->available)
                            {
                                $_SESSION['cart'][$product->id] = $product->available;
                            }
                        }
                    }
                    break;

                case 'remove':
                    if (isset($_POST['product_id']) && $_POST['product_id'] > 0 && isset($_SESSION['cart'][$_POST['product_id']]))
                    {
                        unset($_SESSION['cart'][$_POST['product_id']]);
                        return  true;
                    }
                    break;

                case 'clear':
                    $_SESSION['cart'] = [];
//                        $answer['location'] = 'reload';
                    break;
            }
        }

        //  var_dump(1);die();
        $answer = array_merge($answer, Orders::getCartInfo());

        echo json_encode($answer, JSON_NUMERIC_CHECK);
    }

    public function actionChangeCount()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $post = Yii::$app->request->post();
        if (isset($post))
        {
            if (isset($post['id']) && $_POST['id'] > 0 && isset($_SESSION['cart'][$post['id']]) && isset($post['count']) && $post['count'] > 0)
            {

                $delliv = $post['delivery'];
                $in_freeDelivery = $post['freeDelivery'];
                $_SESSION['cart'][$post['id']]=$post['count'];
                $param_summ = (CatalogParams::find()->where(['id'=>$post['id']])->limit(1)->one()->price)*$post['count'];
                $param_summ = number_format($param_summ, 2, '.', '');
                $summ=0;
                $cart_count = 0;
                foreach ($_SESSION['cart'] as $item_id => $item_count) {
                    $summ+=(CatalogParams::find()->where(['id'=>$item_id])->limit(1)->one()->price*$item_count);

                    $cart_count +=$item_count;
                }
                if($summ < $in_freeDelivery){
                    $summ = $summ+$delliv;
                }else{
                    $delliv = 0;
                    $summ = $summ;
                }
                return ['param_summ' => $param_summ,'cost' => $summ,'cart_count'=>$cart_count, 'delliv' => $delliv];
            }



        }
    }
    public function actionDeleteFromBacket()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $post = Yii::$app->request->post();
        if (isset($post['id']) && $_POST['id'] > 0 && isset($_SESSION['cart'][$post['id']]) )
        {
            unset($_SESSION['cart'][$_POST['id']]);
            $cart_count = count($_SESSION['cart']);
            $delliv = $post['delivery'];
            $in_freeDelivery = $post['freeDelivery'];

            $cart_count = 0;
            $summ=0;
            foreach ($_SESSION['cart'] as $item_id => $item_count) {
                $summ+=(CatalogParams::find()->where(['id'=>$item_id])->limit(1)->one()->price*$item_count);
                $cart_count +=$item_count;
            }

            if($summ < $in_freeDelivery){
                $summ = $summ+$delliv;
            }else{
                $delliv = 0;
                $summ = $summ;
            }

            $session = Yii::$app->session;
            $params_all = [];
            if($session->isActive && !empty($session['cart'])) {
                $cart = $session['cart'];
                $sum = 0;
                foreach ($cart as $item_id => $item_count) {
                    $params = CatalogParams::find()->byId($item_id)->asArray()->one();
                    $params_obj = CatalogParams::find()->byId($item_id)->one();
                    $params['count_order'] = $item_count;
                    $params['simg'] = $params_obj->parent->simg;
                    $params['url'] = $params_obj->parent->url;
                    $params['title'] = $params_obj->parent->info->title;
                    $params['full_price'] = $params['price'] * $item_count;
                    $params['weight'] = $params_obj->values->value;
                    $params['weight2'] = $params_obj->weight;
                    $params['type'] = $params_obj->nameValue->info->value;
                    $params_all[] = $params;
                    $sum += (int)$params['price'] * $item_count;
                }
            }
            $cart_info='';
            $cart_info.='<div class="scroll_box mod">';
            $cart_info.='<div class="basket_box">';
            $cart_info.='<div class="content_basket">';
            $cart_info.='<div class="content_personal_account">';
            foreach ($params_all as $param)
            {
                $weight = '';
                $types = $params['type'];
                if((int)$param['weight2'] > 20)  $types = $this->view->params['sm'];
                if($param['weight'] < 2) $params['type'] = $this->view->params['litru'];
                if($param['weight2']) $weight = ' / '.$param['weight2'].''.$this->view->params['gramm'];
                $cart_info.='<div class="item_basket js-remove-from-backet-"'.$param['id'].'">
												<ul class="item_basket_list">
                                                
                                                <li class="item">
														<a href="'.$param['url'].'" class="link_item">
                                                        <span class="img sk_img_b">
                                                            <img src="'.$param['simg'].'" alt="">
                                                        </span>
															<span class="txt">'.$param['title'].'</span>
														</a>
													</li>
                                                    <li class="item">'.$param['weight'].' '.$types. $weight . '</li>
                                                    
									
                                                
													<li class="item">'.$param['price'].' '.$this->view->params['grn'].'</li>
													<li class="item">
														<div class="b-product__qty">
															<span  data-id="'.$param['id'].'" class="js-qty-minus js-change-count"><i class="fas fa-minus-circle"></i></span>
															<input type="text" name="count" data-price="800" class="js-qty-input js-count-requst-'.$param['id'].'" value="'.$param['count_order'].'" disabled>
															<span data-id="'.$param['id'].'" class="js-qty-plus js-change-count"><i class="fas fa-plus-circle"></i></span>
														</div>
													</li>
													<li class="item "><span class="js-change-price-'.$param['id'].'">'.$param['full_price'].'</span>'.$this->view->params['grn'].'</li>
													<li class="item js-delete-from-backet" data-id="'.$param['id'].'"><i class="fa fa-times" aria-hidden="true"></i></li>
												</ul>
											</div>';
            }




            $cart_info.='</div>';
            $cart_info.='</div>';
            $cart_info.='</div>';
            $cart_info.='</div>';

            return ['cart_count' => $cart_count,'cost' => $summ, 'cart_info' => $cart_info,'delliv' => $delliv];
        }
    }



    public function actionBackettest()
    {
        $session = Yii::$app->session;
        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);

        SeoComponent::setByTemplate('backet', [
            'name' => Yii::$app->params->view['backet'],
        ]);

        if($session->isActive && $session->has('cart') && !empty($session['cart']))
        {
            $cart     = $session['cart'];
            $products = [];
            $sum = 0;
            $also_ids = '';
            $params_all=[];
            foreach ($cart as $item_id => $item_count)
            {
                // пришлось пойти на такое извращение
                // т.к. при использовании asArray() геттер не сработал
                // asArray() привращает объект масив и геттеры не работают

                $params                = CatalogParams::find()->byId($item_id)->asArray()->one();
                $params_obj            = CatalogParams::find()->byId($item_id)->one();
                $params['count_order'] = $item_count;
                $params['simg']        = $params_obj->parent->simg;
                $params['url']         = $params_obj->parent->url;
                $params['title']       = $params_obj->parent->info->title;
                $params['full_price']   = $params['price']*$item_count;
                $params['weight']		= $params_obj->values->value;
                $params['type']			= $params_obj->nameValue->info->value;
                $params_all[]             = $params;
                $sum += (int)$params['price'] * $item_count;

            }

            $availableBonuses = UserBonusStats::getCurrentBalans(Yii::$app->user->identity->id);

            $products1 = CatalogProducts::find()->andWhere(['id'=>[38,41,43,44,8,14,18,31,45]])->joinWith('info','params')->all();
            $products2 = CatalogProducts::find()->andWhere(['category_id'=>5])->joinWith('info','params')->all();
            $stikers = SpecialStikers::find()->joinWith('info')->orderBy('sort DESC')->all();
            return $this->render('backet.twig', [
                'params' => $params_all,
                'products1' =>$products1,
                'products2' =>$products2,
                'stikers' => $stikers,
                'sum'    => $sum,
                'availableBonuses'    => $availableBonuses,

            ]);

        } else
        {
            return $this->render('empty_cart.twig', [

            ]);
        }

    }

    public function actionRequestDiscount($sum, $diskount_id = 0, $cartCount = 0, $bonus=0, $certificate_code = 0)
    {

        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $post = Yii::$app->request->post();


        $max_bonus = Yii::$app->user->identity->bonus_balans;

        $disc = number_format((int)$bonus, 2, '.', '');
        $price = number_format(($sum - (int)$bonus), 2, '.', '');

        $cr_price2 = ceil($sum);
        $price_cents = 1 - number_format(($sum - floor($sum)), 2, '.', '');

        $qwe = 0;
        if((int)$bonus > $max_bonus){
            $disc = number_format($max_bonus, 2, '.', '');
            $price = number_format(($price - $max_bonus), 2, '.', '');
            $bonus = $max_bonus;
            $qwe = 1;
        }if((int)$bonus > $cr_price2){
        $disc = $sum;
        $price = 0.00;
        $bonus = $cr_price2;
        $qwe = 2;
    }

        if($price < 0) $price = '0';

        $answer = [
            'result' => 'false',
            'discount' => $disc,
            'price' => $price,
            'bonus' => ceil($bonus),
            '123' => $qwe
        ];

        $certificate_disc = CertificateHelper::getDiscountByCertificate($sum, $certificate_code);
        if ($diskount_id > 0 || $certificate_disc['is_valid'])
        {
            $answer_disc = StocksHelper::getDiscountByStock($sum, $diskount_id, $cartCount);
            if($certificate_disc['is_valid']){
                $answer_disc = $certificate_disc;
            }
            //return $answer_disc;
            if($answer_disc){
                $disc = ($answer_disc['discount'] + (int)$bonus);
                $price = $answer_disc['price'] - (int)$bonus;
                if($price <= 0){
                    $disc = $sum;
                    $price = 0.00;
                    $bonus = $answer_disc['price'];
                }

                if($price < 0) $price = '0';

                $answer = [
                    'result' => 'true',
                    'discount' => number_format($disc, 2, '.', ''),
                    'price' => number_format($price, 2, '.', ''),
                    'bonus' => ceil($bonus),
                    'all' => $answer_disc,
                    '321' => $answer_disc['discount']
                ];
            }
        }
        return $answer;
        //print_r($answer);
    }

    public function actionBacket()
    {

        $session = Yii::$app->session;
        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);

        SeoComponent::setByTemplate('backet', [
            'name' => Yii::$app->params->view['backet'],
        ]);

        if($session->isActive && $session->has('cart') && !empty($session['cart']))
        {
            $cart     = $session['cart'];
            $products = [];
            $sum = 0;
            $also_ids = '';
            $params_all=[];
            $items = 0;
            foreach ($cart as $item_id => $item_count)
            {
                // пришлось пойти на такое извращение
                // т.к. при использовании asArray() геттер не сработал
                // asArray() привращает объект масив и геттеры не работают

                $params                = CatalogParams::find()->byId($item_id)->asArray()->one();
                $params_obj            = CatalogParams::find()->byId($item_id)->one();
                $params['count_order'] = $item_count;
                $params['simg']        = $params_obj->parent->simg;
                $params['url']         = $params_obj->parent->url;
                $params['title']       = $params_obj->parent->info->title;
                $params['full_price']   = $params['price']*$item_count;
                $params['weight']		= $params_obj->values->value;
                $params['type']			= $params_obj->nameValue->info->value;
                $params['weight2']      = $params_obj->weight;
                ///$params['typez']		= $params_obj->nameValue->info->value;
                $params_all[]             = $params;
                $sum += (int)$params['price'] * $item_count;
                $items += $item_count;

            }

            $availableBonuses = UserBonusStats::getCurrentBalans(Yii::$app->user->identity->id);

            $stocki = StocksHelper::getStocksListInBasket(Orders::getCartInfo());

            // if allow certificate
            $allow_certificate = 0;
            $orders = Orders::getCartInfo();
            foreach($orders['params'] as $order){
                if($order['category_id'] != 6){
                    $allow_certificate = 1;
                    break;
                }
            }

            //$stocks = $stock;
            $products2 = CatalogProducts::find()->andWhere(['category_id'=>6])->joinWith('info','params')->all();
            $stikers = SpecialStikers::find()->joinWith('info')->orderBy('sort DESC')->all();
            return $this->render('backet_new.twig', [
                'params' => $params_all,
                'stocks' => $stocki,
                'lang' => count($cart),
                'products2' =>$products2,
                'stikers' => $stikers,
                'sum'    => $sum,
                'items' => $items,
                'availableBonuses'    => $availableBonuses,
                'sk_coockie'    => $_COOKIE,
                'language' => Yii::$app->language,
                'allow_certificate' => $allow_certificate,
                'todayDMY' => date('d.m.Y'),
                'tomorrowDMY' => date('d.m.Y', strtotime('+1day')),
                'workHours' => Yii::$app->params['workHours'],
                'deliveryTime' => Yii::$app->params['deliveryTime'],
                'disabledDays' => Yii::$app->params['disabledDays'],
            ]);

        } else
        {
            return $this->render('empty_cart.twig', [

            ]);
        }

    }

    public function actionNewOrderFromCatalog()
    {
        $session = Yii::$app->session;
        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);

        SeoComponent::setByTemplate('backet', [
            'name' => Yii::$app->params->view['backet'],
        ]);

        if($session->isActive && $session->has('cart') && !empty($session['cart']))
        {
            $cart     = $session['cart'];
            $products = [];
            $sum = 0;
            $also_ids = '';
            $params_all=[];
            foreach ($cart as $item_id => $item_count)
            {
                // пришлось пойти на такое извращение
                // т.к. при использовании asArray() геттер не сработал
                // asArray() привращает объект масив и геттеры не работают

                $params                = CatalogParams::find()->byId($item_id)->asArray()->one();
                $params_obj            = CatalogParams::find()->byId($item_id)->one();
                $params['count_order'] = $item_count;
                $params['simg']        = $params_obj->parent->simg;
                $params['url']         = $params_obj->parent->url;
                $params['title']       = $params_obj->parent->info->title;
                $params['full_price']   = $params['price']*$item_count;
                $params['weight']		= $params_obj->values->value;
                $params['type']			= $params_obj->nameValue->info->value;
                $params_all[]             = $params;
                $sum += (int)$params['price'] * $item_count;

            }
            $param = [
                'dsn' => Yii::$app->db->dsn,
                'user' => Yii::$app->db->username,
                'pass' => Yii::$app->db->password,
            ];
            //var_dump(Yii::$app->db);

            return $this->render('backet.twig', [
                'params'      => $params_all,
                'param'			=> $param,
                'sum'           => $sum,

            ]);

        } else
        {
            return $this->render('empty_cart.twig', [

            ]);
        }

    }
    public function actionNewOrderCatalog()
    {
        $session = Yii::$app->session;
        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);

        SeoComponent::setByTemplate('backet', [
            'name' => Yii::$app->params->view['backet'],
        ]);

        if($session->isActive && $session->has('cart') && !empty($session['cart']))
        {
            $cart     = $session['cart'];
            $products = [];
            $sum = 0;
            $also_ids = '';
            $params_all=[];
            foreach ($cart as $item_id => $item_count)
            {
                // пришлось пойти на такое извращение
                // т.к. при использовании asArray() геттер не сработал
                // asArray() привращает объект масив и геттеры не работают

                $params                = CatalogParams::find()->byId($item_id)->asArray()->one();
                $params_obj            = CatalogParams::find()->byId($item_id)->one();
                $params['count_order'] = $item_count;
                $params['simg']        = $params_obj->parent->simg;
                $params['url']         = $params_obj->parent->url;
                $params['title']       = $params_obj->parent->info->title;
                $params['full_price']   = $params['price']*$item_count;
                $params['weight']		= $params_obj->values->value;
                $params['type']			= $params_obj->nameValue->info->value;
                $params_all[]             = $params;
                $sum += (int)$params['price'] * $item_count;

            }
            $param = [
                'dsn' => Yii::$app->db->dsn,
                'user' => Yii::$app->db->username,
                'pass' => Yii::$app->db->password,
            ];
            //var_dump(Yii::$app->db);
            return $this->render('backet.twig', [
                'params'      => $params_all,
                'param'			=> $param,
                'sum'           => $sum,

            ]);

        } else
        {
            return $this->render('empty_cart.twig', [

            ]);
        }

    }
    public function actionOrder()
    {

        $session = Yii::$app->session;

        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);

        SeoComponent::setByTemplate('backet', [
            'name' => Yii::$app->params->view['order'],
        ]);
        $delivery_cost = \common\models\UserSettings::find()->byId(1)->limit(1)->one();
        if($session->isActive && $session->has('cart') && !empty($session['cart'])) {
            $cart = $session['cart'];
            $products = [];
            $sum = 0;
            $also_ids = '';
            $params_all = [];
            foreach ($cart as $item_id => $item_count) {
                // пришлось пойти на такое извращение
                // т.к. при использовании asArray() геттер не сработал
                //asArray() привращает объект масив и геттеры не работают

                $params = CatalogParams::find()->byId($item_id)->asArray()->one();
                $params_obj = CatalogParams::find()->byId($item_id)->one();
                $params['count_order'] = $item_count;
                $params['simg'] = $params_obj->parent->simg;
                $params['url'] = $params_obj->parent->url;
                $params['title'] = $params_obj->parent->info->title;
                $params['full_price'] = $params['price'] * $item_count;
                $params_all[] = $params;
                $sum += (int)$params['price'] * $item_count;

            }

            $availableBonuses = UserBonusStats::getCurrentBalans(Yii::$app->user->identity->id);

            return $this->render('order.twig', [
                'delivery_cost' => $delivery_cost,
                'params' => $params_all,
                'sum' => $sum,
                'availableBonuses'    => $availableBonuses,

            ]);
        } else
        {
            return $this->render('empty_cart.twig', [
            ]);
        }
    }
    public function actionNewOrder()
    {
        Yii::$app->cache->flush();
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $request = Yii::$app->request;

        if ($request->isAjax)
        {
            $session     = Yii::$app->session;
            $post        = $request->post();

            $order       = new Orders();
            $order_items = new OrdersItems();

            $backet = Orders::getCartInfo();

            //var_dump($post);die();


            if($_SERVER['REMOTE_ADDR']=='193.93.77.121')
            {

                //var_dump('<meta charset="UTF-8">');
                //var_dump(base64_decode(base64_encode($post['username'])));          die();


            }

            if($post['register']){
                $new_register_login = explode('@', trim(strip_tags($post['email'])));
                $new_register = ApiController::actionUserRegister($new_register_login[0], $post['email'], trim(strip_tags($post['phone'])), md5(rand(1,999)));
                if($new_register['code'] == 200){
                    $order_user_id = $new_register['succes']['id'];
                }
            }

            if(!$order_user_id){
                $order_user_id = Yii::$app->user->identity->id;
            }

            $pay_bonus = '';
            $lost_balans = 0;
            $vOrder_id = rand(1, 999);
            $settings = UserSettings::find()->select('bonus_perc_order, bonus_order_okrugl, bonus_perc_order_500_1500, bonus_perc_order_1500')->where(['id' => 1])->asArray()->one();

            $new_user = User::findOne($order_user_id);
            if($new_user){
                $lost_balans = (int)$new_user->bonus_balans;
            }
            //if($_SERVER['REMOTE_ADDR']=='46.219.47.67'){
            //        return ['bon' => $post['bonus'], 'bon2' => Yii::$app->user->identity->bonus_balans, 'bon3' => $post['bonus']];
            //    }

            if((int)$post['bonus'] > 0 && Yii::$app->user->identity->bonus_balans >= (int)$post['bonus']){

                $user_stats = new UserBonusStats();
                $user_stats->user_id = $order_user_id;
                $user_stats->operation = 'minus';
                $user_stats->count = (int)$post['bonus'];
                $user_stats->it_was = $lost_balans;
                $user_stats->became = ($lost_balans - (int)$post['bonus']);
                $user_stats->type = 'order';
                $user_stats->order_id = (string) $vOrder_id;
                $user_stats->date_operation = time();
                if($user_stats->validate()){
                    //$user_stats->save(false);
                }

                $order->bonus = (int)$post['bonus'];
                Yii::$app->user->identity->bonus_balans = $order->bonus;
            //    $order->discount  = (int)$post['sk_Discount'];
                $pay_bonus = ' Заказ частичто оплачен бонусами ('.(int)$post['bonus'].').';
//                $post['comment'] .= '
//                Заказ частичто оплачен бонусами ('.(int)$post['bonus'].').
//                $session
//                            ';

            }




            $lost_bal = ($lost_balans - (int)$post['bonus']);

            $percent = 0;
            $percent_bonus = 0;
            if($post['all_count'] < 500 && $settings['bonus_perc_order'] > 0){
                $percent_bonus = $settings['bonus_perc_order'];
            }elseif($post['all_count'] > 500 && $post['all_count'] < 1500 && $settings['bonus_perc_order_500_1500'] > 0){
                $percent_bonus = $settings['bonus_perc_order_500_1500'];
            }elseif($post['all_count'] > 1500 && $settings['bonus_perc_order_1500'] > 0){
                $percent_bonus = $settings['bonus_perc_order_1500'];
            }else{
                $percent = 0;
            }

            if($percent_bonus > 0){
                $tot = trim(strip_tags($post['price'])) / 100 * $percent_bonus;
                if($settings['bonus_order_okrugl'] == '+'){
                    $percent = ceil($tot);
                }elseif($settings['bonus_order_okrugl'] == '-'){
                    $percent = floor($tot);
                }elseif($settings['bonus_order_okrugl'] == '='){
                    $percent = round($tot);
                }
            }
            if($percent > 0 && $new_user){

                $user_stats_perc = new UserBonusStats();
                $user_stats_perc->user_id = $order_user_id;
                $user_stats_perc->operation = 'plus';
                $user_stats_perc->count = $percent;
                $user_stats_perc->it_was = $lost_bal;
                $user_stats_perc->became = ($lost_bal + $percent);
                $user_stats_perc->type = 'order_percent';
                $user_stats_perc->order_id = (string) $vOrder_id;
                $user_stats_perc->date_operation = time();
                if($user_stats_perc->validate()){
                    //$user_stats_perc->save(false);
                }

            }

            if($new_user && (int)$post['bonus'] > 0 && Yii::$app->user->identity->bonus_balans >= (int)$post['bonus'] || $percent > 0 && $new_user){
                $new_user->bonus_balans = ($new_user->bonus_balans - (int)$post['bonus'] + $percent);
                //$new_user->update();
            }

            if($post['stocks_id'] > 0){
                $in_disc = StocksHelper::getDiscountByStock(0, $post['stocks_id'], 0);
                $order->discount  += trim(strip_tags($in_disc['discount']));
                $post['comment'] .= ' Акция: '.StocksHelper::getDiscountName($post['stocks_id']);
            }
            // если оплата с сертификата
            if($post['certificate']){
                $cert_disc = CertificateHelper::getDiscountByCertificate(0, $post['certificate']);
                if($cert_disc['is_valid']){
                    $order->discount += $cert_disc['discount'];
                    $post['comment'] .= ' Сертификат: '.$cert_disc['nominal'].'грн ('.$cert_disc['code'].')';
                }
            }

            if(!$post['email']) $post['email'] = 'nomail-'.rand(1, 999999).'-'.rand(1, 999999).'@nomail.nomail';
//            if((int)$post['persons'] > 0){ $post['comment'] .= ' Количество персон: '.(int)$post['persons']; }else{
//                $post['persons'] = 0;
//            }
            //  if($post['surrenderwith']) $post['comment'] .= ' Сдача с: '.trim(strip_tags($post['surrenderwith'])) .' грн.';

            if($order_user_id){
                $nuser_id = $order_user_id;
            }else{
                $nuser_id = (Yii::$app->user->isGuest) ? -1 : Yii::$app->user->identity->id;
            }

            if(@$order->discount){
                $order->discount = number_format($order->discount, 2, '.', '');
            }

            $transaction          = Yii::$app->getDb()->beginTransaction();
            $order->user_id       = $nuser_id;
            $order->name          = trim(strip_tags($post['username']));
            $order->email         = trim(strip_tags($post['email']));
            $order->phone         = trim(strip_tags($post['phone']));
            $order->comment       = trim(strip_tags($post['comment']));
            $order->address       = trim(strip_tags($post['address']));
            $order->persons       = ($post['persons']) ? (int)$post['persons'] : 0;
            //$order->build       = trim(strip_tags($post['build']));
            $order->parad       = trim(strip_tags($post['parad']));
            $order->floar       = trim(strip_tags($post['floar']));
            $order->kvartira       = trim(strip_tags($post['kvartira']));
            $order->deliveryDate       = trim(strip_tags($post['deliveryDate']));
            $order->bonus          = (int)$post['bonus'];
            //$order->code_c       = trim(strip_tags($post['code_c']));
              if($post['surrenderwith'])  $order->comment .= ' Сдача с: '.trim(strip_tags($post['surrenderwith'])) .' грн.';

            $order->time       = trim(strip_tags($post['time']));
            $order->delivery_id   = ($post['delivery_id']) ? trim(strip_tags($post['delivery_type'])) : 1;
            $order->total         = number_format((trim(strip_tags($post['price'])) - $order->discount - $order->bonus + $post['delivery'] ), 2, '.', '');

            $order->delivery        = intval($post['delivery']);
            $order->pay_id        = trim(strip_tags($post['pay_type']));
            $order->status_id     = 3; // статус "новый заказ"
            $order->creation_time = date('U');
            $order->update_time   = 0;
            $pay_id = $order->pay_id;
            $total = $order->total;
            $placeID = $post['placeId'];
            $session['placeID'] = $placeID;


            if($order->save())
            {
                if((int)$post['bonus'] > 0){
                    //$new_stats = UserBonusStats::find()->where(['user_id' => $user_stats->user_id, 'order_id' => $vOrder_id])->one();
                    //$new_stats->order_id = $order->id;
                    //$new_stats->update();
                }

                if($percent > 0 && $new_user){
                    //$new_stats_perc = UserBonusStats::findOne($user_stats_perc->id);
                    //$new_stats_perc->order_id = $order->id;
                    //$new_stats_perc->update();
                }


                $save_items_status = $order_items->saveOrderItems($backet['params'], $order->id);
                if($save_items_status)
                {
                    // помечаем сертификат как использованный
                    if($post['certificate']) {
                        CertificateHelper::markAsUsed($post['certificate']);
                    }

                    $session['coment'] = $post['comment'];
                    $session['stoc_id'] = $post['stocks_id'];
                    //if($order->pay_id ==2 || $order->pay_id == 9){

                    $headers = "From:info@3piroga.ua";
                    $message = "Ваш заказ на 3piroga.ua\r\n";
                    foreach($backet["params"] as $item)
                    {
                        $message .= "=================\r\n";
                        $message .= "Название: ".$item["name"]."\r\n";
                        $message .= "Объем/диаметр: ".$item["weight"]."\r\n";
                        $message .= "Количество: ".$item["count"]. " шт.\r\n";
                        $message .= "Цена: ".$item["price"]. " грн.\r\n";
                        $message .= "=================\r\n";

                    }
                    $sdaka = (int)($post["surrenderwith"]) ? trim(strip_tags($post["surrenderwith"])) : 0;
                    $message .= "Общая цена: ".$order->total. " грн.\r\n";
                    $message .= "Имя клиента: ".$order->name."\r\n";
                    $message .= "Телефон: ".$order->phone."\r\n";
                    $message .= "Почта: ".$order->email."\r\n";
                    $message .= "=================\r\n";
                    $message .= "АДРЕС ДОСТАВКИ: \r\n";
                    $message .= "Улица: ".$order->address."\r\n";
                    // $message .= "№ дома: ".$order->build."\r\n";
                    $message .= "№ парадного: ".$order->parad."\r\n";
                    $message .= "Этаж: ".$order->floar."\r\n";
                    $message .= "№ квартиры: ".$order->kvartira."\r\n";
                    $message .= "Дата доставки: ".$order->deliveryDate."\r\n";





                    //$message .= "Код двери: ".$order->code_c."\r\n";
                    $message .= "Время доставки: ".$order->time."\r\n";
                    $message .= $pay_bonus."\r\n";
                    $message .= "Сдача с: ". $sdaka . " грн.\r\n";
                    $message .= "Количество персон: ".$order->persons."\r\n";
                    $message .= "Скидка: ".$order->discount. " грн.\r\n";
                    if($post["stocks_id"] > 0){
                        $message .= "Акция: ".StocksHelper::getDiscountName($post["stocks_id"])."\r\n";
                    }
                    $message .= 'Тип оплаты: '.\common\models\OrdersParams::find()->byId($order->pay_id)->limit(1)->one()->name."\r\n";

                    $message .= "=================\r\n";
                    $message .= "Следите за нашими акциями и специальными предложениями.\r\n";
                    $message .= "https://3piroga.ua/discounts";

                    if($_SERVER['REMOTE_ADDR']!='193.93.77.121')
                        if($_SERVER['REMOTE_ADDR']!='193.93.77.121' && $pay_id != 11)
                        {
                            $EmailFrom="info@3piroga.ua";

                            $maill=mail("info@3piroga.ua",'=?utf-8?B?'.base64_encode("Новый заказ на 3piroga.ua").'?=',$message, "From: <$EmailFrom>\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit");

                            $maill2=mail($order->email ,'=?utf-8?B?'.base64_encode("Ваш заказ").'?=',$message, $headers);
                        }

                    //}
                    //       $data['products'] = $backet['products'];
                    //        $data['order'] = $order;
                    //         $mail = MailComponent::mailsend($data, 'order_letter', [$order->email, 'sales@vagonka.kz', 'azhibayev.r@vagonka.kz'], "Заказ №".$order->id." - Buratino");

                    $transaction->commit();

                    //Xml Rpc

                    $options = [];
                    $address = [];


                    $address['address']  = $order->address ? 'в.' . $order->address :0;
                    //  $address['build']    = $order->build ? 'б.' . $order->build :null;
                   // $address['parad']    = $order->parad ? 'під.' . $order->parad :0;
                   // $address['floar']    = $order->floar ? 'пов.' . $order->floar :0;
                   // $address['deliveryDate']    = $order->deliveryDate ? 'Дата доставки' . $order->build :null;
                   // $address['kvartira']    = $order->kvartira ? 'кв.' . $order->kvartira :0;


                    $amount = $post['all_count']; //$order->total - $order->delivery;

                    $session['amount'] = $amount;

                    header('Content-Type: text/html; charset=utf-8');
                    $options['Address'] = implode(',', $address);
                    $options['Amount'] = floatval(number_format($amount , 2 , '.', ''));
                    $options['PlaceID'] = $placeID;
                    $options['ChangeFrom'] = (int)$post['surrenderwith'];
                    $options['Flat'] =  $order->kvartira ? $order->kvartira :null;
                    $options['Entry'] =  $order->parad ?  $order->parad :null;
                    $options['Floor'] =  $order->floar ?  $order->floar :null;
                    $options['ClientName'] =  $order->name;
                    $options['ClientTel'] =  substr(preg_replace("/[^0-9]/", '', $order->phone),2);
                    $options['Discount'] =  floatval(number_format($order->discount, 2, '.', ''));
                    if(!empty($post['bonus'])){
                        $session['bonus'] = $post['bonus'];
                        $options['BonusPay'] = floatval(number_format($post['bonus'] , 2 , '.', ''));
                        $bonus_res = Yii::$app->user->identity->bonus_balans - $session['bonus'];
                        $options['BonusRest'] =  floatval(number_format($bonus_res , 2 , '.', ''));;
                    }
                    if(empty($post['persons'])){
                        $options['GuestCount'] =  0;
                    }else{
                        $options['GuestCount'] =  (int)$post['persons'];
                    }

                        $options['Info'] =  (string)$post['comment'];
                        $session['comment'] = $post['comment'];
                        $options['Info'] .=  'Дата доставки' . $order->deliveryDate;


                    if($post['delivery'] != 0){
                        $session['delivery'] = $post['delivery'];
                        $backet['params']['121'] = [
                            "id" => 121,
                            "name" => "Доставка",
                            "url" => "/delivery",
                            "category_id" => "",
                            "weight" => "",
                            "price" => 1,
                            "count" => 1*$post['delivery'],
                            "cost" => 1,
                            "image" => "",
                            "coded2" => 300,
                        ];

                    }


                    foreach($backet['params'] as $key => $item)
                    {
                        $options['Items'][]=[
                            'Price' => floatval(number_format($item['price'] , 2 , '.', '')),
                            'Quant' => floatval($item['count']),
                            'UID' => intval($item['coded2'])
                        ];


                    }

                    $options['OuterID'] = (string)$order->id;

                    if($order->pay_id == 2) {
                        $options['PayForm'] =  1;
                        $rpc = new XmlRpc('D3','Orders.Add',$options);

                        $result = $rpc->sendRequest();

                        if($result['UID']){
                            $order->ext_id = $result['UID'];
                            $order->save(false);
                        }
                        $session['cart'] = [];
                    } else if($order->pay_id == 9) {
                        $options['PayForm'] =  2;
                        $rpc = new XmlRpc('D3','Orders.Add',$options);

                        $result = $rpc->sendRequest();
                        if($result['UID']){
                            $order->ext_id = $result['UID'];
                            $order->save(false);
                        }
                        $session['cart'] = [];
                    }
                    else if($order->pay_id == 10) {
                        $options['PayForm'] =  3;
                        $rpc = new XmlRpc('D3','Orders.Add',$options);

                        $result = $rpc->sendRequest();
                        if($result['UID']){
                            $order->ext_id = $result['UID'];
                            $order->save(false);
                        }
                        $session['cart'] = [];
                    }

                    //if($_SERVER['REMOTE_ADDR']!='46.219.47.67'){

                    //}
                    /*if($_SERVER['REMOTE_ADDR']=='46.219.33.12')
                    {

                        var_dump($options);
                        var_dump($result);
                         mail('lux-mail@ya.ru','Новый заказ на 3piroga.com.ua',$message.$result, $headers);

                        die();
                    }*/

                    $session['pay_id'] = $order->pay_id;

                    $session['url'] = $_SERVER['REQUEST_URI'];
                    if($pay_id==11)
                    {

                        if($total < 0){
                            $total = (int)$post['delivery'];
                        }

                        if($total == 0){
                            $total = 1;
                        }

                        $answer['status'] = 'liqpay';
                        //  $answer['url'] = \yii\helpers\Url::to('/success');
                        $answer['msg'] = 'All ok';
                        $answer['liqpay'] = [
                            'order_id'   => $order->id,
                            'currency'      => 'UAH',
                            'amount'        => $total,
                            'action'        => 'pay',
                            'description'   => 'Сумма покупки: '.$total,
                            'result_url' => 'https://3piroga.ua/success',
                            'server_url' => 'https://3piroga.ua/success',

                        ];

                        $answer['liqpay_button'] = Yii::$app->liqpay->cnb_form($answer['liqpay']);
                        $session['order_id'] = $order->id;
                        $session['pay_id'] = $pay_id;
                        return $answer;

                    }
                    else
                    {

                        $answer['status'] = true;
                        $answer['url'] = \yii\helpers\Url::toRoute('/success');
                        $answer['msg'] = 'All ok';
                    }


                }
                else
                {
                    $transaction->rollBack();
                    $answer['status'] = false;
                    $answer['url'] = \yii\helpers\Url::to('/error');
                    $answer['msg'] = 'Something is wrong';

                }
            }
            else
            {
                $transaction->rollBack();
                $answer['status'] = false;
                $answer['url'] = \yii\helpers\Url::to('/error');
                $answer['msg'] = $order->getErrors();

            }
            return $answer;
        }
        else
        {
            throw new BadRequestHttpException('Wrong request!');
        }
    }

    public function actionClear()
    {


        $_SESSION['cart'] = [];
        return Url::toRoute('/category');
    }
    public function actionSuccess()
    {
        $session     = Yii::$app->session;

        if($session['pay_id'] == 11){
            $res  = Yii::$app->liqpay->api("request", array(
                'action'        => 'status',
                'version'       => '3',
                'order_id'      => $session['order_id'],
            ));
            if(!empty($res)){
                if ($res->status == 'success'){
                    $backet = Orders::getCartInfo();
                    $orders = Orders::find()->where(['id' => $session['order_id']])->one();

                    $orders->pay_status = 1;
                    //$orders->save(false);

                    $headers = "From:info@3piroga.ua";
                    $message = "Ваш заказ на 3piroga.ua\r\n";
                    foreach($backet["params"] as $item)
                    {
                        $message .= "=================\r\n";
                        $message .= "Название: ".$item["name"]."\r\n";
                        $message .= "Объем/диаметр: ".$item["weight"]."\r\n";
                        $message .= "Количество: ".$item["count"]. " шт.\r\n";
                        $message .= "Цена: ".$item["price"]. " грн.\r\n";
                        $message .= "=================\r\n";

                    }
                    $message .= "Общая цена: ".$orders->total. " грн.\r\n";
                    $message .= "Имя клиента: ".$orders->name."\r\n";
                    $message .= "Телефон: ".$orders->phone."\r\n";
                    $message .= "Почта: ".$orders->email."\r\n";
                    $message .= "=================\r\n";
                    $message .= "АДРЕС ДОСТАВКИ: \r\n";
                    $message .= "Улица: ".$orders->address."\r\n";
                    //  $message .= "№ дома: ".$orders->build."\r\n";
                    $message .= "№ парадного: ".$orders->parad."\r\n";
                    $message .= "Этаж: ".$orders->floar."\r\n";
                    $message .= "№ квартиры: ".$orders->kvartira."\r\n";
                    $message .= "Дата доставки:  ".$orders->deliveryDate."\r\n";





                    $pay_bonus = " Заказ частичто оплачен бонусами (".(int)$session["bonus"].").";
//                    $session["coment"] .= "
//Заказ частичто оплачен бонусами (".(int)$session["bonus"].")";
                    //$message .= "Код двери: ".$order->code_c."\r\n";
                    $message .= "Время доставки: ".$orders->time."\r\n";
                    $message .= $pay_bonus."\r\n";
                    $message .= "Количество персон: ".$orders->persons."\r\n";
                    $message .= "Скидка по акции: ".$orders->discount. " грн.\r\n";
                    if( $session["stoc_id"] > 0){
                        $message .= "Акция: ".StocksHelper::getDiscountName( $session["stoc_id"])."\r\n";
                    }
                    $message .= "=================\r\n";
                    $message .= "Следите за нашими акциями и специальными предложениями.\r\n";
                    $message .= "https://3piroga.ua/discounts";

                    $message .= 'Тип оплаты: '.\common\models\OrdersParams::find()->byId($orders->pay_id)->limit(1)->one()->name."\r\n";
                    if($_SERVER['REMOTE_ADDR']!='193.93.77.121')
                    {
                        $EmailFrom="info@3piroga.ua";
                        $maill=mail("info@3piroga.ua",'=?utf-8?B?'.base64_encode("Новый заказ на 3piroga.ua").'?=',$message, "From: <$EmailFrom>\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit");
                        $maill2=mail($orders->email ,'=?utf-8?B?'.base64_encode("Ваш  заказ").'?=',$message, $headers);
                    }

                    //    $orders->status_id = 4;
                    //   $orders->save();

                    $options = [];
                    $address = [];

                    $amount = $session['amount'];

                    $address['address']  = $orders->address ? 'в.' . $orders->address :null;
                    // $address['build']    = $orders->build ? 'б.' . $orders->build :null;
                 //   $address['parad']    = $orders->parad ? 'під.' . $orders->parad :null;
                  //  $address['floar']    = $orders->floar ? 'пов.' . $orders->floar :null;
                   // $address['deliveryDate']    = $orders->deliveryDate ? 'пов.' . $orders->build :null;
                    //$address['kvartira']    = $orders->kvartira ? 'кв.' . $orders->kvartira :null;;
                    header('Content-Type: text/html; charset=utf-8');
                    $options['Address'] = implode(',', $address);
                    $options['Amount'] = floatval(number_format($amount , 2 , '.', ''));
                    $options['PlaceID'] = $session['placeID'];
                    $options['Flat'] =  $orders->kvartira ? $orders->kvartira :null;
                    $options['Entry'] =  $orders->parad ?  $orders->parad :null;
                    $options['Floor'] =  $orders->floar ?  $orders->floar :null;
                    $options['ClientName'] =  $orders->name;
                    $options['ClientTel'] =  substr(preg_replace("/[^0-9]/", '', $orders->phone),2);
                    $options['Discount'] =  floatval(number_format($orders->discount, 2, '.', ''));
                    if($session['bonus']){
                        $options['BonusPay'] =  floatval(number_format($session['bonus'],2,'.',''));
                        $bonus_res = Yii::$app->user->identity->bonus_balans - $session['bonus'];
                        $options['BonusRest'] = floatval(number_format($bonus_res,2,'.',''));
                    }
                    //$options['DlvDate'] =  $order->time;
                    if(empty($orders->persons)){
                        $options['GuestCount'] =  0;
                    }else{
                        $options['GuestCount'] =  (int)$orders->persons;
                    }

                        $options['Info'] =  $session['comment'];
                        $options['Info'] .=  'Дата доставки' . $orders->deliveryDate;


                    $options['PayForm'] = 4;

                    if($session['delivery']){

                        $backet['params']['121'] = [
                            "id" => 121,
                            "name" => "Доставка",
                            "url" => "/delivery",
                            "category_id" => "",
                            "weight" => "",
                            "price" => 1,
                            "count" => 1*$session['delivery'],
                            "cost" => 1,
                            "image" => "",
                            "coded2" => 300,
                        ];

                    }



                    foreach($backet['params'] as $key => $item)
                    {
                        $options['Items'][]=[
                            'Price' => floatval(number_format($item['price'] , 2 , '.', '')),
                            'Quant' => floatval($item['count']),
                            'UID' => intval($item['coded2'])
                        ];


                    }

                    $options['OuterID'] = (string)$session['order_id'];
                    $rpc = new XmlRpc('D3','Orders.Add',$options);

                    $result = $rpc->sendRequest();
                    if($result['UID']){
                        $orders->ext_id = $result['UID'];
                        $orders->save(false);
                    }
                    $messageLog = [
                        'status' => 'Платеж Ликпей Успешен.',
                        'post' => [
                            'res' => $res,
                            'pD2' => $result,

                        ]
                    ];

                    Yii::info($messageLog, 'payment'); //запись в лог
                    unset($session['cart']);

                }else if ($res->status == 'error'|| $res->status == "failure" || $res->status == "reversed"){

                    $messageLog = [
                        'status' => 'Платеж Ликпей ошибка.',
                        'post' => [
                            'res' => $res->status,
                            'error' => $res->err_description,
                        ]
                    ];

                    Yii::info($messageLog, 'payment'); //запись в лог
                    $ord =  Orders::findOne($session['order_id']);
                    $ord->delete();
                    if(strstr($session['url'],'/ru') == true){
                        return $this->redirect('/ru/backet#pay');

                    }else if(strstr($session['url'],'/en') == true){
                        return $this->redirect('/en/backet#pay');

                    }else if(strstr($session['url'],'/cart/new-order') == true){
                        return $this->redirect('/backet#pay');

                    }
                }
            }
            return $this->render('success.twig', []);

        }
        return $this->render('success.twig', []);



    }

    public function actionCheckCertificate()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $cert = Yii::$app->request->post('cert');
        $cert = trim($cert);
        $cert = str_replace('-', '', $cert);

        $lang = Yii::$app->language;

        $result = Certificates::find()->where(['code' => $cert])->one();
        if($result) {
            if(strtotime($result->expired_at) < time()){
                if($lang == 'ua'){
                    $response = ['msg' => 'Термін дії сертифіката вичерпано!','nominal' => 0];
                }
                if($lang == 'ru'){
                    $response = ['msg' => 'Срок действия сертификата исчерпан!','nominal' => 0];
                }
                if($lang == 'en'){
                    $response = ['msg' => 'Certificate has expired!','nominal' => 0];
                }
            } elseif(strtotime($result->used_at) > 0){
                if($lang == 'ua'){
                    $response = ['msg' => 'Цей сертифікат уже був використанний раніше!','nominal' => 0];
                }
                if($lang == 'ru'){
                    $response = ['msg' => 'Этот сертификат был использован ранее!','nominal' => 0];
                }
                if($lang == 'en'){
                    $response = ['msg' => 'This certificate has been used before!','nominal' => 0];
                }
            } else {
                if($lang == 'ua') {
                    $response = ['msg' => "Номінал сертифіката - {$result->nominal}грн!", 'nominal' => $result->nominal];
                }
                if($lang == 'ru') {
                    $response = ['msg' => "Номинал сертификата - {$result->nominal}грн!", 'nominal' => $result->nominal];
                }
                if($lang == 'en') {
                    $response = ['msg' => "Certificate nominal is {$result->nominal}grn!", 'nominal' => $result->nominal];
                }
            }
        } else {
            if($lang == 'ua'){
                $response = ['msg' => 'Немає такого сертифікату!','nominal' => 0];
            }
            if($lang == 'ru'){
                $response = ['msg' => 'Нет такого сертификата!','nominal' => 0];
            }
            if($lang == 'en'){
                $response = ['msg' => 'There is no such certificate!','nominal' => 0];
            }
        }

        return json_encode($response, JSON_NUMERIC_CHECK);
    }

}
