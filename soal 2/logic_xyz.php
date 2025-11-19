<?php

$count = 0;
$output_list = "";


$x = 1;
while ($x <= 23) {
    
    
    $y = 1;
    $max_y = 25 - $x - 1; 
    
    
    if ($max_y >= 1) {
        
        
        
        do {
            
            $z = 25 - $x - $y;
            
            
            $output_list .= '
            <div class="pair-item">
                <span>Opsi ke-' . ($count + 1) . '</span>
                <span>
                    x=<span class="hl-num">'.$x.'</span>, 
                    y=<span class="hl-num">'.$y.'</span>, 
                    z=<span class="hl-num">'.$z.'</span>
                </span>
            </div>';
            
            $count++;
            $y++; 
            
        } while ($y <= $max_y);
    }
    
    $x++;
}


echo '
<div class="summary-card">
    <div class="label-count">TOTAL KEMUNGKINAN</div>
    <div class="total-count">' . $count . '</div>
    <div class="label-count" style="margin-top:5px; color:#555;">Pasangan Ditemukan</div>
</div>

<div class="label-count" style="text-align:left; margin-bottom:10px;">DAFTAR RINCIAN:</div>
<div class="scroll-box">
    ' . $output_list . '
</div>
';
?>