const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 3000;

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to Mongo')
  } catch (err) {
    console.log('Error connecting to mongo: ', err);
  };
};
connectToMongo();
