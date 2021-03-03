<?php
namespace frontend\controllers;

use common\models\Auth;
use common\models\User;
use yii\web\Controller;

class SocController extends Controller
{

    public function actions()
    {
        return [
            'auth' => [
                'class' => 'yii\authclient\AuthAction',
                'successCallback' => [$this, 'onAuthSuccess'],
            ],
        ];
    }

    // Регистрация
    public function onAuthSuccess($client)
    {
        $attributes = $client->getUserAttributes();

        $clien_id = $client->getId();

        $auth = Auth::find()->where([
            'source' => $clien_id,
            'source_id' => $attributes['id'],
        ])->one();

        if (\Yii::$app->user->isGuest) {
            if ($auth) { // авторизация
                $user = $auth->user;
                \Yii::$app->user->login($user);
                $this->redirect('/user/index');
            } else {
                if (isset($attributes['email']) && User::find()->where(['email' => $attributes['email']])->exists()) {
                    $user = User::find()->where(['email' => $attributes['email']])->one();
                    $transaction = $user->getDb()->beginTransaction();
                    $auth = new Auth();
                    $auth->user_id = $user->id;
                    $auth->source = (string)$clien_id;
                    $auth->source_id = (string)$attributes['id'];
                    if ($auth->save()) {
                        $transaction->commit();
                        \Yii::$app->user->login($user);
                    }
                } else {

                    $password = \Yii::$app->security->generateRandomString(6);

                    $name = explode(' ', $attributes['name']);
                    $email = $attributes['email'];
                    $user = new User([
                        'username' => $name[0],
                        'lastname' => $name[1],
                        'email' => $email,
                        'password' => $password,
                    ]);

                    $user->generateAuthKey();
                    $user->generatePasswordResetToken();
                    $user->active = true;

                    $transaction = $user->getDb()->beginTransaction();
                    if ($user->save()) {
                        $auth = new Auth();
                        $auth->user_id = $user->id;
                        $auth->source = (string)$clien_id;
                        $auth->source_id = (string)$attributes['id'];
                        if ($auth->save()) {
                            $transaction->commit();
                            \Yii::$app->user->login($user);
                        }
                    }


                }
            }
        }
        $this->redirect('/user/index');
    }
}
