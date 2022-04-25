// import axios from "axios";
// import React, { useEffect, useState } from "react";
const CommentList = ({ comments }) => {
	// const [comments, setComments] = useState([]);
	// const retrieveComments = async () => {
	// 	const { data } = await axios.get(
	// 		`http://localhost:4001/posts/${postID}/comments`
	// 	);
	// 	setComments(data);
	// };
	// useEffect(() => {
	// 	retrieveComments();
	// }, []);

	const renderedComments = comments.map((comment) => {
		let content = "";
		if (comment.status === "approved") {
			content = comment.content;
		} else if (comment.status === "pending") {
			content = "This comment is waiting for moderation";
		} else if (comment.status === "rejected") {
			content = "This comment has been rejected";
		}
		return (
			<div className="text-blue-500" key={comment.id}>
				{content}
			</div>
		);
	});

	return (
		<div>
			{/* <h1>Comments</h1> */}
			{renderedComments}
		</div>
	);
};

export default CommentList;
