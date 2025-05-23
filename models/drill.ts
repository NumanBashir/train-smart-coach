import { Schema, model, models } from "mongoose";

const DrillSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the drill"],
  },
  description: {
    type: String,
  },
});

const Drill = models.Drill || model("Drill", DrillSchema);

export default Drill;
