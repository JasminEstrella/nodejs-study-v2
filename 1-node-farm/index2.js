const http = require('http'); 
const url = require('url');
///////////////////
// SERVER
const port = 8000;

const server = http.createServer((req, res) => {
    console.log(req.url)
    res.end("Hello from the server!");
});

server.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});