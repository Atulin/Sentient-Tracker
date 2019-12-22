import express, {Request, Response} from 'express';
import sqlite from 'sqlite3';
import {INTERVAL, PORT} from "./config/constants";
import {getData} from "./apiHandler";
const cors = require('cors');

// Setup SQLite
const db = new sqlite.Database('db');
db.run("CREATE TABLE IF NOT EXISTS data (time TIMESTAMP, result TEXT)");

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

let server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Setup Websockets
let io = require("socket.io").listen(server);
io.on('connection', function(){
    console.log('Websocket connection established.');
});

// Routes
app.get('/', (req: Request, res: Response) => res.redirect('https://anomaly-tracker.netlify.com/'));
app.get('/status', (req: Request, res: Response) => res.status(200).send('OK'));

// API
app.get('/api/get/:num', (req: Request, res: Response) => {
    let num: number = Number(req.params.num ?? 1);
    num = num < 1 ? 1 : num;
    num = num > 200 ? 200 : num;

    let stmt = db.prepare("SELECT * FROM data ORDER BY time DESC LIMIT ?");
    stmt.all(num, (e, row) => {
        try {
            res.json(row);
        } catch (e) {
            res.status(500).send(e.toString());
        }
    });
});

// Poll the Warframe API
setInterval(() => {
    console.log('Polling...');
    getData(db, io);
}, INTERVAL);
