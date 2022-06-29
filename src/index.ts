#!/usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';
import klawSync from 'klaw-sync';

const argv = yargs(process.argv.slice(2))
  .option('input', { alias:'i', type: 'string' })
  .option('all', { alias:'a', type: 'boolean' })
  .option('output', { alias: 'o', type: 'string'})
  .option('exclude', { alias: 'e', type: 'string', array: true })
  .parseSync();

const klawFilterFuncion: klawSync.Filter = f =>
  !argv.exclude || !argv.exclude.some(e => f.path.includes(e));

if (argv.all) {
  const files = klawSync('.', { nodir: true, filter: klawFilterFuncion });
  for (const file of files.filter(f => f.path.endsWith('.proto'))) {
    renumber(file.path);
  }
} else if (argv.input) {
  renumber(argv.input, argv.output);
} else {
  console.error(chalk.redBright('No input file provided.')
    + '\n\nEither provide one with -i or --input or renumber all files with -a or --all.');
}

function renumber(inputFile: string, outputFile?: string) {
  let input = fs.readFileSync(inputFile, 'utf-8');
  const newline = input.includes('\r') ? '\r\n' : '\n';
  const matches = input.matchAll(/message ([A-Za-z0-9_]+) {([^}]*)}/gm);

  for (const match of matches) {
    const fields = match[2].split(newline).filter(f => !!f.trim())
    const fieldsStr = fields.join(newline);
    const fieldsStrTransformed = fields.map((f, i) => {
        let rawField = f.split('=')[0].trimEnd().replace(';', '');
        rawField += ` = ${i + 1};`;
        return rawField;
      }).join(newline);
    const newMatch = match[0].replace(fieldsStr, fieldsStrTransformed);
    input = input.replace(match[0], newMatch);
  }

  fs.writeFileSync(outputFile ?? inputFile, input, 'utf-8')
  console.log(chalk.greenBright(`📝 Renumbered ${chalk.cyanBright(inputFile)}`))
}