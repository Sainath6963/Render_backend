import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Timeline } from "../models/timelineSchema.js";

// Add new timeline
export const postTimeline = catchAsyncError(async (req, res, next) => {
  const { title, description, from, to } = req.body;

  if (!title || !description || !from || !to) {
    return next(new ErrorHandler("Please provide all details!", 400));
  }

  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: {
      from: new Date(from),
      to: new Date(to),
    },
  });

  res.status(201).json({
    success: true,
    message: "Timeline Added",
    timeline: newTimeline,
  });
});

// Delete a timeline entry
export const deleteTimeline = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);

  if (!timeline) {
    return next(new ErrorHandler("Timeline not found!", 404));
  }

  await timeline.deleteOne();

  res.status(200).json({
    success: true,
    message: "Timeline Deleted!",
  });
});

// Get all timelines (formatted)
export const getAllTimeline = catchAsyncError(async (req, res, next) => {
  const timelines = await Timeline.find();

  // Format data before sending response
  const formattedTimelines = timelines.map((item) => ({
    _id: item._id,
    title: item.title,
    description: item.description, // Fixed spelling
    timeline: {
      from: new Date(item.timeline.from).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
      }), // Example: "Jan 2017"
      to: new Date(item.timeline.to).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
      }),
    },
  }));

  res.status(200).json({
    success: true,
    timelines: formattedTimelines,
  });
});
