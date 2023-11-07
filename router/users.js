const express = require('express');
const router = express.Router();
const { auth } = require('../utils/jwt');
const controller = require('../app/controller/api');



router.get('/api/v1/users', controller.users.get);
router.get('/api/v1/users/:id', controller.users.getById);
router.post('/api/v1/users', auth,controller.users.create);
router.put('/api/v1/users/:id', controller.users.update);
// router.delete('/api/v1/users/:id', controller.users.destroy);


module.exports = router;



