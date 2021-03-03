<?php
namespace frontend\widgets;

use Yii;
use frontend\widgets;
use common\models\Lang;

class HrefLang extends Widget
{
    /**
     * Executes widget
     * @return string link tag with hreflang
     */
    public function run()
    {
        /** @var \DevGroup\Multilingual\Multilingual $multilingual */
        $multilingual = Yii::$app->get('multilingual');
        /** @var Language[] $languages */
        $languages = $multilingual->getAllLanguages();
        $result = '';
        foreach ($languages as $language) {
            if (
                $language->id === $multilingual->language_id
                || $language->rulesForContext(Yii::$app->multilingual->context_id) === null
            ) {
                // skip current language
                continue;
            }
            $result .= Html::tag(
                'link',
                '',
                [
                    'rel' => 'alternate',
                    'hreflang' => $language->iso_639_1,
                    'href' => $multilingual->translateCurrentRequest($language->id),
                ]
            ) . "\n";
        }
        
        return $result;
    }
}