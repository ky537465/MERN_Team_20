const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require("bcrypt")
const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require("mongodb").MongoClient;
const uri = 'mongodb+srv://le100900:wCqe5pUYV7GGTVGi@cluster0.l9zbhsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(uri);

try
{
	client.connect(console.log("mongodb connected"));

	//listDatabases(client);
}
catch (e)
{
	console.error(e);
}



// Register
app.post('/api/register', async (req, res, next) =>
{
	const { FirstName, LastName, Password, PhoneNumber, Email, Username} = req.body;
	const database = client.db("COP4331Bank").collection("Users");

	// Check if User already exists
	try
	{
		const checkUsername = await database.findOne({Username});

		if (checkUsername)
		{
            		return res.status(400).json({ message: 'User ' + Username + ' already exists' });
        	}
		

		// Salt and hash Password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(Password, salt);


		const newUser = {
	            FirstName: FirstName,
	            LastName: LastName,
	            Password: hashedPassword,
	            PhoneNumber: PhoneNumber,
	            Email: Email,
	            Username: Username
	        };
	
		await database.insertOne(newUser);
	
	
		var error = '';

	}
	catch(e)
	{
		error = e.toString();
	}
	var ret = { error: error };
	res.status(200).json(ret);
});



// LOGIN
app.post('/api/login', async (req, res, next) =>
{

	try
	{
	        const { Username, Password } = req.body;
	        const database = client.db("COP4331Bank").collection("Users");
	
	        // Find user by Username
	        const results = await database.findOne({ Username });
	
	        if (!results || !(await bcrypt.compare(Password, results.Password)))
		{
	            return res.status(401).json({ error: "Invalid Username/Password" });
	        }
	
	        const { _id, FirstName, LastName } = results;
	
	        var ret = { ID: _id, FirstName: FirstName, LastName: LastName, error: '' };
	        res.status(200).json(ret);
	}
	catch (error)
	{
        	res.status(500).json({ error: error.toString() });
	}
});



// SEARCH USERS
app.post('/api/searchUsers', async (req, res) => {
    const { SearchKey } = req.body;
    const database = client.db("COP4331Bank").collection("Users");

    try {
        const query = {
            $or: [
                { Username: { $regex: new RegExp(SearchKey, "i")}},
                { Email: { $regex: new RegExp(SearchKey, "i")}},
                { PhoneNumber: { $regex: new RegExp(SearchKey, "i")}},
				{ FirstName: {$regex: new RegExp(SearchKey, "i")}},
                { LastName: {$regex: new RegExp(SearchKey, "i")}}
            ]
        };

        const results = await database.find(query).toArray();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});



// SEARCH CHECKING ACCOUNTS
app.post('/api/searchCheckingAccounts', async (req, res) => {
    const { SearchKey, UserID } = req.body;
    const database = client.db("COP4331Bank").collection("Checking Accounts");

    try {
        const query = {
            $and: [
                {UserID},
                {
                    $or: [
                        { AccountName: { $regex: new RegExp(SearchKey, "i")}},
                        { AccountValue: { $regex: new RegExp(SearchKey, "i")}},
                    ]
                }
            ]
        };

        const results = await database.find(query).toArray();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});



// SEARCH SAVINGS ACCOUNTS
app.post('/api/searchSavingsAccounts', async (req, res) => {
    const { SearchKey, UserID } = req.body;
    const database = client.db("COP4331Bank").collection("Savings Accounts");

    try {
        const query = {
            $and: [
                {UserID},
                {
                    $or: [
                        { AccountName: { $regex: new RegExp(SearchKey, "i")}},
                        { AccountValue: { $regex: new RegExp(SearchKey, "i")}},
                    ]
                }
            ]
        };

        const results = await database.find(query).toArray();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});



// SEARCH TRANSACTIONS
app.post('/api/searchTransactions', async (req, res) => {
    const { SearchKey, _id } = req.body;
    const database = client.db("COP4331Bank").collection("Transactions");

    try {
        const query = {
            $and: [
                {_id},
                {
                    $or: [
                        {TransactionID: {$regex: new RegExp(SearchKey, "i")}},
                        {TransactionValue: {$regex: new RegExp(SearchKey, "i")}},
                        {DateAndTime: {$regex: new RegExp(SearchKey, "i")}},
                        {AccountID: {$regex: new RegExp(SearchKey, "i")}}
                    ]
                }
            ]
        };

        const results = await database.find(query).toArray();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});



// CREATE CHECKING ACCOUNT
app.post('/api/createChecking', async (req, res) => {
    const { UserID } = req.body;
    const database = client.db("COP4331Bank").collection("Checking Accounts");

    try {
        const checkForChecking = await database.findOne({UserID});

        if (checkForChecking)
	    {
            return res.status(400).json({ message: 'User already has a checking account'});
        }

        const newAccount =
        {
            AccountName: "Checking Account",
            AccountValue: Math.floor(Math.random() * 1000) + 1,
            UserID: UserID
        };

        await database.insertOne(newAccount);
        var error = '';
    }
    catch(e)
    {
        error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
});



// CREATE SAVINGS ACCOUNT
app.post('/api/createSavings', async (req, res) => {
    const { UserID } = req.body;
    const database = client.db("COP4331Bank").collection("Savings Accounts");

    try {
        const newAccount =
        {
            AccountName: "Savings Account",
            AccountValue: Math.floor(Math.random() * 1000) + 1,
            UserID: UserID
        };

        await database.insertOne(newAccount);
        var error = '';
    }
    catch(e)
    {
        error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
});



// CHECK BALANCE
app.get('/api/checkBalance', async (req, res) => {
    // in progress
});



// TRANSFER MONEY
app.post('api/transferMoney', async (req, res) => {
    const {_id1, _id2, Money} = req.body;
    const database = client.db("COP4331Bank").collection("Checking Accounts");

    const checkingAccount1 = await database.findOne({_id});
    const checkingAccount2 = await database.findOne({_id2});

    if (checkingAccount1 && checkingAccount2)
    {
        checkingAccount1.AccountValue -= money;
        checkingAccount2.AccountValue += money;

        await database.updateOne({_id1: checkingAccount1._id1}, {$set: {AccountValue: checkingAccount1.AccountValue}});
        await database.updateOne({_id2: checkingAccount2._id2}, {$set: {AccountValue: checkingAccount2.AccountValue}});
        return res.status(400).json({ message: '$' + money + ' transfered.'});
    }
    else if (checkingAccount1)
    {
        return res.status(400).json({ message: 'Unable to transfer to null account.'});
    }

    return res.status(400).json({ message: 'Unable to transfer.'});
});


app.use((req, res, next) =>
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});
app.listen(5000); // start Node + Express server on port 5000




//FORGOT PASSWORD
/*const jwt = require("jsonwebtoken");
const mongoUrl = 'mongodb+srv://le100900:wCqe5pUYV7GGTVGi@cluster0.l9zbhsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const User = mongoose.model("COP4331Bank.Users");
const JWT_SECRET = process.env.JWT_SECRET_KEY;




app.post("/forgot-password",async(req,res) =>{
    const{email} = req.body;
    try {
        const oldUser = await User.findOne({email});
        if(!oldUser){
            return res.json("User does not exist");
        }

        const secret = JWT_SECRET + oldUser.Password;
        const token = jwt.sign({ email:oldUser.email, id:oldUser.id},secret,{expiresIn:'5m',});

        const link = 'http://localhost:5000/reset-password/${oldUser._id}/${token}';
        console.log(link);
    } catch (error) {
        
    }


})


app.get('/reset-password',async(req,res)=>{
    const{ id, token} = req.params;
    console.log(req.params);
}); */