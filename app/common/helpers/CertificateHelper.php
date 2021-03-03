<?php
namespace common\helpers;
use Yii;
use common\models\Orders;
use common\models\Certificates;

class CertificateHelper
{
    public static function getDiscountByCertificate($sum = 0, $certificate_code = 0)
    {
        $comboCategoryId = 6;
        $comboPrice = 0;
        $otherPrice = 0;

        // делим корзину на комбобосы и остальное

        $backet = Orders::getCartInfo();
        foreach ($backet['params'] as $item) {
            if($item['category_id'] == $comboCategoryId) {
                $comboPrice += $item['price'] * $item['count'];
            } else {
                $otherPrice += $item['price'] * $item['count'];
            }
        }

        // получаем скидку по сертификату

        $certificate_code = trim($certificate_code);
        $certificate_code = str_replace('-', '', $certificate_code);

        $result = Certificates::find()->where(['code' => $certificate_code])->one();
        if($result) {
            if(strtotime($result->expired_at) < time()){
                $certificate_discount = 0;
            } elseif(strtotime($result->used_at) > 0){
                $certificate_discount = 0;
            } else {
                $certificate_discount = $result->nominal;
            }
        } else {
            $certificate_discount = 0;
        }
        $certificate_nominal = $certificate_discount;

        // применяем скидку к некомбоменю

        if($certificate_discount > $otherPrice) {
            $certificate_discount = $otherPrice;
        }

        $outSum = [
            'discount' => $certificate_discount,
            'price' => number_format(($sum - $certificate_discount), 2, '.', ''),
            'code' => $certificate_code,
            'nominal' => $certificate_nominal,
            'is_valid' => $certificate_nominal? 1: 0
        ];

        return $outSum;
    }

    public static function markAsUsed($certificate_code)
    {
        $certificate_code = trim($certificate_code);
        $certificate_code = str_replace('-', '', $certificate_code);
        $result = Certificates::find()->where(['code' => $certificate_code])->one();
        if($result){
            $result->used_at = date('Y-m-d');
            $result->save();
        }
    }
}