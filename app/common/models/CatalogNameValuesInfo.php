<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "catalog_name_values_info".
 *
 * @property integer $record_id
 * @property string $lang
 * @property string $value
 *
 * @property CatalogNameValues $record
 */
class CatalogNameValuesInfo extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'catalog_name_values_info';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['record_id', 'lang', 'value'], 'required'],
            [['record_id'], 'integer'],
            [['lang'], 'string', 'max' => 3],
            [['value'], 'string', 'max' => 250],
            [['record_id'], 'exist', 'skipOnError' => true, 'targetClass' => CatalogNameValues::className(), 'targetAttribute' => ['record_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'record_id' => Yii::t('app', 'Record ID'),
            'lang' => Yii::t('app', 'Lang'),
            'value' => Yii::t('app', 'Значение'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRecord()
    {
        return $this->hasOne(CatalogNameValues::className(), ['id' => 'record_id']);
    }

    /**
     * @inheritdoc
     * @return \common\models\Queries\CatalogNameValuesInfoQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\CatalogNameValuesInfoQuery(get_called_class());
    }
}
