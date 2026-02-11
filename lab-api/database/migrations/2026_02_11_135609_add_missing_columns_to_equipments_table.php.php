<?php
// database/migrations/xxxx_xx_xx_xxxxxx_add_missing_columns_to_equipment_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('equipment', function (Blueprint $table) {
            // Adiciona serial_number se não existir
            if (!Schema::hasColumn('equipment', 'serial_number')) {
                $table->string('serial_number', 100)->nullable()->after('model');
            }
            
            // Adiciona purchase_date se não existir
            if (!Schema::hasColumn('equipment', 'purchase_date')) {
                $table->date('purchase_date')->nullable()->after('status');
            }
            
            // Adiciona purchase_value se não existir
            if (!Schema::hasColumn('equipment', 'purchase_value')) {
                $table->decimal('purchase_value', 10, 2)->nullable()->after('purchase_date');
            }
        });
    }

    public function down(): void
    {
        Schema::table('equipment', function (Blueprint $table) {
            if (Schema::hasColumn('equipment', 'serial_number')) {
                $table->dropColumn('serial_number');
            }
            if (Schema::hasColumn('equipment', 'purchase_date')) {
                $table->dropColumn('purchase_date');
            }
            if (Schema::hasColumn('equipment', 'purchase_value')) {
                $table->dropColumn('purchase_value');
            }
        });
    }
};