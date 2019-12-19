import axios from 'axios';
import {Database} from "sqlite3";
import {LOCATIONS} from "./config/constants";

export function getData(db: Database) {
    axios.get('http://content.warframe.com/dynamic/worldState.php')
        .then((res) => {
            let value = res.data.Tmp.replace('\\', '');
            let insert = value === '[]' ? null : LOCATIONS[parseInt(JSON.parse(value).sfn)];

            db.serialize(() => {
                db.get("SELECT result FROM data ORDER BY time DESC LIMIT 1", (e, row) => {
                    console.log(insert || null, row?.result);

                    if (insert !== row?.result) {
                        const stmt = db.prepare("INSERT INTO data VALUES (?, ?)");
                        stmt.run([Date.now(), insert]);
                        stmt.finalize();
                    }
                });
            });

        })
        .catch((err) => {
            console.error(err);
        });
}
