function ApolloServerPluginOrphanedRequestLogger() {
  return {
    async requestDidStart() {
      let responseSent = false;

      return {
        async executionDidStart() {
          return {
            willResolveField() {
              if (responseSent) {
                console.log({
                  msg: "willResolveField called after willSendResponse",
                  stack: new Error().stack,
                });
              }
            },
          };
        },
        async willSendResponse() {
          responseSent = true;
        },
      };
    },
  };
}

module.exports = { ApolloServerPluginOrphanedRequestLogger };
