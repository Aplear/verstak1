<?php
namespace common\models\Queries;

/**
 * Created by PhpStorm.
 * User: nikvils
 * Date: 23.05.19
 * Time: 22:26
 */
class NewsCategoryInfoQuery extends \common\components\BaseActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * @inheritdoc
     * @return \common\models\Discounts[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return \common\models\Discounts|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }


}