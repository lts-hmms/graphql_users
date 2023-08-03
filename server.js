const express = require('express');
const jsonServer = require('./jsonServer');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const app = express();
const port = 4000;

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true  // GraphiQL is a graphical interactive in-browser GraphQL IDE: development tool for sending queries, mutations and viewing results
}));

app.listen(port, () => console.log(`Listening on port ${port}!`));
