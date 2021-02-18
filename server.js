const http = require('http');

const parseCookies = (cookie = '') => 
    cookie 
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k,v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        },{});

http.createServer((req,res) => {
    const cookies = parseCookies(req.headers.cookie); //cookie is in req.headers.cookie
    console.log(req.url, cookies);
    res.writeHead(200, {'Set-Cookie':'mycookie=test'}); //res.writeHeader = recording cookie
    res.end('Hello Cookie');
}).listen(8082, () => {
    console.log('8082 port is ready...');
});
