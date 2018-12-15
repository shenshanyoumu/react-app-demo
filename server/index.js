const path = require("path");
const express = require("express");
const render = require("./server.js");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const graphqlServer = require("./graphqlServer");

const app = express();

//挂载下面静态资源
app.use("/js", express.static(path.join(__dirname, "./js")));
app.use("/css", express.static(path.join(__dirname, "./css")));
app.use("/images", express.static(path.join(__dirname, "./images")));
app.use("/lang", express.static(path.join(__dirname, "./lang")));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(methodOverride());

app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

graphqlServer(app);

app.use(render.default || render);

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "5000";
app.listen(port, host, err => {
  if (err) return console.log(err);

  console.log(`Express server running at ${host}:${port}`);
});
