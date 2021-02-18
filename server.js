const http = require('http');

http.createServer((req,res) => {
    res.write('<h1>Hello</h1>');
    res.end('<p>nodejs</p>');
}).listen(8080, () => {
    console.log('8080 port is ready...');
});