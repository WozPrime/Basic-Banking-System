export class BankAccount {
    constructor(awalSaldo = 0){
        this.saldo = awalSaldo
    }

    getSaldo(){
        return this.saldo
    }

    deposit(nominal){
        try {
            this.saldo += +nominal
        } catch (e) {
            console.log("Bukan Angka");
        }
    }

    withdraw(nominal){
        if (this.saldo < +nominal) {
            throw new Error ("Saldo Tidak Cukup");
        }
        try {
            this.saldo -= +nominal
        } catch (e) {
            console.log("Bukan Angka");
        }
    }
}