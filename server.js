const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
   fs.readFile('./index.html',(err,data)=>{
       if(err){ //if there's an error.
           throw err;   //throw error.
       }
       res.end(data);   //send data(buffer)
   });
}).listen(8081, () => {
    console.log('8081 port ready...');
});
