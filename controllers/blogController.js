//blog_index,blog_Details,blog_create_get,blog_create_post,blog_delete

const Blog = require("../models/blog");

const blog_index=(req,res)=>{
    Blog.find().sort({ createdAt: -1})
    .then((result)=>{
        res.render('index',{title:"all blogs",blogs:result})
    })
    .catch((err) =>{
        console.log(err);
    })
}

const blog_details=(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('details',{blog:result,title:'Blog details'});
    })
    .catch(err=>{
        console.log(err);
    });
}
module.exports={
    blog_index,
    blog_details
}