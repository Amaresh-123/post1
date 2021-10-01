const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");
const { redirect } = require("statuses");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Connection to MongoDB
mongoose.connect("mongodb://Admin:123@post-shard-00-00.q3sb0.mongodb.net:27017,post-shard-00-01.q3sb0.mongodb.net:27017,post-shard-00-02.q3sb0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-lwdgms-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Creating the Model
const noteSchema = {
    title: String,
    content: String
}

const Note = mongoose.model("Note", noteSchema);

// Connecting server to view

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

// Posting to MongoDB

app.post("/", function(req, res){
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })

    newNote.save();
    res.redirect("/");
})

app.listen(4000, function(){
    console.log("Server is running in 4000");
})