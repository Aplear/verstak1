<?php

namespace frontend\controllers;

use common\components\SeoComponent;
use Yii;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\NotFoundHttpException;
use common\models\Discounts;

class DiscountController extends \common\components\BaseController
{
	/**
	 * @inheritdoc
	 */
	public function behaviors()
	{
		return [
			'access' => [
				'class' => AccessControl::className(),
				'only' => ['index','view'],
				'rules' => [

					[
						'actions' => ['index', 'view'],
						'allow' => true,
						'roles' => ['@', '?'],
					],
				],
			],
			'verbs' => [
				'class' => VerbFilter::className(),
				'actions' => [
					'view' => ['get'],
					'index' => ['get'],
				],
			],
		];
	}
	public function actionIndex()
	{

		$discounts = Discounts::find()->active()->joinWith('info')->all();
        SeoComponent::setByTemplate('default', [
            'name' => 'Акции',
        ], [
            'og_image' => 'https://3piroga.ua/img/header/logo-soc.png',
            'og_type' => 'page'
        ]);
		return $this->render('index.twig',[
			'discounts'=>$discounts
		]);
	}

	public function actionView($alias)
	{
		$discount=Discounts::find()->byAlias($alias)->active()->joinWith('info')->limit(1)->one();
		SeoComponent::setByTemplate('default', [
			'name' => $discount->info->title
		], [
            'og_image' => !is_null($discount->bimg) ? \Yii::$app->getRequest()->hostInfo.$discount->bimg : 'https://3piroga.ua/img/header/logo-soc.png',
            'og_type' => 'product'
        ]);

		return $this->render('view.twig', [
			'discount'=>$discount
		]);
	}

}
