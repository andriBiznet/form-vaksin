const express = require('express')
const db = require('./db_config')
const app = express()
var bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

function code(tanggal, id){
    return `ISERVEVACCINE/${tanggal}/${id}`
}

app.route('/tambah_guru')
    .get((req, res) => {
        res.render("../views/add_guru.ejs")
    })
    
    .post(async (req, res) => {


        const { nik, nama } = req.body
        const search = await db.query(`SELECT * FROM tbl_pendaftaran WHERE nik = '${nik}'`)
        var search_result = search.data[0];
        let codeVac = code(`2021-02-09`, 4)
        console.log(codeVac)
        let result;
        if (!search_result){
            result = await db.query(`INSERT INTO tbl_pendaftaran(nik,nama)VALUES('${nik}','${nama}')`)
        } else {
            res.send({result:"error"});
            // res.redirect('/');
        }
        // res.json(result)
    })

app.get('/', function (req, res) {
    res.render("../views/home.ejs")
})

app.route('/')
.get(function (req, res) {
    res.render("../views/home.ejs")
})
.post(async function (req, res) {
    const result = await db.query('SELECT * FROM tbl_pendaftaran')
    res.send(result)
})

app.route('/edit_guru')
    .get(function (req, res) {
        const { id, name, mapel } = req.query
        res.render('../views/edit_guru.ejs', {
            id: id,
            name: name,
            mapel: mapel
        })
    })
    .post(async function (req, res) {
        const { id, name, mapel } = req.body
        const result = await db.query(`UPDATE master_guru SET Name='${name}', Mapel='${mapel}' WHERE GuruID='${id}'`)
        res.send(result)
    })

    app.route('/delete_guru')
    .get(async function (req, res) {
        const { id } = req.query
        const result = await db.query(`DELETE FROM master_guru WHERE GuruID='${id}'`)
        res.redirect('/')
    })   
     
app.listen(port, () => console.log("Server run at 3000"))