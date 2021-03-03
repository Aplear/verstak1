<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/main.min.css',
        //'css/scrollup.css',
        //'css/collapse.css',
        //'slick/slick.css',
        //'slick/slick-theme.css',
       //'carousels/lib/css/sliderkit-core.css',
       // 'carousels/lib/css/sliderkit-demos.css',

        //'css/owl.carousel.min.css'
    ];
    public $js = [
     //   'js/vendor.js',
        //    'js/main2.js',
       //'js/main.min.js',
        //'js/script.min.js',
      //'js/owl.carousel.js',
        //'slick/slick.min.js',
       //'js/jquery.maskedinput.min.js',
       //'js/jquery.snow.js',
      //'js/scrollup.js',
      //'js/devbridgeautocomplete.js',
      //'js/collapse.js',
       //'js/click-carousel.js',
       //'carousels/lib/js/jquery.easing.1.3.min.js',
       //'carousels/lib/js/jquery.mousewheel.min.js',

      //  'js/font-all.js',

    ];
    public $depends = [
  //     'yii\web\YiiAsset',
   //    'yii\bootstrap\BootstrapAsset',
    ];
}
#FF7513
