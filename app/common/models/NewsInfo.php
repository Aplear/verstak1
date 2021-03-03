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


class NewsInfo extends \common\components\BaseActiveRecord
{

    public static function tableName()
    {
        return 'news_info';
    }

    public function rules()
    {
        return [

            [[ 'lang','title','pre_text',], 'string', 'min' => 2, 'max' => 255],
            [[ 'text',], 'text'],
            [['record_id', ], 'integer'],
        ];
    }

    public function getRecord()
    {
        return $this->hasOne(NewsCategoryInfo::className(), ['id' => 'record_id']);
    }

    public static function find()
    {
        return new \common\models\Queries\NewsInfoQuery(get_called_class());
    }



}