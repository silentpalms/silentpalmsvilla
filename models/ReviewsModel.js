import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    rating: { type: Number, required: true },
    message: {
      type: String,
      required: true,
    },
    reviewStatus: {
      type: String,
      default: "Pending",
    },
    readStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = models.Reviews || model("Reviews", reviewSchema);

export default Reviews;
