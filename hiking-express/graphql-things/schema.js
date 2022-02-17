var { buildSchema } = require('graphql');

// graphql
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    random: Float!
    testContext(something: String): String
  }
`);

module.exports = schema;