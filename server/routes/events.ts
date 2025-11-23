import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Event from "../models/Event";
import Registration from "../models/Registration";

const router = express.Router();

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.JWT_SECRET || "secret");
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}

router.post("/", adminAuth, async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err });
  }
});

router.put("/:id", adminAuth, async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err });
  }
});

router.delete("/:id", adminAuth, async (req: Request, res: Response) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err });
  }
});

router.post("/:id/register", async (req: Request, res: Response) => {
  try {
    const registration = await Registration.create({
      eventId: req.params.id,
      ...req.body,
    });
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: "Error registering for event", error: err });
  }
});

router.get("/:id/registrations", adminAuth, async (req: Request, res: Response) => {
  try {
    const regs = await Registration.find({ eventId: req.params.id });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching registrations", error: err });
  }
});

export default router;
