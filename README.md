# Proto3 renumber

Ever wondered why proto3 format needs all those numbers when most of the times you just end up doing sequential numbers? I don't know but here's a tool that let's you deal with them like they did not have numbers.

## Installing

Run `npm run build` then `npm link` and you are ready to use proto3-renumber from the CLI.

## Basic Usage

Choose input file with `--input` or `-i`. Choose output file with `--output` or `-o`.

```
proto3-renumber --input proto_to_renumber.proto --output renumbered_proto.proto
```

## Renumber all files in the current working directory

You can also renumber all files in the current working directory by providing `--all` or `-a`

```
proto3-renumber --all
```

For all there's also a crude `--exclude` or `-e` array option that just checks if the path contains a string. Pretty useful for `node_modules` or `.git`.

## Is the renumbering destructive?


If you skip numbers deliberately don't use this tool because that will also be renumbered.

Otherwise as long as you use a sensible format it should not be destructive. You can write valid protos which will be mocked up, because it's a really crude implementation of find and replace instead of parsing the proto file itself.