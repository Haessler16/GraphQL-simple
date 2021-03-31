require('dotenv').config();

const config = {
	MongoDB:
		process.env.NODE_ENV === 'production'
			? process.env.MONGODB_STRING
			: 'mongodb://localhost:27017/zumetricsdb',
};

module.exports = config;
