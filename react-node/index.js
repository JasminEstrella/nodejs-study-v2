const http = require('http');
const port = 8000;
const fs = require('fs');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    // Handle CORS (Cross-Origin Resource Sharing)
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow requests from all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // Allow specific HTTP methods

    const { query, pathname} = url.parse(req.url, true);
    const method = req.method;
    console.log(url.parse(req.url, true))

    switch(method) {
        case "GET":
            if (pathname == '/' || pathname == '/overview') {
                res.writeHead(200, { "Content-type": "application/json"});
                res.end(JSON.stringify({
                    data: dataObj,
                    message: "Success"
                }));
            // } else if (pathname === "/product") {
            } else if (pathname.startsWith("/product")) {
                const productId = pathname.split('/')[2];
                res.writeHead(200, { "Content-type": "application/json"});
                // const product = dataObj.find(product => product.id == query.id);
                const product = dataObj.find(product => product.id === parseInt(productId));
                console.log(product)
        
                res.end(JSON.stringify({
                    data: product,
                    message: "Success"
                }));
            } else {
                res.writeHead(404, { "Content-type": "text/html"});
                res.end('<h1>Page not found!</h1>');
            }
        case "POST":
            if (pathname === "/product") {

                

                res.writeHead(200, { "Content-type": "application/json"});
                res.end(JSON.stringify({
                    data: 'data',
                    message: "Success POST"
                }));

            }

            break;
        default:
            res.writeHead(404, { "Content-type": "text/html"});
            res.end('<h1>Page not found!</h1>');
    }

});


server.listen(port, () => {
    console.log(`Listening to port ${port}`)
})