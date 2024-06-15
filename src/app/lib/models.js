import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "student", "parent", "teacher", "adviser"],
      required: true,
    },
    // Relations
    parentOf: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to other User (for parents)
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class", // Reference to Class (for students)
    },
    modulesTeaching: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module", // Reference to Module (for teachers)
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification", // Reference to Notification
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

const classSchema = new mongoose.Schema({
  grade: {
    type: String,
    enum: ["lycee", "cem", "primaire"],
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
});

export const Class =
  mongoose.models.Class || mongoose.model("Class", classSchema);

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

export const Module =
  mongoose.models.Module || mongoose.model("Module", moduleSchema);

const courseSchema = new mongoose.Schema({
  datePosted: {
    type: Date,
    required: true,
    default: Date.now,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
