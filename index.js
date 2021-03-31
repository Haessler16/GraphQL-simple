'use strict';

const { buildSchema } = require('graphql');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const port = '3000';

// definiendo el schema
const schema = buildSchema(`
type Query{
  hello: String
  saludo: String
}
`);

// Configurar los resolvers

const resolvers = {
	hello: () => `Hola mundo`,
	saludo: () => `Hola a todos`,
};

app.use(
	'/api',
	graphqlHTTP({
		schema: schema,
		rootValue: resolvers,
		graphiql: true,
	}),
);

app.listen(port, () => {
	console.log(`http://localhost:${port}/api`);
});
