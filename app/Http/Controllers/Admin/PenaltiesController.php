<?php

/**
 * Penalties Controller
 *
 * Penalties Controller manages Penalties by admin.
 *
 * @category   Penalties
 * @package    Minimoon
 * @author     Geexu Dev Team
 * @copyright  2022 GeexuTechnology
 * @license
 * @version    2.7
 * @link       https://www.geexu.in/
 * @email      hello@geexu.in
 * @since      Version 1.3
 * @deprecated None
 */

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\DataTables\HostPenaltyDataTable;
use App\DataTables\GuestPenaltyDataTable;
use App\Models\Penalty;
use Validator;
use App\Http\Helpers\Common;

class PenaltiesController extends Controller
{
    protected $helper;
    public function __construct()
    {
        $this->helper = new Common;
    }

    public function host_penalty(HostPenaltyDataTable $dataTable)
    {
        return $dataTable->render('admin.penalty.host');
    }

    public function guest_penalty(GuestPenaltyDataTable $dataTable)
    {
        return $dataTable->render('admin.penalty.guest');
    }
}
