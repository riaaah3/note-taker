const app = require("express").Router()
let db = require("../db/db.json")
const fs = require("fs")
//CRUD - Create REad Update Delete

app.get("/api/notes", (req, res) => {
    db = JSON.parse(fs.readFileSync("./db/db.json")) || []
    res.json(db)
})

app.post("/api/notes", (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 999)
    }
    db.push(newNote)
    fs.writeFileSync("./db/db.json", JSON.stringify(db), function (err) {
        if (err) throw err;
    })
    res.json(db)
})

app.delete("/api/notes/:id", (req, res) => {
    let notesList = []

    db.forEach(note => {
        if(note.id != req.params.id){
            notesList.push(note)
        }
    })

    db = notesList

    /*

    for(let i=0;i<db.length;i++){
        if(db[i].id != req.params.id){
            noteList/push(db[i])
        }
    }

    */

    fs.writeFileSync("./db/db.json", JSON.stringify(db), function (err) {
        if (err) throw err;
    })
    res.json(db)
})

module.exports = app