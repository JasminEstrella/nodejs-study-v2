const http = require("http");
const url = require("url");
const fs = require("fs");
///////////////////
// SERVER
const port = 8000;

const replaceTemplate = (temp, product) => {
  let output = temp.replace("{%PRODUCTNAME%}", product.productName);
  output = output.replace("{%ID%}", product.id);
  output = output.replace("{%FROM%}", product.from);
  output = output.replace("{%NUTRIENTS%}", product.nutrients);
  output = output.replace("{%QUANTITY%}", product.quantity);
  output = output.replace("{%PRICE%}", product.price);
  output = output.replace("{%IMAGE%}", product.image);
  output = output.replace("{%DESCRIPTION%}", product.description);

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
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html " });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCardsHtml, el))
      .join("");
    const output = tempOverviewHtml.replace("{%CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathName === "/products") {
    res.end("Hello from the products page!");
  } else if (pathName === "/api") {
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
