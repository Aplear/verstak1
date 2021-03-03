<?php

namespace common\components;

use Yii;
//use common\models\Pages;
use common\models\Lang;
use common\models\CatalogParams;
use common\models\Slovar;

use yii\helpers\ArrayHelper;
use yii\helpers\Url;

class BaseController extends \yii\web\Controller
{
    public $default_content;

    protected function url_origin($use_forwarded_host = false )
    {
        $s        = $_SERVER;
        $ssl      = ( ! empty( $s['HTTPS'] ) && $s['HTTPS'] == 'on' );
        $sp       = strtolower( $s['SERVER_PROTOCOL'] );
        $protocol = substr( $sp, 0, strpos( $sp, '/' ) ) . ( ( $ssl ) ? 's' : '' );
        $port     = $s['SERVER_PORT'];
        $port     = ( ( ! $ssl && $port=='80' ) || ( $ssl && $port=='443' ) ) ? '' : ':'.$port;
        $host     = ( $use_forwarded_host && isset( $s['HTTP_X_FORWARDED_HOST'] ) ) ? $s['HTTP_X_FORWARDED_HOST'] : ( isset( $s['HTTP_HOST'] ) ? $s['HTTP_HOST'] : null );
        $host     = isset( $host ) ? $host : $s['SERVER_NAME'] . $port;
        return $protocol . '://' . $host;
    }

    protected function full_url( $s, $use_forwarded_host = false )
    {
        return $this->url_origin( $s, $use_forwarded_host ) . $s['REQUEST_URI'];
    }
    
    public function init()
    {
        parent::init();


        $this->layout = 'main.twig';

        $session = Yii::$app->session;
        $session->open();
        $cart_count = 0;
        $summ=0;
       /* $strr='';
        $str="50.475424,30.522079 
50.468432,30.530319 
50.461438,30.537872 
50.456193,30.546799 
50.451383,30.560532 
50.448323,30.577698 
50.446574,30.594864 
50.444388,30.60791 
50.43914,30.613403 
50.428206,30.617523 
50.417269,30.612717 
50.412018,30.596924 
50.408518,30.580444 
50.405892,30.570831 
50.396263,30.557785 
50.39101,30.544739 
50.386632,30.528946 
50.38707,30.51384 
50.389697,30.500107 
50.393199,30.485687 
50.398889,30.474701 
50.406767,30.461655 
50.413331,30.451355 
50.422081,30.443115 
50.434767,30.435562 
50.444825,30.432129 
50.455318,30.437622 
50.463187,30.447922 
50.468432,30.460968 
50.476298,30.470581 
50.481104,30.480881 
50.481541,30.498047 
50.479794,30.511093
 ";
        $new_str = explode(' ',$str);
        foreach ($new_str as $item)
        {
            $new_item = explode(',',$item);
            $strr .= "{lat: ".$new_item[0].", lng: ".$new_item[1]."},";
        }
        var_dump($strr);*/

        $this->view->params['current_url']=str_replace(['/en/','/ru/','/'],'',$_SERVER['REQUEST_URI']);
        if($session->isActive && $session->has('cart') && !empty($session['cart']))
        {
        //    $cart_count = count($session['cart']);
		 foreach ($session['cart'] as $item_id => $item_count) {
            $summ+=(CatalogParams::find()->where(['id'=>$item_id])->limit(1)->one()->price*$item_count);
            $cart_count += $item_count;
        }
        }
        if(strstr($_SERVER['REQUEST_URI'],'.html')!==false)
        {
            return $this->redirect(Url::toRoute(str_replace('.html','',$_SERVER['REQUEST_URI'])),301)->send();
        }
        if(strstr($_SERVER['REQUEST_URI'],'.php')!==false)
        {
            return $this->redirect(Url::toRoute(str_replace('.php','',$_SERVER['REQUEST_URI'])),301)->send();
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
                $params['type'] = $params_obj->nameValue->info->value;
                $params_all[] = $params;
                $sum += (int)$params['price'] * $item_count;
            }
        }
        $this->view->params['cart_info'] = $params_all;

        $this->view->params['cart_count']   = $cart_count;
        $this->view->params['cost']   = $summ;
        $lang                               = Lang::getCurrent();
        $this->view->params['lang']         = $lang;
        $this->view->params['lang_sh']      = mb_substr(($lang->name),0,3, 'utf-8');
        $langs                              = Lang::find()->all();
        $this->view->params['langs']        = $langs;
        $current_url                        = Yii::$app->request->pathinfo;

        $slovar = Slovar::find()
                        ->leftJoin('slovar_info', '`record_id`=`id`')
                        ->select(['slovar.alias', 'slovar_info.value'])
                        ->where(['lang' => Lang::getCurrentId()])
                        ->asArray()
                        ->all();
        $slovar = ArrayHelper::map($slovar, 'alias', 'value');

        $this->view->params = array_merge($this->view->params, $slovar);


        $settings = \common\models\UserSettings::find()->where(['id'=>1])->limit(1)->one();
        $this->view->params['phone_header'] = $settings->phone_header;
        $this->view->params['phone_footer_1'] = $settings->phone_footer_1;
        $this->view->params['phone_footer_2'] = $settings->phone_footer_3;
        $this->view->params['email'] = $settings->email;
        $this->view->params['addresss'] = $settings->address;
        $this->view->params['youtube_link'] = $settings->youtube_link;
        $this->view->params['facebook_link'] = $settings->facebook_link;
        $this->view->params['viber_link'] = $settings->viber_link;
        $this->view->params['telegram_link'] = $settings->telegram_link;
        $this->view->params['instagramm_link'] = $settings->instagramm_link;
        $this->view->params['time_work'] = $settings->time_work;
        $this->view->params['mobileph'] = $settings->mobileph;



        if($lang->by_default)
        {
            $this->view->params['lang_url']     = '';
            Yii::$app->homeUrl                  = $this->view->params['home_url']='/';
            $this->view->params['current_url']  = $current_url ? "/{$current_url}": '/';
        }
        else
        {
            $this->view->params['lang_url']     = "/{$lang->url}";

            Yii::$app->homeUrl                  = $this->view->params['home_url']="/{$lang->url}/";
            $this->view->params['current_url']  = "/{$lang->url}/{$current_url}";
        }
        
        if(strstr($_SERVER['REQUEST_URI'],'/user/edit/lot/')!==false)
        {
            $this->view->params['edit_script']=1;
        }
        

        
        if(isset($_GET['page']) && !empty($_GET['page']) && (int)$_GET['page'] > 1)
        {
            Yii::$app->view->registerMetaTag([
                'name'    => 'robots',
                'content' => 'NOINDEX, NOFOLLOW'
            ]);
        }
        if(strstr($_SERVER['REQUEST_URI'],'/search/')!==false
        || strstr($_SERVER['REQUEST_URI'],'backet')!==false
        || strstr($_SERVER['REQUEST_URI'],'order')!==false
        || strstr($_SERVER['REQUEST_URI'],'/search/')!==false
        || strstr($_SERVER['REQUEST_URI'],'gclid')!==false
        || strstr($_SERVER['REQUEST_URI'],'utm')!==false)
        {
            Yii::$app->view->registerMetaTag([
                'name'    => 'robots',
                'content' => 'NOINDEX, NOFOLLOW'
            ]);
        }
        if(strstr($_SERVER['REQUEST_URI'],'/login')!==false or strstr($_SERVER['REQUEST_URI'],'/user/')!==false or strstr($_SERVER['REQUEST_URI'],'/reset')!==false or strstr($_SERVER['REQUEST_URI'],'/dialogs/')!==false)
        {
            Yii::$app->view->registerMetaTag([
                'name'    => 'robots',
                'content' => 'NOINDEX, NOFOLLOW'
            ]);
        }



    }
    
    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
                'view' => '@frontend/views/content/404.twig',
            ],
        ];
    }
} 