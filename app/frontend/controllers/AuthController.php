<?php

namespace frontend\controllers;

use Yii;
use yii\helpers\Url;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\BadRequestHttpException;
use common\models\User;
use common\models\SignupForm;
use common\models\LoginForm;
use common\components\SeoComponent;
use common\models\UserBonusStats;
use common\models\UserSettings;
use common\helpers\Bonuses;
/*use common\models\User;*/

class AuthController extends \common\components\BaseController
{
    public function beforeAction($action) {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
//                'only' => ['logout', 'login', 'sign-up', 'sign-in'],
                'rules' => [
                    [
                        'actions' => ['login', 'sign-up', 'sign-in','registration','sign-double','reset','reset-password'],
                        'allow' => true,
                        'roles' => ['?','@'],
                    ],
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'login'     => ['get'],
                    'logout'    => ['get'],
                    'sign-in'   => ['post'],
                    'sign-up'   => ['post'],
                    'registration'   => ['post','get'],
                    'reset'     => ['post'],
                    'reset-password'    => ['post'],
                ],
            ],
        ];
    }
    
    /**
     * Shows user signin/signup page
     *
     * @return mixed
     */
    public function actionLogin()
    {
		//var_dump(1);die();
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        
        return $this->render('signin.twig', []);
    }
    
    public function actionSignIn()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        //var_dump(1);die();
        $request = Yii::$app->request;
        $model = new LoginForm;


        $post=
        [
            'email'=>$request->post()['email'],
            'password'=>$request->post()['password'],
            'active'=>\common\models\User::findOne(['email'=>$request->post()['email']])->active,
        ];
       // var_dump($post);die();
        $model->setAttributes($post);
        if ($model->login()) {

           
           $lang = '';
           if(strstr(Yii::$app->request->referrer, '/ru')){
                $lang = '/ru';
           }elseif(strstr(Yii::$app->request->referrer, '/en')){
                $lang = '/en';
           }
           if(strstr(Yii::$app->request->referrer, 'backet')){
                return ['answer'=>'success','url'=>Url::to($lang.'/backet')];//Url::to($lang.'user/index')
           }else{
                return ['answer'=>'success','url'=>Url::to($lang.'/user/index')];//Url::to($lang.'user/index')
           }
           
        } else {
            foreach ($model->errors as $error)
            {
                return $error[0];
            }


        }
    }


    public function actionSignUp()
    {


        $request = Yii::$app->request;

        $model = new SignupForm();

		$model->setAttributes($request->post(),false);
		$post = $request->post();
        if($post['password']!=$post['password_repick'])
        {
            return 'Пароли не совпадают';
        }

        if ($model->validate()) {

            $user = $model->signup();
            
            Bonuses::addRegisterBonus($user->id);
 
            if (!is_null($user)) {
                    $headers  = "Content-type: text/html; charset=UTF-8 \r\n";
                    $headers .= "From:3piroga.ua \r\n";
                    mail($request->post()['email'],'Регистрация на 3piroga.ua','Для активации профиля скопируйте ссылку в браузер и перейдите по ней: '.$_SERVER['SERVER_NAME'].'/auth/'.$user->getAuthKey(), $headers);
                    mail('info@3piroga.ua','Регистрация на 3piroga.ua','У вас появился новый пользователь '.$request->post()['username'], $headers);
                    return 'success';
            }

        }
        else
        {
         //   print_r ($model->errors);die();
            foreach ($model->errors as $error)
            {
                return $error[0];
            }

        }
    }



    public function actionRegistration($key)
    {
        //  var_dump(111);die();
       // var_dump($auth_key);die();

            $current_user=\common\models\User::findOne(['auth_key'=>$key]);
            $current_user->active =1;
            $current_user->status =10;
            //var_dump($current_user);die();
            
            
            if( $current_user->save(false)) {
                
                $cookies = Yii::$app->response->cookies;
                $cookies->add(new \yii\web\Cookie([
                    'name' => 'bonus_reg',
                    'value' => 'y',
                ]));

                return $this->redirect(Url::to('/login'));
        }




    }

    public function actionReset()
    {
        //var_dump(1);die();
        $request = Yii::$app->request;
        $current_user=\common\models\User::findOne(['email'=>$request->post()['email']]);
        if(empty($current_user))
        {
            return $this->view->params['reset_error'];
        }
        $current_user->generatePasswordResetToken();
        if($current_user->save()) {
            $headers = "Content-type: text/html; charset=UTF-8 \r\n";
            $headers .= "From:3piroga.ua \r\n";
            if (mail($request->post()['email'], 'Восстановление пароля на 3piroga.ua', 'Перейдите по ссылке для восстановления пароля 3piroga.com.ua/reset/' . strtolower($current_user->password_reset_token), $headers)) {
                return $this->view->params['in_email'];
            } else {
                return false;
            }
        }

    }
    public function actionResetPassword()
    {
        //var_dump(1);die();
        $request = Yii::$app->request;
        $current_user=\common\models\User::findOne(['password_reset_token'=>$request->post()['crfs']]);
        if(strlen($request->post()['password'])<6)
        {
            return $this->view->params['too_slow_password'];
        }
        $current_user->setPassword($request->post()['password']);
        $current_user->removePasswordResetToken();
        if($current_user->save())
        {
                return $this->view->params['success_change_password'];
        }
        else
        {
            return false;
        }
    }
    /**
     * Logs out the current user.
     *
     * @return mixed
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();
        return $this->redirect(Url::home());
    }
}