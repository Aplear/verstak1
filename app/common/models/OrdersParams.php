<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "orders_params".
 *
 * @property integer $id
 * @property string $name
 * @property string $type
 * @property string $system_key
 * @property double $add_cost
 * @property string $sort
 */
class OrdersParams extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'orders_params';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'type', 'add_cost', 'sort'], 'required'],
            [['add_cost'], 'number'],
            [['sort'], 'integer'],
            [['name', 'type'], 'string', 'max' => 250],
            [['system_key'], 'string', 'max' => 16],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'name' => Yii::t('app', 'Название'),
            'type' => Yii::t('app', 'Тип значения'),
            'system_key' => Yii::t('app', 'Системный идентификатор'),
            'add_cost' => Yii::t('app', 'Добавочная стоимость, грн'),
            'sort' => Yii::t('app', 'Порядковый номер при cортировке'),
        ];
    }

    /**
     * @inheritdoc
     * @return \common\models\Queries\OrdersParamsQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Queries\OrdersParamsQuery(get_called_class());
    }
}
