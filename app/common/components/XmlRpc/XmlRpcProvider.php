<?php

/**
 * Created by PhpStorm.
 * User: vitaliy
 * Date: 05.04.18
 * Time: 19:34
 */
namespace common\components\XmlRpc;

class XmlRpcProvider
{
    /** {@inheritdoc} */
    public static function serialize($method, array $params = [])
    {
        $toBeVisited = [&$params];
        while (isset($toBeVisited[0]) && ($value =& $toBeVisited[0])) {
            $type = gettype($value);
            if ($type === 'array') {
                foreach ($value as &$child) {
                    $toBeVisited[] =& $child;
                }
            } elseif ($type === 'object') {
                if ($value instanceof DateTime) {
                    $value = $value->format('c');
                    xmlrpc_set_type($value, 'datetime');
                } elseif ($value instanceof Base64Interface) {
                    $value = $value->getDecoded();
                    xmlrpc_set_type($value, 'base64');
                } else {
                    $value = get_object_vars($value);
                }
            } elseif ($type === 'resource') {
                throw SerializationException::invalidType($value);
            }
            array_shift($toBeVisited);
        }
        return xmlrpc_encode_request($method, $params, ['encoding' => 'UTF-8', 'escaping' => 'markup', 'verbosity' => 'no_white_space']);
    }
    
}