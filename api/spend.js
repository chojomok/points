const express = require('express');
const router = express.Router();
const {validateSpend, getTotalBalance, sortTransactionList } = require('../utility');
const TransactionList = require('../transactionsList');
const PayerBalance = require('../payerBalance');


router.post('/', (req,res) => {
    const {error} = validateSpend(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    var spending = req.body.points;
    if (spending > getTotalBalance(PayerBalance))
        return res.status(400).send(`Spending: ${spending} of points exceeds the total balance of all payers.`);
    sortTransactionList(TransactionList);
    var spendList = {};      
    TransactionList.forEach(transaction => {
        let minimumPayment = Math.min(spending,transaction.points);
        if (spending != 0 && minimumPayment <= PayerBalance[transaction.payer]) {
            spending -= minimumPayment;
            spendList[transaction.payer] = (parseInt(spendList[transaction.payer]) || 0 ) - minimumPayment;
            PayerBalance[transaction.payer] -= minimumPayment;
        }
    });
        for(var payer in spendList) {
            var date = new Date(); 
            Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
            let transaction = {
                payer: payer,
                points: spendList[payer],
                timestamp: date
            };
            TransactionList.push(transaction);
        }
    res.send(spendList);
});

module.exports = router;