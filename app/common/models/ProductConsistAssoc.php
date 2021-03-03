<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "product_consist_assoc".
 *
 * @property integer $product_id
 * @property integer $consist_id
 */
class ProductConsistAssoc extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product_consist_assoc';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['product_id', 'consist_id'], 'required'],
            [['product_id', 'consist_id'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'product_id' => Yii::t('app', 'Product ID'),
            'consist_id' => Yii::t('app', 'Consist ID'),
        ];
    }

    /**
     * @inheritdoc
     * @return \common\models\Queries\ProductConsistAssocQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\ProductConsistAssocQuery(get_called_class());
    }

    public function getConsist()
    {
        return $this->hasOne(CatalogConsist::className(),['id'=>'consist_id']);
    }
}
