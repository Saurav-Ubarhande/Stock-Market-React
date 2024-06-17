const mongoose = require('mongoose');

// Define the schema for buy requests
const Watchlist = new mongoose.Schema({


  symbol: String,
  name: String,
  currentPrice: Number,
  dailyChange: Number,
  percentChange:Number,
  
});
// Create a Mongoose model based on the schema
const Fav = mongoose.model('Fav', Watchlist);

module.exports = Fav; // Export the Buy model