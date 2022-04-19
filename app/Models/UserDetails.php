<?php

/**
 * UserDetails Model
 *
 * UserDetails Model manages UserDetails operation.
 *
 * @category   UserDetails
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

class UserDetails extends Model
{
    protected $table    = 'user_details';
    protected $fillable = ['user_id', 'field', 'value'];
    public $timestamps  = false;

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }

    public function fields()
    {
        return UserDetail::whereStatus('Active')->get();
    }
}
