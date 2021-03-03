<?php

namespace frontend\controllers;

use common\components\LangRequest;
use common\models\Lang;
use common\models\UserSettings;
use Yii;
use yii\base\Model;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use common\components\SeoComponent;
use common\models\Pages;
use common\models\Lots;
use yii\helpers\Url;
use common\models\MainSlider;
use common\models\MainSlider2;
use common\models\CatalogProducts;
use common\models\CatalogCategories;
use yii\data\Pagination;
use common\models\SpecialStikers;
use common\models\Streets;


class ContentController extends \common\components\BaseController
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout','refresh', 'signup', 'static', 'contacts','login','reset','logup','catalog','catalog-page','delivery','contacts','common'],
                'rules' => [
                    [
                        'actions' => ['signup','logup'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],

                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['static', 'contacts','reset','login','catalog','catalog-page','delivery','refresh','common'],
                        'allow' => true,
                        'roles' => ['@', '?'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                    'index' => ['get'],
                    'catalog'   => ['post'],
                    'catalog-page' => ['post'],
                    'delivery'      => ['get'],
                    'refresh'       => ['get'],
					'common'       => ['get']

                ],
            ],

        ];
    }
    public function beforeAction($action)
    {
        if (in_array($action->id, ['catalog','catalog-page'])) {
            $this->enableCsrfValidation = false;
        }
        return parent::beforeAction($action);
    }
    public function actionIndex()
    {
        // может быть задана категория для главного экрана
        $category_id = Yii::$app->getRequest()->getQueryParam('cid');
        if (empty($category_id)) {
            $category_id = 0;
        }
        // $products=orderBy('sort ASC')->limit(3)->all();
        $settings = \common\models\UserSettings::find()->where(['id'=>1])->limit(1)->one();
        $query = CatalogProducts::find()->joinWith('info','params');

        $query = $query->where(['hidden' => 0]);


        if ($category_id > 0) {
            $query = $query->andWhere(['category_id' => $category_id]);
        }

        $query_count = $query->count();
        $pages = new Pagination(['totalCount' =>$query_count , 'pageSize' => $settings->page_main]);
        $products = $query->offset($pages->offset)->limit($pages->limit)->orderBy('sort asc');

        $products = $products->where(['not in','category_id', array(5,6,7,10,11)])->andWhere(['hidden' => 0])->all();



        $categories=CatalogCategories::find()->active()->joinWith('info')->orderBy('sort DESC')->all();
        $slides=MainSlider::find()->joinWith('info')->orderBy('sort DESC')->all();
        $slides2=MainSlider2::find()->joinWith('info')->orderBy('sort DESC')->all();

        // клиент всегда прав
//        $firstSlide = array_pop($slides);
//        array_unshift($slides, $firstSlide);



        SeoComponent::setByTemplate('default', [
            'name' => Yii::$app->view->params['main'],
        ], [
            'og_image' => 'https://3piroga.ua/img/header/logo-soc.png',
            'og_type' => 'page'
        ]);

		$stikers = SpecialStikers::find()->joinWith('info')->orderBy('sort DESC')->all();
        return $this->render('index.twig', [
            'products'  =>  $products,
            'categories'    => $categories,
            'slides'        =>  $slides,
            'slides2'        =>  $slides2,
            'pages'         => $pages,
			'stikers'         => $stikers,
            'active_category' => $category_id
        ]);
    }

    public function actionCatalog()
    {
        $settings = \common\models\UserSettings::find()->where(['id'=>1])->limit(1)->one();
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request=Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException();
        }
        $post = $request->post();
        $category = ($post['id']!=0) ? CatalogCategories::find()->byId($post['id'])->limit(1)->one() : null;

        $query = (!is_null($category)) ? CatalogProducts::find()->where(['hidden' => 0])->andWhere(['category_id'=>$category->id])
            :
            CatalogProducts::find()->where(['hidden' => 0]);

        $query_count=$query->count();
        $pages = new Pagination(['totalCount' =>$query_count , 'pageSize' => $settings->page_main]);
        $products=$query->offset($pages->offset)->limit($pages->limit)->orderBy('sort asc')->all();
        /*$products = (!is_null($category)) ? CatalogProducts::find()->where(['category_id'=>$category->id])
            ->limit(3)->all()
        :
            CatalogProducts::find()->limit(3)->all();*/
        //$this->view->registerJs('/js/main.js');
        //$this->layout='main_added.twig';

		$stikers = SpecialStikers::find()->joinWith('info')->orderBy('sort DESC')->all();
            return $this->renderAjax('product.twig',[
                'products' =>  $products,
                'pages' => $pages,
                'id'    => $post['id'],
				'stikers' => $stikers
            ]);

    }

    public function actionCatalogPage()
    {
        $settings = \common\models\UserSettings::find()->where(['id'=>1])->limit(1)->one();
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request=Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException();
        }
        $post = $request->post();
        $category = ($post['id']!=0) ? CatalogCategories::find()->byId($post['id'])->limit(1)->one() : null;

        $query = (!is_null($category)) ? CatalogProducts::find()->where(['hidden' => 0])->andWhere(['category_id'=>$category->id])
            :
            CatalogProducts::find()->where(['hidden' => 0]);

        $query_count=$query->count();
        $pages = new Pagination(['totalCount' =>$query_count , 'pageSize' => $settings->page_main]);
        $products=$query->offset($pages->offset)->limit($pages->limit)->orderBy('sort asc')->all();
        /*$products = (!is_null($category)) ? CatalogProducts::find()->where(['category_id'=>$category->id])
            ->limit(3)->all()
        :
            CatalogProducts::find()->limit(3)->all();*/
        $this->layout='main_added.twig';


        return $this->renderAjax('product.twig',[
            'products' =>  $products,
            'pages' => $pages,
            'id'    => $post['id'],
        ]);

    }

    public function actionStreets()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request=Yii::$app->request;
        if(!$request->isAjax)
        {
            throw new BadRequestHttpException();
        }

        $get = $request->get();
        $client_lang = Lang::getCurrent()->local;

        $street_column = ($client_lang === 'ua') ? 'street_name' : (($client_lang === 'ru') ? 'street_name_ru' : 'street_name_en');
        $streets = Streets::find()->select("$street_column as street_name")->where(['like', "LOWER($street_column)", mb_strtolower($get['query'])])->limit(15);
        $res = $streets->asArray()->all();

        return $res;
    }



    public function actionStatic($alias)
    {

        $page=Pages::find()->byAlias($alias)->joinWith('info')->limit(1)->one();

        SeoComponent::setByTemplate('static_page', [
            'name' => $page->info->title,
        ], [
            'og_image' => 'https://3piroga.ua/img/header/logo-soc.png',
            'og_type' => 'page'
        ]);
        return $this->render('static.twig', [
            'page' => $page,
        ]);
    }

    public function actionDelivery()
    {
        $page=Pages::find()->byAlias('delivery')->joinWith('info')->limit(1)->one();
        $delivery_cost = \common\models\UserSettings::find()->byId(1)->limit(1)->one();

        SeoComponent::setByTemplate('static_page', [
            'name' => $page->info->title,
        ], [
            'og_image' => 'https://3piroga.ua/img/header/logo-soc.png',
            'og_type' => 'page'
        ]);

        return $this->render('delivery.twig', [
            'delivery_cost' => [
                'price' => [
                    'kiev' => 50,
                    'bucha'  => 100,
                ]
            ],
			'page' => $page,
        ]);
    }

    public function actionContacts()
    {

        $page=Pages::find()->byAlias('contacts')->joinWith('info')->limit(1)->one();
        $delivery_cost = \common\models\UserSettings::find()->byId(1)->limit(1)->one();

        SeoComponent::setByTemplate('static_page', [
            'name' => $page->info->title,
        ], [
            'og_image' => 'https://3piroga.ua/img/header/logo-soc.png',
            'og_type' => 'page'
        ]);

        return $this->render('contact.twig', [
            'delivery_cost' => $delivery_cost,
			'page' => $page,
        ]);
    }

    public function actionLogin()
    {
        SeoComponent::setByTemplate('static_page', [
            'name' => Yii::$app->view->params['login'],
        ]);
        if (!Yii::$app->user->isGuest)
        {
            return $this->redirect( Url::toRoute('/user/index'),301);
        }
        return $this->render('signin.twig');
    }

	public function actionCommon()
	{
		 $all = \common\models\CatalogParams::find()->all();
	}

    public function actionReset()
    {
        SeoComponent::setByTemplate('static_page', [
            'name' => Yii::$app->view->params['reset'],
        ]);
        if (!Yii::$app->user->isGuest)
        {
            return $this->redirect( Url::toRoute('/user/index'),301);
        }
        return $this->render('reset.twig');
    }
    public function actionRefresh($reset)
    {
        SeoComponent::setByTemplate('static_page', [
            'name' => Yii::$app->view->params['reset'],
        ]);

        if (!Yii::$app->user->isGuest)
        {
            return $this->redirect( Url::toRoute('/user/index'),301);
        }
        return $this->render('refresh.twig',['reset'=>$reset]);
    }


    public function actionLogup()
    {
        SeoComponent::setByTemplate('static_page', [
            'name' => Yii::$app->view->params['registration'],
        ]);
        return $this->render('logup.twig');
    }

}
