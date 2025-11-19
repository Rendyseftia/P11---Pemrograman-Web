document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bankForm');
    const resultArea = document.getElementById('result-area');
    const submitBtn = document.querySelector('.btn-submit');
    
    const saldoInput = document.getElementById('saldo');
    const errorText = document.getElementById('error-msg');

   
    saldoInput.addEventListener('input', function(e) {
        let originalValue = this.value;
        
        
        
        if (/[^0-9.]/.test(originalValue)) {
            showError(true);
        } else {
            showError(false);
        }

        
        let cleanNumbers = originalValue.replace(/[^0-9]/g, '');

        
        if (cleanNumbers !== "") {
            this.value = formatRupiah(cleanNumbers);
        } else {
            this.value = "";
        }
    });

    function showError(isError) {
        if (isError) {
            errorText.style.display = 'block'; 
            saldoInput.classList.add('input-error'); 
            
            
            setTimeout(() => {
                errorText.style.display = 'none';
                saldoInput.classList.remove('input-error');
            }, 1500);
        } else {
            errorText.style.display = 'none';
            saldoInput.classList.remove('input-error');
        }
    }

    function formatRupiah(angka) {
        // Logika pemisah ribuan manual yang paling stabil
        let number_string = angka.toString();
        let sisa = number_string.length % 3;
        let rupiah = number_string.substr(0, sisa);
        let ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        return rupiah;
    }

    // 2. Event Listener Form Submit (AJAX)
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Tombol loading state
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "MENGHITUNG...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";

        const formData = new FormData(this);

        fetch('logic_bank.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            resultArea.style.display = 'block';
            resultArea.innerHTML = data;
            
            
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
        })
        .catch(error => {
            console.error('Error:', error);
            resultArea.innerHTML = '<p style="color:red;text-align:center;">Terjadi kesalahan koneksi.</p>';
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        });
    });
});