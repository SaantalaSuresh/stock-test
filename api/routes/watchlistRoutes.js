import express from 'express';
import Watchlist from '../models/Watchlist.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, stockId } = req.body;
    let watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      watchlist = new Watchlist({ userId, stocks: [stockId] });
      await watchlist.save();
      res.json({ message: 'Watchlist created successfully' });
    } else {
      if (!watchlist.stocks.includes(stockId)) {
        watchlist.stocks.push(stockId);
        await watchlist.save();
        res.json({ message: 'Stock added to watchlist successfully' });
      } else {
        res.json({ message: 'Stock already in watchlist' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const watchlist = await Watchlist.findOne({ userId }).populate('stocks');
    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }
    res.json(watchlist.stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
