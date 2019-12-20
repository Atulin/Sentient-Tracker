import axios from 'axios';
import {Database} from "sqlite3";
import {LOCATIONS} from "./config/constants";
import SocketIO from "socket.io";

export function getData(db: Database, socket: SocketIO.Socket) {
    axios.get('http://content.warframe.com/dynamic/worldState.php')
        .then((res) => {
            let value = res.data.Tmp.replace('\\', '');
            let insert = value === '[]' ? null : LOCATIONS[parseInt(JSON.parse(value).sfn)];

            db.serialize(() => {
                db.get("SELECT result FROM data ORDER BY time DESC LIMIT 1", (e, row) => {
                    console.log(insert || null, row?.result);

                    if (insert !== row?.result) {
                        let event = {time: Date.now(), location: insert};

                        socket.emit('event', event);

                        const stmt = db.prepare("INSERT INTO data VALUES (?, ?)");
                        stmt.run([event.time, event.location]);
                        stmt.finalize();
                    }
                });
            });

        })
        .catch((err) => {
            console.error(err);
        });
}
