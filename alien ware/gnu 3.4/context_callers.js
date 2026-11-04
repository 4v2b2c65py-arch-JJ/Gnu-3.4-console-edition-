const fs = require('fs');
const path = 'alien ware/gnu 3.4';
let total = 0;
for (let i = 1; i <= 20; i++) {
  const data = fs.readFileSync(`${path}/${i}.gguf`, 'utf8');
  const nums = data.match(/\d+/g) || [];
  const partial = nums.reduce((a, b) => a + parseInt(b, 10), 0);
  total += partial;
  console.log(`${i}.gguf: context partial ${partial}`);
}
console.log(`TOTAL CONTEXT INT: ${total}`);
