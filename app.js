const express = require("express");
const indexRouter = require("./router/index");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

app.use("/", indexRouter);

// });

app.listen(port, () => {
  console.log(`node listening on port ${port} `);
});
