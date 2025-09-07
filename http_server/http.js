const http=require("http")
const fs=require("fs")
const myserver=http.createServer((req,res)=>{
    const log=`${Date.now()}: ${req.url}  New request Recived\n`
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(req.url){
            case "/":
                res.end("Home Page");
                break;
             case "/about":
                res.end("About page");
                break;
            default:
                res.end("404 Not Found");
        }
    });
});
myserver.listen(8000)