import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required!"],
    },
    description: {
      type: String,
      required: [true, "Description Required!"], // ✅ Fixed typo
    },
    timeline: {
      from: {
        type: Date, // ✅ Changed from String to Date
        required: [true, "Timeline starting date is Required"],
      },
      to: {
        type: Date, // ✅ Changed from String to Date
      },
    },
  },
  { timestamps: true } // ✅ Added timestamps for better tracking
);

export const Timeline = mongoose.model("Timeline", timelineSchema);
