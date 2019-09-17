const { buildSchema } = require('graphql')


module.exports = buildSchema(`
    type User {
        _id: ID!
        screenName: String!
        email: String!
        password: String
        avatar: Int!
    }
    input UserInput {
        screenName: String!
        email: String!
        password: String!
    }
`)

/**
 * screenName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar
 */
