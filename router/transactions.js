const express = require('express');
const router = express.Router();
const controller = require('../app/controller/api');



router.get('/api/v1/transactions', controller.transactions.get);
router.get('/api/v1/transactions/:id', controller.transactions.getById);
router.post('/api/v1/transactions', controller.transactions.create);
router.put('/api/v1/transactions/:id', controller.transactions.update);
// router.delete('/api/v1/users/:id', controller.users.destroy);


module.exports = router;