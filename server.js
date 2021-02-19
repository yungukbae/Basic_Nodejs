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

        
const session = {};

//
http.createServer((req,res) => {
    const cookies = parseCookies(req.headers.cookie);
    if(req.url.startsWith('/login')){   
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5); //cookie end time: 5minute
        const randomInt = +new Date();
        session[randomInt]={
            name,           //name
            expires,        //time
        };
        res.writeHead(302,{
            Location: '/',
            'Set-Cookie':`session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        }); //redirect addres, header get cookie data
        res.end();
    }else if(cookies.session && session[cookies.session].expires > new Date()){     //1. && 2. >
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});// charset=utf-8 => for korean
        res.end(`Hello ${session[cookies.session].name}`);        //view name
    }else{ 
        fs.readFile('./index.html',(err,data) => {
            if(err){
                throw err;
            }
            res.end(data);  //response html
        });
    }
}).listen(8081, () => {
    console.log('8083 port is ready..');
});