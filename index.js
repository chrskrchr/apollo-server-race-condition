const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginOrphanedRequestLogger,
} = require("./orphanedRequestPlugin");
const resolvers = require("./resolvers");

const typeDefs = gql`
  type BarResult {
    bar1: String!
    bar2: String!
    bar3: String
    bar4: String
  }

  type Query {
    foo: BarResult!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginOrphanedRequestLogger()],
});

process.on("unhandledRejection", (reason) => {
  console.log({
    msg: "unhandledRejection",
    reason: reason?.toString(),
    stack: reason instanceof Error ? reason.stack : undefined,
  });
  process.exit(1);
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
