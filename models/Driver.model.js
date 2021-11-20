const {Schema,  model} = requireÇ('mongoose');

const driverSchema = new Schema(
  {
    name: {type: String, required: true},
    team: [{type: Schema.Types.ObjectId, ref: 'Constructor'}],
    country: {type: String},
    podiums: {type: Number},
    worldChampionships: {type: Number},
    imageUrl: {type: String}
  },
  {timestamps: true}
);

const Driver = model('Driver', driverSchema);

module.exports = Driver;