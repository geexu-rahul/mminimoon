<?php

/**
 * Withdraws Model
 *
 * Withdraws Model manages Withdraws operation.
 *
 * @category   Withdraws
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

class Withdraws extends Model
{
    protected $table = 'withdraws';

    public function users()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
    
    public function accounts()
    {
        return $this->belongsTo('App\Models\Accounts', 'account_id', 'id');
    }
}
