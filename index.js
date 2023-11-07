const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const flash = require('express-flash');
const session = require('express-session');
const routers = require('./router');
const swaggerJSON = require('./openapi.json');
const swaggerUI = require('swagger-ui-express');
const passport = require('./utils/passport');


app.use(express.json()); //req.body json

app.use(express.urlencoded({ extended:false })); //req.body form data
app.use(session({ //middleware
    secret:"secret",
    resave: false,
    saveUninitialized:true
}));
app.use(flash()); //register flash middleware ke express -> req.flash
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'./app/view')); //mengubah folder views ke app view

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use(routers);
app.get('/home', (req,res) =>res.sendFile(path.join(__dirname, '/app/view/index.html')));
app.get('', (req,res)=> res.status(404).send("404 error not found"));

app.listen(port, async ()=> 
    console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;