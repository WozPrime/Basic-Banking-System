let saldoNow;
// $("#inputSaldo").onclick(function(){});

// Untuk membuat 3 angka dibelakang ribuan
function commify(n) {
    var parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
}

document.getElementById("inputSaldo").onclick = function () {
    let cekInputSaldo = prompt("Masukkan Saldo !!!");
    let showSaldo = document.querySelector("#showSaldo");
    let awalSaldo = document.querySelector("#awalSaldo");
    // $("#saldoInput").val();
    // let cekInputSaldo = document.getElementById("saldoInput").value;
    
    if (+cekInputSaldo <= 0) {
        // $("#showSaldo").text();
        showSaldo.innerHTML = "Saldo tidak Boleh Kurang Dari NOL!!!";
    } else {
        saldoNow = +cekInputSaldo;
        awalSaldo.innerHTML = "Rp. " +commify(saldoNow);
        showSaldo.innerHTML = "Rp. " +commify(saldoNow);
    }
    
}

document.getElementById("tambahSaldo").onclick = function () {
    let showSaldo = document.querySelector("#showSaldo");
    let ket = document.querySelector("#ket");
    let field = document.querySelector("#plusInput");
    if(saldoNow == null){
        showSaldo.innerHTML = "Saldo Masih Kosong !!!";
    }else{
        plusInput = document.getElementById("plusInput").value;
        if (+plusInput == 0){
            ket.innerHTML = "Saldo tidak Bertambah";
        }else if(+plusInput < 0){
            ket.innerHTML = "Input tidak boleh minus";
        }else{
            saldoNow = (+saldoNow) + (+plusInput);
            showSaldo.innerHTML = "Rp. " +commify(saldoNow);
            ket.innerHTML = "";
            field.value = null;
    }
    }
}

document.getElementById("kurangiSaldo").onclick = function () {
    let showSaldo = document.querySelector("#showSaldo");
    let field = document.querySelector("#minusInput");
    if (saldoNow == null) {
        showSaldo.innerHTML = "Saldo Masih Kosong !!!";
    } else {
        minusInput = document.getElementById("minusInput").value;
        if (+minusInput == 0){
            ket.innerHTML = "Saldo tidak Berubah";
        }else if(+minusInput < 0){
            ket.innerHTML = "Input tidak boleh minus";
        }else{
            saldoNow = (+saldoNow) - (+minusInput);
            showSaldo.innerHTML = "Rp. " +commify(saldoNow);
            ket.innerHTML = "";
            field.value = null;
        }
    }   
    }
    

