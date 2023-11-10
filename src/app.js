const express = require("express");
const app = express();
require("./db/conn");
const User = require("./models/usermessage");
const path = require("path");
const port = process.env.port || 3000;
const hbs = require("hbs");
const registerPartials = require("hbs");

// Setting the path
const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");

// middleware
app.use("/css", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));

// view engine set
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialPath);

// routing
app.get("/",(req,res)=>{
    // res.send("hi");
    res.render("index");
});
app.get("/contact",(req,res)=>{
    // res.send("hi");
    res.render("contact");
});

app.post("/contact",async(req,res)=>{
try {
    // res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
    
} catch (error) {
    res.status(500).send(error)
}
})

app.listen(port,()=>{
    console.log("The running port number is",port);
})