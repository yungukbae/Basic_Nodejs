const http = require('http');

const server = http.createServer((req,res) => {
    res.write('<h1>Hello</h1>');
    res.end('<p>nodejs</p>');
});

server.listen(8080);

server.on('listening',()=>{
    console.log('8080 port is ready...');
});

server.on('error', (error) => {
    console.log('server on error');
});

