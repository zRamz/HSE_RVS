require("dotenv").config();
const express = require('express');
const sequelize = require('./db-connector');
const cors = require('cors');
const router = require('./routes/index');
const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(`Error name: ${e.name}`);
        console.log(`Error msg: ${e.message}`);
        console.log(`Error stack: ${e.stack}`);
    }
}

start();