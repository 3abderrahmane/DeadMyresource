const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect("mongodb+srv://technologva-nodequide:ERERdesign2024@cluster0.ux6bufu.mongodb.net/GuideApp",
    {
         useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) return console.error(err)
        console.log('Connected to Database');
        const db = client.db('UserData');
        const dataCollection = db.collection('rawdata');

        // Make sure you place body-parser before your CRUD handlers!
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.set('view engine', 'ejs');///Always first before any app.  .
        console.log('My Node Guide App');

        //get
        app.get('/', (req, res) => {
             //get data from mongo to user:
             db.collection('rawdata')
                 .find()
                 .toArray()
                 .then(results => {
                     res.render('index.ejs', { data: results })
             })
             .catch(error => console.error(error))
        });
        //post
        app.post('/userInput', (req, res) => {
            dataCollection
            .insertOne(req.body)
            .then(result => {
              res.redirect("/")
            })
            .catch(error => console.error(error))
        });
        app.use(express.static('public'));
        ///Update put request with java script from main.js
        app.put('/userInput', (req, res) => {
            console.log(req.body)
            dataCollection
            .findOneAndUpdate(
                { name: 'ABDERR' },
                {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote,
                    },
                },
                {///insert this if no document data exist in the database
                    upsert: false,
                }
            )
            .then(result => {
                res.json("Done")//loged into console of the browser not the vcode terminal
            })
            .catch(error => console.error(error))
        })

        ///delet with javascript from main.js
        app.delete('/userDelete', (req, res) => {
            dataCollection.deleteMany(
                { 
                    name: req.body.name 
                })
                .then(result => {
                    if (result.deletedCount === 0) {
                      return res.json('No quote to delete')
                    }
                    res.json(`Done Deleting!!!`)
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, function () {
            console.log('listening on 3000');
        });
})




