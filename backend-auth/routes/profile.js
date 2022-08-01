const express = require('express');
const router = express.Router();

const jwtMiddleware = require("../middleware/jwt_middleware");


router.post("/user", jwtMiddleware, (req, res, next) => {

    console.log(req.user);
    res.json({ "user": req.user })

});



module.exports = router;