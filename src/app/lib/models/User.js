import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
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
    pfp: {
      type: String,
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
    role: {
      type: String,
      enum: ["admin", "student", "parent", "teacher", "adviser"],
      required: true,
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
    about: {
      type: String,
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
