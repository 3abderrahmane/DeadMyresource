var express=require("express");
var bodyParser=require("body-parser");
var nodemailer = require('nodemailer');
require('dotenv').config();
const port = process.env.PORT || 3001;///Added
 
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://' + process.env.MONGOUSER + ':'+ process.env.MONGOPASS + '@cluster0.a3r3zu4.mongodb.net/ERERdesign');

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));

db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express();
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('public/css'));
app.use(express.static('public/images'));
app.use(bodyParser.urlencoded({
    extended: true
}));
var formdata = {}; 
app.post('/request', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var subject = req.body.subject;
    var message =req.body.message;
    var number = req.body.phone;
    var data = {
        "Name": name,
        "Email": email,
        "Subject": subject,
        "Message": message,
        "Phone Number": number
    };
    const passedData = Object.assign(formdata, data);
    db.collection('Guest').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL,
            pass: process.env.GPASS
          }
        });
        var mailOptions = {
          from: process.env.GMAIL,
          to: process.env.GMAIL,
          subject: formdata.Subject,
          text: JSON.stringify(formdata, null, '\t').replace(/"(\w+)"\s*:/g, '$1:')
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
         
    });
     //res.render('thankyou');
    return res.redirect(`https://www.ererdesign.com/thankyou.html`);
    //return res.sendFile(__dirname + '/thankyou.html');
})
console.log(formdata);
app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.sendFile(__dirname + '/index.html');
});
////.listen(port)

const server = app.listen(port, "216.24.60.0/24", () => console.log(`App listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

//console.log("server listening at port 10000");
//}).listen(10000)

//console.log("server listening at port 10000");


