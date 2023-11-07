const Router = require("express");
const router = Router();
const numberController = require('../controllers/number-controller');

router.post('/add', numberController.addNumber);
module.exports = router;