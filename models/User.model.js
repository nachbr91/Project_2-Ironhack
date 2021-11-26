const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password is not valid',
      ],
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
