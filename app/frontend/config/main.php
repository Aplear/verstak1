<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id'                    => 'app-frontend',
    'name'                  => 'ThreePieces',
    'basePath'              => dirname(__DIR__),
    'bootstrap'             => ['log'],
    'controllerNamespace'   => 'frontend\controllers',
    'components' => [
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'useFileTransport' => false,
        ],
        'assetManager' => [
            'appendTimestamp' => true,
            'bundles' => [
                'yii\bootstrap\BootstrapAsset' => [
                    'css'   => [],
                ],
                'yii\bootstrap\BootstrapPluginAsset' => [
                    'js'    =>[]
                ],
            ],

            'linkAssets' => true,
		],
        'request' => [
            'csrfParam'     => 'digital_force',
            'baseUrl'       => '/',
            'class'               => 'common\components\LangRequest', // for multiLang
            'cookieValidationKey' => 'NtC8TLEAnI8DYwWjrjdaauocn_HQfZ-p',
        ],
        'liqpay' => [
            'class' => 'common\components\LiqPay',
        ],
        'user'   => [
            'identityClass'     => 'common\models\User',
            'enableAutoLogin'   => false,
            'identityCookie'    => ['name' => '_identity-frontend', 'httpOnly' => false],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the frontend
            'name' => 'advanced-frontend',
        ],
        'log' => [
            'traceLevel'    => YII_DEBUG ? 3 : 0,
            'targets'       => [
                [
                    'class'     => 'yii\log\FileTarget',
                    'levels'    => ['error', 'warning'],
                ],
                [
                    'class' => 'yii\log\FileTarget', //в файл
                    'categories' => ['payment'], //категория логов
                    'logFile' => '@runtime/logs/pay.log', //куда сохранять
                    'logVars' => [] //не добавлять в лог глобальные переменные ($_SERVER, $_SESSION...)
                ],

            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'authClientCollection' => [
            'class' => 'yii\authclient\Collection',
            'clients' => [
                'facebook' => [
                    'class'         => 'yii\authclient\clients\Facebook',
                    'clientId'      => '‎1828595687263777',
                    'clientSecret'  => '58c82e6772a58fa650b5e44f4b1a008e',
                ],
                'google' => [
                    'class'         => 'yii\authclient\clients\Google',
                    'clientId'      => '116097264137-8efbuj8f7echk738i49qkljt4rss1ai0.apps.googleusercontent.com',
                    'clientSecret'  => 'eTqNrp-x0vdZoEca58PCsRr5',
                    'scope'         => 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                ],
            ],
        ],
        'urlManager' => [
            'class'               => 'common\components\LangUrlManager', // for multiLang
            'enablePrettyUrl'     => true,
            'showScriptName'      => false,
            'enableStrictParsing' => false,
            'rules' => [
                [
                    'pattern'   => 'soc-auth',
                    'route'     => 'soc/auth',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/authorize',
                    'route'     => 'api/authorize',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/getorders',
                    'route'     => 'api/getorders',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/success-pay',
                    'route'     => 'api/success-pay',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/user-register',
                    'route'     => 'api/user-register',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/user-profile-edit',
                    'route'     => 'api/user-profile-edit',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/get-product',
                    'route'     => 'api/get-product',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/get-category',
                    'route'     => 'api/get-category',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/add-feedback',
                    'route'     => 'api/add-feedback',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/get-feedbacks',
                    'route'     => 'api/get-feedbacks',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/get-blogs',
                    'route'     => 'api/get-blogs',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/get-lang',
                    'route'     => 'api/get-lang',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/add-order',
                    'route'     => 'api/add-order',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/update-order',
                    'route'     => 'api/update-order',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/delete-order',
                    'route'     => 'api/delete-order',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/get-stocks',
                    'route'     => 'api/get-stocks',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/d2-api',
                    'route'     => 'api/d2-api',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/get-user-bonus-stats',
                    'route'     => 'api/get-user-bonus-stats',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/updatebonus',
                    'route'     => 'api/updatebonus',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/getbon',
                    'route'     => 'api/getbon',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/validate-stoks',
                    'route'     => 'api/validate-stoks',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api/get-order-params',
                    'route'     => 'api/get-order-params',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api-certificate/check',
                    'route'     => 'api-certificate/check',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api-certificate/add',
                    'route'     => 'api-certificate/add',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'api-certificate/mark-used',
                    'route'     => 'api-certificate/mark-used',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'reset/<reset>',
                    'route'     => 'content/refresh',
                    'suffix'    => ''
                ],
                [
                'pattern'   => 'refresh-password',
                'route'     => 'content/reset',
                'suffix'    => ''
                ],
				 [
                'pattern'   => 'common',
                'route'     => 'content/common',
                'suffix'    => ''
                ],
                [
                    'pattern'   => 'contacts',
                    'route'     => 'content/contacts',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'delivery',
                    'route'     => 'content/delivery',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'ajax-request',
                    'route'     => 'content/catalog',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'ajax-street-autocomplete',
                    'route'     => 'content/streets',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'ajax-request/page/<page>',
                    'route'     => 'content/catalog-page',
                    'suffix'    => ''
                ],


                [
                    'pattern'   => 'sitemap',
                    'route'     => 'sitemap/index',
                    'suffix'    =>  '.xml',
                ],
                [
                    'pattern'   => 'success',
                    'route'     => 'cart/success',
                    'suffix'    =>  '',
                ],
                [
                    'pattern'   => 'forms/mail',
                    'route'     => 'forms/mail',
                    'suffix'    =>  '',
                ],
                [
                    'pattern'   => 'forms/callback',
                    'route'     => 'forms/callback',
                    'suffix'    =>  '',
                ],
                [
                    'pattern'   => 'user/save-question',
                    'route'     => 'user/save-question',
                    'suffix'    =>  '',
                ],
                [
                    'pattern'   => 'user/question',
                    'route'     => 'user/question',
                    'suffix'    =>  '',
                ],
                [
                    'pattern'   => 'user/index',
                    'route'     => 'user/index',
                    'suffix'    =>'',
                ],
                [
                    'pattern'   => 'user/orders',
                    'route'     => 'user/orders',
                    'suffix'    =>'',
                ],
                [
                    'pattern'   => 'user/bonus',
                    'route'     => 'user/bonus',
                    'suffix'    =>'',
                ],
                [
                    'pattern'   => 'user/rules',
                    'route'     => 'user/rules',
                    'suffix'    =>'',
                ],
                [
                    'pattern'   => 'forms/feedback',
                    'route'     => 'forms/feedback',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'feedbacks/page/<page>',
                    'route'     => 'feedbacks/index',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'feedbacks',
                    'route'     => 'feedbacks/index',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'blog',
                    'route'     => 'blog/index',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'blog/page/<page>',
                    'route'     => 'blog/index',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'blog/<alias>',
                    'route'     => 'blog/view',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'discounts/<alias>',
                    'route'     => 'discount/view',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'discounts',
                    'route'     => 'discount/index',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => '<alias:delivery|contacts|about-us|bonus>',
                    'route'     => 'content/static',
                    'suffix'    => ''
                ],
	            [
                    'pattern'   => '<alias:pochemu-mu-gotovim-bez-perchatok|kak-rasschitat-kolichestvo-pirogov-na-kompaniu|dogovor-publichnoj-ofertu|istoriya-osetinskih-pirogov|beskontaktnaya-dostavka|eda-na-dom>',
                    'route'     => 'content/static',
                    'suffix'    => ''
                ],
		        [
                    'pattern'   => '<alias:static>/page/<page>',
                    'route'     => 'content/static',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => '<alias:category>/page/<page>',
                    'route'     => 'catalog/category',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => '<alias:category>',
                    'route'     => 'catalog/category',
                    'suffix'    => ''
                ],


                [
                    'pattern'   => 'logout',
                    'route'     => 'auth/logout',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'auth/reset-password',
                    'route'     => 'auth/reset-password',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'auth/reset',
                    'route'     => 'auth/reset',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'auth/sign-up',
                    'route'     => 'auth/sign-up',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'auth/sign-in',
                    'route'     => 'auth/sign-in',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'user/delete-address',
                    'route'     => 'user/delete-address',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'user/change-settings',
                    'route'     => 'user/change-settings',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'user/change-password',
                    'route'     => 'user/change-password',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'user/add-address',
                    'route'     => 'user/add-address',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'user/delete-address',
                    'route'     => 'user/delete-address',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'user/change-address',
                    'route'     => 'user/change-address',
                    'suffix'    => ''
                ],
				 [
                    'pattern'   => 'cart/new-order-from-catalog',
                    'route'     => 'cart/new-order-from-catalog',
                    'suffix'    => '',
                ],
				[
                    'pattern'   => 'cart/new-order-catalog',
                    'route'     => 'cart/new-order-catalog',
                    'suffix'    => '',
                ],
                [
                    'pattern'   => 'cart/new-order',
                    'route'     => 'cart/new-order',
                    'suffix'    => '',
                ],
                [
                    'pattern'   => 'order',
                    'route'     => 'cart/order',
                    'suffix'    => '',
                ],


                [
                    'pattern'   => 'cart/clear',
                    'route'     => 'cart/clear',
                    'suffix'    => '',
                ],
                [
                    'pattern'   => 'cart/change-count',
                    'route'     => 'cart/change-count',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'cart/delete-from-backet',
                    'route'     => 'cart/delete-from-backet',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'cart/request',
                    'route'     => 'cart/request',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'cart/request-discount',
                    'route'     => 'cart/request-discount',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'cart/request-stoks',
                    'route'     => 'cart/request-stoks',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'cart/check-certificate',
                    'route'     => 'cart/check-certificate',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'login',
                    'route'     => 'content/login',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'auth/<key>',
                    'route'     => 'auth/registration',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'logup',
                    'route'     => 'content/logup',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'backet',
                    'route'     => 'cart/backet',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => 'backettest',
                    'route'     => 'cart/backettest',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => '',
                    'route'     => 'content/index',
                    'suffix'    => ''
                ],


                [
                    'pattern'   => '<alias>/page/<page>',
                    'route'     => 'catalog/category',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => '<alias>',
                    'route'     => 'catalog/category',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => '<alias>/<name_alt>',
                    'route'     => 'catalog/product',
                    'suffix'    => ''
                ],
                [
                    'pattern'   => '<_c>/<_a>',
                    'route'     => '<_c>/<_a>',
                    'suffix'    => '',
                ],

            ],
        ],
        'language'     => 'ru-RU',
        'i18n'         => [
            'translations' => [
                '*' => [
                    'class'    => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@app/messages',
                ],
            ],
        ],
        // выключаем bootstap
//        'assetManager' => [
//            'appendTimestamp' => true,
//            'bundles' => [
//                'yii\bootstrap\BootstrapAsset' => [
//                    'css'   => [],
//                ],
//                'yii\bootstrap\BootstrapPluginAsset' => [
//                    'js'    =>[]
//                ],
//            ],
//        ],
    ],
    'params' => $params,
];
