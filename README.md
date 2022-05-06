This repo can be used to reproduce the conditions that trigger the unhandled promise rejection described in this issue:

https://github.com/apollographql/apollo-server/issues/4472

### To Run

1. Switch to Node.js 16
2. Run `npm install`
3. Run `npm run start`
4. Run `./curl.sh`

After ~2 seconds, you should see an error like the following in your server logs and the process should exit:

```
{
  msg: 'unhandledRejection',
  reason: 'willResolveField called after willSendResponse\n' +
    '\n' +
    'GraphQL request:1:12\n' +
    '1 | { nested { syncString } syncNullError}\n' +
    '  |            ^',
  stack: 'Error: willResolveField called after willSendResponse\n' +
    '    at Object.willResolveField (/Users/chris.karcher/src/care/apollo-server-race-condition/orphanedRequestPlugin.js:11:29)\n' +
    '    at Dispatcher.invokeSyncDidStartHook (/Users/chris.karcher/src/care/apollo-server-race-condition/node_modules/apollo-server-core/dist/utils/dispatcher.js:48:43)\n' +
    '    at invokeWillResolveField (/Users/chris.karcher/src/care/apollo-server-race-condition/node_modules/apollo-server-core/dist/requestPipeline.js:138:77)\n' +
    '    at field.resolve (/Users/chris.karcher/src/care/apollo-server-race-condition/node_modules/apollo-server-core/dist/utils/schemaInstrumentation.js:31:13)\n' +
    '    at executeField (/Users/chris.karcher/src/care/apollo-server-race-condition/node_modules/graphql/execution/execute.js:479:20)\n' +
    '    at executeFields (/Users/chris.karcher/src/care/apollo-server-race-condition/node_modules/graphql/execution/execute.js:411:20)\n' +
    '    at completeObjectValue (/Users/chris.karcher/src/care/apollo-server-race-condition/node_modules/graphql/execution/execute.js:906:10)\n' +
    '    at completeValue (/Users/chris.karcher/src/care/apollo-server-race-condition/node_modules/graphql/execution/execute.js:633:12)\n' +
    '    at completeValue (/Users/chris.karcher/src/care/apollo-server-race-condition/node_modules/graphql/execution/execute.js:582:23)\n' +
    '    at /Users/chris.karcher/src/care/apollo-server-race-condition/node_modules/graphql/execution/execute.js:484:9'
}
```

## Resolution
We believe the symptoms we're seeing are the same as what's described in this `graphql-js` issue:

https://github.com/graphql/graphql-js/issues/3528

This issue should be addressed with this PR:

https://github.com/graphql/graphql-js/pull/3529
