// Registration model
import mongoose from "mongoose";
const RegistrationSchema = new mongoose.Schema({
  eventId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
});
export default mongoose.model("Registration", RegistrationSchema);
