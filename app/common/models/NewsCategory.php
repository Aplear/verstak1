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


class NewsCategory extends \common\components\BaseActiveRecord
{

    public static function tableName()
    {
        return 'news_categories';
    }

    public function rules()
    {
        return [

            [['alias',], 'string', 'min' => 2, 'max' => 1050],
            [['creation_time','update_time'.'sort','active'], 'integer'],
        ];
    }


    public function attributeLabels()
    {
        return [
            'alias' => Yii::t('app', 'Алиас'),
            'creation_time' =>  Yii::t('app', 'Время создания'),
            'update_time' =>  Yii::t('app', 'Время Обновления'),
        ];
    }


    public function getInfo()
    {
        return $this->hasOne(NewsCategoryInfo::className(), ['record_id'=>'id'])->onCondition([NewsCategoryInfo::tableName().'.lang' => Lang::getCurrentId()]);
    }

    public static function find()
    {
        return new \common\models\Queries\NewsCategoryQuery(get_called_class());
    }
}