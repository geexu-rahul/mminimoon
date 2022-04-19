<?php

/**
 * BedType Model
 *
 * BedType Model manages BedType operation.
 *
 * @category   BedType
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
use Illuminate\Support\Facades\Cache;

class BedType extends Model
{
    protected $table    = 'bed_type';
    public $timestamps  = false;

    public static function getAll()
    {
        $data = Cache::get(config('cache.prefix') . '.property.types.bed');
        if (empty($data)) {
            $data = parent::all();
            Cache::forever(config('cache.prefix') . '.property.types.bed', $data);
        }
        return $data;
    }
}
