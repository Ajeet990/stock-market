const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.view);

router.get('/dashboard', userController.dashboard);
router.get('/market', userController.market);
router.post('/ins', userController.insert);
router.get('/my_stock', userController.my_stock);
router.get('/sell/:id', userController.sell);
router.post('/search', userController.search);
router.post('/add_bank', userController.addBank);

router.get('/edit_bank/:id', userController.EditBank);
router.post('/update/:id', userController.updateBank);

router.get('/dbank/:id', userController.deleteBank);
router.get('/transaction', userController.transaction);

router.post('/final_sell/:id', userController.final_sell);

router.get('/detail/:id', userController.detail);
router.get('/done', userController.done);




module.exports = router;