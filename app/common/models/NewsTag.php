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


class NewsTag extends \common\components\BaseActiveRecord
{

    public static function tableName()
    {
        return 'news_tag';
    }

    public function rules()
    {
        return [
            [['creation_time','update_time', ], 'integer'],
        ];
    }

    public function getRecord()
    {
        return $this->hasOne(NewsTagInfo::className(), ['id' => 'record_id']);
    }

    public function getInfo()
    {
        return $this->hasOne(NewsTagInfo::className(), ['record_id'=>'id'])->onCondition([NewsTagInfo::tableName().'.lang' => Lang::getCurrentId()]);
    }

    public static function find()
    {
        return new \common\models\Queries\NewsTagQuery(get_called_class());
    }



}