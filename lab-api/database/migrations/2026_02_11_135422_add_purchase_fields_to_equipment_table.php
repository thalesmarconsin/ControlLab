<?php
// database/migrations/xxxx_xx_xx_xxxxxx_add_purchase_fields_to_equipment_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('equipment', function (Blueprint $table) {
            // Adiciona a coluna serial_number se não existir
            if (!Schema::hasColumn('equipment', 'serial_number')) {
                $table->string('serial_number', 100)->nullable()->after('model');
            }
            
            // Adiciona a coluna purchase_date
            if (!Schema::hasColumn('equipment', 'purchase_date')) {
                $table->date('purchase_date')->nullable()->after('status');
            }
            
            // Adiciona a coluna purchase_value
            if (!Schema::hasColumn('equipment', 'purchase_value')) {
                $table->decimal('purchase_value', 10, 2)->nullable()->after('purchase_date');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('equipment', function (Blueprint $table) {
            $table->dropColumn([
                'serial_number',
                'purchase_date',
                'purchase_value'
            ]);
        });
    }
};