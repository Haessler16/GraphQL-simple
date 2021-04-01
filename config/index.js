require('dotenv').config();

const config = {
	port: '3600',
	isDev: process.env.NODE_ENV !== 'production',
	MongoDB:
		process.env.NODE_ENV === 'production'
			? process.env.MONGODB_STRING
			: 'mongodb://localhost:27017/zumetricsdb',
};

module.exports = config;
