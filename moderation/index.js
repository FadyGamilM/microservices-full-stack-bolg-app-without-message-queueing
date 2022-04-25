const express = require("express");
require("colors");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res, next) => {
	try {
		// get the event from the request body
		const { type, data } = req.body;
		if (type === "CommentCreated") {
			const status = data.content.includes("fuck") ? "rejected" : "approved";
			// send an event to the event-bus after finishing the bussiness logic of this service
			await axios.post("http://localhost:4005/events", {
				type: "CommentModerated",
				data: {
					id: data.id,
					content: data.content,
					postID: data.postID,
					status,
				},
			});
		}
		console.log(`${type} Event is emmited from event broker`.inverse.green);
		res.status(200).json({});
	} catch (error) {
		console.log(`Error: ${error.message}`.inverse.red);
	}
});

app.listen("4003", () => {
	console.log(`Moderation Service is running up on port 4003`.inverse.magenta);
});
