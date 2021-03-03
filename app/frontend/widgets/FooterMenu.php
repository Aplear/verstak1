<?php

namespace frontend\widgets;

use Yii;
use common\models\Menu;
use common\models\CatalogCategories;



class FooterMenu extends \yii\base\Widget
{
    public $mobile = false;

    public function run()
    {
        $menu = Menu::find()->bottom()->joinWith('info')
            ->all();
        if($this->mobile)
        {	
			$categories = CatalogCategories::find()->active()->joinWith('info')->all();
            return $this->render('head/mobile.twig', [
                'menu'        => $menu,
				'categories'	=> $categories	
            ]);
        }
        else
        {
            return $this->render('head/menu_footer.twig', [
                'menu'        => $menu,
            ]);
        }

    }
}