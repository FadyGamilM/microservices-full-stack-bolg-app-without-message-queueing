import axios from "axios";
import React, { useState } from "react";
const CommentCreate = ({ postID }) => {
	const [commentContent, setCommentContent] = useState("");
	const createComment = async (e) => {
		e.preventDefault();
		const { data } = await axios.post(
			`http://localhost:4001/posts/${postID}/comments`,
			{
				content: commentContent,
			}
		);
		setCommentContent("");
	};

	return (
		<div>
			<form onSubmit={createComment}>
				<input
					value={commentContent}
					onChange={(e) => setCommentContent(e.target.value)}
					className="border-solid border-2 border-black-300 px-2"
					type="text"
					placeholder="add new comment"
				/>
				<div className="text-center mt-2">
					<button
						type="submit"
						className="bg-green-500 p-2 rounded-lg text-white font-bold hover:scale-110 transition transform"
					>
						comment
					</button>
				</div>
			</form>
		</div>
	);
};

export default CommentCreate;
