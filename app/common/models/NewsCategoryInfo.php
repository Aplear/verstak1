<?php
/**
 * Created by PhpStorm.
 * User: nikvils
 * Date: 23.05.19
 * Time: 10:25
 */

namespace common\models;

use Yii;
use yii\db\ActiveRecord;
use yii\helpers\Url;


class NewsCategoryInfo extends \common\components\BaseActiveRecord
{

    public static function tableName()
    {
        return 'news_categories_info';
    }

    public function rules()
    {
        return [

            [['lang', 'title','text'], 'string', 'min' => 2, 'max' => 1050],
            [['record_id',], 'integer'],
        ];
    }


    public function attributeLabels()
    {
        return [
            'lang' => Yii::t('app', 'Язык'),
            'record_id' =>  Yii::t('app', 'Id категории'),
            'title' =>  Yii::t('app', 'Заголовок'),
            'text' => Yii::t('app', 'Текст'),
        ];
    }


    public function getInfo()
    {
        return $this->hasOne(NewsCategory::className(), ['id'=>'record_id'])->onCondition([NewsCategoryInfo::tableName().'.lang' => Lang::getCurrentId()]);
    }

    public static function find()
    {
        return new \common\models\Queries\NewsCategoryInfoQuery(get_called_class());
    }
}