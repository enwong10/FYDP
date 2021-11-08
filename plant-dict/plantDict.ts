import fs from 'fs';
import initSqlJs from 'sql.js/dist/sql-wasm.js';

const filebuffer = fs.readFileSync('../plant-db/vascan');

initSqlJs().then(function (SQL) {
    // Load the db
    const db = new SQL.Database(filebuffer);

    if (process.argv.length < 3) {
        console.log("Please enter name.")
        return;
    }

    const NAME = process.argv.slice(2);

    const idRes = db.exec('SELECT DISTINCT id FROM vernacularname WHERE vernacularname LIKE "%' + NAME + '%"');

    if (idRes.length === 0) {
        console.log('NO PLANT FOUND.');
        return;
    }
    const idArr = idRes[0].values.map((a) => a[0]);

    idArr.map((id, i) => {
        const taxonRes = db.exec('SELECT * FROM taxon WHERE id = ' + id);
        const descRes = db.exec('SELECT * FROM description WHERE id = ' + id);
        const distRes = db.exec('SELECT * FROM distribution WHERE id = ' + id);
        const nameRes = db.exec('SELECT * FROM vernacularname WHERE language = "EN" AND id = ' + id + ' ORDER BY ispreferredname');

        if (taxonRes.length > 0) {
            console.log('PLANT ' + (i + 1));
            taxonRes[0].columns.forEach((_, k) => {
                console.log(taxonRes[0].columns[k] + ': ' + taxonRes[0].values[0][k]);
            })
            descRes.length > 0 && descRes[0].columns.forEach((_, k) => {
                console.log(descRes[0].columns[k] + ': ' + descRes[0].values[0][k]);
            })
            distRes.length > 0 && distRes[0].values.forEach((_, l) => {
                distRes[0].columns.forEach((_, k) => {
                    console.log(distRes[0].columns[k] + ': ' + distRes[0].values[l][k]);
                })
            })
            nameRes.length > 0 && nameRes[0].values.forEach((_, l) => {
                nameRes[0].columns.forEach((_, k) => {
                    console.log(nameRes[0].columns[k] + ': ' + nameRes[0].values[l][k]);
                })
            })
        }
    })
});
