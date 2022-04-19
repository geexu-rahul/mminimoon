<?php

/**
 * UsersVerification Model
 *
 * UsersVerification Model manages UsersVerification operation.
 *
 * @category   UsersVerification
 * @package    Minimoon
 * @author     Geexu Dev Team
 * @copyright  2022 GeexuTechnology
 * @license
 * @version    2.7
 * @link       https://www.geexu.in/
 * @since      Version 1.3
 * @deprecated None
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsersVerification extends Model
{
    protected $table = 'users_verification';

    public $timestamps = false;

    public $appends = ['verified_number'];

    public function getVerifiedNumberAttribute()
    {
        $nm = 0;

        if ($this->attributes['email'] == 'yes') {
            $nm++;
        }
        if ($this->attributes['linkedin'] == 'yes') {
            $nm++;
        }
        if ($this->attributes['facebook'] == 'yes') {
            $nm++;
        }
        if ($this->attributes['google'] == 'yes') {
            $nm++;
        }

        return $nm;
    }
}