<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "special_stikers".
 */
class SpecialStikers extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'special_stikers';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['product_id', 'sort'], 'required'],
            [['product_id', 'sort'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */


    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSpecialStikersInfos()
    {
        return $this->hasMany(SpecialStikersInfo::className(), ['record_id' => 'id']);
    }
    public function getInfo()
    {
        return $this->hasOne(SpecialStikersInfo::className(), ['record_id'=>'id'])->onCondition([SpecialStikersInfo::tableName().'.lang' => Lang::getCurrentId()]);
    }
    public static function find()
    {
        return new \common\models\Queries\SpecialStikersQuery(get_called_class());
    }
    
    public function getImgPng($id_stikers)
    {

       $id = \common\models\Lang::getCurrentId();
       
        if(is_file($_SERVER['DOCUMENT_ROOT'] . '/images/special_stikers/'.$id_stikers.".".$id.".b.jpg"))
        {
            return '/images/special_stikers/'.$id_stikers.".".$id.".b.jpg";
        }
        else if(is_file($_SERVER['DOCUMENT_ROOT'] . '/images/special_stikers/'.$id_stikers.".".$id.".b.png"))
        {
            return '/images/special_stikers/'.$id_stikers.".".$id.".b.png";
        }
        else
        {
            return '/images/no-img.png';
        }
    }
    
    
}
