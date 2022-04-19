<?php

/**
 * PropertyBeds Model
 *
 * PropertyBeds Model manages PropertyBeds operation.
 *
 * @category   PropertyBeds
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

class PropertyBeds extends Model
{
    protected $table   = 'property_beds';
    public $timestamps = false;

    public function properties()
    {
        return $this->belongsTo('App\Models\Properties', 'property_id', 'id');
    }

    public function bed_type()
    {
        return $this->hasOne('App\Models\BedType', 'bed_type_id', 'id');
    }
}
