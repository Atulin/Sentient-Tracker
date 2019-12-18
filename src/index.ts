import express from 'express';
import sqlite from 'sqlite3';
import {INTERVAL, PORT} from "./config/constants";
import {getData} from "./apiHandler";

const db = new sqlite.Database('db');
db.run("CREATE TABLE IF NOT EXISTS data (time TIMESTAMP, result TEXT)");

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Poll the API
setInterval(() => {
    console.log('Polling...');
    getData(db);
}, INTERVAL);
