<?php

namespace frontend\widgets;

use Yii;
use common\models\CatalogCategories;
use common\models\Menu;


class Catalog extends \yii\base\Widget
{
    public $bottom = false;


    public function run()
    {

        if($this->bottom==false)
        {
            $categories = CatalogCategories::find()->joinWith('info')
                ->all();
            return $this->render('catalog/categories.twig', [
                'categories'        => $categories,
            ]);
        }
        else
        {
            $categories = CatalogCategories::find()->bottom()->joinWith('info')
                ->all();
            $menu = Menu::find()->top()->joinWith('info')
                ->all();
            return $this->render('catalog/bottom.twig', [
                'categories'        => $categories,
                'menu'        => $menu,
            ]);
        }

    }
}