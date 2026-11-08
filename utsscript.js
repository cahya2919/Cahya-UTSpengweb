var formRegistrasi = document.getElementById("form-registrasi");
if (formRegistrasi) {
    formRegistrasi.addEventListener("submit", function (e) {
        e.preventDefault(); 
        var nama = document.getElementById("nama").value;
        alert("Terima kasih, " + nama + "! Pendaftaran anggota berhasil.");
        formRegistrasi.reset();
    });
}

var formReservasi = document.getElementById("form-reservasi");
if (formReservasi) {
    formReservasi.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Reservasi berhasil dikirim! Kami akan menghubungi kamu segera.");
        formReservasi.reset();
    });
}

var daftarKeranjang = document.getElementById("daftar-keranjang");
if (daftarKeranjang) {
    var keranjang = [];

    try { keranjang = JSON.parse(localStorage.getItem("keranjang")) || []; } catch (err) { keranjang = []; }

    function rupiah(angka) {
        return "Rp " + angka.toLocaleString("id-ID");
    }

    function tampilkanKeranjang() {
        var html = "";
        var total = 0;
        for (var i = 0; i < keranjang.length; i++) {
            var item = keranjang[i];
            total += item.harga * item.jumlah;
            html += "<li>" + item.nama + " - " + rupiah(item.harga) +
                " <button data-aksi='kurang' data-index='" + i + "'>-</button> " + item.jumlah +
                " <button data-aksi='tambah' data-index='" + i + "'>+</button></li>";
        }
        if (keranjang.length === 0) html = "<li>Keranjang masih kosong.</li>";
        daftarKeranjang.innerHTML = html;
        document.getElementById("total-harga").textContent = rupiah(total);
        try { localStorage.setItem("keranjang", JSON.stringify(keranjang)); } catch (err) {}
    }

    var tombolTambah = document.querySelectorAll(".tambah");
    for (var t = 0; t < tombolTambah.length; t++) {
        tombolTambah[t].addEventListener("click", function () {
            var nama = this.getAttribute("data-nama");
            var harga = parseInt(this.getAttribute("data-harga"));
            var ada = false;
            for (var j = 0; j < keranjang.length; j++) {
                if (keranjang[j].nama === nama) { keranjang[j].jumlah++; ada = true; }
            }
            if (!ada) keranjang.push({ nama: nama, harga: harga, jumlah: 1 });
            tampilkanKeranjang();
        });
    }

    daftarKeranjang.addEventListener("click", function (e) {
        var aksi = e.target.getAttribute("data-aksi");
        if (!aksi) return;
        var index = e.target.getAttribute("data-index");
        if (aksi === "tambah") keranjang[index].jumlah++;
        else keranjang[index].jumlah--;
        if (keranjang[index].jumlah <= 0) keranjang.splice(index, 1);
        tampilkanKeranjang();
    });

    document.getElementById("btn-kosongkan").addEventListener("click", function () {
        keranjang = [];
        tampilkanKeranjang();
    });

    tampilkanKeranjang();
}
