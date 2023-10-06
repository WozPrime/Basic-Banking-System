import { BankAccount } from "./bank_account.js";
const bankAccount = new BankAccount(0);
// $("#inputSaldo").onclick(function(){});

// Set TIMEOUT Reset Saldo
document.getElementById("resetSaldo").onclick = function resetBankSystem() {
        if (confirm("Apakah anda yakin untuk mereset Saldo (Saldo akan hilang dalam 3 detik)")){
            setTimeout(
                ()=> {
                    bankAccount.withdraw(bankAccount.getSaldo());
                    document.getElementById("showSaldo").innerHTML = "";
                },3000
            );
        }
}

// mengubah menjadi format Rupiah
function formatSaldo(saldo) {
    return saldo.toLocaleString("id-ID");
}

// Validasi saldo jika masih kosong
function cekSaldo(saldo) {
    if (saldo <= 0){
        alert("Saldo Masih Kosong!!!")
        return false;
    }
    return true
}

// Memperbarui Saldo
function updateSaldo() {
    let saldo = bankAccount.getSaldo();
    document.getElementById("showSaldo").innerHTML = "Rp "+formatSaldo(saldo);
}

// Input Saldo Awal
document.getElementById("inputSaldo").onclick = function () {
    let InputSaldo = Number(prompt("Masukkan Saldo !!!"));
    // $("#saldoInput").val();
    // let cekInputSaldo = document.getElementById("saldoInput").value;
    
    // cek input minus
    if (InputSaldo <= 0) {
        // $("#showSaldo").text();
        console.log(InputSaldo);
        alert("Saldo tidak Boleh Kurang Dari NOL!!!");
        InputSaldo = 0;
    }
    // Input menjadi Saldo Awal
    bankAccount.deposit(InputSaldo);
    updateSaldo();
}


// Memilih fitur withdraw atau deposit
function pilihFitur() {
    let cekFitur = document.getElementById("fiturSaldo").value;

    if (cekFitur == "1") {
        // User memilih untuk menambah Saldo
        let validasi = cekSaldo(bankAccount.getSaldo());
        // cek Saldo masih kosong atau tidak
        if (validasi) {
            let depo = prompt("Masukkan nominal yang ingin di deposit!!!");
            bankAccount.deposit(depo);
            updateSaldo();
        } else {
            alert("Tambahkan Saldo terlebih dahulu!!!");
        }
                
    } else if(cekFitur == "2"){
        // User memilih untuk mengurangi Saldo
        let validasi = cekSaldo(bankAccount.getSaldo());
        // cek Saldo masih kosong atau tidak
        if (validasi) {
            let tarik = prompt("Masukkan nominal yang ingin di kurangi!!!");
            bankAccount.withdraw(tarik);
            updateSaldo();
        } else {
            alert("Tambahkan Saldo terlebih dahulu!!!");
        }
    } else {
        // tidak ada Fitur yang dipilih
        alert("Pilih Fitur dengan Benar!!");
    }

}
    // trigger klik submit
    document.getElementById("tombolFitur").addEventListener("click",pilihFitur);

