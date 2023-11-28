const { PrismaClient } = require('@prisma/client');
const {encryptPassword, checkPassword} = require('../../../utils/auth');
const { JWTsign } = require('../../../utils/jwt');
const ejs = require('ejs');

const prisma = new PrismaClient();

module.exports ={
    async login(req,res){
        const {email, password} = req.body;

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if(!user){
            return res.status(404).json({
                status: "Fail!!",
                message: "Email tidak ditemukan!"
            })
        }

        const isPasswordCorrect = await checkPassword(password,user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({
                status: "Fail!!!",
                message: "Password Salah!!"
            });
        }

        delete user.password
        const token = await JWTsign(user);

        return res.status(201).json({
            status: "Success!!",
            message: "Berhasil Login!!",
            data: {user, token}
        });


    },
    async whoami(req,res){
        return res.status(200).json({
            status: "Success!!",
            message: "OK",
            data: {user:req.user}
        }); 
    },
    async register(req,res){
        const {email, password,name} = req.body;

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if(user){
            return res.status(404).json({
                status: "Fail!!",
                message: "Email sudah ada!"
            })
        }

        const createUser = await prisma.user.create({
            data: {
                email,
                name,
                password: await encryptPassword(password)
            }
        });


        return res.status(201).json({
            status: "Success!!",
            message: "Berhasil Register!!",
            data:createUser
        });
    },

    async updatePass(req,res){
        const {password,confirmPassword,resetToken} = req.body;

        const user = await prisma.user.findFirst({
            where: { resetToken }
        });

        if(!user){
            return res.status(404).json({
                status: "Fail!!",
                message: "Email tidak ditemukan!"
            })
        }

        if(user.resetToken !== resetToken){
            return res.status(401).json({
                status: "Fail!!!",
                message: "Token tidak Valid!!"
            });
        }

        if(confirmPassword !== password){
            return res.status(401).json({
                status: "Fail!!!",
                message: "Password Salah!!"
            });
        }

        const updateUser = await prisma.user.update({
            where: {
                email:user.email
            },
            data: {
                resetToken:null,
                password: await encryptPassword(password)
            }
        });

        return res.status(201).json({
            status: "Success!!",
            message: "Password Berhasil Di Update!!",
        });


    },

    registerForm: async (req,res, next) =>{
        try {
            const {email, password,name} = req.body;
            const user = await prisma.user.findFirst({
                where: { email }
            });         

            if(user){
                req.flash("error", "Email sudah terdaftar!!");
                return res.redirect('/register');
            }

            const createUser = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: await encryptPassword(password)
                }
            });

            req.flash("success","Berhasil Register!!");
            return res.redirect('/login');

        } catch (e) {
            next(e)
        }
        
        
    },
    authUser: async (email,password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {email}
            });

            if (!user || !await checkPassword(password, user.password)) {
                return done(null, false, {message: 'Invalid email or password'});                
            }

            return done(null, user);
        } catch (err) {
            return done(null, false, {message: err.message});
        }
    },
    oauth: async (req,res) => {
        const token = await JWTsign({
            ...req.user,
            password: null
        });
        return res.status(201).json({
            status: "Success!!",
            message: "Berhasil Login!!",
            data: {token}
        });
    }
}
