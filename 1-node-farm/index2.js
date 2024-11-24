const http = require("http");
const url = require("url");
const fs = require("fs");
const port = 8000;
const replaceTemplate = require("./modules/replaceTemplate");
///////////////////
// SERVER

const tempOverviewHtml = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempCardsHtml = fs.readFileSync(
  `${__dirname}/templates/cards.html`,
  "utf-8"
);
const tempProductsHtml = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// console.log(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html " });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCardsHtml, el))
      .join("");
    const output = tempOverviewHtml.replace("{%CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    console.log(req.method);
    res.writeHead(200, { "Content-type": "text/html " });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProductsHtml, product);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-header": "hello-jas",
    });
    res.end("<h1>Not found!</h1>");
  }
});

server.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
