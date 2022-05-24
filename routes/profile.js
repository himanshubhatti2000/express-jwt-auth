const express = require('express');
const router = express.Router();
const { expressjwt: expressJwt } = require('express-jwt');
const fs = require('fs');
const path = require('path');
const {getProfile}=require('../controllers/profile/profile');
const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname,'../keys/accessToken/public.key.pub'));

router.use(express.json());
router.use( 
    expressJwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ['RS256']
})
);
router.get('/',getProfile);

module.exports = router;
