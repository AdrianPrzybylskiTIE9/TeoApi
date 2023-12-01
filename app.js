const express = require("express") ;
const api = require("./api");

const app = express() ;

app.use(express.json())// json -> js

app.use("/api", api)

app.get("/", (req, res)=>{
    res.send("Witam") ;
})

app.listen(8080, ()=>{console.log("Server is running on the port 8080")}) ;