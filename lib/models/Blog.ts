import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    image: String,

    metaTitle: String,

    metaDescription: String,

    keywords: [String],

    permalink: {
      type: String,
      required: true,
      unique: true,
    },

    schema: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);