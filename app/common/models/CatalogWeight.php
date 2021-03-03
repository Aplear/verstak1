<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "catalog_weight".
 *
 * @property integer $id
 * @property string $value
 */
class CatalogWeight extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'catalog_weight';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['value'], 'required'],
            [['value'], 'string', 'max' => 250],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'value' => Yii::t('app', 'Значение'),
        ];
    }

    /**
     * @inheritdoc
     * @return \common\models\Queries\CatalogWeightQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\CatalogWeightQuery(get_called_class());
    }
}
