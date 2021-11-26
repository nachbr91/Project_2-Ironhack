const { Schema, model } = require('mongoose');

const raceSchema = new Schema(
  {
    name: { type: String, required: true },
    circuitName: { type: String, required: true },
    laps: { type: Number },
    circuitLength: { type: String },
    lapRecord: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Race = model('Race', raceSchema);

module.exports = Race;
