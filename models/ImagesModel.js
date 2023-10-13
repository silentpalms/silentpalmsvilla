import { Schema, model, models } from "mongoose";

const imageSchema = new Schema(
  {
    imageDetails: [
      {
        name: {
          type: String,
          required: true,
        },
        imageUrls: [],
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Image = models.Image || model("Image", imageSchema);

export default Image;
