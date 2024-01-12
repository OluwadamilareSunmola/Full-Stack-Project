const express = require("express");
const app = express();
const PORT = 8080;

// about our API
app.get("/about", (req, res) => {
	res.send("This is an API service for CRUD actions on movies resources.");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
