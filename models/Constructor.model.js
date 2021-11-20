const { Schema, model } = require('mongoose');

const constructorSchema = new Schema(
  {
    teamName: { type: String, required: true },
    base: { type: String },
    teamChief: { type: String },
    firstTeamEntry: { type: String },
    worldChampionships: { type: Number },
    imageUrl: { type: String },
    drivers: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
  },
  { timestamps: true }
);

const Constructor = model('Constructor', constructorSchema);

module.exports = Constructor;