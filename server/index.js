const { GraphQLServer } = require("graphql-yoga");
const { queryType, makeSchema, stringArg } = require("nexus");
const path = require("path");

const Query = queryType({
  definition(t) {
    t.string("hello", {
      args: { name: stringArg({ nullable: true, default: "World" }) },
      resolve: (parent, { name }) => `Hello ${name}!`,
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/typings.ts",
  },
});

const server = new GraphQLServer({
  schema,
});

server.start(() => {
  console.log("GraphQL server running on http://localhost:4000");
});
