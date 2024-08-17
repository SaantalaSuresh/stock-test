import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Watchlist.css';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    if (!userId) {
      toast.error('User not logged in');
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`/api/watchlist/${userId}`);
        setWatchlist(response.data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        toast.error('Failed to fetch watchlist.');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [userId]);

  const handleRemoveStock = async (stockId) => {
    try {
      await axios.delete(`/api/watchlist/${userId}/stocks/${stockId}`);
      setWatchlist(watchlist.filter(stock => stock._id !== stockId));
      toast.success('Stock removed from watchlist.');
    } catch (error) {
      console.error('Error removing stock:', error);
      toast.error('Failed to remove stock.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="watchlist-container">
      <h1>Your Watchlist</h1>
      <ul className="watchlist">
        {watchlist.length === 0 ? (
          <p>Your watchlist is empty.</p>
        ) : (
          watchlist.map((stock) => (
            <li key={stock._id} className="watchlist-item">
              <div className="stock-info">
                <h2>{stock.name}</h2>
                <p>{stock.symbol}</p>
              </div>
              <button className="remove-button" onClick={() => handleRemoveStock(stock._id)}>
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Watchlist;
