const express = require('express');
const router = express.Router();
const PayerBalance = require('../payerBalance');

router.get('/', (req,res) => {
    res.send(PayerBalance);
});

module.exports = router;