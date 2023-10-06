export class BankAccount {
    constructor(awalSaldo = 0){
        this.saldo = awalSaldo
    }

    getSaldo(){
        return this.saldo
    }

    deposit(amount){
        try {
            this.saldo += +amount
        } catch (e) {
            console.log("Bukan Angka");
        }
    }

    withdraw(amount){
        if (this.saldo < +amount) {
            throw new Error ("Saldo Tidak Cukup");
        }
        try {
            this.saldo -= +amount
        } catch (e) {
            console.log("Bukan Angka");
        }
    }
}