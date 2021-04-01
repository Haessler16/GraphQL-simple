'use strict';

const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolvers');
const { isDev, port } = require('./config');

const app = express();

// Definiendo el Schema
const typeDefs = readFileSync(
	join(__dirname, 'lib', 'schema.graphql'),
	'utf-8',
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Config Cors
const whitelist = [
	'http://localhost:3000',
	'http://localhost:3333',
	'http://localhost:3600',
	'https://my.zumetrics.co',
	'https://my.zumetrics.vercel.app',
	'https://api-zumetrics.heroku.com',
];

const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(cors(corsOptions));

// Configurar la ruta

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: resolvers,
		graphiql: isDev,
	}),
);

app.listen(port, () => {
	console.log(`http://localhost:${port}/graphql`);
});
