import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import Link from "./models/link";

dotenv.config();

// create express app
const app = express();

const client = mongoose.connect(process.env.DBURI!);

// view engine setup
app.set("view engine", "ejs");

// listen for requests
app.listen(3000, () => {
	console.log("Example app listening on port 3000!");
});

// use public folder to store static assets
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/", (req, res) => {
	res.render("index", { title: "Home" });
});

app.post("/api", (req, res) => {
	const url = req.body.url;
	const id = (Date.now() + Math.floor(Math.random() * 1660290034505))
		.toString(36)
		.substring(2, 6);
	const link = new Link({ id, url });
	client
		.then((db) => {
			console.log(db);
			link
				.save()
				.then((result) => {
					res.json({ id });
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			mongoose.connection.close();
		});
});

app.get("/:id", (req, res, next) => {
	const id = req.params.id;

	Link.findOne({ id })
		.then((result) => {
			if (result) {
				res.redirect(result.url);
			} else {
				next();
			}
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			res.end();
		});
});

// 404 page
app.get("*", (req, res) => {
	res.status(404).render("404", { title: "404" });
});
