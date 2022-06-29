# Proto3 renumber

Ever wondered why proto3 format needs all those numbers when most of the times you just end up doing squential numbers?

Worry no more this package saves you from having to manually renumber your protos just provide a file you want to renumber on the standard input and it will spit out the result to the standard output.

```
proto_to_renumer.proto | npm run --silent start > renumbered_proto.proto
```

Make sure to you use `--silent` if you run from npm scripts.