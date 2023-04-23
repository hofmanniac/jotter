import "./App.css";

function getHello() {
	fetch("/api/hello")
		.then((response) => response.json())
		.then((data) => {
			console.log(data.message);
		})
		.catch((error) => console.error(error));
}

function handleClick() {
	getHello();
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<div>
					<button onClick={handleClick}>Say Hello from the Backend...</button>
				</div>
			</header>
		</div>
	);
}

export default App;
