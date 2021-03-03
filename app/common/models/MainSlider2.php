<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "main_slider2".
 *
 * @property integer $id
 * @property string $href
 * @property integer $sort
 * @property integer $creation_time
 * @property integer $update_time
 *
 * @property MainSlider2Info[] $mainSlider2Infos
 */
class MainSlider2 extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'main_slider2';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['href', 'sort', 'creation_time', 'update_time'], 'required'],
            [['sort', 'creation_time', 'update_time'], 'integer'],
            [['href'], 'string', 'max' => 250],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'href' => Yii::t('app', 'Ссылка'),
            'sort' => Yii::t('app', 'SORT'),
            'creation_time' => Yii::t('app', 'Date of creation'),
            'update_time' => Yii::t('app', 'Date of update'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMainSlider2Infos()
    {
        return $this->hasMany(MainSlider2Info::className(), ['record_id' => 'id']);
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
    /**
     * @inheritdoc
     * @return \common\models\Queries\MainSlider2Query the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\MainSlider2Query(get_called_class());
    }
    public function getInfo()
    {
        return $this->hasOne(MainSlider2Info::className(), ['record_id'=>'id'])->onCondition([MainSlider2Info::tableName().'.lang' => Lang::getCurrentId()]);
    }
    public function getImgPng()
    {

        $id = \common\models\Lang::getCurrentId();
       
		if(is_file($_SERVER['DOCUMENT_ROOT'] . '/images/'. $this->tableName().'/'.$this->id.".".$id.".b.jpg"))
        {
            return '/images/'. $this->tableName().'/'.$this->id.".".$id.".b.jpg";
        }
		 else if(is_file($_SERVER['DOCUMENT_ROOT'] . '/images/'. $this->tableName().'/'.$this->id.".".$id.".b.png"))
        {
            return '/images/'. $this->tableName().'/'.$this->id.".".$id.".b.png";
        }
        else
        {
            return '/images/no-img.png';
        }
    }
}
