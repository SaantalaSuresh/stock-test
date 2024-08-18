// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Watchlist.css';

// const Watchlist = () => {
//   const [watchlist, setWatchlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userId = localStorage.getItem('userId'); // Get userId from localStorage

//   useEffect(() => {
//     if (!userId) {
//       toast.error('User not logged in');
//       return;
//     }

//     const fetchWatchlist = async () => {
//       try {
//         const response = await axios.get(`/api/watchlist/${userId}`);
//         setWatchlist(response.data);
//       } catch (error) {
//         console.error('Error fetching watchlist:', error);
//         toast.error('Failed to fetch watchlist.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWatchlist();
//   }, [userId]);

//   const handleRemoveStock = async (stockId) => {
//     try {
//       await axios.delete(`/api/watchlist/${userId}/stocks/${stockId}`);
//       setWatchlist(watchlist.filter(stock => stock._id !== stockId));
//       toast.success('Stock removed from watchlist.');
//     } catch (error) {
//       console.error('Error removing stock:', error);
//       toast.error('Failed to remove stock.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="watchlist-container">
//       <h1>Your Watchlist</h1>
//       <ul className="watchlist">
//         {watchlist.length === 0 ? (
//           <p>Your watchlist is empty.</p>
//         ) : (
//           watchlist.map((stock) => (
//             <li key={stock._id} className="watchlist-item">
//               <div className="stock-info">
//                 <h2>{stock.name}</h2>
//                 <p>{stock.symbol}</p>
//               </div>
//               <button className="remove-button" onClick={() => handleRemoveStock(stock._id)}>
//                 Remove
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Watchlist;


// above 



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './Watchlist.css';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
   const userId ="user124" //localStorage.getItem('userId'); // Get userId from localStorage

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

  const handleAddStock = async (stock) => {
    try {
      const { name, symbol } = stock;
      const datetime = new Date().toLocaleString(); // Capture the current datetime

      const response = await axios.post('/api/watchlist', {
        userId,
        stock: { name, symbol, datetime },
      });

      if (response.data.success) {
        setWatchlist([...watchlist, { ...stock, datetime }]);
        toast.success('Stock added to watchlist.');
      } else {
        toast.error(response.data.message || 'Failed to add stock.');
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      toast.error('Failed to add stock.');
    }
  };

  const handleRemoveStock = async (stockId) => {
    try {
      await axios.delete(`/api/watchlist/${userId}/stocks/${stockId}`);
      setWatchlist(watchlist.filter((stock) => stock._id !== stockId));
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
                <p>{stock.datetime}</p>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemoveStock(stock._id)}
              >
                <FaTrash />
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
