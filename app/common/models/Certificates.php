<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;
use yii\helpers\Url;


class Certificates extends \common\components\BaseActiveRecord
{

    public static function tableName()
    {
        return 'certificates';
    }

    public function rules()
    {
        return [

        ];
    }

    public static function find()
    {
        return new \common\models\Queries\CertificatesQuery(get_called_class());
    }
}