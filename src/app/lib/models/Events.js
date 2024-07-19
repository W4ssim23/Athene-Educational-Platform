import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  start: { type: String, required: true },
  description: { type: String, required: true },
  eventEnd: { type: String },
  votes: { type: Boolean, required: true },
  yesVotes: [
    {
      name: { type: String, required: true },
      id: { type: String, required: true },
    },
  ],
  noVotes: [
    {
      name: { type: String, required: true },
      id: { type: String, required: true },
    },
  ],
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export { Event };
