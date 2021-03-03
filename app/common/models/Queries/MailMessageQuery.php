<?php

namespace common\models\Queries;

/**
 * This is the ActiveQuery class for [[\common\models\MailMessage]].
 *
 * @see \common\models\MailMessage
 */
class MailMessageQuery extends \common\components\BaseActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * @inheritdoc
     * @return \common\models\MailMessage[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return \common\models\MailMessage|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
