const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    async get(req,res){
        // const {search, page, limit} = req.query;
        let result = await prisma.transaction.findMany({include:{sender:true,receiver:true}});
        if(!result.length) return res.status(200).json({
            status: 'success',
            code : 200,
            message: 'Data Kosong',
        });

        res.status(200).json({
            status: 'success',
            code : 200,
            message: 'Success!',
            data: result
        });
    },
    async getById(req,res){
        if(!req.params.id) res.status(400).json({
            status: 'fail',
            code : 400,
            message: 'Bad Request! id is required',
        });
    
        // const user = users.find((el)=>el.id === +req.params.id);
        const account = await prisma.transaction.findUnique(
            {where:
                {
                    id: +req.params.id
                },
                include:{
                    sender:{include:{
                        user:true
                    }},receiver:{include:{
                        user:true
                    }}
                }},
            );
    
        res.status(200).json({
            status: 'success',
            code : 200,
            message: 'Data Ditemukan',
            data: account
        });
    },
    async create(req,res){
        try {
            if(+req.body.destination_accountId == +req.body.source_accountId){
                return res.status(409).json({
                    status: 'failed',
                    code: 400,
                    message: 'Input tidak boleh sama!! Periksa Kembali Data',
                });
            }else{
                const check1 = await prisma.bankAccount.findUnique(
                    {where:
                        {
                            id: +req.body.destination_accountId
                        }},
                    );
                const check2 = await prisma.bankAccount.findUnique(
                    {where:
                        {
                            id: +req.body.source_accountId
                        }},
                    );
                    if(check1&&check2){
                        const transaction = await prisma.transaction.create({data:req.body});
                        const deposit = await prisma.bankAccount.update({
                            where :{
                                id: +req.body.destination_accountId
                            },
                            data:{
                                balance: +check1.balance + +req.body.trans_nominal
                            }
                        });
                        const withdraw = await prisma.bankAccount.update({
                            where :{
                                id: +req.body.source_accountId
                            },
                            data:{
                                balance: +check2.balance - +req.body.trans_nominal
                            }
                        });
                        return res.status(201).json({
                            status: 'success',
                            code: 200,
                            message: 'Akun Bank berhasil ditambahkan',
                            data: transaction,deposit,withdraw
                        }); 
                    }  
            }
        } catch (error) {
            return res.status(400).json({
                status: 'failed',
                code: 400,
                message: 'Input gagal!! Periksa Kembali Data',
            });  
        }
        
    },
    async update(req, res){

        const user = await prisma.bankAccount.update({
            where :{
                id: +req.params.id
            },
            data:req.body
        });

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'User berhasil diperbarui',
            // data: users[userIndex]
            data : user
        });
    }
}