import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Skill title is required"], // ✅ Now required
    },
    proficiency: {
      type: String,
      required: [true, "Skill proficiency is required"], // ✅ Now required
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"], // ✅ Enum for consistency
    },
    svg: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true } // ✅ Added timestamps
);

export const Skill = mongoose.model("Skill", skillsSchema);
