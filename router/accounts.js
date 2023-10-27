const express = require('express');
const router = express.Router();
const controller = require('../app/controller/api');



router.get('/api/v1/accounts', controller.accounts.get);
router.get('/api/v1/accounts/:id', controller.accounts.getById);
router.post('/api/v1/accounts', controller.accounts.create);
router.put('/api/v1/accounts/:id', controller.accounts.update);
// router.delete('/api/v1/accounts/:id', controller.accounts.destroy);


module.exports = router;
