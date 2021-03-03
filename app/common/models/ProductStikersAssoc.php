<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "product_stikers_assoc".
 *
 * @property integer $product_id
 * @property integer $stikers_id
 */
class ProductStikersAssoc extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product_stikers_assoc';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['product_id', 'stikers_id'], 'required'],
            [['product_id', 'stikers_id'], 'integer'],
        ];
    }

    public function getStikers()
    {
        return $this->hasOne(SpecialStikers::className(),['id'=>'stikers_id']);
    }
    public static function find()
    {
        return new \common\models\Queries\ProductStikersAssocQuery(get_called_class());
    }
    
}


