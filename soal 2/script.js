document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('xyzForm');
    const resultArea = document.getElementById('result-area');
    const submitBtn = document.querySelector('.btn-submit');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const originalText = submitBtn.innerText;
        submitBtn.innerText = "MENGHITUNG...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";

        
        fetch('logic_xyz.php')
            .then(response => response.text())
            .then(data => {
                resultArea.style.display = 'block';
                resultArea.innerHTML = data;
                
                submitBtn.innerText = "HITUNG ULANG";
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
            })
            .catch(error => {
                console.error('Error:', error);
                resultArea.innerHTML = '<p style="color:red;text-align:center;">Gagal mengambil data.</p>';
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
    });
});