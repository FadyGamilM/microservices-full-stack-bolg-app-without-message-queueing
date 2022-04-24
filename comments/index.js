const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
require("colors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostID = {};
app.get("/posts/:postID/comments", (req, res, next) => {
	res.status(200).send(commentsByPostID[req.params.postID] || []);
});

app.post("/posts/:postID/comments", async (req, res, next) => {
	const commentID = randomBytes(4).toString("hex");
	const postID = req.params.postID;
	const commentContent = req.body.content;
	// get the old array of comments associated with this id
	const comments = commentsByPostID[postID] || [];
	// create the new comment
	const newComment = {
		id: commentID,
		content: commentContent,
	};
	// push this comment to the old array
	comments.push(newComment);
	// update the associated comments for this post id
	commentsByPostID[postID] = comments;
	await axios.post("http://localhost:4005/events", {
		type: "CommentCreated",
		data: {
			id: commentID,
			content: commentContent,
			postID,
		},
	});
	// send to the user the entire updated array of comments for this specific post
	return res.status(201).send(comments);
});

app.post("/events", (req, res, next) => {
	console.log(
		`${req.body.type} Event is emmited from event broker`.inverse.green
	);
	res.status(200).send("Event is Recieved");
});

app.listen(4001, () => {
	console.log(`Comments service is running up on port 4001`.inverse.magenta);
});
