const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
// app.use() = how to wireup middleware to an application
app.use('/graphql', expressGraphQL({
  schema,
//   graphiql = little built-in application to test queries - ex. localhost:4000/graphql
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening');
});