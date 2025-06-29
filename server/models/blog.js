import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
    },

    content: {
      type: String,
      required: [true, "Blog content is required"],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    publishedDate: {
      type: Date,
      default: Date.now,
    },

    blogImage: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    isPublished: {
      type: Boolean,
      default: true,
    },

    isfeatured: {
      type: Boolean,
      default: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    viewedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    wishlistBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Generate slug and excerpt before saving
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-");
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
