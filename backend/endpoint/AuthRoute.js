const express = require('express');
const router = express.Router();

router.post('/auth', (req, res) => {
    //the request comes in a POST
    res.json({
        user: 'dummy',
        token: 'dummy'
    });
});
  
module.exports = router;