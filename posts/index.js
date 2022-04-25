const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");
const app = express();
app.use(express.json());
app.use(cors());
require("colors");

const posts = {};

app.get("/posts", (req, res, next) => {
	res.status(200).json(posts);
});

app.post("/posts", async (req, res, next) => {
	try {
		const postID = randomBytes(4).toString("hex");
		const postTitle = req.body.title;
		//! create a new post instance
		posts[postID] = {
			postID,
			postTitle,
		};
		//! Emmit post request to /events to Event-bus service that is running at 4005
		await axios.post("http://localhost:4005/events", {
			type: "PostCreated",
			data: {
				postID,
				postTitle,
			},
		});
		//! return the response
		res.status(201).json(posts[postID]);
	} catch (error) {
		console.log(
			`Error From Posts Service \n Error Message: ${error.message}`.inverse.red
		);
	}
});

app.post("/events", (req, res, next) => {
	console.log(
		`${req.body.type} Event is emmited from event broker`.inverse.green
	);
	res.status(200).send("Event is Recieved");
});

app.listen(4000, () => {
	console.log(`Posts service is running up on port 4000`.inverse.magenta);
});
