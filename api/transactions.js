const express = require('express');
const router = express.Router();
const {validateAdd } = require('../utility');
const TransactionList = require('../transactionsList');
const PayerBalance = require('../payerBalance');

router
    .get('', (req,res) => {
    res.send(TransactionList);
})
    .post('', (req,res) => {
    const {error} = validateAdd(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    
    const transaction = {
        payer: req.body.payer,
        points: req.body.points,
        timestamp: req.body.timestamp
    };

    TransactionList.push(transaction);
    PayerBalance[transaction.payer] = transaction.points + (parseInt(PayerBalance[transaction.payer]) || 0 );
    res.send(transaction);
});

module.exports = router;