const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const qr = require('node-qr-image');
const imagekit = require('../../../utils/imagekit');

module.exports = {
    uploadImage: async (req,res) => {
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        console.log(req.body);
        res.status(200).json({
            stats: true,
            message: 'Berhasil Upload',
            data: {
                image_url : imageUrl
            }
        })
    },
    uploadDocument: async (req,res) => {
        const docUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
        console.log(req.body);
        res.status(200).json({
            stats: true,
            message: 'Berhasil Upload',
            data: {
                image_url : docUrl
            }
        })
    },
    uploadVideo: async (req,res) => {
        const videoUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
        console.log(req.body);
        res.status(200).json({
            stats: true,
            message: 'Berhasil Upload',
            data: {
                image_url : videoUrl
            }
        })
    },
    qrcode: async (req,res) => {
        const { url } = req.body;

        const qrCode = qr.image(url, { type: 'png' });
        res.setHeader("Content-Type", "image/png");
        qrCode.pipe(res);
        // console.log(qrCode.pipe());

        // res.status(200).send(qrCode);
    },
    imagekitUpload: async(req,res) =>{
        try {
            const stringFile = req.file.buffer.toString('base64');
            // mengubah file menjadi string dengan encoding base64

            const uploadFile = await imagekit.upload({
                fileName: req.file.originalname,
                file: stringFile
            });

            // mengembalikan response ke client
            return res.status(200).json({
                status: 'OK',
                message: 'Success',
                data: {
                    name: uploadFile.name,
                    url: uploadFile.url,
                    type: uploadFile.fileType
                }
            })

        } catch (err) {
            throw err;
        }
    }
}