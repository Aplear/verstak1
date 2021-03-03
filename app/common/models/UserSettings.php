<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "user_settings".
 *
 * @property integer $id
 * @property string $phone_header
 * @property string $phone_footer_1
 * @property string $phone_footer_2
 * @property string $email
 * @property string $address
 * @property double $page_main
 * @property double $page_catalog
 */
class UserSettings extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user_settings';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['phone_header', 'phone_footer_1', 'phone_footer_2', 'email', 'address', 'page_main', 'page_catalog'], 'required'],
            [['page_main', 'page_catalog'], 'number'],
            [['phone_header', 'phone_footer_1', 'phone_footer_2', 'email', 'address'], 'string', 'max' => 250],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'phone_header' => Yii::t('app', 'Телефон в хедере(придерживаться примера)'),
            'phone_footer_1' => Yii::t('app', 'Телефон в футере №1'),
            'phone_footer_2' => Yii::t('app', 'Телефон в футере №2'),
            'email' => Yii::t('app', 'Email'),
            'address' => Yii::t('app', 'Адрес в футере'),
            'page_main' => Yii::t('app', 'Количество продуктов на главной'),
            'page_catalog' => Yii::t('app', 'Количество продуктов на страницах категорий'),
        ];
    }

    /**
     * @inheritdoc
     * @return \common\models\Queries\UserSettingsQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\UserSettingsQuery(get_called_class());
    }
}
