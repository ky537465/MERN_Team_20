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

	// Check if User already exists
	try
	{
		if (User.findOne({Username}))
			return res.status(400).json({message: 'User already exists'});
	

		// Salt and hash Password
		const salt = bcrypt.genSalt(10);
		const hashedPassword = bcrypt.hash(Password, salt);

		const newUser = new User(
		{
			UserID: UserID,
			FirstName: FirstName,
			LastName: LastName,
			Password: hashedPassword,
			PhoneNumber: PhoneNumber,
			Email: Email,
			Username: Username
		});

		var error = '';

		const db = client.db("COP4331Bank");
		const result = db.collection('Users').insertOne(newUser);

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
	var error = '';
	const { Username, Password } = req.body;
	const db = client.db("COP4331Bank");
	const results = db.collection('Users').findOne({Username: Username});

	if (bcrypt.compare(Password, results.Password) == false)
		res.status(401).json({error: "Invalid Username/Password"});


	var id = -1;
	var fn = '';
	var ln = '';
	if( results.length > 0 )
	{
		id = results[0].UserID;
		fn = results[0].FirstName;
		ln = results[0].LastName;
	}
	var ret = { ID: id, FirstName: fn, LastName: ln, error:''};
	res.status(200).json(ret);
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

