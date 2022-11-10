const express = require("express");
const indexRouter = require("./router/index");

const app = express();
const port = 4000;

app.use("/", indexRouter);

// app.get("/", (req, res) => {
//   res.send("111");
// });

app.listen(port, () => {
  console.log(`node listening on port ${port} `);
});
