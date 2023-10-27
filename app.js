const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const routers = require('./router');
app.use(express.json());
// app.use(routers);

app.get('/home', (req,res) =>res.sendFile(path.join(__dirname, '/app/view/index.html')));
app.get('', (req,res)=> res.status(404).send("404 error not found"));

app.listen(port, ()=> 
    console.log(`Example app listening at http://localhost:${port}`)
);