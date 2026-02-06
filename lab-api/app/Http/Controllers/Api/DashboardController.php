<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Laboratory;
use App\Models\Computer;
use App\Models\Equipment;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return [
            'kpis' => [
                [
                    'label' => 'Laboratórios',
                    'value' => Laboratory::count(),
                    'hint' => 'cadastrados',
                    'tone' => 'brand',
                ],
                [
                    'label' => 'Computadores ativos',
                    'value' => Computer::where('status', 'active')->count(),
                    'hint' => 'em operação',
                    'tone' => 'good',
                ],
                [
                    'label' => 'Em manutenção',
                    'value' => Computer::where('status', 'maintenance')->count(),
                    'hint' => 'computadores',
                    'tone' => 'warn',
                ],
                [
                    'label' => 'Equipamentos',
                    'value' => Equipment::count(),
                    'hint' => 'itens',
                    'tone' => 'muted',
                ],
            ],
            'latest' => [
                'computers' => Computer::with('laboratory')
                    ->orderByDesc('updated_at')
                    ->take(5)
                    ->get(),
                'equipments' => Equipment::with('laboratory')
                    ->orderByDesc('updated_at')
                    ->take(5)
                    ->get(),
            ],
        ];
    }
}
