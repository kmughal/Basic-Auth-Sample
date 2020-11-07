require("mongoose")
  .connect("mongodb://localhost:27017/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((mongoose) => {
  
    const Schema = mongoose.Schema;
    const ObjectId = mongoose.Schema.ObjectId;
    const BlogPostSchema = new Schema({
      author: ObjectId,
      title: String,
      body: String,
      date: Date,
    });

    const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
   
    let instance = new BlogPost();
    instance.title = "khurram";
    instance.body = "hello world";
    instance.save();
    
    BlogPost.create({
      title: "khurram",
      body: "hello world",
    })
      .then((err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(res);
      })
      .catch(console.error);
  })
  .catch(console.log);
