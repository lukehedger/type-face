const { GraphQLServer } = require('graphql-yoga')

const Query = require('./query')
const schema = require('./schema')

const typeDefs = schema

const resolvers = {
  Query: Query,
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => {
  console.log('GraphQL server running on http://localhost:4000')
})
