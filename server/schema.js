const typeDefs = `
  type Query {
    hello(name: String = "World"): String!
  }
`

module.exports = typeDefs
