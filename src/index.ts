#!/usr/bin/env node

import fs from 'fs';

let input = fs.readFileSync(process.stdin.fd, 'utf-8');

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

fs.writeFileSync(process.stdout.fd, input, 'utf-8')