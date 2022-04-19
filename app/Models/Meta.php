<?php

/**
 * Metas Model
 *
 * Metas Model manages Metas operation.
 *
 * @category   Metas
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

class Meta extends Model
{
    protected $table   = 'seo_metas';
    public $timestamps = false;
}
