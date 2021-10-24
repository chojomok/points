const Joi = require('joi');
const TransactionList = require('./transactionsList');

function validateAdd(transaction) {
    const schema = {
        payer: Joi.string().required(),
        points: Joi.number().integer().strict().required(),

        // TODO: checking for iso for now but needs to check for utc
        timestamp: Joi.date().iso().required()
    };
    return Joi.validate(transaction, schema);
}

function validateSpend(points) {
    const schema = {
        points: Joi.number().integer().strict().positive().allow(0).required()
    };
    return Joi.validate(points, schema);
    
}

function sortTransactionList(TransactionList) {
    return TransactionList.sort(function(x, y){
        return new Date(x.timestamp) - new Date(y.timestamp);
    });
}

function getTotalBalance(PayerBalance){
    var totalBalance = 0;
    for (var payer in PayerBalance){
        totalBalance += PayerBalance[payer];
    }
    return totalBalance;
}



module.exports.validateAdd = validateAdd;
module.exports.validateSpend = validateSpend;
module.exports.sortTransactionList = sortTransactionList;
module.exports.getTotalBalance = getTotalBalance;