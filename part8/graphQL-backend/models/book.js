// const mongoose = require('mongoose')

// // you must install this library
// const uniqueValidator = require('mongoose-unique-validator')

// const schema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: 5
//   },
//   published: {
//     type: Number,
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Author'
//   },
//   genres: [
//     { type: String}
//   ]
// })

// schema.plugin(uniqueValidator)

// module.exports = mongoose.model('Book', schema)

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String }
  ]
});

schema.plugin(uniqueValidator);

if (mongoose.models.Book) {
  console.log("Book model already defined, using the existing one");
} else {
  console.log("Defining Book model");
}

module.exports = mongoose.models.Book || mongoose.model('Book', schema);
