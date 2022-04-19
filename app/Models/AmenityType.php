<?php

/**
 * AmenityType Model
 *
 * AmenityType Model manages AmenityType operation.
 *
 * @category   AmenityType
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

class AmenityType extends Model
{
    protected $table    = 'amenity_type';
    public $timestamps  = false;

    public function amenities()
    {
        return $this->hasMany('App\Models\Amenities', 'type_id', 'id');
    }
}
