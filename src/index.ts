import express, {Request, Response} from 'express';
import sqlite from 'sqlite3';
import {INTERVAL, PORT} from "./config/constants";
import {getData} from "./apiHandler";

const db = new sqlite.Database('db');
db.run("CREATE TABLE IF NOT EXISTS data (time TIMESTAMP, result TEXT)");

const app = express();
app.use(express.json());
app.use(express.static(__dirname+'/../public'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Home
app.get('/', (req: Request, res: Response) => {});
app.get('/api', (req: Request, res: Response) => res.sendFile('api.html', {root: __dirname+'/../public'}));

// API
app.get('/api/get/:num', (req: Request, res: Response) => {
    let num: number = Number(req.params.num ?? 1);
    num = num < 1 ? 1 : num;
    num = num > 50 ? 50 : num;

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
    getData(db);
}, INTERVAL);
