// Import core Node.js modules
const http = require("http");
const fs = require("fs");
const url = require("url");

// Create HTTP server
const myserver = http.createServer((req, res) => {
  // Ignore browser's automatic favicon.ico request
  if (req.url === "/favicon.ico") return res.end();

  // Get current timestamp and convert it to human-readable time
  const timestamp = Date.now(); // milliseconds since Jan 1, 1970
  const time = new Date(timestamp).toLocaleString(); // e.g. 9/7/2025, 10:30:12 PM

  // Log message with request details
  const log = `${time}: ${req.url}  New request Received\n`;

  // Parse the request URL into parts (pathname + query string)
  const myurl = url.parse(req.url, true); 
  console.log(myurl); // Debug: shows full parsed URL object in console

  // Append the log into a file (non-blocking, async)
  fs.appendFile("log.txt", log, (err) => {
    if (err) console.error("Error writing log:", err);

    // Routing based on pathname
    switch (myurl.pathname) {
      case "/":
        res.end("Home Page"); // Respond with Home Page
        break;

      case "/about":
        // Example: http://localhost:8000/about?myname=Sunil
        const username = myurl.query.myname || "Guest"; // fallback if no name
        res.end(`Hi, ${username}`);
        break;

      default:
        res.statusCode = 404; // Proper HTTP status for not found
        res.end("404 Not Found");
    }
  });
});

// Start server on port 8000
myserver.listen(8000, () => {
  console.log("✅ Server running at http://localhost:8000/");
});
