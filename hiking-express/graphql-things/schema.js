var { buildSchema } = require('graphql');

// graphql
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    _id: String
    username: String,
  }

  type Query {
    hello: String
    random: Float!
    testContext(something: String): String
    napraviGlupost: String
    authRegister(username: String, password: String, password2: String): String
    authLogin(username: String, password: String): String
    myUserData(token: String): User
  }
`);

module.exports = schema;