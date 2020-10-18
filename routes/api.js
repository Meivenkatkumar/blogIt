const passport = require('passport');
const router = require('express').Router();
const authenticate = require('../controller/authenticate');
// const validateToken = require('../middleware/auth').validateToken;


router.get("/status", (req, res) => {
    res.status(200).json({success: true, msg:"api is alive"});
});

// Auth Routes
router.post("/auth/signup", authenticate.signup);
router.post("/auth/login", authenticate.login);
router.post("/auth/verify", authenticate.validateToken);




module.exports = router;