import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  eventIds: [String],
  accommodation: { type: String, default: "No" },
  transportation: { type: String, default: "No" },
  groupMembers: [{ name: String, rollNumber: String }],
  registeredAt: { type: Date, default: Date.now },
});

export default mongoose.model("Participant", ParticipantSchema, "participate");
