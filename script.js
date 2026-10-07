// ======================================================
// Aktivitas 1 : DOM Selection
// Mengambil elemen HTML 
// ======================================================

// 1. Mengambil elemen input berdasarkan ID
const inputTask = document.getElementById("inputTask");

// 2. Mengambil tombol tambah berdasarkan ID
const tombol = document.getElementById("tombol");

// 3. Mengambil elemen daftar tugas berdasarkan ID
const listContainer = document.getElementById("listContainer");

// 4. Mengambil elemen jumlah tugas berdasarkan ID
const totalBelumSelesai = document.getElementById("totalBelumSelesai");
const totalSelesai = document.getElementById("totalSelesai");
const totalTotalTugas = document.getElementById("totalTotalTugas");


// ======================================================
// Aktivitas 2 : Variabel untuk Menghitung Jumlah Tugas
// ======================================================

// Variabel ini digunakan untuk menyimpan jumlah tugas
let jumlahTugas = 0;
let jumlahSelesai = 0;
let jumlahBelumSelesai = 0;


// ======================================================
// Aktivitas 3 : Memperbarui Jumlah Tugas
// ======================================================

// Fungsi untuk memperbarui jumlah tugas yang ditampilkan
function perbaruiJumlah() {

    // Menampilkan jumlah total tugas ke HTML
    totalTotalTugas.innerText = jumlahTugas;

    // Menampilkan jumlah tugas yang sudah selesai
    totalSelesai.innerText = jumlahSelesai;

    // Menampilkan jumlah tugas yang belum selesai
    totalBelumSelesai.innerText = jumlahBelumSelesai;

}


// ======================================================
// Aktivitas 4 : Membuat Fungsi Tambah To Do List
// ======================================================

// Fungsi ini digunakan untuk menambahkan tugas baru
function tambahTugas() {

    // Mengambil teks yang diketik oleh user
    // .trim() digunakan untuk menghapus spasi kosong
    const isiTugas = inputTask.value.trim();


    // --------------------------------------------------
    // Validasi Input
    // --------------------------------------------------

    // Jika input kosong, tampilkan pesan
    if (isiTugas === "") {

        alert("Kamu belum memasukkan to do list!");

        // Menghentikan fungsi
        return;
    }


    // --------------------------------------------------
    // Membuat Elemen <li> Baru
    // --------------------------------------------------

    // createElement("li") digunakan untuk membuat
    // elemen <li> baru melalui Javascript
    const liBaru = document.createElement("li");


    // Mengisi teks pada <li>
    liBaru.innerText = isiTugas;


    // --------------------------------------------------
    // Membuat Tombol Hapus
    // --------------------------------------------------

    // Membuat elemen <span> untuk tombol hapus
    const tombolHapus = document.createElement("span");


    // Mengisi simbol × sebagai tombol hapus
    tombolHapus.innerText = "\u00d7";


    // Menambahkan tombol hapus ke dalam <li>
    liBaru.appendChild(tombolHapus);


    // --------------------------------------------------
    // Menambahkan <li> ke dalam <ul>
    // --------------------------------------------------

    // appendChild() digunakan untuk menempelkan
    // elemen <li> ke dalam listContainer
    listContainer.appendChild(liBaru);


    // --------------------------------------------------
    // Event Listener Tombol Hapus
    // --------------------------------------------------

    tombolHapus.addEventListener("click", function(event) {

        // stopPropagation() digunakan agar ketika
        // tombol hapus diklik, tugas tidak ikut berubah
        // menjadi selesai
        event.stopPropagation();


        // Menghapus elemen <li> dari daftar
        liBaru.remove();


        // Mengurangi jumlah total tugas
        jumlahTugas--;


        // Jika tugas yang dihapus belum selesai,
        // jumlah belum selesai dikurangi
        if (!liBaru.classList.contains("done")) {

            jumlahBelumSelesai--;

        } else {

            // Jika tugas yang dihapus sudah selesai,
            // jumlah selesai dikurangi
            jumlahSelesai--;

        }


        // Memperbarui tampilan statistik
        perbaruiJumlah();


        console.log(`DOM Tugas "${isiTugas}" telah dihapus`);

    });


    // --------------------------------------------------
    // Mengosongkan Input
    // --------------------------------------------------

    // Mengosongkan input setelah tugas ditambahkan
    inputTask.value = "";


    // --------------------------------------------------
    // Memperbarui Jumlah Tugas
    // --------------------------------------------------

    // Menambah jumlah total tugas
    jumlahTugas++;


    // Tugas yang baru ditambahkan otomatis
    // masuk ke kategori belum selesai
    jumlahBelumSelesai++;


    // Memperbarui angka statistik
    perbaruiJumlah();


    console.log(`DOM Tugas baru ditambahkan : "${isiTugas}"`);

}


// ======================================================
// Aktivitas 5 : Event Listener Tombol Tambah
// ======================================================

// Ketika tombol tambah diklik,
// jalankan fungsi tambahTugas()
tombol.addEventListener("click", function() {

    tambahTugas();

});


// ======================================================
// Aktivitas 6 : Event Listener Tombol Enter
// ======================================================

// Tugas juga dapat ditambahkan dengan menekan
// tombol Enter pada input
inputTask.addEventListener("keyup", function(event) {

    // Mengecek apakah tombol yang ditekan adalah Enter
    if (event.key === "Enter") {

        tambahTugas();

    }

});


// ======================================================
// Aktivitas 7 : Event Listener Daftar Tugas
// ======================================================

// Event listener digunakan untuk mendeteksi ketika
// tugas diklik
listContainer.addEventListener("click", function(event) {

    // Mengecek apakah yang diklik adalah <li>
    if (event.target.tagName === "LI") {

        // Mengecek apakah tugas sebelumnya sudah selesai
        const sebelumnyaSelesai =
            event.target.classList.contains("done");


        // classList.toggle() digunakan untuk menambah
        // class "done" jika belum ada dan menghapusnya
        // jika sudah ada
        event.target.classList.toggle("done");


        // Jika sebelumnya belum selesai,
        // sekarang tugas menjadi selesai
        if (!sebelumnyaSelesai) {

            jumlahBelumSelesai--;
            jumlahSelesai++;

        } else {

            // Jika sebelumnya sudah selesai,
            // sekarang tugas menjadi belum selesai
            jumlahSelesai--;
            jumlahBelumSelesai++;

        }


        // Memperbarui angka statistik
        perbaruiJumlah();


        console.log("Status tugas berhasil diperbarui");

    }

});