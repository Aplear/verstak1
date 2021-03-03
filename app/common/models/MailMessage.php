<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "mail_message".
 *
 * @property integer $id
 * @property string $email
 * @property string $comment
 * @property integer $creation_time
 * @property integer $update_time
 */
class MailMessage extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'mail_message';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['email', 'comment', 'creation_time'], 'required'],
            [['comment'], 'string'],
            [['creation_time', 'update_time'], 'integer'],
            [['email'], 'string', 'max' => 250],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'email' => Yii::t('app', 'Email'),
            'comment' => Yii::t('app', 'Text'),
            'creation_time' => Yii::t('app', 'Date of creation'),
            'update_time' => Yii::t('app', 'Date of update'),
        ];
    }

    /**
     * @inheritdoc
     * @return \common\models\Queries\MailMessageQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\MailMessageQuery(get_called_class());
    }
}
