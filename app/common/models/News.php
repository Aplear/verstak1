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


class News extends \common\components\BaseActiveRecord
{

    public static function tableName()
    {
        return 'news';
    }

    public function rules()
    {
        return [

            [['alias', 'tags_id'], 'string', 'min' => 2, 'max' => 255],
            [['active', 'category_id', 'tags_id', 'sort','creation_time','update_time'], 'integer'],
        ];
    }


    public function attributeLabels()
    {
        return [
            'alias' => Yii::t('app', 'Алиас'),
            'tags_id' =>  Yii::t('app', 'Id Тегов'),
            'category_id' =>  Yii::t('app', 'Id Категории'),
            'creation_time' => Yii::t('app', 'Дата создания'),

            'update_time' => Yii::t('app', 'Дата'),
        ];
    }



    public function getUrl()
    {
        return Url::toRoute('/blog/'.$this->alias);
    }


    public function getInfo()
    {
        return $this->hasOne(NewsInfo::className(), ['record_id'=>'id'])->onCondition([NewsInfo::tableName().'.lang' => Lang::getCurrentId()]);
    }
    
    public function getInfoForApi()
    {
        return $this->hasMany(NewsInfo::className(), ['record_id'=>'id']);
    }

    public static function find()
    {
        return new \common\models\Queries\NewsQuery(get_called_class());
    }
}