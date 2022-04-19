<?php

/**
 * Notifications Model
 *
 * Notifications Model manages Notifications operation.
 *
 * @category   Notifications
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

class Notifications extends Model
{
    protected $table = 'notifications';

    public function users()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
}
