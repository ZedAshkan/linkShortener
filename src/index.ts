import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
// @ts-ignore
import ipware from "ipware";

import Link from "./models/link";

dotenv.config();

// create express app
const app = express();

mongoose
  .connect(process.env.DBURI!)
  .then(() => {
    // listen for requests
    app.listen(3000, () => {
      console.log("App Listening On Port 3000!");
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
  // for now its hardcoded
  let ip = "192.168.1.1";
  console.log(ip);
  if (!id) {
    id = (Date.now() + Math.floor(Math.random() * 1660290034505))
      .toString(36)
      .substring(2, 6);
  }
  try {
    await Link.createNew(id, url, ip);
    res.json({ id });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ error: err.message, id });
  } finally {
    res.end();
  }
});

app.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let array = id.split("");
  console.log(array[array.length - 1]);
  if (array[array.length - 1] == "!") {
    const newId = array.slice(0, array.length - 1).join("");
    const status = await Link.findOne({ id: newId });
    if (status) {
      res.json({ open_count: status.open_count });
    } else {
      res.json({ error: "Not Found" });
    }
  } else {
    try {
      const result = await Link.findOne({ id });
      if (result) {
        result.open_count++;
        res.redirect(result.url);
        await result.save();
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    } finally {
      res.end();
    }
  }
});

// 404 page
app.get("*", (req, res) => {
  res.status(404).render("404", { title: "404" });
});
