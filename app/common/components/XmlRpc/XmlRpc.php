<?php

/**
 * Created by PhpStorm.
 * User: vitaliy
 * Date: 05.04.18
 * Time: 18:39
 */

namespace common\components\XmlRpc;

use yii\db\Exception;
use Yii;

class XmlRpc
{

    private $name = null;
    private $method = null;
    private $options = ['encoding' => 'UTF-8',];

    public  $response = [];

    private function initialize()
    {
    	$fopen = ini_get('allow_url_fopen');

    	/*if(!$fopen) {
   			exit('Allow url fopen disable');
		}*/

        /*$extension = get_loaded_extensions();

        if(!in_array('xmlrpc', $extension))
        {
            exit('Extension XmlRpc is not load');
        }*/
    }

    public function __construct($name, $method, $options)
    {
        $this->initialize();

        $this->name = $name;
        $this->method = $method;
        $this->options = $options;
    }

    public function getResponse(){
        return $this->response;
    }

    public function setResponse($response){
        $this->response = $response;
    }

    private function  getLastError()
    {
    	$error = error_get_last();
     	var_dump($error);
  	}

    public function sendRequest()
    {
		$request = xmlrpc_encode_request($this->method,$this->options,['encoding'=>'UTF-8','escaping'=>'markup']);
        $ports = [
            'android' => '8087',
            'telegram' => '8088',
        ];

        if (isset($this->options['source']) && isset($ports[$this->options['source']])) {
            $port = $ports[$this->options['source']];
        } else {
            $port = '8089';
        }

        $server = 'http://178.151.68.80:' . $port;

        $opts = [
            'http' => [
                'method' =>' Post',
                'header' => 'Content-Type: text/xml',
                'content' => $request,
            ],
        ];
        $context = stream_context_create($opts);
		//var_dump($request);//die();
		try {
        	$content = file_get_contents($server, false, $context);
			//var_dump($content);
        	if ($content === false) {
        		//Handle errors
 				$this->getLastError();
    		}
		} catch (Exception $e) {
    		// Handle exception
    			return $e->getMessage();//false;
		}


        $response = xmlrpc_decode($content);






        if(is_array($response))
        {
            $this->setResponse($response);

            $messageLog = [
                'status' => 'Заказ ушел в Д2.',
                'post' => $response
            ];

            Yii::info($messageLog, 'payment'); //запись в лог

            if(xmlrpc_is_fault($response))
            {
                $messageLog = [
                    'status' => 'Ошибка.',
                    'post' => $response
                ];

                Yii::info($messageLog, 'payment'); //запись в лог

                //var_dump($response);exit;
                return $response;
            }

            return  $response;
            //return true;
        }

    }

}
