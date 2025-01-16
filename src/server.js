const express = require('express');
const app = express();
const indexRoutes = require('./routes/index.route');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
// -- Routes
app.use('/',indexRoutes);

// -- Listen 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});