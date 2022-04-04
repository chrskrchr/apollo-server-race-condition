function ApolloServerPluginOrphanedRequestLogger() {
  return {
    async requestDidStart() {
      let responseSent = false;

      return {
        async executionDidStart() {
          return {
            willResolveField() {
              if (responseSent) {
                const err = new Error(
                  "willResolveField called after willSendResponse"
                );
                console.log(err);
                throw err;
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
