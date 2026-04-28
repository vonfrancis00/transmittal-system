const mongoose = require("mongoose");

const transmittalSchema = new mongoose.Schema(
  {
    ref: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    to: {
      type: String,
      required: true,
      trim: true,
    },

    charge: {
      type: String,
      default: "",
      trim: true,
    },

    from: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      default: "",
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Saves EXACTLY into collection: transmittalDB
module.exports = mongoose.model(
  "Transmittal",
  transmittalSchema,
  "transmittalDB"
);