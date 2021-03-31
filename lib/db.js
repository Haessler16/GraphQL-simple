const { MongoDB } = require('../config');
const MongoClient = require('mongodb');
let connection;

async function connectDB() {
	if (connection) return connection;
	let client;
	try {
		client = await MongoClient.connect(MongoDB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		connection = client.db('zumetricsdb');
	} catch (error) {
		console.log('Could not connect to db', MongoDB, error);
		process.exit(1);
	}

	return connection;
}

module.exports = connectDB;
