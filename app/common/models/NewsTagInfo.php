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


class NewsTagInfo extends \common\components\BaseActiveRecord
{

    public static function tableName()
    {
        return 'news_tag_info';
    }

    public function rules()
    {
        return [
            [['lang','title'] ,'string' ],
            [['record_id', ], 'integer'],
        ];
    }

    public function getRecord()
    {
        return $this->hasOne(NewsTag::className(), ['record_id' => 'id']);
    }

    public static function find()
    {
        return new \common\models\Queries\NewsTagInfoQuery(get_called_class());
    }



}