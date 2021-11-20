const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'Email is required'],
      match: [/\S+@\S+\.\S+/, 'Email is not valid'],
      unique: true,
      trim: true,
    },
    favoriteDrivers: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
    favoriteTracks: [{ type: Schema.Types.ObjectId, ref: 'Race' }],
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
