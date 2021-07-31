const express=require("express");
const bodyparser=require("body-parser");
const mongoose = require('mongoose');



const ejs=require("ejs");

const _=require("lodash");

const homestartingcontent= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const aboutcontent="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

const contactcontent="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

mongoose.connect(' mongodb+srv://admin-vinay:test123@cluster0.hzcwl.mongodb.net/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

 const postSchema ={
   title: String,
   content: String
 };

 const Post= mongoose.model("Post",postSchema);



const app=express();
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingcontent: homestartingcontent,
      posts: posts
      });
  });
});


app.get("/list",function(req,res){

  res.render("list", {listTitle: "Today", newListItems: defaultItems});

});


app.get("/posts/:postId",function(req,res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id:requestedPostId}, function(err,post){

    res.render("posts", { title: post.title,
     content: post.content});
  });
});


app.get("/contact",function(req,res){

  res.render("contact", {contact: contactcontent});
});

app.get("/about",function(req,res){

  res.render("about", {about: aboutcontent});
});




//to render the extended website;
app.get("/compose",function(req,res){

  res.render("compose");
});
//to take input from the user;
app.post("/compose",function(req,res){

  const post=new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port,function(){
  console.log("server running at port 3000");
});
