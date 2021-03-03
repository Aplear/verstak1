<?php

namespace frontend\controllers;

use Symfony\Component\Console\Question\Question;
use Twig\Node\Expression\Binary\AddBinary;
use Yii;
use yii\helpers\Url;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\components\SeoComponent;
use common\models\Lots;
use common\models\User;
use yii\imagine\Image;
use common\models\Payment;
use common\models\AddressDelivery;
use common\models\UserBonusStats;
use common\models\UserSettings;
use common\models\Orders;


class UserController extends \common\components\BaseController
{
    
    public function behaviors()
    {
        return [
            'access' => [
                'class'     => AccessControl::className(),
//                'only'      => ['index'],
                'rules'     => [
                    [
                        'actions'   => ['index', 'settings', 'change-settings','payment-static','lot',
                            'change-password','add-address','delete-address','change-address','orders','question',
                            'save-question', 'bonus', 'rules'
                        ],
                        'allow'     => true,
                        'roles'     => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'save-question'         => ['post'],
                    'index'                 => ['get'],
                    'settings'              => ['get'],
                    'change-settings'       => ['post'],
                    'change-password'       => ['post'],
                    'add-address'           => ['post'],
                    'delete-address'        => ['post'],
                    'change-address'        => ['post'],
                    'orders'                => ['get'],
                    'question'                => ['get'],

                ],
            ],
        ];
    }

    public function beforeAction($action) {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }
    
    public function actionIndex()
    {
        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);
        Yii::$app->cache->flush();

        $cookies = Yii::$app->request->cookies;
        $bonus_reg = 0;
        if (($cookie = $cookies->get('bonus_reg')) !== null) {
            $bonus_reg = 1;
            $cookies2 = Yii::$app->response->cookies;
            $cookies2->remove('bonus_reg');
            //unset($cookies['bonus_reg']);
        }

        SeoComponent::setByTemplate('user', [
            'name' => Yii::$app->params->view['profile'],
        ]);
                return $this->render('old_index.twig', ['bonus_reg' => $bonus_reg]);
    }
    
    public function actionBonus()
    {
        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);

        $settings = UserSettings::find()->where(['id' => '1'])->asArray()->one();
        SeoComponent::setByTemplate('user', [
            'name' => Yii::$app->params->view['bonus'],
        ]);
        $availableBonuses = UserBonusStats::getCurrentBalans(Yii::$app->user->identity->id);
        $settings_desc = stripslashes($settings['bonus_text_'.Yii::$app->language]);
        $stats = UserBonusStats::find()->where(['user_id' => Yii::$app->user->identity->id])->andWhere(['<', 'date_operation', (time() - 86400)])->orderBy(['id' => SORT_DESC])->asArray()->All();
        return $this->render('bonus.twig', ['settings' => $settings, 'settings_desc' => $settings_desc, 'availableBonuses' => $availableBonuses, 'stats' => $stats]);
    }
    
    public function actionRules()
    {
        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);

        
        SeoComponent::setByTemplate('user', [
            'name' => Yii::$app->params->view['rules'],
        ]);
        $backet = Orders::getCartInfo();
        
        $settings = UserSettings::find()->where(['id' => '1'])->asArray()->one();
        $settings_desc = stripslashes($settings['bonus_text_'.Yii::$app->language]);
        //print_r($backet); exit();
        return $this->render('rules.twig', ['settings' => $settings, 'settings_desc' => $settings_desc, 'backet' => $backet]);
    }
    
    public function actionChangeSettings()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request=Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException();
        }
        $post = $request->post();

            $current_user = User::findIdentity(Yii::$app->user->identity->id);
            $current_user->username=trim(strip_tags($post['username']));
            $current_user->lastname=trim(strip_tags($post['lastname']));
            $current_user->patronymic=trim(strip_tags($post['patronymic']));
            $current_user->email=trim(strip_tags($post['email']));
            $current_user->phone=trim(strip_tags($post['phone']));
            $current_user->facebook=trim(strip_tags($post['facebook']));
            $current_user->vk=trim(strip_tags($post['vk']));
            $current_user->date_birthday=strtotime(trim(strip_tags($post['date_birthday'])));

            if( $current_user->update())
            {
                         return ['status' => true, 'answer' => $this->view->params['success_change_data']];
            }
            return ['status' => false];


    }
    public function actionChangePassword()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request=Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException();
        }
        $post = $request->post();
        if(empty($post['password']) or is_null($post['password']))
        {
            return ['status' => false];
        }
        $current_user = User::findIdentity(Yii::$app->user->identity->id);
        $current_user->setPassword($post['password']);

        if( $current_user->update())
        {
            return ['status' => true, 'answer' => $this->view->params['success_change_data']];
        }
        return ['status' => false];


    }
    public function actionAddAddress()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request=Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException();
        }
        $post = $request->post();
        $address = new AddressDelivery();
        $address->user_id = Yii::$app->user->identity->id;
        $address->address = $post['address'];
        $this->layout='main_added.twig';
        if( $address->save())
        {


            return $this->renderAjax('added.twig',['address' => $address]);
        }
        return ['status' => false];


    }
    public function actionChangeAddress()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request=Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException();
        }
        $post = $request->post();
        $address =  AddressDelivery::find()->where(['id'=>$post['id']])->limit(1)->one();

        $address->address = $post['address'];

        if( $address->update())
        {
            return 'success';
        }
        return ['status' => false];


    }
    public function actionDeleteAddress()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request=Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException();
        }
        $post = $request->post();
        $address = AddressDelivery::find()->where(['id'=>$post['id']])->limit(1)->one();

        if( $address->delete())
        {

            return 'success';
        }
        return ['status' => false];


    }

    public function actionOrders()
    {
        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);
        SeoComponent::setByTemplate('user', [
            'name' => Yii::$app->params->view['user_orders'],
        ]);
        $orders = Yii::$app->user->identity->orders;
      /*      foreach ($orders as $order)
            {
                foreach ($order->items as $item)
                {
                 //   var_dump($item->param->id);die();
                }
            }*/
        return $this->render('orders.twig',[
            'orders'        => $orders,
            'count_orders'  => count($orders),
        ]);
    }
    public function actionQuestion()
    {
        Yii::$app->view->registerMetaTag([
            'name' => 'robots',
            'content' => 'NOINDEX,NOFOLLOW'
        ]);
        SeoComponent::setByTemplate('user', [
            'name' => Yii::$app->params->view['user_question'],
        ]);

        return $this->render('question.twig',[

        ]);
    }
    public function actionSaveQuestion()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $request=Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException();
        }
        $post = $request->post();
        $model = new \common\models\Question();
        $model->name            = isset($post['name']) ? strip_tags($post['name']) : '';
        $model->phone            = isset($post['phone']) ? strip_tags($post['phone']) : '';
        $model->question        =isset($post['comment']) ? strip_tags($post['comment']) : '';
        $model->user_id         = Yii::$app->user->identity->id;
        $model->creation_time   = date('U');
        if($model->save())
        {
            return true;
        }
        return ['status' => false];
    }
}