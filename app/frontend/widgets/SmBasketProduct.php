<?php

namespace frontend\widgets;

use Yii;
use common\models\CatalogProducts;
use common\models\SpecialStikers;
use common\models\CatalogCategories;
use yii\helpers\Url;

class SmBasketProduct extends \yii\base\Widget
{

    public $type = 1;
    
    public function run()
    {
        if($this->type == 1){
        $products2 = CatalogProducts::find()->andWhere(['category_id'=>5])->joinWith('info','params')->limit(5)->asArray()->all();
        }elseif($this->type == 2){
        $products2 = CatalogProducts::find()->andWhere(['id'=>[38,41,43,44,8,14,18,31,45]])->joinWith('info','params')->limit(5)->asArray()->all();
        }
		$stikers = SpecialStikers::find()->joinWith('info')->orderBy('sort DESC')->all();
        if($this->type == 1){
            $return = '';
        }else{
            $return = '<div id="wrapper"> 
    <div id="container-sk">   ';
        }
        foreach($products2 as $product2){
            if($this->type == 1){
                //$itt = '';
            }else{
                //$itt = 'item';
            }
            $cat = CatalogCategories::find()->where(['id' => $product2['category_id']])->one();
            //print_R($cat['alias']);
            $url = Url::toRoute('/'.$cat['alias'].'/'.$product2['alias']);
            //if($this->type != 1){ $return .= '<div class="item">'; }

            $return .= '<a href="'.$url.'" class="skdop_minibsket_a"><div  class="skdop_minibsket_div" title="'.$product2['info']['title'].' - 3piroga.com.ua" alt="'.$product2['info']['title'].' - 3piroga.com.ua" class="img_cart" style="background-image: url(\'/images/catalog_products/'.$product2['id'].'.1.s.jpg\');background-size: 100%;     height: 90px;"></div>';
            $return .= '</a>';	
            //if($this->type != 1){ $return .= '</div>'; }					 
        }
        if($this->type == 1){
            $return .= '';
        }else{
            $return .= '
				</div><img id="carouselLeft" src="/images/leftArr.png" />
	<img id="carouselRight" src="/images/rightArr.png" />
</div>';
        }
        //echo $return;
        return $return;

    }
}