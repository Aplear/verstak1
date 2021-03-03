<?php
/*
 * Кнопка вверх
 */

namespace frontend\widgets;
use Yii;
use yii\base\Widget;
use frontend\assets\WidgetsAsset;
class ScrollupWidget extends Widget {
    public function run() {
        //Подключаем свой файл Asset
        WidgetsAsset::register($this->view);
        return $this->render('scrollup',[
        ]);
    }
}
