require('dotenv').config();

// external packages
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;  // Server Port

const app = express();  // Start the app

require("./api/routes")(app); // Routes

// App settings
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Start the server
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});