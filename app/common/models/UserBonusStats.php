<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%user_bonus_stats}}".
 *
 * @property integer $id
 * @property integer $user_id
 * @property  string $order_id
 * @property string $operation
 * @property integer $count
 * @property integer $it_was
 * @property integer $became
 * @property string $type
 * @property string $date_operation
 */
class UserBonusStats extends \common\components\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%user_bonus_stats}}';
    }
    


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'operation', 'count', 'became', 'type'], 'required'],
            [['user_id', 'count', 'it_was', 'became'], 'integer'],
            [['order_id', 'operation'], 'string', 'max' => 10],
            [['type'], 'string', 'max' => 200],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'Ид'),
            'user_id' => Yii::t('app', 'Ид пользователя'),
            'order_id' => Yii::t('app', 'Ид заказа'),
            'operation' => Yii::t('app', 'Операция'),
            'count' => Yii::t('app', 'Сумма'),
            'it_was' => Yii::t('app', 'Было'),
            'became' => Yii::t('app', 'Стало'),
            'type' => Yii::t('app', 'Тип'),
            'date_operation' => Yii::t('app', 'Дата операции'),
        ];
    }
    
    public function getCurrentBalansTest($user_id)
    {
        $findDate = (time() - 86400);
        $allTranzactions = UserBonusStats::find()->select('became as available')->where(['<', 'date_operation', $findDate])->andWhere(['user_id' => $user_id])->orderBy(['id' => SORT_DESC])->asArray()->one();
        return (int)$allTranzactions['available'];
    }
    
    public function getCurrentBalans($user_id)
    {
        $findDate = (time() - 86400);
        $user = User::find()->where(['id' => $user_id])->one();
        
        if($user['bonus_balans'] == 0){
            return 0;
        } else {
            $allTranzactionsAfter = UserBonusStats::find()->where(['>', 'date_operation', $findDate])->andWhere(['user_id' => $user_id])->asArray()->all();
            if($allTranzactionsAfter){
                foreach($allTranzactionsAfter as $after_tranz){
                    if($after_tranz['operation'] == 'plus'){
                        $user['bonus_balans'] = ($user['bonus_balans'] - $after_tranz['count']);
                    }
                }
                return (int)$user['bonus_balans'];
            } else {
                return (int)$user['bonus_balans'];
            }
        }
        
    }
    
    public function getCurrentBalansNewS($user_id)
    {
        $findDate = (time() - 86400);
        $user = User::find()->where(['id' => $user_id])->one();
        $allTranzactions = UserBonusStats::find()->select('became as available')->where(['<', 'date_operation', $findDate])->andWhere(['user_id' => $user_id])->orderBy(['id' => SORT_DESC])->asArray()->one();    
        
        if($user['bonus_balans'] >= $allTranzactions['available']){
            return (int)$allTranzactions['available'];
        } else {
            $allTranzactionsAfter = UserBonusStats::find()->where(['>', 'date_operation', $findDate])->andWhere(['user_id' => $user_id])->orderBy(['id' => SORT_DESC])->asArray()->one();
            if($allTranzactionsAfter){
                foreach($allTranzactionsAfter as $after_tranz){
                    if($after_tranz['operation'] == 'plus'){
                        $allTranzactions['available'] = $allTranzactions['available'] + $after_tranz['count'];
                    }else{
                        $allTranzactions['available'] = $allTranzactions['available'] - $after_tranz['count'];
                    }
                    return (int)$allTranzactions['available'];
                }
            } else {
                return 0;
            }
            
        }
        
    }
}
