import { Router } from "express";
import Participant from "../models/Participant";

const registerRouter = Router();

// POST registration
registerRouter.post("/", async (req, res) => {
  console.log("Incoming registration:", req.body);

  try {
    const { registrationType, ...rest } = req.body;

    let participantData: any;

    if (registrationType === "group") {
      participantData = {
        name: rest.groupLeaderName,
        email: rest.groupLeaderEmail,
        phone: rest.groupLeaderPhone,
        college: rest.groupLeaderCollege,
        eventIds: rest.eventIds,
        accommodation: rest.accommodation || "No",
        transportation: rest.transportation || "No",
        groupMembers: rest.groupMembers || [],
      };
    } else {
      participantData = {
        ...rest,
      };
    }

    const participant = new Participant(participantData);
    await participant.save();

    console.log("Saved participant:", participant);
    res.json({ ok: true, message: "Registered successfully", id: participant._id });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ ok: false, message: "Registration failed", error: err });
  }
});

// GET all participants
registerRouter.get("/", async (_req, res) => {
  try {
    const participants = await Participant.find().sort({ registeredAt: -1 });
    res.json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Failed to fetch participants" });
  }
});

export default registerRouter;
