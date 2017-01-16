var expand = require('./index');

var d1 = "M 100 200 C 200 100 300   0 400 100 C 500 200 600 300 700 200 C 800 100 900 100 900 100";

var d2 = expand(d1, 8);

console.log(d2);
