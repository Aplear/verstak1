<?php
	namespace common\helpers;
    
    use Yii;
    use common\models\UserSettings;
    use common\models\User;
    use common\models\UserBonusStats;
    
    class Bonuses
    {
        
        /*
    	* Добавляем бонусы за регистрацию
    	*/
    	public static function addRegisterBonus($userId) 
    	{
    		
            $settings = UserSettings::find()->select('bonus_register')->where(['id' => 1])->asArray()->one();
            if($settings['bonus_register'] > 0){
                
                $new_user = User::findOne($userId);
                $new_user->bonus_balans = $settings['bonus_register'];
                $new_user->update();
                
                $user_stats = new UserBonusStats();
                $user_stats->user_id = $userId;
                $user_stats->operation = 'plus';
                $user_stats->count = $settings['bonus_register'];
                $user_stats->it_was = 0;
                $user_stats->became = $settings['bonus_register'];
                $user_stats->type = 'register';
                $user_stats->date_operation = time();
                if($user_stats->validate()){
                    $user_stats->save(false);
                }
            }    
    
    		return true;
    	}
        
    }
    
    
?>