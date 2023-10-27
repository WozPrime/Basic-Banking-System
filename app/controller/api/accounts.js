const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    async get(req,res){
        // const {search, page, limit} = req.query;
        let result = await prisma.bankAccount.findMany({include:{user:true}});
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
        const account = await prisma.bankAccount.findUnique(
            {where:
                {
                    id: +req.params.id
                },
                include:{
                    user:{
                        include:{
                            profile:true
                        }
                    }
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
            const user = await prisma.user.findUnique(
                {where:
                    {
                        id: +req.body.userId
                    }},
                );
            if(user){
                const accounts = await prisma.bankAccount.create({data:req.body});
                return res.status(201).json({
                    status: 'success',
                    code: 200,
                    message: 'Akun Bank berhasil ditambahkan',
                    data: accounts
                }); 
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