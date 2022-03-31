const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const app = express();
app.use(express.json());
app.use(cors());
const posts = {};

app.get("/posts", (req, res, next) => {
	res.send(posts);
});

app.post("/posts", (req, res, next) => {
	const postID = randomBytes(4).toString("hex");
	const postTitle = req.body.title;
	// create a new post instance
	posts[postID] = {
		postID,
		postTitle,
	};
	// return the response
	res.status(201).send(posts[postID]);
});

app.listen(4000, () => {
	console.log("POSTS SERVICE IS RUNNING UP ON PORT => 4000");
});
