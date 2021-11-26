const { Schema, model } = require('mongoose');

const driverSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    number: { type: Number, required: true },
    team: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    podiums: { type: Number, required: true },
    wonRaces: { type: Number, required: true },
    worldChampionships: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Driver = model('Driver', driverSchema);

module.exports = Driver;
