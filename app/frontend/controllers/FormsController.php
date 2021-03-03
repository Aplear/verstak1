<?php

namespace frontend\controllers;

use Yii;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\Feedbacks;
use common\models\Callback;

class FormsController extends \common\components\BaseController
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'actions'   => ['callback','feedback','mail',
                            'index',
                        ],
                        'allow'     => true,
                        'roles'     => ['@', '?'],
                    ],
                ],
            ],
            'verbs' => [
                'class'     => VerbFilter::className(),
                'actions'   => [
                    'feedback'         => ['post'],
                    'callback'         => ['post'],
                    'mail'             => ['post'],
                ],
            ],
        ];
    }

    public function beforeAction($action)
    {
        if (in_array($action->id, ['callback','feedback','mail'])) {
            $this->enableCsrfValidation = false;
        }
        return parent::beforeAction($action);
    }

    public function actionCallback()
    {
        $request = Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException("Wrong request", 400);
        }
        $post                   = $request->post();
        $model                  = new Callback();
        $model->name            = isset($post['name']) ? strip_tags($post['name']) : '';
        $model->phone           = isset($post['phone']) ? strip_tags($post['phone']) : '';
        $model->user_id         = Yii::$app->user->isGuest ? -1 : Yii::$app->user->identity->id;
        $model->creation_time   = date('U');
        if($model->save())
        {

            $headers  = "Content-type: text/html; charset=UTF-8 \r\n";
            $headers .= "From:3piroga.ua \r\n";
            $message = 'Обратный звонок на 3piroga.ua<br>';

            $message .= 'Имя клиента: '.$model->name.'<br>';
            $message .= 'Телефон: '.$model->phone.'<br>';


            $maill=mail('info@3piroga.ua','Обратный звонок на 3piroga.ua',$message, $headers);


            return true;
        } else {
            foreach ($model->errors as $error)
            {
                return $error[0];
            }
        }
    }
    public function actionMail()
    {
        $request = Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException("Wrong request", 400);
        }
        $post                   = $request->post();
        $model                  = new \common\models\MailMessage();
        $model->email            = isset($post['email']) ? strip_tags($post['email']) : '';
        $model->comment           = isset($post['text']) ? strip_tags($post['text']) : '';
        $model->creation_time   = date('U');
        if($model->save())
        {
			
			$headers  = "Content-type: text/html; charset=UTF-8 \r\n";
            $headers .= "From:3piroga.ua \r\n";
            $message = 'Сообщение со страницы контактов на 3piroga.ua<br>';

            $message .= 'Email: '.$model->email.'<br>';
            $message .= 'Сообщение: '.$model->comment.'<br>';


            $maill=mail('info@3piroga.ua, aas78@ukr.net','Сообщение со страницы контактов на 3piroga.ua',$message, $headers);
            
			
			return true;
        } else {
            foreach ($model->errors as $error)
            {
                return $error[0];
            }
        }
    }


    public function actionFeedback()
    {
        // var_dump(1);die();
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request = Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException("Wrong request", 400);
        }
        $post                   = $request->post();        
        $model                  = new Feedbacks();
        $model->name            = isset($post['name']) ? strip_tags($post['name']) : '';
        $model->product_id            = isset($post['product_id']) ? strip_tags($post['product_id']) : 0;
        $model->email            = isset($post['email']) ? strip_tags($post['email']) : '';
        $model->mark            = isset($post['mark']) ? strip_tags($post['mark']) : '';
        $model->text            = isset($post['text']) ? strip_tags($post['text']) : '';
        $model->creation_time   = date('U');
        if($model->save())
        {
            $headers  = "Content-type: text/html; charset=UTF-8 \r\n";
            $headers .= "From:info@3piroga.ua";
            $message = 'У вас новый отзыв на 3piroga.ua<br>';

            $message .= 'Имя: '.  $model->name  . '.<br>';
            $message .= 'Оценка: '.$model->mark.'<br>';
            $message .= 'Email '.$model->email. '<br>';
            $maill=mail('info@3piroga.ua','У вас новый отзыв на 3piroga.ua',$message, $headers);

            return ['status' => true, 'answer' => $this->view->params['success_feedback']];
        }
        else {
            foreach ($model->errors as $error)
            {
                return $error[0];
            }
        }
    }


}