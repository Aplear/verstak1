<?php

namespace frontend\controllers;
use Yii;


use common\models\CatalogCategories;
use common\models\CatalogProducts;
use common\models\Pages;
use common\models\News;
use common\models\Discounts;
use yii\helpers\Url;

class SitemapController extends \yii\web\Controller
{
    public function actionIndex()
    {
        $this->layout = 'main_added.twig';

        header('Content-type: text/xml');
        $response = Yii::$app->response;
        $response->format = \yii\web\Response::FORMAT_RAW;
        $response->headers->set('Content-Type', 'text/xml');
        $urls = [];
        $protocol = ($_SERVER['HTTPS']) ? "https://" : "http://";
//        $protocol = "http://";

        // Главная
        $urls[] = $protocol.$_SERVER['SERVER_NAME'];
		$urls[] = $protocol.$_SERVER['SERVER_NAME'].'/ru';
        $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/en';


        // Страницы сайта
        $pages = Pages::find()->all();

        foreach ($pages as $page){
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].$page->url;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/ru'.$page->url;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/en'.$page->url;
        }

        // Категории
        $categories = CatalogCategories::find()->active()->all();

        $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/category';
        $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/ru'.'/category';
        $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/en'.'/category';

        foreach ($categories as $category){
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].$category->url;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/ru'.$category->url;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/en'.$category->url;

        }

        // Товары
        $products = CatalogProducts::find()->all();

        foreach ($products as $product){
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].$product->url;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/ru'.$product->url;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/en'.$product->url;
        }

        // Скидки
        $discounts = Discounts::find()->active()->all();

        $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/discounts';
        $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/ru'.'/discounts';
        $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/en'.'/discounts';

        foreach ($discounts as $discount){
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].$discount->url;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/ru'.$discount->url;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'].'/en'.$discount->url;

        }


        // Акции
        $urls[] = $protocol.$_SERVER['SERVER_NAME'] . '/blog';
        $urls[] = $protocol.$_SERVER['SERVER_NAME'] . '/ru/blog';
        $urls[] = $protocol.$_SERVER['SERVER_NAME'] . '/en/blog';
        $news = News::find()->all();

        // Блог
        foreach ($news as $n){
            $urls[] = $protocol.$_SERVER['SERVER_NAME'] . '/blog/' . $n->alias;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'] . '/ru/blog/'. $n->alias;
            $urls[] = $protocol.$_SERVER['SERVER_NAME'] . '/en/blog/'. $n->alias;
        }

        $urls[] = $protocol.$_SERVER['SERVER_NAME'] . '/feedbacks';
        $urls[] = $protocol.$_SERVER['SERVER_NAME'] . '/ru/feedbacks';
        $urls[] = $protocol.$_SERVER['SERVER_NAME'] . '/en/feedbacks';

        $text = '';

        $text .= '<?xml version="1.0" encoding="UTF-8"?>';
        $text .= '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
        foreach ($urls as $url){
            $text .=  '<url>
                <loc>' .str_replace('http:','https:',$url) . '</loc>
                <changefreq>daily</changefreq>
                <priority>0.5</priority>
            </url>';
        }
        $text .=  '</urlset>';

        return $text;

    }




}
