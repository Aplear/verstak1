<?php

namespace frontend\widgets;

use Yii;
use common\models\CatalogProducts;
use common\models\SpecialStikers;
use common\models\CatalogCategories;
use yii\helpers\Url;

class Newsmbask extends \yii\base\Widget
{
    public $type = 1;
    
    public function run()
    {
        if($this->type == 1){
            $products2 = CatalogProducts::find()->andWhere(['category_id'=>5])->joinWith('info','params')->all();
        }elseif($this->type == 2){
            $products2 = CatalogProducts::find()->andWhere(['category_id'=>10])->orWhere(['id'=>[85, 86, 87, 88]])->joinWith('info','params')->all();
        }
                      
        return $this->render('newsmbask.twig',[    
            'products2' => $products2,
            'type' => $this->type
        ]);

    }
}