import mongoose from "mongoose";

const softwareApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Software application name is required"], // ✅ Now required
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

export const SoftwareApplication = mongoose.model(
  "SoftwareApplication",
  softwareApplicationSchema
);
