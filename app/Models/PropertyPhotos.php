<?php
/**
 * PropertyPhotos Model
 *
 * PropertyPhotos Model manages PropertyPhotos operation.
 *
 * @category   PropertyPhotos
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

class PropertyPhotos extends Model
{
    protected $table   = 'property_photos';
    public $timestamps = false;

    public function properties()
    {
        return $this->belongsTo('App\Models\Properties', 'property_id', 'id');
    }
}
