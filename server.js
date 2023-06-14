const http = require('http');
const fs = require('fs');
const _= require('lodash');
const server = http.createServer((req,res)=>{
    console.log(req.url);

    //lodash
    const num = _.random(0,39);
    console.log(num);

    const greet = _.once(()=>{
        console.log("hello");
    });
    greet();
    greet();

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break; 
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break; 
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end()
            break; 
        case '/contact':
            path += 'contact.html';
            res.statusCode = 200;
            break; 
        case '/services':
            path += 'services.html';
            res.statusCode = 200;
            break; 
        default :
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    // console.log(path);
    fs.readFile(path, (err,data)=>{
        // console.log(path);
        if(err){
            console.log(err);
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000,'localhost',()=>{
    console.log("listening for requests on port 3000");
});