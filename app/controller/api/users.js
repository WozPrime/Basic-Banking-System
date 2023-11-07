const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    async get(req,res){
        // const {search, page, limit} = req.query;
        let result = await prisma.user.findMany();
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
        const user = await prisma.user.findUnique(
            {where:
                {
                    id: +req.params.id
                },
                include:{
                    profile:true
                }},
            );
    
        res.status(200).json({
            status: 'success',
            code : 200,
            message: 'Data Ditemukan',
            data: user
        });
    },
    async create(req,res){
        try {
            const users = await prisma.user.create(
                {
                    data: 
                    {
                        email: req.body.email,
                        name: req.body.name,
                        password: req.body.password,
                        profile: 
                        {
                          create: 
                            {
                                identity_number: req.body.identity_number,
                                address: req.body.address,
                                identity_type:req.body.identity_type,
                                phone_number: req.body.phone_number
                            }
                        }
        
                    },
                    include:{
                        profile:true
                    }
        
                }
            );
    
            return res.status(201).json({
                status: 'success',
                code: 200,
                message: 'User dan Profil berhasil ditambahkan',
                data: users
            });   
        } catch (error) {
            return res.status(400).json({
                status: 'failed',
                code: 400,
                message: 'Input gagal!! Periksa Kembali Data',
            });  
        }
        
    },
    async update(req, res){

        const user = await prisma.user.update({
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
    },
    
    async destroy(req,res){
        if(!req.params.id) res.status(400).json({
            status: 'fail',
            code : 400,
            message: 'Bad Request! id is required',
        });
    
        // const userIndex = users.findIndex((el)=>el.id === +req.params.id);
        // users.splice(userIndex,1);
        const user = await prisma.user.delete({where: {
            id: +req.params.id 
        }});
    
        res.status(200).json({
            status: 'success',
            code : 200,
            message: 'Data berhasil dihapus',
            data: user
        });
    }
}