import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  student: {
    name: { type: String, required: true },
    pfp: { type: String, required: true },
    id: { type: String, required: true },
  },
  comment: { type: String, required: true },
});

const courseSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Cours", "Devoir", "Epreuves", "Evaluation Continue"],
    required: true,
  },
  date: { type: Date, required: true },
  link: { type: String, required: true },
  file: { type: String, required: true },
  comments: [commentSchema],
});

const moduleSchema = new Schema({
  name: { type: String, required: true },
  // teacherName: { type: String, required: true }, //to be removed
  // teacherPfp: { type: String, required: true },
  teacherId: { type: String, required: true },
  courses: [courseSchema],
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  pfp: { type: String, required: true },
  id: { type: Number, required: true },
});

const classSchema = new Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  year: { type: Number, required: true },
  number: { type: Number, required: true },
  modules: [moduleSchema],
  students: [studentSchema],
});

const levelSchema = new Schema({
  classes: [classSchema],
});

const Lycee = mongoose.models.Lycee || mongoose.model("Lycee", levelSchema);
const Cem = mongoose.models.Cem || mongoose.model("Cem", levelSchema);
const Primaire =
  mongoose.models.Primaire || mongoose.model("Primaire", levelSchema);

export { Lycee, Cem, Primaire };
