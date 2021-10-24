# points #
back end service using NodeJS, Express, and Joi

## Introduction 
[What is this?]
This is a backend services implemented using NodeJS, Express, and Joi.

## Installing modules
The NodeJS, Express, and Joi can can all be installed using NPM. 
Here are the following versions and the command line needed to install the module.

NodeJS: V10.19.0 | npm i node@10.19.0
Express: 4.17.1 | npm i express@4.17.1
Joi: 13.7.0 | npm i joi@13.7.0


## Features ##

### /api/transactions ###
#### GET ####
Will return the history of all the transactions. 
#### POST ####
Can send a json object of a transaction. 
payer, points, and timestamp are required an all have input validation using Joi. 

### /api/spend ###
#### POST ####
can send a json object of how many points to spend. 
points has input validation to be a number.

### /api/balance ###
#### GET ####
Will return the balance of all the payers. 


