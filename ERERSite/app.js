var express=require("express");
var bodyParser=require("body-parser");
var nodemailer = require('nodemailer');
require('dotenv').config() 
 
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://' + process.env.MONGOUSER + ':'+ process.env.MONGOPASS + '@cluster0.a3r3zu4.mongodb.net/');

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
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");

        var transporter = nodemailer.createTransport({
          service: 'outlook',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASS,
          }
        });
        var mailOptions = {
          from: process.env.EMAIL,
          to: process.env.EMAIL,
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
     res.render('thankyou');
    //return res.redirect(`http://www.afouko.com`);
    //return res.sendFile(__dirname + '/thankyou.html');
})
console.log(formdata);
app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.sendFile(__dirname + '/index.html');
    }).listen(3000)

console.log("server listening at port 3000");

