<?php

/**
 * Timezpne Model
 *
 * Timezpne Model manages Timezpne operation.
 *
 * @category   Timezpne
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

class Timezone extends Model
{
    protected $table   = 'timezone';
    public $timestamps = false;
}
