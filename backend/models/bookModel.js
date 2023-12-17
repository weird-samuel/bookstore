import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  author: {
    type: String,
    required: true,
  },
  publisheYear: {
    type: Number,
    required: true,
  },
});

export const Book = mongoose.model("Cat", { name: String });
