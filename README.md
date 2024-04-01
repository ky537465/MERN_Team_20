# MoneyMaster
We are MoneyMaster and we are the best company for storing and helping you manage your (FAKE) money!

## Connect to local server:
In Ubuntu
    git/MERN_Team_20: sudo npm start

In Postman
    http://localhost:5000/api/<api>

SwaggerHub
    https://app.swaggerhub.com/apis/Kylee-92e/moneyMaster/1.0.0

## API
### Register
POST http://localhost:5000/api/register

application/json

{
  "FirstName": "Rick",
  "LastName": "Leinecker",
  "Password": "COP4331",
  "PhoneNumber": "4076001234",
  "Email": "RickL@ucf.edu",
  "Username": "RickL"
}

### Login
POST http://localhost:5000/api/login

application/json

{
  "Username": "RickL",
  "Password": "COP4331"
}

### Search Users
POST http://localhost:5000/api/searchUsers

application/json

{
    "SearchKey": "RickL"
}

### Search Checking Accounts
POST http://localhost:5000/api/searchCheckingAccounts

application/json

{
    "SearchKey": "C",
    "_id": 1
}

### Search Savings Accounts
POST http://localhost:5000/api/searchSavingsAccounts

application/json

{
    "SearchKey": "S",
    "_id": 1
}

### Search Transactions
POST http://localhost:5000/api/searchTransactions

application/json

{
    "SearchKey": "S",
    "_id": 1
}

### CREATE CHECKING ACCOUNT
POST http://localhost:5000/api/createChecking

application/json

{
    "_id": "1"
}

### CREATE SAVINGS ACCOUNT
POST http://localhost:5000/api/createSavings

application/json

{
    "_id": "1"
}

### CHECK BALANCE
POST http://localhost:5000/api/checkBalance

application/json

{
    "_id": "1"         // yes you only need _id
}

### TRANSFER MONEY
POST http://localhost:5000/api/transferMoney

application/json

{
    "_id1": "1",       // ID of who is sending money
    "_id2": "2",       // ID of who is recieving money
    "Money": "345.34"
}
