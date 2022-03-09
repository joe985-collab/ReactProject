const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
app.set('view engine','ejs');
mongoose.connect("mongodb://localhost:27017/mydata");
const visualSchema = {
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
};

const Visual = mongoose.model("Visual",visualSchema);
app.route("/articles")
.get(function(req,res){
    Visual.find(function(err,foundArticles){
        if(err){
            console.log(err);
        }else{
            res.send(foundArticles);
        }
    })
})
let PORT = process.env.PORT||8080
app.listen(PORT,function(){
    console.log("Server started succesfully at "+PORT+".")
})