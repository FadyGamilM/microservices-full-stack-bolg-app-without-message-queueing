import React, { useState } from "react";
import axios from "axios";
const PostCreate = () => {
	const [title, setTitle] = useState("");

	const SubmitForm = async (e) => {
		e.preventDefault();
		const { data } = await axios.post("http://localhost:4000/posts", {
			title: title,
		});
		setTitle("");
	};

	return (
		<div className="grid place-items-center mt-5">
			<div className="w-full max-w-xs">
				<form
					onSubmit={SubmitForm}
					className="bg-white shadow-xl rounded-xl px-4 pt-6 pb-8 mb-4"
				>
					<div className="my-4 flex flex-col">
						<label className="font-bold text-lg">Title</label>
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="border-solid border-2 border-black-300"
							type="text"
						/>
					</div>
					<div className="text-center">
						<button
							type="submit"
							className="bg-sky-500 p-2 rounded-lg text-white font-bold hover:scale-110 transition transform"
						>
							create new post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostCreate;
