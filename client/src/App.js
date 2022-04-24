import PostCreate from "./PostCreate";
import PostList from "./PostList";
function App() {
	return (
		<div className="App">
			<h1 className="font-semibold border-b-2 pb-4 mx-8 mt-8 text-4xl text-center">
				Blogify
			</h1>
			<h1 className="text-start mx-10 mt-4 font-semibold text-2xl text-slate-800">
				create a new post
			</h1>
			<PostCreate />
			<div className="border-b-4 mx-8"></div>
			<h1 className="text-start mx-10 mt-4 font-semibold text-2xl text-slate-800">
				All Posts
			</h1>
			<PostList />
		</div>
	);
}

export default App;
