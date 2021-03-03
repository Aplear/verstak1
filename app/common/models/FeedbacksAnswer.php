<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "feedbacks".
 *
 * @property integer $id
 * @property integer $product_id
 * @property string $name
 * @property string $text
 * @property string $mark
 * @property integer $active
 * @property integer $sort
 * @property integer $creation_time
 * @property integer $update_time
 */
class FeedbacksAnswer extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'feedbacks_answer';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['parent_id', 'text',], 'required'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'parent_id' => Yii::t('app', 'ID Отзыва'),
            'text' => Yii::t('app', 'Текст'),

        ];
    }
    public static function find()
    {
        return new \common\models\Queries\FeedbacksAnswerQuery(get_called_class());
    }
}
