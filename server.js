import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';

const app = express();
const port = 4000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true  // GraphiQL is a graphical interactive in-browser GraphQL IDE: development tool for sending queries, mutations and viewing results
}));

app.listen(port, () => console.log(`Listening on port ${port}!`));
