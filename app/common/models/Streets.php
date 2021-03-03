<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "stocks".
 *
 * @property integer $id
 * @property string $street_name
 */
class Streets extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'streets';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'Ид'),
            'street_name' => Yii::t('app', 'Название'),
        ];
    }
}
