const s = require('node:fs').readFileSync('/tmp/test-output/entry.txt', 'utf8');
console.log('Code points:', [...s].length);
console.log('Bytes:', Buffer.byteLength(s, 'utf8'));