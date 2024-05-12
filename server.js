/*------DUMMY DATA---------*/
const ARTICLES = [
    {
        id:0,
        title: 'Top 10 Ways to Build Your Express Server',
        Content: 'blah blah blah',
    },
    {
        id:1,
        title: 'What is better?',
        Content: 'Who is to say?',
    },
];  
const FRUITS = [
    {
        name: 'apple',
        descriptio: 'tasty'
    },
    {
        name: 'pineapple',
        descriptio: 'tropical'
    },
    {
        name: 'plum',
        descriptio: 'whatever'
    },
];

const VEGGIES = [
    {
        name: 'celery',
        descriptio: 'pretty unremarkable'
    },
    {
        name: 'cabbiage',
        descriptio: 'healthy'
    },
    {
        name: 'cauli flower',
        descriptio: 'vegans fav'
    },
];

/*------REQUIRED MODULES--------*/
//We need to require the express package
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

//We are setting a port number for our server to run
const PORT = process.env.PORT || 3000;

//We are using the express package to create a new express web app
const app = express();

/*------MIDDLEWARE PIPELINE----------*/
app.use(cors());
app.use(logger('dev'));

app.use(function(req, res, next){
    req.time = new Date();
    next();
});


/*---------ROUTES-----------*/ 
//We are adding a new route to our web app
//This route will respond to Get requests going to an empty endpoint
//empty end point is represented by '/'
app.get('/', function(req, res){
    res.json({data: 'Here is our first response!'});
}) 

//custom middleware
app.use(function(req, res, next) {
    if(req.query.user){
       return next();
    } else {
        res.redirect('/');
    }    
})

app.get('/test', function (req,res){
    console.log('This is our test route');
    res.json({data: 'Here is our data from the test route', time: req.time});
})

app.get('/favorite-food', function(req,res){
    res.send('Thai food');
})

app.get('/favorite-movie', function(req,res){
    res.send('Forest Gump');
})

app.get('/contact', function(req,res){
    res.send('cell phone');
})

app.get('/about-me', function(req,res){
    res.json({name: 'Lincy Thomas', gender: 'Female'})
})

app.get('/movies', function(req,res) {
    console.log('req.time: ', req.time);
    res.json({
        movies: [
            {
                title: 'Army of Darkness',
                releaseDate: 1998,
                durationInMinutes: 90,
            },
            {
                title: 'Clueless',
                releaseDate: 1997,
                durationInMinutes: 90.
            },
            {
                title: 'The Hobbit',
                releaseDate: 2014,
                durationInMinutes: 180,
            },
        ],
        time: req.time,
    })
})

app.get('/article/:id', function(req, res){
    console.log(req.params);
    const article = ARTICLES.find(art => art.id === parseInt(req.params.id));
    res.send(article);
})

app.get('/find', function(req, res){
    console.log(req.query);
    let produce;
    if(req.query.type === 'fruit'){
        produce = FRUITS.find(fruit => fruit.name === req.query.name);
    } else if (req.query.type === 'veggie'){
        produce = VEGGIES.find(veggie => veggie.name === req.query.name);
    } 
    res.send(produce || {data: 'not found'});
})

//This code should reamian at the bottom of the file
app.listen(PORT, function() {
    console.log(`Express server is listening on port ${PORT}`)
})