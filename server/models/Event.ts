import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});
export default mongoose.model("Event", EventSchema);