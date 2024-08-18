import express from 'express';
import Watchlist from '../models/Watchlist.model.js';

const router = express.Router();





// router.post('/', async (req, res) => {
//   try {
//     const { userId, stock } = req.body;
//     let watchlist = await Watchlist.findOne({ userId });
//     if (!watchlist) {
//       watchlist = new Watchlist({ userId, stocks: [stock] });
//       await watchlist.save();
//       return res.json({ success: true, message: 'Watchlist created successfully' });
//     } 

//     const stockExists = watchlist.stocks.some(
//       (s) => s.symbol === stock.symbol
//     );

//     if (stockExists) {
//       return res.json({ success: false, message: 'Stock already in watchlist' });
//     }

//     watchlist.stocks.push(stock);
//     await watchlist.save();
//     res.json({ success: true, message: 'Stock added to watchlist successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });




router.get('/:userId', async (req, res) => {router.post('/', async (req, res) => {
  try {
    const { userId, stock } = req.body;
    console.log('Received data:', req.body);

    if (!userId || !stock || !stock.symbol || !stock.name) {
      console.error('Invalid data received:', req.body);
      return res.status(400).json({ success: false, message: 'Invalid data received' });
    }

    let watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      watchlist = new Watchlist({ userId, stocks: [stock] });
      await watchlist.save();
      return res.json({ success: true, message: 'Watchlist created successfully' });
    }

    const stockExists = watchlist.stocks.some((s) => s.symbol === stock.symbol);

    if (stockExists) {
      return res.json({ success: false, message: 'Stock already in watchlist' });
    }

    watchlist.stocks.push(stock);
    await watchlist.save();
    res.json({ success: true, message: 'Stock added to watchlist successfully' });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

  try {
    const userId = req.params.userId;
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }
    res.json(watchlist.stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:userId/stocks/:stockId', async (req, res) => {
  try {
    const { userId, stockId } = req.params;
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }

    watchlist.stocks = watchlist.stocks.filter((stock) => stock._id.toString() !== stockId);
    await watchlist.save();
    res.json({ success: true, message: 'Stock removed from watchlist successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
