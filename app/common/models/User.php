<?php
namespace common\models;

use Yii;
use yii\base\NotSupportedException;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * User model
 *
 * @property integer $id
 * @property string $username
 * @property string $patronymic
 * @property string $lastname
 * @property string $phone
 * @property string $city
 * @property string $password_hash
 * @property string $password_reset_token
 * @property string $email
 * @property string $auth_key
 * @property integer $status
 * @property integer $created_at
 * @property integer $updated_at
 * @property integer $date_birthday
 * @property integer $bonus_balans
 * @property integer $bonus_added
 * @property string $password write-only password
 */
class User extends ActiveRecord implements IdentityInterface
{
    const STATUS_DELETED = 0;
    const STATUS_ACTIVE = 10;


    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%user}}';
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'timestamp' => [
                'class' => \yii\behaviors\TimestampBehavior::className(),
                'createdAtAttribute' => 'created_at',
                'updatedAtAttribute' => 'updated_at',
            ],

        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['status', 'default', 'value' => self::STATUS_ACTIVE],
            ['status', 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_DELETED]],
            [['phone'], 'string'],
            [['email'],'unique'],
            [['bonus_balans', 'bonus_added'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('"findIdentityByAccessToken" is not implemented.');
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * Finds user by password reset token
     *
     * @param string $token password reset token
     * @return static|null
     */
    public static function findByPasswordResetToken($token)
    {
        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }

        return static::findOne([
            'password_reset_token' => $token,
            'status' => self::STATUS_ACTIVE,
        ]);
    }

    /**
     * Finds out if password reset token is valid
     *
     * @param string $token password reset token
     * @return bool
     */
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }

        $timestamp = (int) substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }
    public function getImg() {


        $table_name = 'user';
       // var_dump($_SERVER['DOCUMENT_ROOT']);die();
       // var_dump(  is_file($_SERVER['DOCUMENT_ROOT'].'/images/'. $table_name.'/'.Yii::$app->user->identity->id.".1.b.jpg"));die();
            if( is_file($_SERVER['DOCUMENT_ROOT'].'/images/'. $table_name.'/'.Yii::$app->user->identity->id.".1.b.jpg"))
            {
                $res =[
                    'bimg'  =>   '/images/'. $table_name.'/'.$this->owner->id.".1.b.jpg",
                    'simg'  =>   '/images/'. $table_name.'/'.$this->owner->id.".1.s.jpg"
                ];
                //      $res['simg'] =  ;
            }
            elseif( is_file($_SERVER['DOCUMENT_ROOT'].'/images/'. $table_name.'/'.Yii::$app->user->identity->id.".1.b.png"))
            {
                $res =[
                    'bimg'  =>   '/images/'. $table_name.'/'.$this->owner->id.".1.b.png",
                    'simg'  =>   '/images/'. $table_name.'/'.$this->owner->id.".1.s.png"
                ];
            }
            else
            {
                $res =[
                    'bimg'  =>   '/images/upload.png',
                    'simg'  =>   '/images/upload.png'
                ];
            }


        //    var_dump($res);die();
        return $res;
    }
    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    /**
     * Generates password hash from password and sets it to the model
     *
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {
        $this->auth_key = strtolower(Yii::$app->security->generateRandomString());
    }

    /**
     * Generates new password reset token
     */
    public function generatePasswordResetToken()
    {
        $this->password_reset_token = strtolower(Yii::$app->security->generateRandomString() . '_' . time());
    }

    /**
     * Removes password reset token
     */
    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }
    
    /**
     * Get user bookmarks
     * @return type
     */
    public function getMessenges()
    {
        return $this->hasMany(Dialogs::className(), ['user_from' => 'id']);
    }
    public function getAddress()
    {
        return $this->hasMany(AddressDelivery::className(), ['user_id' => 'id']);
    }
    public function getOrders()
    {
        return $this->hasMany(Orders::className(), ['user_id' => 'id'])->orderBy(['id' => SORT_DESC]);
    }
    
    /**
     * Get user locality
     * @return type
     */
    public function getLocality()
    {
        return $this->hasOne(Localities::className(), ['id' => 'city_id']);
    }
}