const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstack.ehtllxd.mongodb.net/testBlogApp?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false)

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model("Blog", blogSchema)

const blog = new Blog({
    title: "Reflections of a woman entering Tech",
    author: "Madhushree B",
    url: "https://medium.com/@madhushree.b/reflections-of-a-woman-entering-tech-…",
    likes: 10
})

blog.save().then((result) => {
  console.log("blog saved!")
  mongoose.connection.close()
})