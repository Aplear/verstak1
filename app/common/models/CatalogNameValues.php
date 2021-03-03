<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "catalog_name_values".
 *
 * @property integer $id
 *
 * @property CatalogNameValuesInfo[] $catalogNameValuesInfos
 */
class CatalogNameValues extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'catalog_name_values';
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
            'id' => Yii::t('app', 'ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCatalogNameValuesInfos()
    {
        return $this->hasMany(CatalogNameValuesInfo::className(), ['record_id' => 'id']);
    }
	public function getInfo()
    {
        return $this->hasOne(CatalogNameValuesInfo::className(), ['record_id'=>'id'])->onCondition([CatalogNameValuesInfo::tableName().'.lang' => Lang::getCurrentId()]);
    }
    /**
     * @inheritdoc
     * @return \common\models\Queries\CatalogNameValuesQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\CatalogNameValuesQuery(get_called_class());
    }
}
