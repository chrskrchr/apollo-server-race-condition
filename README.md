This repo can be used to reproduce the conditions that appear to sometimes trigger the unhandled promise rejection described in this issue:

https://github.com/apollographql/apollo-server/issues/4472

### To Run

1. Run `npm install`
2. Run `npm run start`
3. Run this cURL command to send 10 GraphQL requests to your local instance that should trigger the `"willResolveField called after willSendResponse` error:
```shell
curl -s -o /dev/null 'http://localhost:4000/?iteration=[1-10000]' \
  -H 'content-type: application/json' \
  --data-raw '{"query":"fragment FooParts on BarResult {\n  bar1\n  bar2\n  bar3\n  bar4\n}\n\nquery Foo {\n  one: foo {\n    ...FooParts\n  }\n\n  two: foo {\n    ...FooParts\n  }\n}\n","variables":{},"operationName":"Foo"}'
```

You should see the following error logged by `orphanedRequestPlugin.js` in your server logs:

```
{
  msg: 'willResolveField called after willSendResponse',
  stack: 'Error\n' +
...
```

### What's the Problem?

The fact that `willResolveField()` is called after `willSendResponse()` isn't necessarily a problem.
It's that when this happens in Apollo's `ApolloServerPluginUsageReporting` plugin, the [`traceTreeBuilder` code below](https://github.com/apollographql/apollo-server/blob/main/packages/apollo-server-core/src/plugin/traceTreeBuilder.ts#L70-L72) throws an error when `willResolveField()` is called after the response has already been sent:


```javascript
  public willResolveField(info: GraphQLResolveInfo): () => void {
  ...
    
  if (this.stopped) {
    throw internalError('willResolveField called after stopTiming!');
  }
```

It's unclear why the code above results in an unhandled promise rejection in some scenarios and not others.
