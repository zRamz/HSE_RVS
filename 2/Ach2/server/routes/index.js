const Router = require("express");
const router = Router();

const numberRouter = require('./number-routes');
router.use('/numbers', numberRouter);

module.exports = router;