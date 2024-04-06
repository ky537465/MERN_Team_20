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
	const { UserID, FirstName, LastName, Password, PhoneNumber, Email, Username} = req.body;
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
	            UserID: UserID,
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
	
	        const { UserID, FirstName, LastName, Username: username} = results;
	
	        var ret = { ID: UserID, FirstName: FirstName, LastName: LastName,Username: username, error: '' };
	        res.status(200).json(ret);
	}
	catch (error)
	{
        	res.status(500).json({ error: error.toString() });
	}
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
