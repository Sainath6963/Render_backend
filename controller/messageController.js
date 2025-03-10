import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Message } from "../models/mesageSchema.js"; // Fixed import typo

// Send a new message
export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { senderName, subject, message } = req.body;

  if (!senderName || !subject || !message) {
    return next(
      new ErrorHandler(
        "All fields (senderName, subject, message) are required.",
        400
      )
    );
  }

  const data = await Message.create({ senderName, subject, message });

  res.status(201).json({
    success: true,
    message: "Message Sent Successfully.",
    data,
  });
});

// Get all messages
export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find().sort({ createdAt: -1 }); // Newest first
  res.status(200).json({
    success: true,
    count: messages.length,
    messages,
  });
});

// Delete a message
export const deleteMessage = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findByIdAndDelete(id);
  if (!message) {
    return next(new ErrorHandler("Message not found.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Message Deleted Successfully.",
  });
});
