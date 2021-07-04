const express=require("express");
//express app
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');
//const Blog=require('./models/blog');
const { render } = require("ejs");
//connect to mongodb
const blogRoutes=require('./routes/blogroutes');

const dburi='ENTER THE MONGODB STRING URL HERE';
mongoose.connect(dburi, {useNewUrlParser:true,useUnifiedTopology:true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine','ejs');
//listen for request
//app.listen(3000);
//this is used for sending html file
/*app.get('/',function(req,res){
    console.log("listening to port 3000");
    //res.send('hello world');

    res.render('index');
})*/
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{title:"about"});
});

app.use('/',blogRoutes);


//method used for middleware for next method 
/*app.use((req,res,next)=>{
    console.log('new request was made');
    console.log('host:',req.hostname );
    console.log('path:',req.path);
    console.log('method:',req.method);
    next();
});*/

/*app.use((req,res,next)=>{
    console.log('in the next middleware');
    next();
});*/
//this is sending for ejs file

app.get('/',(req,res)=>{
    const blogs=[
        {title:'yoshi finds eggs',snippet:"lorem ispum dolor ist"},
        {title:"mario finds eggs",snippet:"lorem ispum sit mel"},
        {title:"nar to defeat stars",snippet:"lorem ispum do l"},
    ];
    res.render('index',{title:"home",blogs});
});


//middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
/*app.get('/add-blog',(req,res) =>{
    const blog= new Blog({
        title:'new blog 2',
        snippet:'about my new blog',
        body:'more about my new blog'
    });
    blog.save()
    .then((result) =>{
        res.send(result)
    })
    .catch((err) =>{
        console.log(err);
    });
});

app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
})

app.get('/single-blog',(req,res) =>{
    Blog.findById('5f56551d9638b91260174d3d')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
})*/
/*app.get('/name',function(req,res){
    console.log("going to name");
   // res.send('name page');
   res.sendFile('./views/name.html',{root:__dirname});
   
})*/



app.use((req,res)=>{
    //res.sendFile('./views/404.html',{root:__dirname});
    res.status(404).render('404',{title:"not found"});
});