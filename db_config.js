const mariadb = require('mariadb')
const conn = mariadb.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "sekolah",
    password: "",
    port: 3306,
});

const query = function (params) {
    return new Promise(function (resolve, reject) {
        conn.then(async (conn) => {
            try {
                const result = await conn.query(params)
                resolve({
                    success: true,
                    data: result
                })
            } catch (e) {
                console.log(e)
                reject({
                    success: false
                })
            }
        })
    })
}

module.exports = { query }