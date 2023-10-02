import { Schema, model, models } from "mongoose";

const houseSchema = new Schema(
  {
    title: {
      type: String,
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
    },
    noOfGuests: {
      type: Number,
    },
    imageUrls: [],
    images: [],

    roomType: {
      type: String,
    },
    currentBookings: [],
    months: [
      {
        name: String,
        amount: Number,
        bookingStatus: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const House = models.House || model("House", houseSchema);

export default House;
