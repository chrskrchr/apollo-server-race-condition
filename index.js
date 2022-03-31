const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginOrphanedRequestLogger,
} = require("./orphanedRequestPlugin");
const resolvers = require("./resolvers");

const typeDefs = gql`
  type Query {
    errorSoon: String!
    nestedObjectSoon: Query!
    justAString: String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginOrphanedRequestLogger()],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
