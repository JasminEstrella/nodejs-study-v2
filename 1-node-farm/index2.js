const http = require("http");
const url = require("url");
const fs = require("fs");
///////////////////
// SERVER
const port = 8000;

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
console.log(`${__dirname}/dev-data/data.json`);
// const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/home") {
    res.end("Hello from the home page!");
  } else if (pathName === "/products") {
    res.end("Hello from the products page!");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/plain",
      "my-header": "hello-jas",
    });
    res.end("<h1>Not found!</h1>");
  }
});

server.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
