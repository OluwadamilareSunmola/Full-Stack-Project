const express = require("express");
const app = express();
const PORT = 8080;
const cors = require('cors');

app.use(cors());
app.use(express.json());


// about our API
app.get("/about", (req, res) => {
	res.send("This is an API service for CRUD actions on movies resources.");
});

// the {name} value is dynamic based on the URL provided.
app.get("/about/:name", (req, res) => {
	const name = req.params.name;
	res.send(
		"This is an API service for CRUD actions on a movies resource...for you " +
			name
	);
});

const movieRouter = require('./routes/movies_routes');
app.use('/movies', movieRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
