import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
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
    bahbah: {
      type: String,
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
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    email: {
      type: String,
      // match: /^\S+@\S+\.\S+$/,
      // Optional email validation pattern
    },
    phone: {
      type: String,
      // match: /^\d{10,15}$/,
      // Optional phone number validation pattern
    },
    address: {
      type: String,
    },
    about: {
      type: String,
    },

    // Used if it's a student
    className: {
      type: String,
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    grade: {
      type: String,
      enum: ["cem", "lycee", "prm"],
    },
    parentName: {
      type: String,
    },
    //student absence and latency:
    abcense: [
      {
        type: Date,
      },
    ],

    // Used if it's a teacher
    classes: [
      {
        type: String,
      },
    ],
    modules: [
      {
        type: String,
      },
    ],
    // All except admin
    notifications: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Adding an index to optimize queries on timestamps
userSchema.index({ createdAt: 1, updatedAt: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
