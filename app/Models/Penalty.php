<?php

/**
 * Penalty Model
 *
 * Penalty Model manages Penalty operation.
 *
 * @category   Penalty
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

class Penalty extends Model
{
    protected $table = 'penalty';

    public function bookings()
    {
        return $this->belongsTo('App\Models\Bookings', 'booking_id', 'id');
    }

    public function payout_penalties()
    {
        return $this->hasMany('App\Models\PayoutPenalties', 'penalty_id', 'id');
    }
}
