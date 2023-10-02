import { Schema, model, models } from "mongoose";

const ratesSchema = new Schema(
  {
    houseName: {
      type: String,
      required: true,
    },
    lowSeason: {
      type: Number,
      required: true,
    },
    highSeason: {
      type: Number,
      required: true,
    },
    christmasNewYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HouseRates = models.HouseRates || model("HouseRates", ratesSchema);

export default HouseRates;
