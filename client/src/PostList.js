import React, { useState, useEffect } from "react";

import axios from "axios";
const PostList = () => {
	const [posts, setPosts] = useState({});
	const fetchPosts = async () => {
		const { data } = await axios.get("http://localhost:4000/posts");
		setPosts(data);
	};
	useEffect(() => {
		fetchPosts();
	}, []);
	console.log(posts);

	const renderedPosts = Object.values(posts).map((post) => {
		return (
			<div
				key={post.postID}
				className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 text-center justify-center hover:scale-105 mx-10 transform transition cursor-pointer"
			>
				<div>
					<h1 className="font-semibold">{post.postTitle}</h1>
				</div>
			</div>
		);
	});

	return <div className="grid grid-cols-3">{renderedPosts}</div>;
};

export default PostList;
