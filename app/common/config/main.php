<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'cache'        => [
            'class'     => 'yii\caching\FileCache',
            //'cachePath' => BASE_PATH . '/runtime/cache',
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'useFileTransport' => false,
        ],
        'geo' => [
            'class' => 'common\components\GeoComponent',
        ],
        'view' => [
            'class' => 'yii\web\View',
            'renderers' => [
                'twig' => [
                    'class' => 'yii\twig\ViewRenderer',
                    'cachePath' => '@runtime/Twig/cache',
                    // Array of twig options:
                    'options' => [
                        'auto_reload' => true,
                    ],
                    'filters'    => [
                        'dump' => 'var_dump'
                    ],
                    'globals' =>
                        [
                            'Url'       => ['class' => '\yii\helpers\Url'],
                            'html'      => ['class' => '\yii\helpers\Html'],
//                            'asset'     => '\common\assets\AppAsset',
                            'Yii'       => ['class' => 'Yii'],
                            'Pages'     => ['class' => '\common\models\Pages'],
                            'Seo'       => ['class' => '\common\components\SeoComponent'],
                        ],
                    'uses' => ['yii\bootstrap'],
                ],
                // ...
            ],
        ],
//        'authClientCollection' => [
//            'class' => 'yii\authclient\Collection',
//            'clients' => [
//                'google' => [
//                    'class'             => 'yii\authclient\clients\Google',
//                    'clientId'          => '292054735331-hd06ckr08d86jgd67ubkl8p155algp57.apps.googleusercontent.com',
//                    'clientSecret'      => 'jBWJqW5OAZbGNUtQdo-kH7-7',
//                    'scope'             => 'https://www.googleapis.com/auth/plus.login',
//                    'returnUrl'         => 'http://test8.digitalforce.ua/signin',
//                    'authUrl'           => 'https://accounts.google.com/o/oauth2/auth',
////                    'redirect_uri' => 'http://test8.digitalforce.ua/',
////                    'response_type' => 'code',
////                    'accessType' => 'offline',
////                    'approvalPrompt' => 'force',
////                    'returnUrl' => 'http://test8.digitalforce.ua/auth/login/google',
//                ],
//                'facebook' => [
//                    'class'             => 'yii\authclient\clients\Facebook',
//                    'clientId'          => '1778592419124352',
//                    'clientSecret'      => '99ed2b870a7c4b3380d7f0cb7ec645b7',
////                    'returnUrl' => 'http://test8.digitalforce.ua/site/auth',
//                ],
////                'vkontakte' => [
////                    'class' => 'yii\authclient\clients\VKontakte',
////                    'clientId' => '5948551',
////                    'clientSecret' => 'QiYMf8V90sFCKJQX9cF7',
////                    'returnUrl' => 'http://test8.digitalforce.ua/',
////                    'returnUrl' => 'http://test8.digitalforce.ua/auth/login/vk',
////                ],
//            ],
//        ],
    ],
    'modules' => [
        'novaposhta' => [
            'class' => 'common\modules\novaposhta\NovaPoshta',
        ],
    ],

];
