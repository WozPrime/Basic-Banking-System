import { BankAccount } from "./banking_system.js";
const bankAccount = new BankAccount(0);
// $("#inputSaldo").onclick(function(){});

// Untuk membuat 3 angka dibelakang ribuan
function formatSaldo(saldo) {
    return saldo.toLocaleString("id-ID");
}

function cekSaldo(saldo) {
    if (saldo <= 0){
        alert("Saldo Masih Kosong!!!")
        return false;
    }
    return true
}

function updateSaldo() {
    let saldo = bankAccount.getSaldo();
    document.getElementById("showSaldo").innerHTML = "Rp "+formatSaldo(saldo);

    
}

document.getElementById("inputSaldo").onclick = function () {
    let InputSaldo = Number(prompt("Masukkan Saldo !!!"));
    // $("#saldoInput").val();
    // let cekInputSaldo = document.getElementById("saldoInput").value;
    
    if (InputSaldo <= 0) {
        // $("#showSaldo").text();
        document.getElementById("showSaldo").innerHTML = "Saldo tidak Boleh Kurang Dari NOL!!!";
    }
    bankAccount.deposit(InputSaldo);
    updateSaldo();
    
}

function pilihFitur() {
    let cekFitur = document.getElementById("fiturSaldo").value;

    if (cekFitur == "1") {
        let validasi = cekSaldo(bankAccount.getSaldo());
        if (validasi) {
            let depo = prompt("Masukkan nominal yang ingin di deposit!!!");
            bankAccount.deposit(depo);
            updateSaldo();
        } else {
            alert("Tambahkan Saldo terlebih dahulu!!!");
        }
                
    } else if(cekFitur == "2"){
        let validasi = cekSaldo(bankAccount.getSaldo());
        if (validasi) {
            let tarik = prompt("Masukkan nominal yang ingin di kurangi!!!");
            bankAccount.withdraw(tarik);
            updateSaldo();
        } else {
            alert("Tambahkan Saldo terlebih dahulu!!!");
        }
    } else {
        alert("Pilih Fitur dengan Benar!!");
    }

}
    
    document.getElementById("tombolFitur").addEventListener("click",pilihFitur);

