/* ----------------------- import essential libraries ----------------------- */
const express = require("express");
const axios = require("axios");
require("colors");

/* ------------------------ some required middlewares ----------------------- */
const app = express();
app.use(express.json());
const events = [];
app.post("/events", async (req, res, next) => {
	// get the event from body of request
	const event = req.body;
	// store every incoming event
	events.push(event);
	// publish the event to all services
	// => the POSTS Service
	await axios.post("http://localhost:4000/events", event);
	// => the COMMENTS Service
	await axios.post("http://localhost:4001/events", event);
	// => the QUERY Service
	await axios.post("http://localhost:4002/events", event);
	// => the MODERATION Service
	await axios.post("http://localhost:4003/events", event);
	res.status(200);
});

app.get("/events", (req, res, next) => {
	res.status(200).json(events);
});

/* ----------------------------- listen to port ----------------------------- */
app.listen(4005, () => {
	console.log(`Event Bus Service is running up on port 4005`.inverse.magenta);
});
