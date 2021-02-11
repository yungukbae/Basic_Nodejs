const fs = require('fs');

console.log('시작');
fs.readFile('./readtxt.txt',(err,data) =>{
    if(err){
        throw err;
    }
    console.log('no.1',data.toString());
    fs.readFile('./readtxt.txt',(err,data) =>{
        if(err){
            throw err;
        }
        console.log('no.2',data.toString());
        fs.readFile('./readtxt.txt',(err,data) =>{
            if(err){
                throw err;
            }
            console.log('no.3',data.toString());
        });
    });
});
console.log('끝');