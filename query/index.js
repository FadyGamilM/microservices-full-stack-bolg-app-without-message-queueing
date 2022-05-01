const express = require("express");
const cors = require("cors");
require("colors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());

// data structure that maps to DB
// the query service will shape a DB to hold all posts with their comments
/**
 * posts = {
 *    "1": {
 *       postID: "1",
 *       title: "post 1",
 *       comments: [
 *             {id: "123145", content: "comment 1"}
 *       ]
 *    }
 * }
 *
 */
const posts = {};

app.get("/posts", (req, res, next) => {
	try {
		// we just need to return the posts db
		res.status(200).json(posts);
	} catch (error) {
		console.log(`Error: ${error.message}`.inverse.red);
	}
});

const handleEvents = (type, data) => {
	if (type === "PostCreated") {
		// get the post data
		const { postID, postTitle } = data;
		// add the new post
		posts[postID] = {
			postID,
			postTitle,
			comments: [],
		};
	}
	if (type === "CommentCreated") {
		// get the comment data
		const { id, content, postID, status } = data;
		// add the comment
		// -> get the post
		const post = posts[postID];
		// -> edit the comments property of this post
		post.comments.push({
			id,
			content,
			status,
		});
	}
	if (type === "CommentUpdated") {
		// get comment data
		const { id, content, postID, status } = data;
		// get the comment that is updated
		const post = posts[postID];
		const comment = post.comments.find((comment) => comment.id === id);
		comment.status = status;
		comment.content = content;
	}
};

app.post("/events", (req, res, next) => {
	try {
		// get the event
		const { type, data } = req.body;
		handleEvents(type, data);
		console.log(`${type} Event is emmited from event broker`.inverse.green);
		// finally return the response
		res.status(200).json({});
	} catch (error) {
		console.log(`Error: ${error.message}`.inverse.red);
	}
});

app.listen(4002, async () => {
	console.log(`Query service is running up on port 4002`.inverse.magenta);
	// once the query service is running up .. we can handle all the events that we might missed while any service was done
	const res = await axios.get("http://localhost:4005/events");
	for (let event of res.data) {
		console.log(`processing event: ${event.type}`.inverse.yellow);
		handleEvents(event.type, event.data);
	}
});
