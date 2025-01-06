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

// Konfigurasi Auth0 menggunakan Environment Variables
const auth0 = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN, // Ambil domain dari environment
    clientID: process.env.AUTH0_CLIENT_ID, // Ambil client ID dari environment
    redirectUri: `${window.location.origin}/callback`, // URL callback
    responseType: 'token id_token',
    scope: 'openid profile email' // Data yang dibutuhkan
});

// Fungsi untuk login
function login() {
    auth0.authorize();
}

// Fungsi untuk logout
function logout() {
    auth0.logout({
        returnTo: `${window.location.origin}`, // Halaman setelah logout
    });
}

// Fungsi untuk memproses callback dari Auth0
function handleAuthCallback() {
    auth0.parseHash((err, authResult) => {
        if (err) {
            console.error('Error parsing hash:', err);
            alert('Login failed!');
            return;
        }
        if (authResult && authResult.idToken) {
            // Menyimpan token di session storage
            sessionStorage.setItem('id_token', authResult.idToken);
            sessionStorage.setItem('access_token', authResult.accessToken);
            window.location.href = '/'; // Redirect ke halaman utama setelah login
        }
    });
}

// Memeriksa status login pada halaman utama
function checkLoginStatus() {
    const idToken = sessionStorage.getItem('id_token');
    if (idToken) {
        console.log('User is logged in');
        // Anda bisa menampilkan nama pengguna atau informasi lain
    } else {
        console.log('User is not logged in');
    }
}

// Periksa apakah ini adalah halaman callback
if (window.location.pathname === '/callback') {
    handleAuthCallback();
} else {
    checkLoginStatus();
}
