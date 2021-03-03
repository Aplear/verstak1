<?php
namespace frontend\controllers;

use yii\web\Controller;

class SocialController extends Controller
{

    public function behaviors()
    {
        return [
            [
                'formats' => [
                    'application/json' => \yii\web\Response::FORMAT_JSON,
                ],
            ]
        ];
    }


    // Регистрация
    public function index()
    {

      var_dump("PPC"); die();

    }
}
