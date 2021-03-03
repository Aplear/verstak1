<?php
namespace frontend\widgets;

use Yii;
use common\models\Lang;

class Sklanguri extends \yii\base\Widget
{
    public function run()
    {
        $vowels = array("/en", "/ru");
        $url = str_replace($vowels, "", Yii::$app->request->url);
        if($url == '/'){
            $url = '';
        }
//        $result = "
//    <link rel=\"test\"  hreflang=\"test\" href=\"test\"/>
//
//    <link rel=\"alternate\"  hreflang=\"uk-ua\" href=\"https://3piroga.ua/$url\"/>
//
//    <link  rel=\"alternate\" hreflang=\"en-ua\" href=\"https://3piroga.ua/en/$url\" />
//
//    <link  rel=\"alternate\" hreflang=\"ru-ua\" href=\"https://3piroga.ua/ru/$url\" />
//
//    <link  rel=\"alternate\" hreflang=\"x-default\" href=\"https://3piroga.ua/ru/$url\" />";

        $result = <<<_EOC
 
 <link rel="alternate" hreflang="uk-ua" href="https://3piroga.ua$url" />
 <link rel="alternate" hreflang="en-ua" href="https://3piroga.ua/en$url" />
 <link rel="alternate" hreflang="ru-ua" href="https://3piroga.ua/ru$url" />
 <link rel="alternate" hreflang="x-default" href="https://3piroga.ua/ru$url" />
_EOC;


        return (string)$result;
    }
}
