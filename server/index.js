const { GraphQLServer } = require("graphql-yoga");
const { queryType, makeSchema, stringArg } = require("nexus");

const Query = queryType({
  definition(t) {
    t.string("hello", {
      // TODO: Can default `World` be provided in options?
      args: { name: stringArg({ nullable: true }) },
      resolve: (parent, { name }) => `Hello ${name || "World"}!`
    });
  }
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/typings.ts"
  }
});

const server = new GraphQLServer({
  schema
});

server.start(() => {
  console.log("GraphQL server running on http://localhost:4000");
});
