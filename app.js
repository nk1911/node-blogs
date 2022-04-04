const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUrl = process.env.mongoUrl;
const port = process.env.port;
mongoose
  .connect(mongoUrl)
  .then((result) =>
    app.listen(
      port,
      console.log(`Server listening on http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));

// blogs api
app.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.use("/blog", require("./routes/blogRoutes"));

app.get("/create", (req, res) => {
  res.render("create", { title: "Create new blog" });
});

app.use((req, res) => {
  res.render("404", { title: "Not found" });
});
