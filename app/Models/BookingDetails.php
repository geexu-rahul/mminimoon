<?php

/**
 * BookingDetails Model
 *
 * BookingDetails Model manages BookingDetails operation.
 *
 * @category   BookingDetails
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

class BookingDetails extends Model
{
    protected $table    = 'booking_details';
    public $timestamps  = false;

    public function bookings()
    {
        return $this->belongsTo('App\Models\Bookings', 'booking_id', 'id');
    }
}
