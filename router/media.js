const express = require('express');
const router = express.Router();
const storage = require('../utils/multer')
const controller = require('../app/controller/api');
const multer = require('multer')();

router.use('/images', express.static('public/images'));
router.use('/files', express.static('public/files'));

router.post('/api/v1/upload/image',
            storage.image.single('image'), 
            controller.media.uploadImage);
router.post('/api/v1/upload/video', 
        storage.video.single('video'),
        controller.media.uploadVideo)
router.post('/api/v1/upload/documents', 
        storage.document.single('doc'),
        controller.media.uploadDocument)
// router.delete('/api/v1/users/:id', controller.users.destroy);

router.post('/api/v1/qrcode', controller.media.qrcode);

router.post('/api/v1/upload/imagekit', 
        multer.single('image'),
        controller.media.imagekitUpload);

module.exports = router;