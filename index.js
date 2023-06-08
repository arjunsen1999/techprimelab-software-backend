require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const { connection } = require("./config/db");

// all routes
const { authRouter } = require("./routes/Auth.routes");
const { projectRouter } = require("./routes/Project.routes");

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/", (req, res) => {
  return res.send("<h1>Welcome to the Techprimelab Software Backend</h1>");
});

app.listen(PORT, () => {
  connection();
  console.log({ server: `http://localhost:${PORT}` });
});
