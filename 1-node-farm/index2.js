const http = require("http");
const url = require("url");
const fs = require("fs");
///////////////////
// SERVER
const port = 8000;

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic)
    output = output.replace("{%NOT_ORGANIC%}", "not-organic");

  return output;
};

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
console.log(`${__dirname}/dev-data/data.json`);
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
