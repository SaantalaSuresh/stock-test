import mongoose from 'mongoose';
// import Stock from './Stock.model.js'; // Ensure this path is correct

const watchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  stocks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stock',
      validate: {
        validator: (v) => mongoose.Types.ObjectId.isValid(v),
        message: 'Invalid ObjectId',
      },
    },
  ],
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;
