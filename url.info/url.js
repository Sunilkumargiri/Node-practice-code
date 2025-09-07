const http = require("http");
const fs = require("fs");
const url = require("url");

const myserver = http.createServer((req, res) => {
    if(req.url==="/favicon.ico") return res.end();
  // Current time
  const timestamp = Date.now();
  const time = new Date(timestamp).toLocaleString();

  // Log entry
  const log = `${time}: ${req.url}  New request received\n`;

  // Parse the request URL
  const myurl = url.parse(req.url, true);
  console.log(myurl);

  // Write to log file (non-blocking)
  fs.appendFile("log.txt", log, (err) => {
    if (err) console.error("Error writing log:", err);
  });

  // Routing
  switch (myurl.pathname) {
    case "/":
      res.end("Home Page");
      break;

    case "/about":
      const username = myurl.query.myname || "Guest";
      res.end(`Hi, ${username}`);
      break;

    default:
      res.statusCode = 404;
      res.end("404 Not Found");
  }
});

myserver.listen(8000, () => {
  console.log("Server running at http://localhost:8000/");
});
