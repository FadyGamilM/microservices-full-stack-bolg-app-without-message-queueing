const express = require("express");
const cors = require("cors");
require("colors");

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

app.post("/events", (req, res, next) => {
	try {
		// get the event
		const { type, data } = req.body;
		if (type === "PostCreated") {
			// get the post data
			const { postID, postTitle } = data;
			// add the new post
			posts[postID] = {
				postID,
				postTitle,
				comments: [],
			};
		} else if (type === "CommentCreated") {
			// get the comment data
			const { id, content, postID } = data;
			// add the comment
			// -> get the post
			const post = posts[postID];
			// -> edit the comments property of this post
			post.comments.push({
				id,
				content,
			});
		}
		console.log(`${type} Event is emmited from event broker`.inverse.green);
		console.log(posts);
		// finally return the response
		res.status(200).json({});
	} catch (error) {
		console.log(`Error: ${error.message}`.inverse.red);
	}
});

app.listen(4002, () => {
	console.log(`Query service is running up on port 4002`.inverse.magenta);
});
