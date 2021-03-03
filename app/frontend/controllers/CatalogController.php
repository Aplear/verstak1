<?php

namespace frontend\controllers;

use common\models\FeedbacksAnswer;
use Yii;
use yii\data\Pagination;
use yii\helpers\Url;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\NotFoundHttpException;
use common\components\SeoComponent;
use common\models\CatalogCategories;
use common\models\CatalogProducts;
use common\models\Feedbacks;
use common\models\SpecialStikers;
use yii\web\Request;

class CatalogController extends \common\components\BaseController
{

       public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
//                'only'  => ['index', 'category', 'category-by-type'],
                'rules' => [
                    [
                        'actions'   => ['index', 'category', 'product'],
                        'allow'     => true,
                        'roles'     => ['?', '@'],
                    ],
                ],
            ],
            'verbs' => [
                'class'     => VerbFilter::className(),
                'actions'   => [
                    'index'                     => ['get'],
                    'category'                  => ['get'],
                    'product'                   => ['get'],
                    'filter'                    => ['get']
                ],
            ],
        ];
    }
    public function beforeAction($action) {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }


    public function actionCategory ($alias)
    {
        $settings = \common\models\UserSettings::find()->where(['id'=>1])->limit(1)->one();
        if ($alias != null and $alias != 'category') {
            $category = CatalogCategories::find()->joinWith('info')
                ->byAlias($alias, CatalogCategories::tableName())
                ->active()
                ->limit(1)
                ->one();
            if(is_null($category))
            {
                throw new NotFoundHttpException('Not Found!', 404);
            }
        }
        $query = ( $alias != 'category') ? CatalogProducts::find()->where(['hidden' => 0])->andWhere(['category_id'=>$category->id])->joinWith('info','params')
            :CatalogProducts::find()->where(['hidden' => 0])->joinWith('info','params');

        $query_count=$query->count();
        $pages = new Pagination(['totalCount' =>$query_count , 'pageSize' => $settings->page_catalog]);
        if($pages->pageCount>1)
        {
            if(is_null(Yii::$app->request->get('page')))
            {
                $url = (empty($category)) ? Url::toRoute('/category/page/2') : $category->url.'/page/2';
                $this->view->registerLinkTag([
                    'rel' => 'next',
                    'href' => $url
                ]);
            }
            elseif (intval(Yii::$app->request->get('page'))<$pages->pageCount)
            {
                $num_page = intval(Yii::$app->request->get('page'));
                $url_prev = (empty($category)) ? Url::toRoute('/category/page/'.($num_page-1)) : $category->url.'/page/'.($num_page-1);
                $url_prev = ($num_page==2) ? str_replace('/page/1','',$url_prev) : $url_prev;
                $this->view->registerLinkTag([
                    'rel' => 'prev',
                    'href' => $url_prev
                ]);
                $url_next = (empty($category)) ? Url::toRoute('/category/page/'.($num_page+1)) : $category->url.'/page/'.($num_page+1);
                $this->view->registerLinkTag([
                    'rel' => 'next',
                    'href' => $url_next
                ]);
            }
            elseif (intval(Yii::$app->request->get('page'))==$pages->pageCount)
            {

                $num_page = intval(Yii::$app->request->get('page'));
                $url_prev = (empty($category)) ? Url::toRoute('/category/page/'.($num_page-1)) : $category->url.'/page/'.($num_page-1);
                $url_prev = ($num_page==2) ? str_replace('/page/1','',$url_prev) : $url_prev;
                $this->view->registerLinkTag([
                    'rel' => 'prev',
                    'href' => $url_prev
                ]);
            }


        }

        if(intval(Yii::$app->request->get('page'))>$pages->pageCount)
        {
            $url = (empty($category)) ? Url::toRoute('/category/page/'.$pages->pageCount) : $category->url.'/page/'.$pages->pageCount;
            return $this->redirect($url,301)->send();
        }
        $products=$query->offset($pages->offset)->limit($pages->limit)->orderBy('sort asc')->all();
        $categories = CatalogCategories::find()->active()->joinWith('info')->all();
        $feedbacks= Feedbacks::find()->where(['product_id' => $products->id])->one();

        SeoComponent::setByTemplate('category', [
            'name' => (empty($category->info->title)) ? 'Все меню' : $category->info->title ,
        ], [
        'og_image' => (!empty($category) && !is_null($category->imgPng)) ? \Yii::$app->getRequest()->hostInfo.$category->imgPng : 'https://3piroga.ua/img/header/logo-soc.png',
            'og_type' => 'category'
        ]);
        if (empty($products))
        {
            return $this->render('empty.twig');
        }
		$stikers = SpecialStikers::find()->joinWith('info')->orderBy('sort DESC')->all();
            return $this->render('category.twig', [
                'category'  => @$category,
                'products'      => $products,
                'pages'     => $pages,
                'categories'    => $categories,
				'stikers' => $stikers,
                'feedbacks' => $feedbacks

            ]);

    }

    public function actionProduct ($alias,$name_alt)
    {
        $category = CatalogCategories::find()
                ->byAlias($alias)
                ->active()
                ->limit(1)
                ->one();


        $product = CatalogProducts::find()
            ->where(['category_id'=>$category->id])
            ->byAlias($name_alt)
            ->joinWith('info','params')

            ->limit(1)
            ->one();

        $categories = CatalogCategories::find()->active()->joinWith('info')->all();

        SeoComponent::setByTemplate('product', [
            'name' => $product->info->title,
        ], [
            'og_image' => !is_null($product->bimg) ? \Yii::$app->getRequest()->hostInfo.$product->bimg : 'https://3piroga.ua/img/header/logo-soc.png',
            'og_type' => 'product'
        ]);

        if (empty($product))
        {
            throw new NotFoundHttpException();
        }
        $query = Feedbacks::find()->active()->andWhere(['product_id'=>$product->id]);
      //  $query_parent =  Feedbacks::find()->active()-where(['parent_id' => $product->id]);
        $query_count=$query->count();
        $pages = new Pagination(['totalCount' =>$query_count , 'pageSize' => 6]);
        $feedbacks=$query->offset($pages->offset)->limit($pages->limit)->orderBy('id')->all();
		$stikers = SpecialStikers::find()->joinWith('info')->orderBy('sort DESC')->all();
        $feedbacksAnswer = [];
        foreach ($feedbacks as $feed){
            $feedbacksAnswer[] = FeedbacksAnswer::find()->where(['parent_id' =>  $feed->id])->all();

        }
        return $this->render('product.twig', [
            'category'  => $category,
            'product'      => $product,
            'feedbacks_answer' => $feedbacksAnswer[0],

            //    'current_products'  => $current_products,
            'categories'    => $categories,
            'feedbacks' =>  $feedbacks,
            'pages' =>  $pages,
            'stikers' => $stikers,
            //   'query_parent' => $query_parent
        ]);

    }
}
