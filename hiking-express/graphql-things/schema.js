var { buildSchema } = require('graphql');

// graphql
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    _id: String
    is_success: Boolean
    username: String
  }

  type Tour {
    _id: String
    user_id: String
    name: String
    description: String
    date: String
    difficulty: String
    trail_length: Int
    max_participants: Int
  }

  type Query {
    hello: String
    random: Float!
    testContext(something: String): String
    napraviGlupost: String
    authRegister(username: String, password: String, password2: String): String
    authLogin(username: String, password: String): String
    authLogout: Boolean
    myUserData: User
    tourCreate(name: String, description: String, date: String, difficulty: String, trail_length: Int, max_participants: Int): Boolean
    tourGetAll: [Tour]
  }
`);

module.exports = schema;