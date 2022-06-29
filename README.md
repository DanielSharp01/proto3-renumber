# Proto3 renumber

Ever wondered why proto3 format needs all those numbers when most of the times you just end up doing sequential numbers?

Worry no more this package saves you from having to manually renumber your protos just provide a file you want to renumber on the standard input and it will spit out the result to the standard output.

## Installing

Run `npm run build` then `npm link` and you are ready to use proto3-renumber from the CLI.

## Usage

```
proto_to_renumber.proto | proto3-renumber > renumbered_proto.proto
```

Make sure to you use `--silent` if you run decide to run from npm scripts or the npm run log will be in your output.

**Warning:** If you want to rewrite the same file then due to the quirks of shells you will have to redirect to a program that writes to the file like `tee`

```
proto_to_renumber.proto | proto3-renumber | tee proto_to_renumber.proto
```
