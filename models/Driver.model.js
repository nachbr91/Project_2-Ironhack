const {Schema,  model} = require('mongoose');

const driverSchema = new Schema(
  {
    name: {type: String, required: true},
    country: {type: String},
    podiums: {type: Number},
    wonRaces: {type: Number},
    worldChampionships: {type: Number},
    imageUrl: {type: String}
  },
  {timestamps: true}
);

const Driver = model('Driver', driverSchema);

module.exports = Driver;