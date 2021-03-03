<?php

namespace common\models; 

use Yii; 

/** 
 * This is the model class for table "stocks". 
 * 
 * @property integer $id
 * @property string $title_ru
 * @property string $title_uk
 * @property string $title_en
 * @property string $alias
 * @property string $img_ru
 * @property string $not_cat
 * @property string $text_ru
 * @property string $text_en
 * @property string $format
 * @property integer $status
 * @property integer $date_start
 * @property integer $date_to
 * @property integer $percent
 * @property integer $type
 * @property string $condition
 */ 
class Stocks extends \common\components\BaseActiveRecord
{ 
    /** 
     * @inheritdoc 
     */ 
    public static function tableName() 
    { 
        return 'stocks'; 
    } 

    /** 
     * @inheritdoc 
     */ 
    public function rules() 
    { 
        return [
            [['title_ru', 'img_ru', 'text_ru', 'type', 'condition', 'percent'], 'required'],
            [['text_ru', 'alias'], 'string'],
            [['status', 'date_start', 'date_to', 'type', 'percent'], 'integer'],
            [['title_ru'], 'string', 'max' => 255],
            [['not_cat'], 'string', 'max' => 200],
            [['img_ru', 'alias'], 'string', 'max' => 500],
            [['condition'], 'string', 'max' => 150],
        ]; 
    } 

    /** 
     * @inheritdoc 
     */ 
    public function attributeLabels() 
    { 
        return [ 
            'id' => Yii::t('app', 'Ид'),
            'title_ru' => Yii::t('app', 'Название'),
            'img_ru' => Yii::t('app', 'Картинка'),
            'text_ru' => Yii::t('app', 'Текст'),
            'status' => Yii::t('app', 'Статус'),
            'date_start' => Yii::t('app', 'Дата активации'),
            'date_to' => Yii::t('app', 'Дата окончания'),
            'type' => Yii::t('app', 'Тип акции'),
            'condition' => Yii::t('app', 'Условие'),
            'percent' => Yii::t('app', 'Процент'),
            'not_cat' => Yii::t('app', 'Не распрстраняется на категории'),
            'alias' => Yii::t('app', 'Alias'),
        ]; 
    } 
} 