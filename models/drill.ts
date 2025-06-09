import { Schema, model, models } from "mongoose";

/* ---------- Sub-schemas ---------- */
const categorySchema = new Schema(
  {
    technical: {
      type: [String],
      enum: [
        "Warm-Up",
        "Passing",
        "First Touch",
        "Dribbling",
        "Shooting",
        "Goalkeeper",
        "Cuts",
        "Footwork & Ball Control",
        "Heading",
      ],
      default: [],
    },
    tactical: {
      type: [String],
      enum: [
        "1v1 Def",
        "1v1 Off",
        "2v1",
        "1v2",
        "2v2",
        "3v2",
        "Horst Wein",
        "Playing Out From the Back",
        "Pressing",
        "Possession",
        "Switching Play",
        "Set-Piece Offensive",
        "Set-Piece Defensive",
        "Counter-Attacking",
        "Defending",
        "Attacking",
        "Offensive transition (DE-VI)",
        "Defensive transition (VI-DE)",
        "Phase 1",
        "Phase 2",
        "Phase 3",
      ],
      default: [],
    },
    physical: {
      type: [String],
      enum: ["Speed", "Agility", "Stamina", "Strength"],
      default: [],
    },
    gameSituations: {
      type: [String],
      enum: ["Match", "Mini Match"],
      default: [],
    },
  },
  { _id: false }
);

const equipmentSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["Cones", "Bibs", "Small goals", "Agility ladder"],
      required: true,
    },
    quantity: { type: Number, min: 1, default: 1 },
  },
  { _id: false }
);

const drillSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ageGroup: {
      type: [String],
      enum: ["5-9", "10-12", "13-19", "19+"],
      required: true,
    },
    category: { type: categorySchema, required: true },
    isIndividual: { type: Boolean, default: false },
    minPlayers: { type: Number, required: true },
    maxPlayers: { type: Number },
    equipment: [equipmentSchema],
    duration: { type: Number, required: true },
    images: [{ type: String, required: true }],
    videoUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Pre-save hook to handle individual drills and player counts
// This ensures that if a drill is individual, minPlayers and maxPlayers are set to 1,
// and that minPlayers cannot exceed maxPlayers.
drillSchema.pre("save", function (next) {
  // auto-set isIndividual ⇄ player counts
  if (this.minPlayers === 1 && (!this.maxPlayers || this.maxPlayers === 1)) {
    this.isIndividual = true;
  }
  if (this.isIndividual) {
    this.minPlayers = 1;
    this.maxPlayers = 1;
  }
  if (this.maxPlayers && this.minPlayers > this.maxPlayers) {
    return next(new Error("minPlayers cannot be greater than maxPlayers"));
  }
  next();
});

const Drill = models.Drill || model("Drill", drillSchema);

export default Drill;
