<?php
namespace frontend\controllers;

use Yii;
use common\models\Certificates;
use common\helpers\CertificateHelper;

class ApiCertificateController extends \common\components\BaseController
{
    public $allowIp = ['127.0.0.1'];
    public $allowKey = ['QIXQxiWMZy8DUB0z'];

    public function beforeAction($action)
    {
        $key = Yii::$app->request->get('key');
        $ip = $_SERVER['REMOTE_ADDR'];

        if(!in_array($key, $this->allowKey)){
            $response = ['result' => 'error', 'msg' => 'Bad request'];
            exit(json_encode($response));
        }

        if(!in_array($ip, $this->allowIp)){
            //$response = ['result' => 'error', 'msg' => 'Bad request'];
            //exit(json_encode($response));
        }

        return parent::beforeAction($action);
    }

    public function actionCheck()
    {
        // get params
        $certNum = Yii::$app->request->get('certNum');

        // проверяем номер на корректность ввода
        if(!preg_match('/^[0-9]{16}$/', $certNum)){
            $response = ['result' => 'error', 'msg' => 'Incorrect number', 'data' => []];
            return json_encode($response);
        }

        // проверяем сертификат на существование
        $certificate = Certificates::find()->where(['code' => $certNum])->one();
        if(!$certificate){
            $response = ['result' => 'error', 'msg' => 'No such certificate', 'data' => []];
            return json_encode($response);
        }

        // проверяем сертификат на срок действия
        if(strtotime($certificate->expired_at) < time()){
            $response = ['result' => 'error', 'msg' => 'Certificate has expired', 'data' => []];
            return json_encode($response);
        }

        // проверяем сертификат на использование
        if(strtotime($certificate->used_at) > 0){
            $response = ['result' => 'error', 'msg' => 'Certificate has been used', 'data' => []];
            return json_encode($response);
        }

        // если все ок
        $response = ['result' => 'success', 'msg' => 'Certificate is valid', 'data' => $certificate->toArray()];
        return json_encode($response);
    }

    public function actionAdd()
    {
        // get params
        $certNum = Yii::$app->request->get('certNum');
        $certNominal = Yii::$app->request->get('certNominal');

        // проверяем номер на корректность
        if(!preg_match('/^[0-9]{16}$/', $certNum)){
            $response = ['result' => 'error', 'msg' => 'Incorrect number', 'data' => []];
            return json_encode($response);
        }

        // проверяем номинал на корректность
        if(!in_array($certNominal, [500, 1000, 2000, 3000])){
            $response = ['result' => 'error', 'msg' => 'Incorrect nominal', 'data' => []];
            return json_encode($response);
        }

        // проверяем сертификат на существование
        $certificate = Certificates::find()->where(['code' => $certNum])->one();
        if($certificate){
            $response = ['result' => 'error', 'msg' => 'Certificate already exists', 'data' => []];
            return json_encode($response);
        }

        // добавляем сертификат
        $certificate = new Certificates();
        $certificate->code = $certNum;
        $certificate->nominal = $certNominal;
        $certificate->created_at = date('Y-m-d');
        $certificate->purchased_at = date('Y-m-d');
        $certificate->expired_at = date('Y-m-d', strtotime('+6month'));
        $certificate->used_at = '0000-00-00';

        // если все ок
        if($certificate->save()){
            $response = ['result' => 'success', 'msg' => 'Certificate added', 'data' => $certificate->toArray()];
            return json_encode($response);
        } else {
            $response = ['result' => 'error', 'msg' => 'Somthing wrong', 'data' => []];
            return json_encode($response);
        }
    }

    public function actionMarkUsed()
    {
        // get params
        $certNum = Yii::$app->request->get('certNum');

        // проверяем номер на корректность
        if(!preg_match('/^[0-9]{16}$/', $certNum)){
            $response = ['result' => 'error', 'msg' => 'Incorrect number', 'data' => []];
            return json_encode($response);
        }

        // проверяем сертификат на существование
        $certificate = Certificates::find()->where(['code' => $certNum])->one();
        if(!$certificate){
            $response = ['result' => 'error', 'msg' => 'No such certificate', 'data' => []];
            return json_encode($response);
        }

        // помечаем сертификат как использованный
        $certificate->used_at = date('Y-m-d');

        // если все ок
        if($certificate->save()){
            $response = ['result' => 'success', 'msg' => 'Certificate marked as used', 'data' => $certificate->toArray()];
            return json_encode($response);
        } else {
            $response = ['result' => 'error', 'msg' => 'Somthing wrong', 'data' => []];
            return json_encode($response);
        }
    }
}