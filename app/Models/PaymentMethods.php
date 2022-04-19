<?php

/**
 * PaymentMethods Model
 *
 * PaymentMethods Model manages PaymentMethods operation.
 *
 * @category   PaymentMethods
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

class PaymentMethods extends Model
{
    protected $table   = 'payment_methods';
    public $timestamps = false;

    public function accounts()
    {
        return $this->hasMany('App\Models\Account', 'payment_method_id', 'id');
    }

    public function payout_settings()
    {
        return $this->belongsTo('App\Models\PayoutSetting', 'type', 'id');
    }

    public function bookings()
    {
        return $this->hasMany('App\Models\Bookings', 'payment_method_id', 'id');
    }
}
