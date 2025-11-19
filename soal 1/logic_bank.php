<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    
    $raw_saldo = isset($_POST['saldo_awal']) ? $_POST['saldo_awal'] : '';
    
    
    $clean_saldo = str_replace('.', '', $raw_saldo);
    
    $saldo_awal = floatval($clean_saldo);
    $n_bulan = filter_input(INPUT_POST, 'n_bulan', FILTER_VALIDATE_INT);

    if ($saldo_awal < 0 || $n_bulan === false || $n_bulan <= 0) {
        echo '<div style="color:#ff4d4d;text-align:center;">Input tidak valid.</div>';
        exit;
    }

    $saldo_current = $saldo_awal;
    $i = 1;
    $admin_fee = 9000;
    $threshold = 1100000;

    while ($i <= $n_bulan) {
        
        if ($saldo_current < $threshold) {
            $rate = 0.03; 
        } else {
            $rate = 0.04; 
        }

        $bunga = ($rate / 12) * $saldo_current;
        $saldo_current = ($saldo_current + $bunga) - $admin_fee;

        if ($saldo_current < 0) $saldo_current = 0;

        $i++;
    }
    
    $formatted_saldo = "Rp " . number_format($saldo_current, 0, ',', '.');
    $formatted_awal = "Rp " . number_format($saldo_awal, 0, ',', '.');

    echo '
    <div class="result-card">
        <h4 style="color:#666;font-size:12px;text-transform:uppercase;margin:0;">SALDO AKHIR ESTIMASI</h4>
        <div class="result-value">' . $formatted_saldo . '</div>
        <div class="result-details">
            Periode: <span style="color:#fff">' . $n_bulan . ' Bulan</span><br>
            Awal: <span style="color:#fff">' . $formatted_awal . '</span>
        </div>
    </div>
    ';
}
?>