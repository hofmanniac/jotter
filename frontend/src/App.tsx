import React from "react";
import "./App.css";

function App() {
	const [posts, setPosts] = React.useState([]);
	const [post, setPost] = React.useState("");

	function getPosts() {
		fetch("/api/posts")
			.then((response) => response.json())
			.then((data) => {
				setPosts(data);
			})
			.catch((error) => console.error(error));
	}

	React.useEffect(() => {
		getPosts();
	}, []);

	function handleGetPost(post: string) {
		fetch("/api/post/" + post)
			.then((response) => response.text())
			.then((data) => {
				setPost(data);
			})
			.catch((error) => console.error(error));
	}

	return (
		<div className="flexy">
			<div className="leftMenu">
				<h2>Posts</h2>
				{posts.map((post: any) => (
					<div className="pointy" onClick={() => handleGetPost(post)}>
						{post}
					</div>
				))}
			</div>
			<div className="stage">
				<div dangerouslySetInnerHTML={{ __html: post }} />
			</div>
		</div>
	);
}

export default App;
