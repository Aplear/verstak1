<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "catalog_values".
 *
 * @property integer $id
 * @property string $value
 */
class CatalogValues extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'catalog_values';
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
     * @return \common\models\Queries\CatalogValuesQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\CatalogValuesQuery(get_called_class());
    }
}
