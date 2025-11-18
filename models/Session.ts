import { Schema, model, models } from "mongoose";

const sessionDrillSchema = new Schema(
  {
    drillId: {
      type: Schema.Types.ObjectId,
      ref: "Drill",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const sessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    focus: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },

    dateTime: {
      type: Date,
    },

    drills: {
      type: [sessionDrillSchema],
      required: true,
      default: [],
    },

    totalDuration: {
      type: Number,
      default: 0,
    },

    createdByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Session = models.Session || model("Session", sessionSchema);

export default Session;
