const express = require("express");
const chars = require("../chars");
const router = express.Router();

router.get("/chars", (req, res)=>{
    res.json(chars.list()) ;
})

router.post("/chars", (req, res)=>{
    res.json(chars.add(req.body)) ;
})

router.put("/char/:id", (req, res)=>{
    req.body.id = parseInt(req.params.id);
    res.json(chars.update(req.body));
})

router.get("/char/:id", (req, res)=>{
    res.json(chars.get(req.params.id)) ;
})

router.delete("/char/:id", (req, res) => {
    res.json(chars.delete(parseInt(req.params.id)))
})

module.exports = router;