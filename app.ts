const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// create express app
const app = express();

// connect to mongodb
const client = new MongoClient(process.env.DBURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

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
	client.connect((err) => {
		const collection = client.db("ShortLink").collection("Links");
		collection.insertOne({ id, url }, (err, result) => {
			client.close();
			res.json({ id });
		});
	});
});

app.get("/:id", (req, res, next) => {
	const id = req.params.id;
	client.connect((err) => {
		const collection = client.db("ShortLink").collection("Links");
		collection.findOne({ id }, (err, doc) => {
			client.close();
			if (doc) {
				res.redirect(doc.url);
			} else {
				// next();
				res.status(404).render("404", { title: "404" });
			}
		});
	});
});

// 404 page
app.get("*", (req, res) => {
	res.status(404).render("404", { title: "404" });
});
