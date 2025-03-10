import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: [true, "Sender name is required!"], // ✅ Now required
    minLength: [2, "Name must contain at least 2 characters!"], // ✅ Fixed grammar
  },
  subject: {
    type: String,
    required: [true, "Subject is required!"], // ✅ Now required
    minLength: [2, "Subject must contain at least 2 characters!"], // ✅ Fixed grammar
  },
  message: {
    type: String,
    required: [true, "Message cannot be empty!"], // ✅ Now required
    minLength: [2, "Message must contain at least 2 characters!"], // ✅ Fixed grammar
  },
  createdAt: {
    type: Date,
    default: Date.now, // ✅ Removed parentheses for correct behavior
  },
});

export const Message = mongoose.model("Message", messageSchema);
