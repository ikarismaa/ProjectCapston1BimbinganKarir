<?php
/*
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); 
|
*/


use App\Http\Controllers\DokterController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\PoliController;
use App\Http\Controllers\ObatController;
use App\Http\Controllers\DashboardAdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JadwalPeriksaController;
use App\Http\Controllers\DaftarPoliController;
use App\Http\Controllers\PeriksaController;
use App\Http\Controllers\RiwayatPasienController;
use Illuminate\Support\Facades\Route;


Route::resource('dokters', DokterController::class)->except(['create', 'edit']);
Route::resource('pasien', PasienController::class)->except(['create', 'edit']);
Route::resource('polis', PoliController::class)->except(['create', 'edit']);
Route::resource('obats', ObatController::class)->except(['create', 'edit']);
Route::get('/dokter/count', [DashboardAdminController::class, 'countDokters']);
Route::get('/pasiens/count', [DashboardAdminController::class, 'countPasiens']);
Route::get('/poli/count', [DashboardAdminController::class, 'countPolies']);
Route::post('/register', [PasienController::class, 'register']);
Route::post('/loginuser', [LoginController::class, 'login']);
Route::post('/login', [AuthController::class, 'login']);
//Route::get('/jadwal-periksa', [JadwalPeriksaController::class, 'index']);
Route::get('/jadwal-periksa/{id}', [JadwalPeriksaController::class, 'show']);
Route::post('/jadwal-periksa', [JadwalPeriksaController::class, 'store']);
Route::get('/jadwal-periksa', [JadwalPeriksaController::class, 'fetchJadwal']);
Route::put('/jadwal-periksa/{id}', [JadwalPeriksaController::class, 'update']);
Route::delete('/jadwal-periksa/{id}', [JadwalPeriksaController::class, 'destroy']);


Route::get('/jadwalperiksa/poli/{id_poli}', [DaftarPoliController::class, 'getJadwalByPoli']);
Route::post('/daftar-poli', [DaftarPoliController::class, 'store']);
Route::get('/riwayat-pasien/{id_pasien}', [DaftarPoliController::class, 'riwayatPasien']);
Route::put('/daftar-poli/{id}/status', [DaftarPoliController::class, 'updateStatus']);


Route::get('/periksa/{id_dokter}', [PeriksaController::class, 'index']);
Route::post('/periksa', [PeriksaController::class, 'store']);
Route::get('/periksa/detail/{id}', [PeriksaController::class, 'show']);
Route::get('/periksa/riwayat/{id}', [PeriksaController::class, 'detailRiwayat']);
Route::put('/periksa/update/{id}', [PeriksaController::class, 'update']);

Route::get('/pasienss/riwayat/{id_dokter}', [RiwayatPasienController::class, 'index']);
Route::get('/pasienss/{id_pasien}/detail-pasien', [RiwayatPasienController::class, 'detail']);
Route::get('/detail-riwayat-pasien/{id}', [RiwayatPasienController::class, 'detailByIdDaftarPoli']);
