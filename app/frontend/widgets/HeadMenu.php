<?php

namespace frontend\widgets;

use Yii;
use common\models\Menu;
use common\models\CatalogCategories;



class HeadMenu extends \yii\base\Widget
{
    public $mobile = false;
    public $split = false;

    public function run()
    {
        $menu = Menu::find()->top()->joinWith('info')
            ->all();
        if($this->mobile)
        {
			$categories = CatalogCategories::find()->active()->joinWith('info')->all();
            return $this->render('head/mobile.twig', [
                'menu'          => $menu,
				'categories'	=> $categories,
                'menu_aplit'    => $this->split
            ]);
        }
        else
        {
            return $this->render('head/menu.twig', [
                'menu'          => $menu,
                'menu_split'    => $this->split
            ]);
        }

    }
}
