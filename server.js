const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

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
    const cookies = parseCookies(req.headers.cookie);
    if(req.url.startsWith('/login')){   
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5); //cookie end time: 5minute
        res.writeHead(302,{
            Location: '/',
            'Set-Cookie':`name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        }); //redirect addres, header get cookie data
        res.end();
    }else if(cookies.name){ 
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.end(`Hello ${cookies.name}`);       //view name
    }else{ 
        fs.readFile('./index.html',(err,data) => {
            if(err){
                throw err;
            }
            res.end(data);  //response html
        });
    }
}).listen(8083, () => {
    console.log('8083 port is ready..');
});