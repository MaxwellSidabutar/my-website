// Mendapatkan referensi tombol
const button = document.getElementById("colorButton");

// Fungsi untuk mengubah warna latar belakang
function changeBackgroundColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

// Menambahkan event listener pada tombol
button.addEventListener("click", changeBackgroundColor);
