<?php

/**
 * Banners Model
 *
 * Banners Model manages Banners operation.
 *
 * @category   Banners
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

class Banners extends Model
{
    protected $table    = 'banners';
    public $timestamps  = false;
    public $appends     = ['image_url'];

    public function getImageUrlAttribute()
    {
        return url('/').'/public/front/images/banners/'.$this->attributes['image'];
    }
}
