<?php
namespace frontend\controllers;

use common\helpers\MailHelper;
use common\helpers\StocksHelperApiFacade;
use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\AccessControl;
use common\models\User;
use yii\web\Response;
use yii\base\Security;
use common\models\SignupForm;

use yii\filters\VerbFilter;
use common\models\Orders;
use common\models\OrdersItems;
use common\models\OrdersParams;
use common\models\UserSettings;
use common\models\UserBonusStats;
use common\helpers\Bonuses;
use common\models\CatalogProducts;
use common\models\Lang;
use common\models\CatalogProductsInfo;
use common\models\FeedbacksAnswer;
use common\models\CatalogParams;
use common\models\CatalogCategories;
use common\models\CatalogCategoriesInfo;
use common\models\CatalogValues;
use common\models\CatalogWeight;
use common\models\ProductConsistAssoc;
use common\models\ProductProductAssoc;
use common\models\CatalogConsistInfo;
use common\models\Feedbacks;
use common\models\News;
use common\helpers\StocksHelper;


use common\components\BaseController;
use common\components\SeoComponent;
use yii\helpers\Url;
use common\models\SpecialStikers;
use common\models\Stocks;
use common\components\XmlRpc\XmlRpc;

use yii\db\Query;

class ApiController extends Controller
{

    public function beforeAction($action)
    {
        if ($action->id == 'user-register') {
            Yii::$app->controller->enableCsrfValidation = false;
        }
        if ($action->id == 'add-order') {
            Yii::$app->controller->enableCsrfValidation = false;
        }
        if ($action->id == 'get-stocks') {
            Yii::$app->controller->enableCsrfValidation = false;
        }
        if ($action->id == 'add-feedback') {
            Yii::$app->controller->enableCsrfValidation = false;
        }

        return parent::beforeAction($action);
    }


    public function behaviors()
    {
        return [
                [
                    'class' => \yii\filters\ContentNegotiator::className(),
                    'only' => ['index', 'authorize', 'getorders', 'updatebonus', 'getbon', 'd2-api', 'user-register', 'user-profile-edit', 'get-product', 'get-category', 'get-lang', 'add-order', 'update-order', 'delete-order', 'get-stocks', 'get-order-params', 'validate-stoks', 'get-feedbacks', 'add-feedback', 'get-blogs', 'success-pay', 'get-user-bonus-stats'],
                    'formats' => [
                        'application/json' => \yii\web\Response::FORMAT_JSON,
                    ],
                ]
        ];
    }


    // Регистрация
    public function actionUserRegister($username, $email, $phone, $password)
    {

        $user               = new User();
        $user->username     = htmlspecialchars($username);
        $user->email        = htmlspecialchars($email);

        $user->phone        = htmlspecialchars($phone);
        $user->active       = 1;
        $user->status       = 10;
        $user->setPassword(htmlspecialchars($password));
        $user->generateAuthKey();

        if ($user->validate()) {

            $user = $user->save();

            $headers  = "Content-type: text/html; charset=UTF-8 \r\n";
            $headers .= "From: 3piroga.ua <info@3piroga.ua> \r\n";
            $message = '<strong>'.$username.', спасибо за регистрацию</strong><br />';
            $message .= 'Данные для авторизации на сайте:<br>';
            $message .= 'Email для авторизации: '.$email.'<br>';
            $message .= 'Пароль: '.$password.'<br>';

            mail(htmlspecialchars($email), 'Регистрация на сайте', $message, $headers);

            $user = User::find()->where(['email' => $email])->one();

            if($user->id){

                Bonuses::addRegisterBonus($user->id);
                return ['succes' => $user, 'code' => 200];

            }else{
                return ['error' => 'Some kind of mistake!', 'code' => '404'];
            }
        }else{
            return ['error' => $user->errors, 'code' => '404'];
        }

    }

    // Редактирование профиля
    public function actionUserProfileEdit($username=null, $astname=null, $patronymic=null, $email=null, $phone=null, $password=null, $auth_key, $date_birthday=null)
    {

        $request = Yii::$app->request;
        $post = $request->get();

        $current_user = User::find()->where(['auth_key' => $auth_key])->one();
        if($current_user){
            $dates = 0;
            if(!is_null($username))         $current_user->username=trim(strip_tags($post['username'])); $dates++;
            if(!is_null($lastname))         $current_user->lastname=trim(strip_tags($post['lastname'])); $dates++;
            if(!is_null($patronymic))       $current_user->patronymic=trim(strip_tags($post['patronymic'])); $dates++;
            if(!is_null($email))            $current_user->email=trim(strip_tags($post['email'])); $dates++;
            if(!is_null($phone))            $current_user->phone=trim(strip_tags($post['phone'])); $dates++;
            if(!is_null($date_birthday))    $current_user->date_birthday=strtotime(trim(strip_tags($post['date_birthday']))); $dates++;
            if(!is_null($password))         $current_user->setPassword($post['password']); $dates++;

            if( $dates > 0){
                if($current_user->validate())
                {
                    $current_user->save();
                    return ['success' => $current_user, 'code' => 200];
                }else{
                    return ['error' => 'Some kind of mistake!', 'code' => '404'];
                }
            }else{
                return ['error' => 'No data', 'code' => '404'];
            }
        }
        return ['error' => $current_user];

    }

    // Получение продуктов
    public function actionGetProduct($product_id=null, $limit=null, $offset=0, $search=null, $category_id = null, $one = false, $tags = true, $shorts = false)
    {
        $langs = Lang::find()->All();

        $allowableProductTags = ($tags == 'false') ? "<br>" : null;

        if(!$product_id){
            $query = new Query;
            $query->select('id, alias, sort, category_id');
            $query->from('catalog_products');
            if($category_id != null) $query->andWhere(['category_id' => (int)$category_id]);
            if($limit != null) $query->limit((int)$limit);
            $query->offset((int)$offset);
            $rows = $query->all();
            $command = $query->createCommand();
            $allProduct = $command->queryAll();

            //$allProduct = CatalogProducts::find()->select('id, alias, sort, category_id')->limit((int)$limit)->offset((int)$offset)->All();

        }else{
            $allProduct[] = CatalogProducts::find()->select('id, alias, sort, category_id')->where(['id' => (int)$product_id])->one();
        }

        $products = [];
        $product_return = [];
        foreach($allProduct as $product){
            $products[$product['id']]['id'] = $product['id'];
            $products[$product['id']]['alias'] = $product['alias'];
            $products[$product['id']]['sort'] = $product['sort'];
            $products[$product['id']]['img'] = 'https://3piroga.ua/images/catalog_products/'.$product['id'].'.1.b.png';

            $product_param = CatalogProductsInfo::find()->where(['record_id' => $product['id']])->All();
            if($product_param){
                foreach($langs as $lang){
                    foreach($product_param as $product_name){
                        if($product_name->lang == $lang->id){
                            $products[$product['id']]['title'][$lang->url] = $product_name->title;
                            $products[$product['id']]['text'][$lang->url] = str_replace(array("\n", "\r"), '', strip_tags($product_name->text, $allowableProductTags));
                            if ($shorts) {
                                $products[$product['id']]['short_title'][$lang->url] = $product_name->short_title;
                                $products[$product['id']]['short_desc'][$lang->url] = $product_name->short_desc;
                            }
                        }
                    }
                }
            }
            $params = CatalogParams::find()->where(['product_id' => $product['id']])->All();
            if($params){
                foreach($params as $param){
                    if($param->active != 1) continue;
                    if($param->value_id > 0){
                        $catalogValues = CatalogValues::find()->where(['id' => $param->value_id])->one();
                    }
                    if($param->weight_id > 0){
                        $weightId = CatalogWeight::find()->where(['id' => $param->weight_id])->one();
                    }
                    if ($param->type_id > 0){
                        $type = $param->getNameValue()->one()->getInfo()->one();
                    }

                    if($catalogValues && $param->weight_id != '-1'){
                        $products[$product['id']]['params']['diametrs'][] = ['id' => $param->id, 'value' => $catalogValues->value, 'price' => $param->price, 'mera' => 'см', 'weight' => $weightId->value];
                    }elseif($weightId || $param->weight_id == '-1'){
                        $catValue = ($catalogValues) ? $catalogValues->value : $param->value;
                        $products[$product['id']]['params']['volume'][] = ['id' => $param->id, 'value' => $catValue, 'price' => $param->price, 'mera' => $type->value];
                    }

                }
            }
            if($product['category_id'] > 0){

                if($product['category_id'] == '6'){
                    $products[$product['id']]['type'] = 'combo';
                }elseif($product['category_id'] == '7'){
                    $products[$product['id']]['type'] = 'drink';
                }elseif($product['category_id'] == '10'){
                    $products[$product['id']]['type'] = 'souse';

                }else{
                    $products[$product['id']]['type'] = 'pie';
                }

                $category = CatalogCategories::find()->where(['id' => $product['category_id']])->one();
                if($category && $category->active == '1'){
                    $products[$product['id']]['categoryes'][$category->id]['id'] = $category->id;
                    $products[$product['id']]['categoryes'][$category->id]['alias'] = $category->alias;
                    $category_title = CatalogCategoriesInfo::find()->where(['record_id' => $category->id])->all();
                    if($category_title){
                        foreach($langs as $lang){
                            foreach($category_title as $cat_title){
                                if($cat_title->lang == $lang->id){
                                    $products[$product['id']]['categoryes'][$category->id]['title'][$lang->url] = $cat_title->title;
                                    $products[$product['id']]['categoryes'][$category->id]['text'][$lang->url] = $cat_title->text;
                                }
                            }
                        }
                    }
                    $products[$product['id']]['category'][] = $products[$product['id']]['categoryes'][$category->id];
                    unset($products[$product['id']]['categoryes']);
                }
            }
            $productConsistAssoc = ProductConsistAssoc::find()->where(['product_id' => $product['id']])->all();
            if($productConsistAssoc){
                foreach($productConsistAssoc as $productConsist){
                    $catalogConsistInfo = CatalogConsistInfo::find()->where(['record_id' => $productConsist->consist_id])->all();
                    foreach($langs as $lang){
                        foreach($catalogConsistInfo as $catalogConsInfo){
                            if($catalogConsInfo->lang == $lang->id){
                                $products[$product['id']]['consist']['titles'][$lang->url][] = $catalogConsInfo->title;
                            }
                        }
                    }
                }
            }
            if($product_id && $one == false){

                $productFeedbacks = Feedbacks::find()->select('id, text, name, creation_time, mark')->where(['product_id' => $product['id'], 'active' => 1])->asArray()->all();
                if($productFeedbacks){
                    foreach($productFeedbacks as $productFeedback){
                        $productFeedback['creation_time'] = date('d.m.Y', $productFeedback['creation_time']);
                        $products[$product['id']]['feedbacks'][] = ['feedback' => $productFeedback, 'answer' => FeedbacksAnswer::find()->select('text, create_at')->where(['parent_id' => $productFeedback['id']])->asArray()->all()];
                        //$products[$product['id']]['feedbacks'][$productFeedback['id']]['date'] = date('d.m.Y', $productFeedback['creation_time']);
                    }
                }



                $productProductAssoc = ProductProductAssoc::find()->with('product')
                ->where(['product_id' => $product['id']])->asArray()->All();

                if($productProductAssoc){
                    foreach($productProductAssoc as $productProduct){
                        $products[$product['id']]['similars'][] = $this->actionGetProduct($productProduct['product_similar_id'], null, 0, null, null, true)[0];
                    }
                }
            }
            if($product_id && $one == false){
                $product_return = $products[$product['id']];
            }else{
                $product_return[] = $products[$product['id']];
            }
        }

        return $product_return;

    }

    public function actionGetFeedbacks($limit=100, $offset=0, $product_id = NULL)
    {
        $feedbacks = [];

        if($product_id){
            $productFeedbacks = Feedbacks::find()->select('id, text, name, creation_time, product_id, mark')->where(['active' => 1, 'product_id' => (int)$product_id])->limit($limit)->offset($offset)->orderBy('id DESC')->asArray()->all();
        }else{
            $productFeedbacks = Feedbacks::find()->select('id, text, name, creation_time, product_id, mark')->where(['active' => 1, 'product_id' => NULL])->orWhere(['product_id' => 0])->limit($limit)->offset($offset)->orderBy('id DESC')->asArray()->all();

        }


        if($productFeedbacks){
            foreach($productFeedbacks as $productFeedback){
                $productFeedback['creation_time'] = date('d.m.Y', $productFeedback['creation_time']);
                $feedbacks[] = ['feedback' => $productFeedback, 'answer' => FeedbacksAnswer::find()->select('text, create_at')->where(['parent_id' => $productFeedback['id']])->asArray()->all()];
            }
        }
        return $feedbacks;
    }

    public function actionAddFeedback($name, $email, $mark = 5, $text, $product_id = 0)
    {
        if(count($mark) > 5) $mark = 5;
        $post                   = $data;
        $model                  = new Feedbacks();
        $model->name            = isset($name) ? strip_tags($name) : '';
        $model->product_id      = isset($product_id) ? strip_tags($product_id) : 0;
        $model->email           = isset($email) ? strip_tags($email) : '';
        $model->mark            = isset($mark) ? strip_tags($mark) : '';
        $model->text            = isset($text) ? strip_tags($text) : '';
        $model->creation_time   = date('U');
        if($model->save())
        {
            return ['status' => true];

        } else {
            foreach ($model->errors as $error)
            {
                return $error;
            }
        }

    }

    public function actionGetBlogs($limit=100, $offset=0, $blog_id = false,  $tags = true)
    {
        $blogs = [];
        if((int)$blog_id > 0){
            $allBlogs = News::find()->with('infoForApi')->orderBy('creation_time desc')
            ->limit($limit)
            ->offset($offset)
            ->where(['id' => $blog_id])
            ->asArray()
            ->all();
        }else{
            $allBlogs = News::find()->with('infoForApi')->orderBy('creation_time desc')
            ->limit($limit)
            ->offset($offset)
            ->asArray()
            ->all();
        }

        if($allBlogs){
            foreach($allBlogs as $oneBlogs){
                $oneBlogs['creation_time'] = date('d.m.Y', $oneBlogs['creation_time']);
                $byLang = [];
                foreach($oneBlogs['infoForApi'] as $infoForApi){

                    if ($tags == 'false') {
                        $infoForApi['title'] = htmlspecialchars_decode(html_entity_decode(strip_tags($infoForApi['title']), ENT_QUOTES));
                        $infoForApi['text'] = htmlspecialchars_decode(html_entity_decode(strip_tags($infoForApi['text']), ENT_QUOTES));
                        $infoForApi['title'] = preg_replace('/\s\s+/', ' ', $infoForApi['title']);
                        $infoForApi['text'] = preg_replace('/\s\s+/', ' ', $infoForApi['text']);
                        $infoForApi['title'] = preg_replace('/\s\s+/', ' ', $infoForApi['title']);
                        $infoForApi['text'] = preg_replace('/\s\s+/', ' ', $infoForApi['text']);
                    }

                    if($infoForApi['lang'] == 1){
                        $byLang['ru'] = [
                            'title' => $infoForApi['title'],
                            'text' => $infoForApi['text'],
                        ];
                    }elseif($infoForApi['lang'] == 2){
                        $byLang['uk'] = [
                            'title' => $infoForApi['title'],
                            'text' => $infoForApi['text'],
                        ];
                    }elseif($infoForApi['lang'] == 3){
                        $byLang['en'] = [
                            'title' => $infoForApi['title'],
                            'text' => $infoForApi['text'],
                        ];
                    }

                }

                $blogs[] = [
                    'id' => $oneBlogs['id'],
                    'creation_time' => $oneBlogs['creation_time'],
                    'translates' => $byLang,
                ];
            }
        }
        return $blogs;
    }

    //Получаем категории сайта
    public function actionGetCategory($category_id = null)
    {
        $category = [];
        $categorye = [];
        if($category_id == null){
            $categoryes = CatalogCategories::find()->asArray()->All();
        }else{
            $categoryes = CatalogCategories::find()->where(['id' => $category_id])->asArray()->one();
        }
        //print_r($category);
        ///return ['error' => 'Some kind of mistake!', 'code' => '404'];
        echo count($categoryes);
        if($categoryes){
        foreach($categoryes as $cat){
            $category[$cat['id']] = $cat;
            $category[$cat['id']]['info'] = CatalogCategoriesInfo::find()->where(['record_id' => $cat['id']])->asArray()->All();
            $categorye[] = $category[$cat['id']];
        }
        }else{
            return ['error' => 'No data', 'code' => '404'];
        }

        return $categorye;
    }

    //Получаем языки
    public function actionGetLang()
    {
        Yii::$app->cache->flush();
        $langs = Lang::find()->select('id, url, name, title, local')->asArray()->All();
        return $langs;
    }

    //Получаем параметры заказа
    public function actionGetOrderParams($type=null)
    {
        $params = [];

        if($type == null){
            $params['delivery'][] = OrdersParams::find()->select('id, name, add_cost, sort')->where(['type' => 'delivery'])->asArray()->all();
            $params['payment'][] = OrdersParams::find()->select('id, name, add_cost, sort')->where(['type' => 'payment'])->asArray()->all();
            $params['status'][] = OrdersParams::find()->select('id, name, add_cost, sort')->where(['type' => 'status'])->asArray()->all();
        }elseif($type == 'delivery' || $type == 'payment' || $type == 'status'){
            $params = OrdersParams::find()->select('id, name, add_cost, sort')->where(['type' => htmlspecialchars($type)])->asArray()->all();
        }
        if($params){
            return ['params' => $params, 'code' => '200'];
        }else{
            return ['error' => 'No data', 'code' => '404'];
        }

    }

    //Получаем активные акции
    public function actionGetStocks(array $items = null, array $ext_items = null, $active_only = false, $tags = true)
    {
        $stocki = StocksHelperApiFacade::getStocksListInBasket(Orders::getCartInfoApi($items, $ext_items), $active_only);

        $stocks = [];
        $return_stocks = [];

        $langs = Lang::find()->All();
        foreach($stocki as $stock){
            $stocks[$stock['id']]['id'] = $stock['id'];
            $stocks[$stock['id']]['active'] = $stock['activ'];
            foreach($langs as $lang){
                if($lang->url == 'uk'){$lang_u = 'ua';}else{$lang_u = $lang->url;}
                $stocks[$stock['id']]['title'][$lang->url] = stripslashes($stock['title_'.$lang_u]);
                $stocks[$stock['id']]['text'][$lang->url] = stripslashes($stock['text_'.$lang_u]);
                $stocks[$stock['id']]['full_text'][$lang->url] = $stock['full_text_'.$lang_u];
                if ($tags == 'false')  {
                    $stocks[$stock['id']]['text'][$lang->url] = htmlspecialchars_decode(html_entity_decode(strip_tags($stocks[$stock['id']]['text'][$lang->url]), ENT_QUOTES));
                    $stocks[$stock['id']]['full_text'][$lang->url] = htmlspecialchars_decode(html_entity_decode(strip_tags($stocks[$stock['id']]['full_text'][$lang->url]), ENT_QUOTES));
                    $stocks[$stock['id']]['text'][$lang->url] = preg_replace('/\s\s+/', ' ', $stocks[$stock['id']]['text'][$lang->url]);
                    $stocks[$stock['id']]['full_text'][$lang->url] = preg_replace('/\s\s+/', ' ', $stocks[$stock['id']]['full_text'][$lang->url]);
                }
                if($stock['img_'.$lang_u]) $stocks[$stock['id']]['img'][$lang->url] = 'https://3piroga.ua/images/discounts/'.$stock['img_'.$lang_u];
            }
            $return_stocks[] = $stocks[$stock['id']];
        }
        return $return_stocks;
    }

    /**
     * Autorize
     *
     * @return mixed
     */
    // Авторизация
    public function actionAuthorize($email=null, $phone=null, $passw=null)
    {
        //$user_model = new User;
        $request = Yii::$app->request;
        $get     = $request->get();

        $request = false;

        if(!empty($get['email']) && !empty($get['passw'])){
            $user = User::find()->where(['email'=>htmlspecialchars($get['email'])])->limit(1)->one();
            if ($user && Yii::$app->getSecurity()->validatePassword($get['passw'], $user->password_hash)) {
                $request = true;
            }
        }elseif(!empty($get['phone']) && !empty($get['passw'])){
            $user = User::find()->where(['phone'=>htmlspecialchars($get['phone'])])->limit(1)->one();
            if ($user && Yii::$app->getSecurity()->validatePassword($get['passw'], $user->password_hash)) {
                $request = true;
            }
        }

        if($request == true){
            return $user;
        }else{
            Yii::$app->response->setStatusCode(404);
            return ['error' => 'User not Found or password not valid!', 'code' => '404'];
        }

    }

    /**
     * Autorize
     *
     * @return mixed
     */
    // Получение заказов пользователя
    public function actionGetorders($auth_key=null, $ext_id = null)
    {

        $request = Yii::$app->request;
        $get     = $request->get();

        $request = false;

        if(!empty($get['auth_key'])){
            $user = User::find()->where(['auth_key'=>htmlspecialchars($get['auth_key'])])->limit(1)->one();
            if ($user) {
                $orders = Orders::find()
                //->select(['orders.*', 'orders_items.*'])
                //->leftJoin('orders_items', '`orders`.`id` = `orders_items`.`order_id`')
                ->where(['orders.user_id' => $user->id])
                ->asArray()
                //->with('orders')
                ->all();

                $all_order = array();
                if(count($orders) > 0){
                    foreach($orders as $order){
                        $orders_items = OrdersItems::find()->where(['order_id'=>$order['id']])->asArray()->all();
                        $order['items'] = $orders_items;
                        $all_order[] = $order;
                    }
                    return $all_order;
                }else{
                    Yii::$app->response->setStatusCode(404);
                    return ['error' => 'Orders not Found!', 'code' => '404'];
                }

            }else{
                Yii::$app->response->setStatusCode(404);
                return ['error' => 'User not Found!', 'code' => '404'];
            }
        }elseif(!empty($get['ext_id'])){
            $orders = Orders::find()
                ->where(['ext_id'=>htmlspecialchars($get['ext_id'])])
                ->asArray()
                ->one();
            if ($orders) {
                $all_order = array();
                if(count($orders) > 0){
                    foreach($orders as $order){
                        $orders_items = OrdersItems::find()->where(['order_id'=>$order['id']])->asArray()->all();
                        $order['items'] = $orders_items;
                        $all_order[] = $order;
                    }
                    return $all_order;
                }else{
                    Yii::$app->response->setStatusCode(404);
                    return ['error' => 'Orders not Found!', 'code' => '404'];
                }

            }else{
                Yii::$app->response->setStatusCode(404);
                return ['error' => 'Order not Found!', 'code' => '404'];
            }
        }

        if($request == false){
            Yii::$app->response->setStatusCode(404);
            return ['error' => 'User or order id not Found!', 'code' => '404'];
        }

    }

    public function actionValidateStoks($apikey, $stocks_id, array $items=null, array $ext_items=null)
    {
        $keys = ['sf!d@gj@%4l-k3j', 'sfhgo4icxe6%#3c', 'lxsjgb47vmt-$3f', 'd23sf-0gh23@r3j'];
        if(!in_array($apikey, $keys)) return ['error' => 'API key not valid!', 'code' => '404'];

        if($items == null && $ext_items == null) return ['error' => 'Not items!', 'code' => '404'];
        if($items){
            $sitem = $items;
        }elseif($ext_items){
            $sitem = Orders::getGoodsByExtId($ext_items);
        }
        $backet = StocksHelper::getDiscountByStock(0, $stocks_id, 0, $sitem);
        if($backet){
            return ['data' => $backet, 'code' => '200'];
        }else{
            return ['error' => 'Not Found!', 'code' => '404'];
        }
    }

    // Добавление заказа https://3piroga.ua/api/add-order?apikey=sf!d@gj@%4l-k3j&items[212]=3&items[158]=1
    public function actionAddOrder($apikey, $in_d2 = null, array $items=null, array $ext_items=null, array $data=null, $user_register=false, $status_id=3, $stocks_id = false)
    {
        $keys = ['sf!d@gj@%4l-k3j', 'sfhgo4icxe6%#3c', 'lxsjgb47vmt-$3f', 'd23sf-0gh23@r3j'];

        $keysSources = [
            'sf!d@gj@%4l-k3j' => 'web',
            'sfhgo4icxe6%#3c' => 'web',
            'lxsjgb47vmt-$3f' => 'android',
            'd23sf-0gh23@r3j' => 'telegram',
        ];

        if(!in_array($apikey, $keys)) return ['error' => 'API key not valid!', 'code' => '404']; // d2
        //if($apikey !== 'sfhgo4icxe6%#3c') return ['error' => 'API key not valid!', 'code' => '404']; // android
        //if($apikey !== 'lxsjgb47vmt-$3f') return ['error' => 'API key not valid!', 'code' => '404']; // IOS

        if($items == null && $ext_items == null) return ['error' => 'Not items!', 'code' => '404'];
        //if((int)$post['stocks_id'] > 0 && !Stocks::finOne((int)$post['stocks_id'])) return ['error' => 'Not stocks!', 'code' => '404'];

        $post        = $data;
        $post['phone'] = urlencode($post['phone']);
        $order       = new Orders();
        $order_items = new OrdersItems();

        $backet = Orders::getCartInfoApi($items, $ext_items);
        $user_data = $this->actionD2Api('getBalans', $post['phone'], $post['email'], $apikey);

        if($post['username'] && $post['email'] && $post['phone'] && !$user_data['user_id'] && $user_register != false){
            $newAddUser = $this->actionUserRegister($post['username'], $post['email'], $post['phone'], md5($post['email']));

            $user_data['user_id'] = $newAddUser['succes']['id'];
            if($newAddUser['code'] == '404'){
                Yii::$app->response->setStatusCode(404);
                return ['error' => $newAddUser['error'], 'code' => '404'];
            }
        }

        //$user_data['user_id']// = Yii::$app->user->identity->id;
        //return $backet;
        $post['all_count'] = $backet['cost'];
        $post['price'] = $backet['cost'];
        $pay_bonus = '';
        $lost_balans = 0;

        if(empty($post['comment'])) {
            $post['comment'] = '';
        }

		    $settings = UserSettings::find()->select('bonus_perc_order, bonus_order_okrugl, bonus_perc_order_500_1500, bonus_perc_order_1500')->where(['id' => 1])->asArray()->one();

            $new_user = User::findOne($user_data['user_id']);
            if($new_user){
                $post['email'] = $new_user->email;
                $lost_balans = (int)$new_user->bonus_balans;
            }
            if((int)$post['bonus'] > 0 && !$user_data) return ['error' => 'User not found!', 'code' => '404'];
            if((int)$post['bonus'] > 0 && $user_data['bonus_balans'] <= (int)$post['bonus']) return ['error' => 'Not enough bonus on balance!', 'code' => '404'];
            //return $new_user;
			if((int)$post['bonus'] > 0 && $user_data['bonus_balans'] >= (int)$post['bonus']){

                $user_stats = new UserBonusStats();
                $user_stats->user_id = $user_data['user_id'];
                $user_stats->operation = 'minus';
                $user_stats->count = (int)$post['bonus'];
                $user_stats->it_was = $lost_balans;
                $user_stats->became = ($lost_balans - (int)$post['bonus']);
                $user_stats->type = 'order_api';
                $user_stats->order_id = rand(1, 999);
                $user_stats->date_operation = time();
                if($user_stats->validate()){
                    //$user_stats->save(false);
                }

                $order->bonus = (int)$post['bonus'];
                $order->discount  += (int)$post['bonus'];
                $pay_bonus = 'Заказ частично оплачен бонусами ('.(int)$post['bonus'].').';

			}

            $lost_bal = ($lost_balans - (int)$post['bonus']);

            $percent = 0;
            $percent_bonus = 0;
            if($post['all_count'] < 500 && $settings['bonus_perc_order'] > 0){
                $percent_bonus = $settings['bonus_perc_order'];
            }elseif($post['all_count'] > 500 && $post['all_count'] < 1500 && $settings['bonus_perc_order_500_1500'] > 0){
                $percent_bonus = $settings['bonus_perc_order_500_1500'];
            }elseif($post['all_count'] > 1500 && $settings['bonus_perc_order_1500'] > 0){
                $percent_bonus = $settings['bonus_perc_order_1500'];
            }else{
                $percent = 0;
            }

            if($new_user && (int)$post['bonus'] > 0 && $user_data['bonus_balans'] >= (int)$post['bonus'] || $percent > 0 && $new_user){
                $new_user->bonus_balans = ($new_user->bonus_balans - (int)$post['bonus'] + $percent);
                //$new_user->update();
            }

            if($stocks_id > 0){
                if($items){
                    $sitem = $items;
                }elseif($ext_items){
                    $sitem = Orders::getGoodsByExtId($ext_items);
                }
                $in_disc = StocksHelper::getDiscountByStock(0, (int)$stocks_id, 0, $sitem);
                $order->discount  += (int)$in_disc['discount'];
                $post['comment'] .= ' Акция: '.StocksHelper::getDiscountName($stocks_id);
            }

            $post['price'] = floatval(number_format(($post['price'] - $order->discount), 2 , '.', ''));

            if($percent_bonus > 0){
                $tot = trim(strip_tags($post['price'])) / 100 * $percent_bonus;
                if($settings['bonus_order_okrugl'] == '+'){
                    $percent = ceil($tot);
                }elseif($settings['bonus_order_okrugl'] == '-'){
                    $percent = floor($tot);
                }elseif($settings['bonus_order_okrugl'] == '='){
                    $percent = round($tot);
                }
            }
			if($percent > 0 && $new_user){
                    $user_stats_perc = new UserBonusStats();
                    $user_stats_perc->user_id = $user_data['user_id'];
                    $user_stats_perc->operation = 'plus';
                    $user_stats_perc->count = $percent;
                    $user_stats_perc->it_was = $lost_bal;
                    $user_stats_perc->became = ($lost_bal + $percent);
                    $user_stats_perc->type = 'order_percent_api';
                    $user_stats_perc->order_id = (string)rand(1, 999);
                    $user_stats_perc->date_operation = time();
                    $user_stats_perc->deleted = 0;
                    $user_stats_perc->validate();
                    if($user_stats_perc->validate()){
                        //$user_stats_perc->save();
                    }

            }

            if(!$post['email']) $post['email'] = 'nomail-'.rand(1, 999999).'-'.rand(1, 999999).'@nomail.nomail';
            //if ($stocks_id) $post['comment'] .= ' Акция: '.StocksHelper::getDiscountName($post['stocks_id']);
            if((int)$post['persons'] > 0){ $post['comment'] .= ' Количество персон: '.(int)$post['persons']; }else{
                $post['persons'] = 0;
            }
            if($post['surrenderwith']) $post['comment'] .= ' Сдача с: '.trim(strip_tags($post['surrenderwith'])) .' грн.';

            $transaction          = Yii::$app->getDb()->beginTransaction();
            $order->user_id       = (!$user_data['user_id']) ? -1 : $user_data['user_id'];
            $order->name          = trim(strip_tags(urldecode($post['username'])));
            $order->email         = trim(strip_tags($post['email']));
            $order->phone         = trim(strip_tags($post['phone']));
            $order->comment       = trim(strip_tags($post['comment']));
            $order->address       = trim(strip_tags(urldecode($post['address'])));
            $order->persons       = ($post['persons']) ? (int)$post['persons'] : 0;
            $order->build         = trim(strip_tags($post['build']));
            $order->parad         = trim(strip_tags($post['parad']));
            $order->floar         = trim(strip_tags($post['floar']));
            $order->kvartira       = trim(strip_tags($post['kvartira']));
            $order->deliveryDate       = trim(strip_tags($post['deliveryDate']));
            //$order->code_c       = trim(strip_tags($post['code_c']));

            $order->time       = trim(strip_tags($post['time']));
            $order->delivery_id   = (@$post['delivery_id']) ? trim(strip_tags($post['delivery_type'])) : 1;
            $order->total         = trim(strip_tags($post['price']));
            $order->delivery        = intval($post['delivery']);
            $order->pay_id        = trim(strip_tags($post['pay_type']));
            $order->status_id     = (@$post['status_id']) ? trim(strip_tags($post['status_id'])) : 3; //3; // статус "новый заказ"
            $order->creation_time = date('U');
            $order->update_time   = 0;
            $pay_id               = $order->pay_id;
            $total                = $order->total;
            //$order->save();
            if($order->getErrors()){
                return $order->getErrors();
            }
            if($order->save())
            {

                if((int)$post['bonus'] > 0){
                    $new_stats = UserBonusStats::findOne($user_stats->id);
                    $new_stats->order_id = $order->id;
                    //$new_stats->update();
                }
                //return ['error' => 'API key not valid!', 'code' => $order->id, 'code2' => $new_user, 'code3' => $percent, 'code4' => $user_stats_perc->id];
                if($percent > 0 && $new_user){
                    $new_stats_perc = UserBonusStats::findOne($user_stats_perc->id);
                    $new_stats_perc->order_id = $order->id;
                    //$new_stats_perc->update();
                }

                //r/eturn ['error' => $newAddUser['error'], 'code' => $order->id];

                $save_items_status = $order_items->saveOrderItems($backet['params'], $order->id);
                if($save_items_status)
                {

                    $transaction->commit();

					//Xml Rpc

                    $options = [];
					$address = [];

					$amount = $post['all_count'] - $order->delivery; //$order->total - $order->delivery;

                    $address['address']  = $order->address ? 'в.' . $order->address :null;
                    $address['build']    = $order->build ? 'б.' . $order->build :null;
                    $address['parad']    = $order->parad ? 'під.' . $order->build :null;
                    $address['floar']    = $order->floar ? 'пов.' . $order->build :null;
                    $address['deliveryDate']    = $order->deliveryDate ? 'Дата доставки: ' . $order->build :null;
                    $address['kvartira']    = $order->kvartira ? 'кв.' . $order->kvartira :null;;
					header('Content-Type: text/html; charset=utf-8');
                    $options['Address'] = implode(',', $address);
                    $options['Amount'] = floatval(number_format($amount , 2 , '.', ''));
                    $options['ClientName'] =  $order->name;
                    $options['ClientTel'] =  preg_replace("/[^0-9]/", '', $order->phone);
                    $options['Discount'] =  floatval(number_format($order->discount, 2, '.', ''));
                    //$options['DlvDate'] =  $order->time;
                    $options['GuestCount'] =  intval(0);
                    $options['Info'] =  $post['comment'];
                    $options['source'] =  $keysSources[$apikey];

                    foreach($backet['params'] as $key => $item)
                    {
						$options['Items'][]=[
							'Price' => floatval(number_format($item['price'] , 2 , '.', '')),
							'Quant' => floatval($item['count']),
							'UID' => intval($item['coded2'])
						];


                    }

                    $options['OuterID'] = (string)$order->id;

                    if($order->pay_id == 2) {
                        $options['PayForm'] =  0;
                    } else if($order->pay_id == 9) {
                        $options['PayForm'] =  1;
                    }

                    if ($pay_id != 11 && $post['email']) {
                        MailHelper::sendMails($order, $backet, $post);
                    }

                    if(true)
					{
					    $rpc = new XmlRpc('D3','Orders.Add',$options);

						$result = $rpc->sendRequest();

                        if($result['UID']){
                            $order->ext_id = $result['UID'];
                            $order->save(false);
                        }

                    }


                }
                else
                {
                    Yii::$app->response->setStatusCode(404);
                    return ['error' => 'Error saving items', 'code' => '400', 'status' => $save_items_status];

                }
                return ['success' => 'Order added!', 'order_data' => $order, 'code' => '200'];
            }
            else
            {
                var_dump($order->getErrors());
                var_dump($order->getAttributes());
                Yii::$app->response->setStatusCode(404);
                return ['error' => 'Order save error', 'code' => '400', 'errors' => $order->getErrors()];

            }
            return $answer;

    }





    public function actionSuccessPay($pay_id=false, $liqpay_id=false)
    {
        if(!$pay_id){
            return ['error' => 'pay_id is empty!', 'code' => '404'];
        }

        //$session     = Yii::$app->session;

        $order = Orders::find()->where(['id' => trim($pay_id)])->one();

        if($order && $order->pay_id == '11'){
            $currentTime = time() * 1000;
            $yesterday = $currentTime - (200*60*60*1000);

            $result  = Yii::$app->liqpay->api("request", array(
                'action'        => 'reports',
                'version'       => '3',
                'date_from'      => $yesterday,
                'date_to'      => $currentTime,
            ));

            $res = false;

            foreach ($result->data as $liqorder)  {

                if ($liqorder->payment_id == $liqpay_id) {
                    $res = $liqorder;
                    break;
                }
            }

            if(!empty($res) && $res  !== false){

                if ($res->status == 'success'){
                    $cartItems = $order->getItems()->asArray()->all();

                    $apiItems = [];
                    foreach ($cartItems as $item) {
                        $apiItems[$item['product_id']]  = $item['count'];
                    }

                    $backet = Orders::getCartInfoApi($apiItems, null);
                    $orders = Orders::find()->where(['id' => $order->id])->one();

                    $orders->pay_status = 1;
                    if ((int)$orders->bonus > 0) {
                        $orders->coment .= " 
Заказ частичто оплачен бонусами (".(int)$orders->bonus.").";
                    }


                    $options = [];
                    $address = [];

                    $amount = OrdersItems::find()->where(['order_id' => $order->id])->sum('price_full');

                    $address['address']  = $orders->address ? 'в.' . $orders->address :null;
                    $address['build']    = $orders->build ? 'б.' . $orders->build :null;
                    $address['parad']    = $orders->parad ? 'під.' . $orders->build :null;
                    $address['floar']    = $orders->floar ? 'пов.' . $orders->build :null;
                    $address['deliveryDate']    = $orders->deliveryDate ? 'Дата доставки: ' . $orders->build :null;
                    $address['kvartira']    = $orders->kvartira ? 'кв.' . $orders->kvartira :null;;
                    header('Content-Type: text/html; charset=utf-8');
                    $options['Address'] = implode(',', $address);
                    $options['Amount'] = floatval(number_format($amount , 2 , '.', ''));
                    $options['ClientName'] =  $orders->name;
                    $options['ClientTel'] =  substr(preg_replace("/[^0-9]/", '', $orders->phone),2);
                    $options['Discount'] =  floatval(number_format($orders->discount, 2, '.', ''));
                    if((int) $orders->bonus > 0){
                        $options['BonusPay'] = (int) $orders->bonus;
                        $bonus_res = (int)Yii::$app->user->identity->bonus_balans - (int) $orders->bonus;
                        $options['BonusRest'] = $bonus_res;
                    }
                    //$options['DlvDate'] =  $order->time;
                    $options['GuestCount'] =  intval(0);
                    $options['Info'] =  $orders->comment;


                    foreach($backet['params'] as $key => $item)
                    {
                        $options['Items'][]=[
                            'Price' => floatval(number_format($item['price'] , 2 , '.', '')),
                            'Quant' => floatval($item['count']),
                            'UID' => intval($item['coded2'])
                        ];


                    }

                    $options['OuterID'] = (string)$order->id;
                    //unset($session['cart']);
                    $rpc = new XmlRpc('D3','Orders.Add',$options);

                    $result = $rpc->sendRequest();
                    if($result['UID']){
                        $orders->ext_id = $result['UID'];
                        $orders->save(false);
                        return ['success' => 'Order payed!', 'code' => '200'];
                    } else {
                        return ['error' => 'D2 Error', 'd2' => $result ,'code' => '200'];
                    }


                }else {

                    return ['error' => 'LiqPay error!', 'code' => '404', 'liqpay' => $res];
                }
            } else {
                return ['error' => 'order not found in liqpay', 'code' => 404];
            }
        }
            return ['error' => 'order not found in db', 'code' => 404];
            //return ['error' => 'Some error!', 'code' => '404'];

    }



    // Добавление заказа https://3piroga.ua/api/add-order?apikey=sf!d@gj@%4l-k3j&items[212]=3&items[158]=1
    public function actionUpdateOrder($apikey, array $items=null, array $ext_items=null, $id = null, $ext_id = null)
    {
        $keys = ['sf!d@gj@%4l-k3j', 'sfhgo4icxe6%#3c', 'lxsjgb47vmt-$3f', 'd23sf-0gh23@r3j'];
        if(!in_array($apikey, $keys)) return ['error' => 'API key not valid!', 'code' => '404']; // d2
        //if($apikey !== 'sfhgo4icxe6%#3c') return ['error' => 'API key not valid!', 'code' => '404']; // android
        //if($apikey !== 'lxsjgb47vmt-$3f') return ['error' => 'API key not valid!', 'code' => '404']; // IOS

        if($items == null && $ext_items == null) return ['error' => 'Not items!', 'code' => '404'];
        //if((int)$post['stocks_id'] > 0 && !Stocks::finOne((int)$post['stocks_id'])) return ['error' => 'Not stocks!', 'code' => '404'];

        $post        = $data;
        $post['phone'] = urlencode($post['phone']);
        $order       = new Orders();
        $order_items = new OrdersItems();

        $backet = Orders::getCartInfoApi($items, $ext_items);
        $user_data = $this->actionD2Api('getBalans', $post['phone'], $post['email'], $apikey);

        if($post['username'] && $post['email'] && $post['phone'] && !$user_data['user_id'] && $user_register != false){
            $newAddUser = $this->actionUserRegister($post['username'], $post['email'], $post['phone'], md5($post['email']));

            $user_data['user_id'] = $newAddUser['succes']['id'];
            if($newAddUser['code'] == '404'){
                Yii::$app->response->setStatusCode(404);
                return ['error' => $newAddUser['error'], 'code' => '404'];
            }
        }

        //$user_data['user_id']// = Yii::$app->user->identity->id;
        //return $backet;
        $post['all_count'] = $backet['cost'];
        $post['price'] = $backet['cost'];
        $pay_bonus = '';
        $lost_balans = 0;

		    $settings = UserSettings::find()->select('bonus_perc_order, bonus_order_okrugl, bonus_perc_order_500_1500, bonus_perc_order_1500')->where(['id' => 1])->asArray()->one();

            $new_user = User::findOne($user_data['user_id']);
            if($new_user){
                $post['email'] = $new_user->email;
                $lost_balans = (int)$new_user->bonus_balans;
            }
            if((int)$post['bonus'] > 0 && !$user_data) return ['error' => 'User not found!', 'code' => '404'];
            if((int)$post['bonus'] > 0 && $user_data['bonus_balans'] <= (int)$post['bonus']) return ['error' => 'Not enough bonus on balance!', 'code' => '404'];
            //return $new_user;
			if((int)$post['bonus'] > 0 && $user_data['bonus_balans'] >= (int)$post['bonus']){

                $user_stats = new UserBonusStats();
                $user_stats->user_id = $user_data['user_id'];
                $user_stats->operation = 'minus';
                $user_stats->count = (int)$post['bonus'];
                $user_stats->it_was = $lost_balans;
                $user_stats->became = ($lost_balans - (int)$post['bonus']);
                $user_stats->type = 'order_api';
                $user_stats->order_id = rand(1, 999);
                $user_stats->date_operation = time();
                if($user_stats->validate()){
                    $user_stats->save(false);
                }

                $order->bonus = (int)$post['bonus'];
                $order->discount  = (int)$post['bonus'];
                $pay_bonus = 'Заказ частичто оплачен бонусами ('.(int)$post['bonus'].').';

			}

            $lost_bal = ($lost_balans - (int)$post['bonus']);

            $percent = 0;
            $percent_bonus = 0;
            if($post['all_count'] < 500 && $settings['bonus_perc_order'] > 0){
                $percent_bonus = $settings['bonus_perc_order'];
            }elseif($post['all_count'] > 500 && $post['all_count'] < 1500 && $settings['bonus_perc_order_500_1500'] > 0){
                $percent_bonus = $settings['bonus_perc_order_500_1500'];
            }elseif($post['all_count'] > 1500 && $settings['bonus_perc_order_1500'] > 0){
                $percent_bonus = $settings['bonus_perc_order_1500'];
            }else{
                $percent = 0;
            }

            if($new_user && (int)$post['bonus'] > 0 && $user_data['bonus_balans'] >= (int)$post['bonus'] || $percent > 0 && $new_user){
                $new_user->bonus_balans = ($new_user->bonus_balans - (int)$post['bonus'] + $percent);
                $new_user->update();
            }

            if($post['stocks_id'] > 0){
                if($items){
                    $sitem = $items;
                }elseif($ext_items){
                    $sitem = Orders::getGoodsByExtId($ext_items);
                }
                $in_disc = StocksHelper::getDiscountByStock(0, (int)$post['stocks_id'], 0, $sitem);
                $order->discount  += (int)$in_disc['discount'];
            }

            $post['price'] = floatval(number_format(($post['price'] - $order->discount), 2 , '.', ''));

            if($percent_bonus > 0){
                $tot = trim(strip_tags($post['price'])) / 100 * $percent_bonus;
                if($settings['bonus_order_okrugl'] == '+'){
                    $percent = ceil($tot);
                }elseif($settings['bonus_order_okrugl'] == '-'){
                    $percent = floor($tot);
                }elseif($settings['bonus_order_okrugl'] == '='){
                    $percent = round($tot);
                }
            }
			if($percent > 0 && $new_user){
                    $user_stats_perc = new UserBonusStats();
                    $user_stats_perc->user_id = $user_data['user_id'];
                    $user_stats_perc->operation = 'plus';
                    $user_stats_perc->count = $percent;
                    $user_stats_perc->it_was = $lost_bal;
                    $user_stats_perc->became = ($lost_bal + $percent);
                    $user_stats_perc->type = 'order_percent_api';
                    $user_stats_perc->order_id = rand(1, 999);
                    $user_stats_perc->date_operation = time();
                    if($user_stats_perc->validate()){
                        $user_stats_perc->save(false);
                    }

            }

            if(!$post['email']) $post['email'] = 'nomail-'.rand(1, 999999).'-'.rand(1, 999999).'@nomail.nomail';
            if((int)$post['persons'] > 0){ $post['comment'] .= ' Количество персон: '.(int)$post['persons']; }else{
                $post['persons'] = 0;
            }
            if($post['surrenderwith']) $post['comment'] .= ' Сдача с: '.trim(strip_tags($post['surrenderwith'])) .' грн.';

            $transaction          = Yii::$app->getDb()->beginTransaction();
            $order->user_id       = (!$user_data['user_id']) ? -1 : $user_data['user_id'];
            $order->name          = trim(strip_tags($post['username']));
            $order->email         = trim(strip_tags($post['email']));
            $order->phone         = trim(strip_tags($post['phone']));
            $order->comment       = trim(strip_tags($post['comment']));
            $order->address       = trim(strip_tags($post['address']));
            $order->persons       = ($post['persons']) ? (int)$post['persons'] : 0;
            $order->build         = trim(strip_tags($post['build']));
            $order->parad         = trim(strip_tags($post['parad']));
            $order->floar         = trim(strip_tags($post['floar']));
            $order->deliveryDate  = trim(strip_tags($post['deliveryDate']));
            $order->kvartira       = trim(strip_tags($post['kvartira']));
            //$order->code_c       = trim(strip_tags($post['code_c']));

            $order->time       = trim(strip_tags($post['time']));
            $order->delivery_id   = (@$post['delivery_id']) ? trim(strip_tags($post['delivery_type'])) : 1;
            $order->total         = trim(strip_tags($post['price']));
            $order->delivery        = intval($post['delivery']);
            $order->pay_id        = trim(strip_tags($post['pay_type']));
            $order->status_id     = 3; // статус "новый заказ"
            $order->creation_time = date('U');
            $order->update_time   = 0;
            $pay_id               = $order->pay_id;
            $total                = $order->total;
            //$order->save();
            if($order->getErrors()){
                return $order->getErrors();
            }
            if($order->save())
            {
                if((int)$post['bonus'] > 0){
                    $new_stats = UserBonusStats::findOne($user_stats->id);
                    $new_stats->order_id = $order->id;
                    $new_stats->update();
                }

                if($percent > 0 && $new_user){
                    $new_stats_perc = UserBonusStats::findOne($user_stats_perc->id);
                    $new_stats_perc->order_id = $order->id;
                    $new_stats_perc->update();
                }


                $save_items_status = $order_items->saveOrderItems($backet['params'], $order->id);
                if($save_items_status)
                {

                    $transaction->commit();

					//Xml Rpc

                    $options = [];
					$address = [];

					$amount = $post['all_count'] - $order->delivery; //$order->total - $order->delivery;

                    $address['address']  = $order->address ? 'в.' . $order->address :null;
                    $address['build']    = $order->build ? 'б.' . $order->build :null;
                    $address['parad']    = $order->parad ? 'під.' . $order->build :null;
                    $address['floar']    = $order->floar ? 'пов.' . $order->build :null;
                    $address['deliveryDate']    = $order->deliveryDate ? 'Дата доставки: ' . $order->build :null;
                    $address['kvartira']    = $order->kvartira ? 'кв.' . $order->kvartira :null;;
					header('Content-Type: text/html; charset=utf-8');
                    $options['Address'] = implode(',', $address);
                    $options['Amount'] = floatval(number_format($amount , 2 , '.', ''));
                    $options['ClientName'] =  $order->name;
                    $options['ClientTel'] =  substr(preg_replace("/[^0-9]/", '', $order->phone),2);
                    $options['Discount'] =  floatval(number_format($order->discount, 2, '.', ''));
                    //$options['DlvDate'] =  $order->time;
                    $options['GuestCount'] =  intval(0);
                    $options['Info'] =  $order->comment;

                    foreach($backet['params'] as $key => $item)
                    {
						$options['Items'][]=[
							'Price' => floatval(number_format($item['price'] , 2 , '.', '')),
							'Quant' => floatval($item['count']),
							'UID' => intval($item['coded2'])
						];


                    }

                    $options['OuterID'] = (string)$order->id;

                    if($order->pay_id == 2) {
                        $options['PayForm'] =  0;
                    } else if($order->pay_id == 9) {
                        $options['PayForm'] =  1;
                    }

                    if($in_d2 != null)
					{
					    $rpc = new XmlRpc('D3','Orders.Add',$options);

						$result = $rpc->sendRequest();

                        if($result['UID']){
                            $order->ext_id = $result['UID'];
                            $order->save(false);
                        }

                    }


                }
                else
                {
                    Yii::$app->response->setStatusCode(404);
                    return ['error' => 'User not Found!', 'code' => '404'];

                }
                return ['success' => 'Order added!', 'order_data' => $order, 'code' => '200'];
            }
            else
            {
                Yii::$app->response->setStatusCode(404);
                return ['error' => 'User not Found!', 'code' => '404'];

            }
            return $answer;

    }

    // Удаляем заказ
    public function actionDeleteOrder($id=null, $ext_id=null, $apikey)
    {
        if($apikey !== 'sf!d@gj@%4l-k3j') return ['error' => 'API key not valid!', 'code' => '404'];
        if($id == null && $ext_id == null) return ['error' => 'Id empty', 'code' => '404'];
        if($id != null){
            $order = Orders::find()->where(['id' => (int)$id])->one();
        }elseif($ext_id != null){
            $order = Orders::find()->where(['ext_id' => (int)$ext_id])->one();
        }
        if($order->status_id == 6){
            return ['error' => 'Order already deleted!', 'code' => '404'];
        }
        $order->status_id = 6;
        if($order->save(false) && $order->user_id > 1 && $order->bonus > 0){

            $user = User::find()->where(['id'=>$order->user_id])->one();

            $user_stats_b = new UserBonusStats();
            $user_stats_b->user_id = $user->id;
            $user_stats_b->operation = 'minus';
            $user_stats_b->count = $order->bonus;
            $user_stats_b->it_was = $user->bonus_balans;
            $user_stats_b->became = ($user->bonus_balans > $order->bonus)?($user->bonus_balans - $order->bonus):0;
            $user_stats_b->type = 'delete_order';
            $user_stats_b->date_operation = time();
            $user_stats_b->deleted = 1;
            if($user_stats_b->validate()){
                $user_stats_b->save(false);
                $user->bonus_balans = ($user->bonus_balans > $order->bonus)?($user->bonus_balans - $order->bonus):0;
                $user->save(false);
                return ['success' => 'Order deleted!', 'code' => '200'];
            }
            return ['error' => 'Order is empty!', 'code' => '404'];

        }
    }
    // Для Д2
    public function actionD2Api($operation = null, $phone = null, $email = null, $apikey, $user_id = null, $bonus = null, $price = null, $order_ext_id = null)
    {
        if($apikey !== 'sf!d@gj@%4l-k3j') return ['error' => 'API key not valid!', 'code' => '404'];
        if($operation == 'getBalans' && $phone || $operation == 'getBalans' && $email){
            //$user = User::find();
            $query = new Query;
            $query->select('*')
            ->from('user')
            ->limit(1);
            if($phone){
                $query->where(['like', 'phone', htmlspecialchars($phone)]);
            }
            if($email){
                $query->orWhere(['email'=>htmlspecialchars($email)]);
            }
            //$user->one();
            $command = $query->createCommand();
            $rows = $command->queryOne();
            //return $rows['id'];
            if($rows){
                return ['bonus_balans' => UserBonusStats::getCurrentBalans($rows['id']), 'user_id' => $rows['id'], 'code' => '200'];
            }else{
                return ['error' => 'User not Found!', 'code' => '404'];
            }
        }elseif($operation == 'updateBonus' && $bonus>=0 && $price > 0 && ((int)$user_id >= 0 || $phone)){
            if((int)$user_id > 0) $user_id = (int)$user_id;

            if(!$order_ext_id) return ['error' => 'Empty order id!', 'code' => '404'];

            $order = Orders::find()->where(['ext_id' => htmlspecialchars($order_ext_id)])->one();

            //if(!$order) return ['error' => 'Empty order!', 'code' => '404'];

            //return ($order) ? $order->id : $order_ext_id;

            $query = new Query;
            $query->select('*')
            ->from('user')
            ->limit(1);
            if($phone){
                $query->where(['like', 'phone', htmlspecialchars($phone)]);
            }
            if($user_id){
                $query->orWhere(['id' => (int)$user_id]);
            }
            $command = $query->createCommand();
            $rowUser = $command->queryOne();
            //return $rowUser;

            $settings = UserSettings::find()->select('bonus_perc_order, bonus_order_okrugl, bonus_perc_order_500_1500, bonus_perc_order_1500')->where(['id' => 1])->asArray()->one();

            if($rowUser){
                $user = User::find()->where(['id'=>$rowUser['id']])->limit(1)->one();

                if((int)$bonus > $user->bonus_balans && (int)$bonus > 0) return ['error' => 'Not enough bonuses! Max '.$user->bonus_balans, 'max' => $user->bonus_balans, 'code' => '404'];
                //return $user;
                if((int)$bonus > 0 || (int)$price >= 0){
                    $resultPrice = $price;
                    $percent = 0;
                    $percent_bonus = 0;
                    $userBeforeBalans = $user->bonus_balans;

                    if($price < 500 && $settings['bonus_perc_order'] > 0){
                        $percent_bonus = $settings['bonus_perc_order'];
                    }elseif($price > 500 && $price < 1500 && $settings['bonus_perc_order_500_1500'] > 0){
                        $percent_bonus = $settings['bonus_perc_order_500_1500'];
                    }elseif($price > 1500 && $settings['bonus_perc_order_1500'] > 0){
                        $percent_bonus = $settings['bonus_perc_order_1500'];
                    }

                    $totalBonus = $resultPrice / 100 * $percent_bonus;
                    if($settings['bonus_order_okrugl'] == '+'){
                        $percent = ceil($totalBonus);
                    }elseif($settings['bonus_order_okrugl'] == '-'){
                        $percent = floor($totalBonus);
                    }elseif($settings['bonus_order_okrugl'] == '='){
                        $percent = round($totalBonus);
                    }

                    $user->bonus_balans = ($userBeforeBalans - (int)$bonus + $percent);
                    $user->update();

                    if((int)$bonus > 0){
                        // Bonus stats -
                        $user_stats = new UserBonusStats();
                        $user_stats->user_id = $user->id;
                        $user_stats->operation = 'minus';
                        $user_stats->count = (int)$bonus;
                        $user_stats->it_was = $userBeforeBalans;
                        $user_stats->became = ($userBeforeBalans - (int)$bonus);
                        $user_stats->type = 'order_api';
                        $user_stats->order_id = ($order) ? $order->id : $order_ext_id;
                        $user_stats->date_operation = time();
                        $user_stats->save(false);
                    }
                    if($percent){
                        // Bonus stats +
                        $user_stats_perc = new UserBonusStats();
                        $user_stats_perc->user_id = $user->id;
                        $user_stats_perc->operation = 'plus';
                        $user_stats_perc->count = $percent;
                        $user_stats_perc->it_was = ($userBeforeBalans - (int)$bonus);
                        $user_stats_perc->became = $user->bonus_balans;
                        $user_stats_perc->type = 'order_percent_api';
                        $user_stats_perc->order_id = ($order) ? $order->id : $order_ext_id;
                        $user_stats_perc->date_operation = time();
                        $user_stats_perc->save(false);
                    }
                    return ['success' => 'Bonus balans updated!', 'code' => '200'];

                }

                return ['bonus_balans' => UserBonusStats::getCurrentBalans($user->id), 'code' => '200'];
            }else{
                return ['error' => 'User not Found!', 'code' => '404'];
            }
        }
        return ['error' => 'User not Found!', 'code' => '404'];
    }
    // Для крона обновление удаление бонусов у пользователя интервал 1 час.
    public function actionUpdatebonus()
    {

        //bonus_birt
        $settings = UserSettings::find()->select('bonus_birt, bonus_delete')->where(['id' => 1])->asArray()->one();
        //return $settings;
        if(!$settings['bonus_birt'] || $settings['bonus_birt'] == 0){
            return ['error' => 'Bonus empty or null'];
        }

        $now = time();
        $users = User::find()->where(['bonus_added' => 0])->andWhere(['>', 'date_birthday', 5])->asArray()->All();
        if(!empty($users) && count($users) > 0){
            foreach($users as $user){

                $born = strtotime(date("d.M.Y", $user['date_birthday']));
                $now = time();
                $next_birthday = mktime(0, 0, 0, date('m',$born), date('d',$born), date('Y'));

                if ($next_birthday > $now && $next_birthday < strtotime('+4 hours')) {
                    $us[] = $user['id'];
                    $new_user = User::findOne($user['id']);
                    $lost_balans = $new_user->bonus_balans;
                    $new_user->bonus_balans = ($new_user->bonus_balans + $settings['bonus_birt']);
                    $new_user->bonus_added = 1;
                    $new_user->update();

                    $user_stats = new UserBonusStats();
                    $user_stats->user_id = $user['id'];
                    $user_stats->operation = 'plus';
                    $user_stats->count = $settings['bonus_birt'];
                    $user_stats->it_was = $lost_balans;
                    $user_stats->became = ($lost_balans + $settings['bonus_birt']);
                    $user_stats->type = 'birthday';
                    $user_stats->date_operation = $now;
                    if($user_stats->validate()){
                        $user_stats->save(false);
                    }

                }
            }
        }

        $bonus_delete_time = ($now - $settings['bonus_delete'] * 86400);

        $users_bonus_delete = UserBonusStats::find()->select('id, user_id, count, order_id')->where(['<', 'date_operation', $bonus_delete_time])->andWhere(['deleted' => 0])->andWhere(['operation' => 'plus'])->asArray()->All();
        $deleted = [];
        if((int)$settings['bonus_delete'] > 0){
            foreach($users_bonus_delete as $users_b_del){
                $new_user_b = User::findOne($users_b_del['user_id']);
                if(!$new_user_b) continue;
                $deleted[] = $users_b_del['user_id'];
                $lost_balans_b = $new_user_b->bonus_balans;
                if($new_user_b->bonus_balans > $users_b_del['count']){
                    $bonus_minus = $new_user_b->bonus_balans - $users_b_del['count'];
                }else{
                    $bonus_minus = 0;
                }
                $new_user_b->bonus_balans = $bonus_minus;
                $new_user_b->update();

                $user_stats_b_0 = UserBonusStats::findOne($users_b_del['id']);
                $user_stats_b_0->deleted = 1;
                $user_stats_b_0->save(false);

                if($lost_balans_b > 0){
                    $user_stats_b = new UserBonusStats();
                    $user_stats_b->user_id = $users_b_del['user_id'];
                    $user_stats_b->operation = 'minus';
                    $user_stats_b->count = $users_b_del['count'];
                    $user_stats_b->it_was = $lost_balans_b;
                    $user_stats_b->became = $bonus_minus;
                    $user_stats_b->type = 'delete_day';
                    $user_stats_b->date_operation = $now;
                    $user_stats_b->order_id = $users_b_del['order_id'];
                    $user_stats_b->deleted = 1;
                    if($user_stats_b->validate()){
                        $user_stats_b->save(false);
                    }
                }
            }
        }

        return ['birthday' => $us, 'bonu_delete' => $deleted];
    }

    public function actionGetUserBonusStats($user_id=false, $auth_key=false) {

        if($auth_key){
            $user_id = User::find()->where(['auth_key' => $auth_key])->one()['id'];
        }

        if($user_id){
            $stats = UserBonusStats::find()->select('operation, count, it_was, became, type, date_operation')->where(['user_id' => $user_id])->andWhere(['<', 'date_operation', (time() - 86400)])->orderBy(['id' => SORT_DESC])->asArray()->All();
            if(!$stats) return ['error' => 'Stats not Found!', 'code' => '404'];
            $out = [];
            foreach($stats as $stat){
                $stat['date_operation'] = date("d.m.Y H:i:s", $stat['date_operation']);
                $out[] = $stat;
            }
            return $out;
        }else{
            return ['error' => 'User not Found!', 'code' => '404'];
        }


    }


    // Тест
    /*public function actionGetbon() {



        return $out;
    }*/

}
