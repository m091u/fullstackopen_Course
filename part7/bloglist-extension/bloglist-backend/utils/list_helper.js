const _ = require('lodash');


const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog;
  });
};

const mostBlogs = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author');
  const blogCounts = _.mapValues(groupedBlogs, 'length');
  const topAuthor = _.maxBy(_.entries(blogCounts), ([_, count]) => count);
  return { author: topAuthor[0], blogs: topAuthor[1] };
};

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return {};

  const groupedBlogs = _.groupBy(blogs, 'author');
    const blogLikes = _.maxBy(Object.entries(groupedBlogs), ([_, likes]) =>
    likes.reduce((acc, blog) => acc + blog.likes, 0)
  );

  return {
    author: blogLikes[0],
    likes: blogLikes[1].reduce((acc, blog) => acc + blog.likes, 0),
  };
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
