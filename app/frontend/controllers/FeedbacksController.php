<?php

namespace frontend\controllers;

use common\components\SeoComponent;
use common\models\FeedbacksAnswer;
use Yii;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\NotFoundHttpException;
use common\models\Feedbacks;
use yii\data\Pagination;

class FeedbacksController extends \common\components\BaseController
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['index'],
                'rules' => [

                    [
                        'actions' => ['index'],
                        'allow' => true,
                        'roles' => ['@', '?'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'index' => ['get'],
                ],
            ],
        ];
    }
    public function actionIndex()
    {
        $request = Yii::$app->request;
        if($request->isAjax){
            $this->layout = false;
        }
        $query = Feedbacks::find()->where(['product_id' => 0])->active();
        $query_count=$query->count();
        $pages = new Pagination(['totalCount' =>$query_count , 'pageSize' => 6]);
        $feedbacks=$query->offset($pages->offset)->limit($pages->limit)->orderBy('id desc')->asArray()->all();
        $feedbacksAnswer = [];
        $marks = [];
        foreach ($feedbacks as $feed){
            $feedbacksAnswer[] = FeedbacksAnswer::find()->where(['parent_id' =>  $feed['id']])->orderBy('id desc')->all();
            $marks[] = $feed['mark'];
        }

        SeoComponent::setByTemplate('blog', [
            'name' => '',
        ], [
            'og_image' => 'https://3piroga.ua/img/header/logo-soc.png',
            'og_type' => 'page'
        ]);

        return $this->render('index.twig',[
            'feedbacks' =>  $feedbacks,
            'feedbacks_answer' => $feedbacksAnswer,
            'pages' =>  $pages,
            'marks' => $marks,
        ]);
    }



}