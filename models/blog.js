const mongoose =require('mongoose');
const schema=mongoose.Schema;

const blogSchema= new schema({

    title:{
        type:String,
        require:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        require:true
    },
},{timestamps:true});

const Blog=mongoose.model('Blog',blogSchema);

module.exports=Blog;