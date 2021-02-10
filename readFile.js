const fs = require('fs');

fs.readFile('./readtxt.txt',(err,data) => {
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});