<?php

namespace common\models;

use Yii;
use yii\helpers\Url;

/**
 * This is the model class for table "discounts".
 *
 * @property integer $id
 * @property integer $active
 * @property string $alias
 * @property integer $sort
 * @property integer $creation_time
 * @property integer $update_time
 *
 * @property DiscountsInfo[] $discountsInfos
 */
class Discounts extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'discounts';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['active', 'alias', 'sort', 'creation_time', 'update_time'], 'required'],
            [['active', 'sort', 'creation_time', 'update_time'], 'integer'],
            [['alias'], 'string', 'max' => 250],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'active' => Yii::t('app', 'Опубликовать'),
            'alias' => Yii::t('app', 'Alias (генерируеться, если не заполнен)'),
            'sort' => Yii::t('app', 'SORT'),
            'creation_time' => Yii::t('app', 'Date of creation'),
            'update_time' => Yii::t('app', 'Date of update'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDiscountsInfos()
    {
        return $this->hasMany(DiscountsInfo::className(), ['record_id' => 'id']);
    }
    public function behaviors()
    {
        return [
            'timestamps' => [
                'class' => \yii\behaviors\TimestampBehavior::className(),
                'createdAtAttribute' => 'creation_time',
                'updatedAtAttribute' => 'update_time',
            ],
            'thumb' => [
                'class' => \common\components\behavior\ImgBehavior::className()
            ],
//            'translit' => [
//                'class' => \common\components\behavior\TranslitBehavior::className()
//            ],
        ];
    }

    public function getInfo()
    {
        return $this->hasOne(DiscountsInfo::className(), ['record_id'=>'id'])->onCondition([DiscountsInfo::tableName().'.lang' => Lang::getCurrentId()]);
    }
    public function getLogos()
    {
       if(\common\models\Lang::getCurrentId()==1)
       {
            $logo = $this->logoru;
       }
       else if (\common\models\Lang::getCurrentId()==2)
       {
           $logo = $this->logouk;
       }
       else
       {
           $logo = $this->logoen;
       }


        if(is_file($_SERVER['DOCUMENT_ROOT'] . '/userfiles/png/'.$logo))
        {
            return '/userfiles/png/'.$logo;
        }
        elseif (is_file($_SERVER['DOCUMENT_ROOT'] . '/userfiles/jpg/'.$logo))
        {
            return '/userfiles/jpg/'.$logo;

        }

    }
    public function getImgPng()
    {

        $id = \common\models\Lang::getCurrentId();
        if(is_file($_SERVER['DOCUMENT_ROOT'] . '/images/'. $this->tableName().'/'.$this->id.".".$id.".b.png"))
        {
            return '/images/'. $this->tableName().'/'.$this->id.".".$id.".b.png";
        }
        elseif (is_file($_SERVER['DOCUMENT_ROOT'] . '/images/'. $this->tableName().'/'.$this->id.".".$id.".b.jpg"))
        {
            return '/images/'. $this->tableName().'/'.$this->id.".".$id.".b.jpg";

        }
        else
        {
            return '/images/no-img.png';
        }
    }
    public function getUrl()
    {
        return Url::toRoute('/discounts/'.$this->alias);
    }
    /**
     * @inheritdoc
     * @return \common\models\Queries\DiscountsQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\DiscountsQuery(get_called_class());
    }
}
