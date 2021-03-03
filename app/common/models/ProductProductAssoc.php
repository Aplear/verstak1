<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "product_product_assoc".
 *
 * @property integer $product_id
 * @property integer $product_similar_id
 */
class ProductProductAssoc extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product_product_assoc';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['product_id', 'product_similar_id'], 'required'],
            [['product_id', 'product_similar_id'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'product_id' => Yii::t('app', 'Product ID'),
            'product_similar_id' => Yii::t('app', 'Product Similar ID'),
        ];
    }

    /**
     * @inheritdoc
     * @return \common\models\Queries\ProductProductAssocQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\ProductProductAssocQuery(get_called_class());
    }

    public function getProduct()
    {
        return $this->hasOne(CatalogProducts::className(),['id'=>'product_id']);
    }
}
