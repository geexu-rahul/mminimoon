<?php

/**
 * Message Model
 *
 * Message Model manages Message operation.
 *
 * @category   Message
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

class MessageType extends Model
{
    protected $table    = 'message_type';
    public $timestamps  = false;

    public function messages()
    {
        return $this->hasMany('App\Models\Messages', 'type_id', 'id');
    }
}
