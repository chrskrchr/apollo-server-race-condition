const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginOrphanedRequestLogger,
} = require("./orphanedRequestPlugin");
const resolvers = require("./resolvers");

const typeDefs = gql`
  type Object {
    errorSoon: String!
    nestedObjectSoon: Object!
    justAString: String!
  }

  type Query {
    nonNullObject: Object!
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
