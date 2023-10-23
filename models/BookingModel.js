import { Schema, model, models } from "mongoose";

const bookingSchema = new Schema(
  {
    house: {
      type: String,
      required: true,
    },
    houseId: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      default: "pending",
    },
    guests: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
    ApprovedBy: {
      type: String,
      required: true,
      default: "Not Approved",
    },

    referenceNumber:{
      type:String,
      required:true
    },

    month: {
      type: String,
      default: () => new Date().toLocaleString("default", { month: "long" }),
    },
  },
  {
    timestamps: true,
  }
);

const Bookings = models.Bookings || model("Bookings", bookingSchema);

export default Bookings;
