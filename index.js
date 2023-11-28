require('dotenv').config();
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;
const flash = require('express-flash');
const session = require('express-session');
const routers = require('./router');
const swaggerJSON = require('./openapi.json');
const swaggerUI = require('swagger-ui-express');
const passport = require('./utils/passport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { JWTsign } = require('./utils/jwt');
const ejs = require('ejs');
const {sendMail, sendMailHTML} = require('./lib/mailer')
// const BASE_URL = process.env.BASE_URL;

app.use(morgan('combined'))

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


Sentry.init({
    dsn: 'https://3fcf4ccd163886691a9b39a0daeb7fc8@o4506258331009024.ingest.sentry.io/4506258595381248',
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app }),
        new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use(routers);
app.get('/', function (req,res) {
    res.send('hello, world!');
})
app.get('/home', (req,res) =>res.sendFile(path.join(__dirname, '/app/view/index.html')));
app.get('', (req,res)=> res.status(404).send("404 error not found"));

app.post('/forgot-password/send-email', async (req,res)=> {
    const { email } = req.body;
    const url = req.protocol+"://"+req.headers.host;

    const user = await prisma.user.findFirst({
        where:{
            email: req.body.email
        } 
    })

    delete user.password
    const token = await JWTsign(user);

    const updateUser = await prisma.user.update({
        where: {
            email
        },
        data: {
            resetToken: token
        }
    });


    ejs.renderFile(__dirname + "/templates/forgot-password.ejs",
    { 
        forgot:`${url}/new-pass?token=${token}` 
        }, function (err, data) {
        // url:BASE_URL + '/' + token
        if (err) {
            console.log(err);
        } else {
            sendMailHTML(email, `Halo ${user.name}`, data)
        }
    })
    // sendMail(email, `Halo ${name}`, 
    //     `Terimakasih sdah mendaftar pada aplikasi kami! 
    //     Silahkan klik link berikut tk proses verifikasi`
    // )
    
    res.status(200).json({
        status:'ok',
        message: 'Berhasil Register! Silahkan cek email utk verifikasi',
        url:url
    })
});

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.use(Sentry.Handlers.errorHandler());
  
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

app.listen(port, async ()=> 
    console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;