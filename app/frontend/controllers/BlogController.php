<?php
/**
 * Created by PhpStorm.
 * User: nikvils
 * Date: 23.05.19
 * Time: 10:17
 */

namespace frontend\controllers;


use common\components\SeoComponent;
use common\models\NewsCategory;
use common\models\NewsCategoryInfo;
use common\models\NewsInfo;
use common\models\NewsTag;
use common\models\NewsTagInfo;
use Yii;
use common\models\News;
use yii\data\Pagination;


class BlogController extends \common\components\BaseController
{



    public function actionIndex()
    {
        $request = Yii::$app->request;
        if($request->isAjax){
            $this->layout = false;
        }

//        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
//        $request=Yii::$app->request;
//        if(!$request->isAjax)
//        {
//            throw new BadRequestHttpException();
//        }
//        $post = $request->post();
//        if($post){
//
//            SeoComponent::setByTemplate('default', [
//                'name' => 'Блог',
//            ]);
//            $tags = (!$post['id'])  ?  NewsTagInfo::find()->where(['record_id' => $post['id']])->one() : null;
//
//            $news = (!is_null($tags)) ? News::find()->where(['like', 'tags_id', "%$tags%", false]) : News::find();
//            return $this->renderAjax('index.twig',[
//                'news' =>  $news,
//                'tags' => $tags,
//
//
//            ]);
//        }else{
        $query = News::find();
            $tags = NewsTag::find()->joinWith('info')->all();
        $query_count =  $query->count();
        $pages = new Pagination(['totalCount' =>$query_count , 'pageSize' => 9]);




        $news = $query->offset($pages->offset)->joinWith('info')->orderBy('creation_time desc')
            ->limit($pages->limit)
            ->all();

            return $this->render('index.twig',[
                'news' =>  $news,
                'tags' => $tags,
                'pages' => $pages,


            ]);

      //  }


    }


    public function actionView($alias)
    {

        $news = News::find()->byAlias($alias)->active()->joinWith('info')->limit(1)->one();

        $category = NewsCategory::find()->active()->where(['id' => $news->category_id])->one();
        @$info_cat = NewsCategoryInfo::find()->where(['record_id' => $category->id])->all();

        SeoComponent::setByTemplate('blog', [
            'name' => $news->info->title,
        ], [
            'og_image' => \Yii::$app->getRequest()->hostInfo."/images/news/".$news->id.".1.b.jpg",
            'og_type' => 'article'
        ]);

        return $this->render('view.twig', [
                        'news'=>$news,
            'category'=>$category,

        ]);
    }

}