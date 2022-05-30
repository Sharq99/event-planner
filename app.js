const express = require('express');
const eventRoutes = require('./apis/events/events.routes');

const connectDB = require("./database/connection");

const app = express();

//middleWare
app.use(express.json());

app.use('/api/events',eventRoutes);

connectDB();

const PORT = 8001;
app.listen(PORT, () => console.log("This app is running on localhost:"+(PORT)));

