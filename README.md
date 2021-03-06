# points #
backend service using NodeJS, Express, and Joi.

## Introduction ##
*What is this?*
This is a backend service implemented using NodeJS, Express, and Joi. This back end service defaults to using port 8080.

## Installing modules ##
The NodeJS, Express, and Joi can can all be installed using NPM. 
Here are the following versions and the command line needed to install the module.

#### How to install NPM ###
Follow the directions from this [NPM documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) relevant to your operating system.

Module: Version  | NPM install line
------------- | -------------
NodeJS: V10.19.0 | ```npm i node@10.19.0```
Express: 4.17.1  | ```npm i express@4.17.1```
Joi: 13.7.0  | ```npm i joi@13.7.0```

Alternatively, after you have npm installed, you can run ```npm install``` in the package directory of the project to install all the packages defined in package.json.

## How to run the service ##
In your command line or terminal, change directories to where app.js is located. </br>
Then run the following line: </br> 
```node app.js```

## Features ##

### /api/transactions ###
#### GET ####
Will return the history of all the transactions. </br>

_Get Example_: </br>
GET http://localhost:8080/api/transactions/ </br>
Response: ```Code: 200``` </br>
 ```
 [
    {
        "payer": "DANNON",
        "points": 1000,
        "timestamp": "2020-11-02T14:00:00Z"
    },
    {
        "payer": "UNILEVER",
        "points": 200,
        "timestamp": "2020-10-31T11:00:00Z"
    },
    {
        "payer": "DANNON",
        "points": -200,
        "timestamp": "2020-10-31T15:00:00Z"
    },
    {
        "payer": "MILLER COORS",
        "points": 10000,
        "timestamp": "2020-11-01T14:00:00Z"
    },
    {
        "payer": "DANNON",
        "points": 300,
        "timestamp": "2020-10-31T10:00:00Z"
    }
]
```

</br>

#### POST ####
Can send a json object of a transaction. </br>
payer, points, and timestamp are required an all have input validation using Joi. 

_Good Post Example_: </br>
POST http://localhost:8080/api/transactions/ </br>
Input: ```{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }``` </br>
Response: ```Code: 200 { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }``` </br>

_Bad Post Example_: </br>
POST http://localhost:8080/api/transactions/ </br>
Input: ```{ "payer": "", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }``` </br>
Response: ```Code: 400 "payer" is not allowed to be empty``` </br>

***
### /api/spend ###
#### POST ####
Can send a json object of how many points to spend. </br>
points has input validation to be a number. The points spent are added to the transaction history with the timestamp of when the post request was completed. 
_Good Post Example_: </br>
POST http://localhost:8080/api/spend/ </br>
Input: ```{"points": 5000}``` </br>
Response: ```Code: 200 {
    "DANNON": -100,
    "UNILEVER": -200,
    "MILLER COORS": -4700
}``` </br>

_Bad Post Example_: </br>
POST http://localhost:8080/api/spend/ </br>
Input: ```{"points": -1000}``` </br>
Response: ```Code: 400 "points" must be a positive number``` </br>
***
### /api/balance ###
#### GET ####
Will return the balance of all the payers. 
GET http://localhost:8080/api/balance/ </br>
Response: ```Code: 200 {
    "DANNON": 1100,
    "UNILEVER": 200,
    "MILLER COORS": 10000
}``` </br>

## Implementation Details ##
Local memory was used in place of a database. There is an array with all the list of transactions and a dictionary of all the balances of payers.</br>
The transaction history order is sorted based on time everytime a spend post request is made.</br>
The payer balance is updated everytime a post request is made for transactions and everytime points are spent from a payer.</br>
