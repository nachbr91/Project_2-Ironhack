const { Schema, model } = require('mongoose');

const teamSchema = new Schema(
  {
    teamName: { type: String, required: true },
    base: { type: String },
    teamChief: { type: String },
    firstTeamEntry: { type: Number },
    worldChampionships: { type: Number },
    imageUrl: { type: String },
    drivers: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
  },
  { timestamps: true }
);

const Team = model('Team', teamSchema);

module.exports = Team;