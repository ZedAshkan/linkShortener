import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import Link from "./models/link";

dotenv.config();

// create express app
const app = express();

console.log(process.env.DBURI);

mongoose
  .connect(process.env.DBURI!)
  .then(() => {
    // listen for requests
    app.listen(3000, () => {
      console.log("Example app listening on port 3000!");
    });
  })
  .catch(err => {
    console.log("connect to database failed", err);
  });

// view engine setup
app.set("view engine", "ejs");
// file location
app.set("views", "dist/views");

// use public folder to store static assets
app.use(express.static("dist/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/", (req, res) => {
  res.render("home/index", { title: "Home" });
});

app.post("/api", async (req, res) => {
  const url = req.body.url;
  let id = req.body.id;
  if (!id) {
    id = (Date.now() + Math.floor(Math.random() * 1660290034505))
      .toString(36)
      .substring(2, 6);
  }
  try {
    await Link.createNew(id, url);
    res.json({ id });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ error: err.message, id });
  } finally {
    res.end();
  }
});

app.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await Link.findOne({ id });
    if (result) {
      res.redirect(result.url);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  } finally {
    res.end();
  }
});

// 404 page
app.get("*", (req, res) => {
  res.status(404).render("404", { title: "404" });
});
