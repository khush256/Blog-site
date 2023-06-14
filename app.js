const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb://maverick:test1234@ac-khez67s-shard-00-00.afzxqvm.mongodb.net:27017,ac-khez67s-shard-00-01.afzxqvm.mongodb.net:27017,ac-khez67s-shard-00-02.afzxqvm.mongodb.net:27017/node-tuts?ssl=true&replicaSet=atlas-vb1lov-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .then((result) => console.log("connected"))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// listen for requests

// middlewares & static files
// app.use((req,res,next) => {
//     console.log("new request made:");
//     console.log("host: ", req.hostname);
//     console.log("path: ", req.path);
//     console.log("method: ", req.method);
//     next();
// });
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req,res) => {
//     const blog = new Blog({
//         title : 'Madara',
//         snippet : 'Hello dear',
//         body : 'What else can i say'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blogs', (req,res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// app.get('/single-blog', (req,res) => {
//     Blog.findById('64805b20e52990dce7a4c62b')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

app.get('/',(req,res) => {
    res.redirect('/blogs')
    // const blogs = [
    //     {title: 'TechCrunch', snippet: 'TechCrunch is a blog that provides technology and startup news, from the latest developments in Silicon Valley to venture capital funding.'},
    //     {title: 'The Verge', snippet: 'The Verge is a blog focused on examining how technology will change the future.'},
    //     {title: 'Engadget', snippet: 'Launched by Peter Rojas, Engadget is a technology blog providing reviews of gadgets and consumer electronics as well as the latest news in the tech world.'}
    // ]
    // res.send('<p>Home Page</p>');
    // res.render('index', {title: 'Home', blogs});
});

//middleware
// app.use((req,res,next) => {
//     console.log('in the next middleware');
//     next();
// });

app.get('/about',(req,res) => {
    res.render('about', {title: 'About'});
});

// blog routes

app.use('/blogs', blogRoutes)


// 404 page
app.use((req,res)=>{
    res.render('404', {title: '404'});
})