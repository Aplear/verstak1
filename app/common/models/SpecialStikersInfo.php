<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "special_stikers_info".
 *
 */
class SpecialStikersInfo extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'special_stikers_info';
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
            [['record_id'], 'exist', 'skipOnError' => true, 'targetClass' => SpecialStikers::className(), 'targetAttribute' => ['record_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRecord()
    {
        return $this->hasOne(SpecialStikers::className(), ['id' => 'record_id']);
    }
    public static function find()
    {
        return new \common\models\Queries\SpecialStikersInfoQuery(get_called_class());
    }

}
