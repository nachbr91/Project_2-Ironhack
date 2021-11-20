const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Can't be blank"],
      match: [/\S+@\S+\.\S+/, 'Email not valid'],
      unique: true,
    },
    favoriteDrivers: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
    favoriteTracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;