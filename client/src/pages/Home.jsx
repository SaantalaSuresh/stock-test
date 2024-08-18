// // // import React from 'react';

// // // export default function Home() {
// // //   return (
// // //     <div className='px-4 py-12 max-w-2xl mx-auto'>
// // //       <h1 className='text-3xl font-bold  mb-4 text-slate-800'>
// // //         Welcome to my Auth App!
// // //       </h1>
// // //       <p className='mb-4 text-slate-700'>
// // //         This is a full-stack web application built with the MERN (MongoDB,
// // //         Express, React, Node.js) stack. It includes authentication features that
// // //         allow users to sign up, log in, and log out, and provides access to
// // //         protected routes only for authenticated users.
// // //       </p>
// // //       <p className='mb-4 text-slate-700'>
// // //         The front-end of the application is built with React and uses React
// // //         Router for client-side routing. The back-end is built with Node.js and
// // //         Express, and uses MongoDB as the database. Authentication is implemented
// // //         using JSON Web Tokens (JWT).
// // //       </p>
// // //       <p className='mb-4 text-slate-700'>
// // //         This application is intended as a starting point for building full-stack
// // //         web applications with authentication using the MERN stack. Feel free to
// // //         use it as a template for your own projects!
// // //       </p>
// // //     </div>
// // //   );
// // // }




// // import React, { useState, useCallback } from 'react';
// // import AsyncSelect from 'react-select/async';
// // import axios from 'axios';
// // import { ToastContainer, toast } from 'react-toastify';
// // import TradingViewWidget from 'react-tradingview-widget';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './Home.css';

// // const ALPHA_VANTAGE_API_KEY = 'CD5APXP15BV41R7L'; // Replace with your API key

// // function Home() {
// //     const [stockData, setStockData] = useState([]);
// //     const [selectedStock, setSelectedStock] = useState(null);
// //     const [portfolio, setPortfolio] = useState([]);
// //     const [loading, setLoading] = useState(false);

// //     const fetchStockData = async (symbol) => {
// //         try {
// //             setLoading(true);
// //             const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
// //             const data = response.data['Time Series (Daily)'];

// //             if (data) {
// //                 const formattedData = Object.entries(data).map(([date, values]) => ({
// //                     date,
// //                     open: values['1. open'],
// //                     high: values['2. high'],
// //                     low: values['3. low'],
// //                     close: values['4. close'],
// //                     volume: values['5. volume'],
// //                 }));
// //                 setStockData(formattedData);
// //                 setLoading(false);
// //             } else {
// //                 setLoading(false);
// //                 toast.error('No data available for this symbol.');
// //             }
// //         } catch (error) {
// //             setLoading(false);
// //             console.error('Error fetching stock data:', error);
// //             toast.error('Failed to fetch stock data.');
// //         }
// //     };

// //     const handleStockSelect = (selectedOption) => {
// //         setSelectedStock(selectedOption);
// //         fetchStockData(selectedOption.value);
// //     };

// //     const handleBuyStock = () => {
// //         if (selectedStock && stockData.length > 0) {
// //             const stockExists = portfolio.some(stock => stock.symbol === selectedStock.value);
// //             if (!stockExists) {
// //                 setPortfolio([...portfolio, { symbol: selectedStock.value, data: stockData[0] }]);
// //                 toast.success(`Bought ${selectedStock.value} successfully!`);
// //             } else {
// //                 toast.error(`${selectedStock.value} is already in your portfolio.`);
// //             }
// //         } else {
// //             toast.error('Select a stock and ensure data is loaded before buying.');
// //         }
// //     };

// //     const handleSellStock = (symbol) => {
// //         setPortfolio(portfolio.filter(stock => stock.symbol !== symbol));
// //         toast.success(`Sold ${symbol} successfully!`);
// //     };

// //    const handleAddToWatchlist = async () => {
// //   if (selectedStock) {
// //     try {
// //       const response = await axios.post(`http://localhost:6005/api/watchlist`, {
// //         symbol: selectedStock.value,
// //         name: selectedStock.label,
// //       });
// //       toast.success(`${selectedStock.value} added to your watchlist!`);
// //     } catch (error) {
// //       console.error('Error adding to watchlist:', error);
// //       toast.error('Failed to add stock to watchlist.');
// //     }
// //   } else {
// //     toast.error('Select a stock to add to your watchlist.');
// //   }
// // };

// //     const loadOptions = useCallback(async (inputValue) => {
// //         if (!inputValue) {
// //             return [];
// //         }

// //         try {
// //             const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${ALPHA_VANTAGE_API_KEY}`);
// //             const matches = response.data.bestMatches || [];
// //             return matches.map(match => ({
// //                 label: `${match['2. name']} (${match['1. symbol']})`,
// //                 value: match['1. symbol'],
// //             }));
// //         } catch (error) {
// //             console.error('Error fetching stock options:', error);
// //             toast.error('Failed to fetch stock options.');
// //             return [];
// //         }
// //     }, []);

// //     return (
// //         <div className="stock-app">
// //             <h1>Stock Market Application</h1>
            
// //             <AsyncSelect
// //                 cacheOptions
// //                 loadOptions={loadOptions}
// //                 onChange={handleStockSelect}
// //                 placeholder="Search for a stock..."
// //                 className="stock-select"
// //             />

// //             {loading && <p>Loading stock data...</p>}

// //             {selectedStock && stockData.length > 0 && (
// //                 <div className="stock-details">
// //                     <h2>{selectedStock.label}</h2>
// //                     <div className="buttons">
// //                         <button onClick={handleBuyStock} className="buy-button">Buy</button>
// //                         <button onClick={handleAddToWatchlist} className="watchlist-button">Add to Watchlist</button>
// //                     </div>
// //                     <div className="tradingview-widget">
// //                         <TradingViewWidget
// //                             symbol={selectedStock.value}
// //                             autosize
// //                             theme="light"
// //                         />
// //                     </div>
// //                     <div className="stock-data">
// //                         <h3>Historical Data</h3>
// //                         <ul>
// //                             {stockData.slice(0, 5).map((entry, index) => (
// //                                 <li key={index}>
// //                                     <strong>{entry.date}:</strong> Open {entry.open}, Close {entry.close}, High {entry.high}, Low {entry.low}, Volume {entry.volume}
// //                                 </li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                 </div>
// //             )}

// //             <div className="portfolio">
// //                 <h3>Your Portfolio</h3>
// //                 <ul>
// //                     {portfolio.length > 0 ? (
// //                         portfolio.map((stock, index) => (
// //                             <li key={index}>
// //                                 <strong>{stock.symbol}:</strong> Last Close {stock.data.close} USD
// //                                 <button onClick={() => handleSellStock(stock.symbol)} className="sell-button">Sell</button>
// //                             </li>
// //                         ))
// //                     ) : (
// //                         <p>No stocks in your portfolio.</p>
// //                     )}
// //                 </ul>
// //             </div>
// //             <ToastContainer />
// //         </div>
// //     );
// // }

// // export default Home;



// import React, { useState, useCallback, useEffect } from 'react';
// import AsyncSelect from 'react-select/async';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import TradingViewWidget from 'react-tradingview-widget';
// import 'react-toastify/dist/ReactToastify.css';
// import './Home.css';

// const ALPHA_VANTAGE_API_KEY = 'CD5APXP15BV41R7L'; // Replace with your API key

// function Home() {
//     const [stockData, setStockData] = useState([]);
//     const [selectedStock, setSelectedStock] = useState(null);
//     const [portfolio, setPortfolio] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [stockDescription, setStockDescription] = useState('');

//     const userId = localStorage.getItem('userId'); 

//     const fetchStockData = async (symbol) => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
//             const data = response.data['Time Series (Daily)'];

//             if (data) {
//                 const formattedData = Object.entries(data).map(([date, values]) => ({
//                     date,
//                     open: values['1. open'],
//                     high: values['2. high'],
//                     low: values['3. low'],
//                     close: values['4. close'],
//                     volume: values['5. volume'],
//                 }));
//                 setStockData(formattedData);
//                 setLoading(false);
//             } else {
//                 setLoading(false);
//                 toast.error('No data available for this symbol.');
//             }
//         } catch (error) {
//             setLoading(false);
//             console.error('Error fetching stock data:', error);
//             toast.error('Failed to fetch stock data.');
//         }
//     };

//     const fetchStockDescription = async (symbol) => {
//         try {
//             const response = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
//             if (response.data) {
//                 setStockDescription(response.data.Description || 'No description available.');
//             } else {
//                 setStockDescription('No description available.');
//             }
//         } catch (error) {
//             console.error('Error fetching stock description:', error);
//             setStockDescription('Failed to fetch stock description.');
//         }
//     };

//     const handleStockSelect = (selectedOption) => {
//         setSelectedStock(selectedOption);
//         fetchStockData(selectedOption.value);
//         fetchStockDescription(selectedOption.value);
//     };

//     const handleBuyStock = () => {
//         if (selectedStock && stockData.length > 0) {
//             const stockExists = portfolio.some(stock => stock.symbol === selectedStock.value);
//             if (!stockExists) {
//                 setPortfolio([...portfolio, { symbol: selectedStock.value, data: stockData[0] }]);
//                 toast.success(`Bought ${selectedStock.value} successfully!`);
//             } else {
//                 toast.error(`${selectedStock.value} is already in your portfolio.`);
//             }
//         } else {
//             toast.error('Select a stock and ensure data is loaded before buying.');
//         }
//     };

//     const handleSellStock = (symbol) => {
//         setPortfolio(portfolio.filter(stock => stock.symbol !== symbol));
//         toast.success(`Sold ${symbol} successfully!`);
//     };

//     const handleAddToWatchlist = async () => {
//       if (!selectedStock) {
//         toast.error('Select a stock to add to your watchlist.');
//         return;
//       }
  
//       try {
//         const response = await axios.post(`/api/watchlist`, {
//           userId, // Ensure the userId is passed to the backend
//           stockId: selectedStock.value,
//         });
  
//         if (response.data.message === 'Stock added to watchlist successfully') {
//           toast.success(`${selectedStock.label} added to your watchlist!`);
//           setWatchlist([...watchlist, { _id: selectedStock.value, name: selectedStock.label, symbol: selectedStock.value }]);
//         } else {
//           toast.info(response.data.message);
//         }
//       } catch (error) {
//         console.error('Error adding to watchlist:', error);
//         toast.error('Failed to add stock to watchlist.');
//       }
//     };
  
//     const loadOptions = useCallback(async (inputValue) => {
//         if (!inputValue) {
//             return [];
//         }

//         try {
//             const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${ALPHA_VANTAGE_API_KEY}`);
//             const matches = response.data.bestMatches || [];
//             return matches.map(match => ({
//                 label: `${match['2. name']} (${match['1. symbol']})`,
//                 value: match['1. symbol'],
//             }));
//         } catch (error) {
//             console.error('Error fetching stock options:', error);
//             toast.error('Failed to fetch stock options.');
//             return [];
//         }
//     }, []);

//     return (
//         <div className="stock-app">
//             <h1>Stock Market Application</h1>

//             <AsyncSelect
//                 cacheOptions
//                 loadOptions={loadOptions}
//                 onChange={handleStockSelect}
//                 placeholder="Search for a stock..."
//                 className="stock-select"
//             />

//             {loading && <p>Loading stock data...</p>}

//             {selectedStock && stockData.length > 0 && (
//                 <div className="stock-details">
//                     <h2>{selectedStock.label}</h2>
//                     <div className="buttons">
//                         <button onClick={handleBuyStock} className="buy-button">Buy</button>
//                         <button onClick={handleAddToWatchlist} className="watchlist-button">Add to Watchlist</button>
//                     </div>
//                     <div className="tradingview-widget">
//                         <TradingViewWidget
//                             symbol={selectedStock.value}
//                             autosize
//                             theme="light"
//                         />
//                     </div>
//                     <div className="stock-description">
//                         <h3>Stock Description</h3>
//                         <p>{stockDescription}</p>
//                     </div>
//                     <div className="stock-data">
//                         <h3>Historical Data</h3>
//                         <ul>
//                             {stockData.slice(0, 5).map((entry, index) => (
//                                 <li key={index}>
//                                     <strong>{entry.date}:</strong> Open {entry.open}, Close {entry.close}, High {entry.high}, Low {entry.low}, Volume {entry.volume}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             )}

//             <div className="portfolio">
//                 <h3>Your Portfolio</h3>
//                 <ul>
//                     {portfolio.length > 0 ? (
//                         portfolio.map((stock, index) => (
//                             <li key={index}>
//                                 <strong>{stock.symbol}:</strong> Last Close {stock.data.close} USD
//                                 <button onClick={() => handleSellStock(stock.symbol)} className="sell-button">Sell</button>
//                             </li>
//                         ))
//                     ) : (
//                         <p>No stocks in your portfolio.</p>
//                     )}
//                 </ul>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }

// export default Home;



import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import TradingViewWidget from 'react-tradingview-widget';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const ALPHA_VANTAGE_API_KEY = 'CD5APXP15BV41R7L'; // Replace with your API key

function Home() {
    const [stockData, setStockData] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stockDescription, setStockDescription] = useState('');

    const navigate = useNavigate();  // Use navigate from react-router-dom

    // useEffect(() => {
    //     const userId = localStorage.getItem('user');  // Check for userId in localStorage
    //     if (!userId) {
    //         navigate('/sign-in');  // Redirect to sign-in page if userId is not found
    //     }
    // }, [navigate]);

    const fetchStockData = async (symbol) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
            const data = response.data['Time Series (Daily)'];

            if (data) {
                const formattedData = Object.entries(data).map(([date, values]) => ({
                    date,
                    open: values['1. open'],
                    high: values['2. high'],
                    low: values['3. low'],
                    close: values['4. close'],
                    volume: values['5. volume'],
                }));
                setStockData(formattedData);
                setLoading(false);
            } else {
                setLoading(false);
                toast.error('No data available for this symbol.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching stock data:', error);
            toast.error('Failed to fetch stock data.');
        }
    };

    const fetchStockDescription = async (symbol) => {
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
            if (response.data) {
                setStockDescription(response.data.Description || 'No description available.');
            } else {
                setStockDescription('No description available.');
            }
        } catch (error) {
            console.error('Error fetching stock description:', error);
            setStockDescription('Failed to fetch stock description.');
        }
    };

    const handleStockSelect = (selectedOption) => {
        setSelectedStock(selectedOption);
        fetchStockData(selectedOption.value);
        fetchStockDescription(selectedOption.value);
    };

    const handleBuyStock = () => {
        if (selectedStock && stockData.length > 0) {
            const stockExists = portfolio.some(stock => stock.symbol === selectedStock.value);
            if (!stockExists) {
                setPortfolio([...portfolio, { symbol: selectedStock.value, data: stockData[0] }]);
                toast.success(`Bought ${selectedStock.value} successfully!`);
            } else {
                toast.error(`${selectedStock.value} is already in your portfolio.`);
            }
        } else {
            toast.error('Select a stock and ensure data is loaded before buying.');
        }
    };

    const handleSellStock = (symbol) => {
        setPortfolio(portfolio.filter(stock => stock.symbol !== symbol));
        toast.success(`Sold ${symbol} successfully!`);
    };

    const handleAddToWatchlist = async () => {
        if (!selectedStock) {
            toast.error('Select a stock to add to your watchlist.');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.post(`/api/watchlist`, {
                userId,
                stockId: selectedStock.value,
            });

            if (response.data.message === 'Stock added to watchlist successfully') {
                toast.success(`${selectedStock.label} added to your watchlist!`);
            } else {
                toast.info(response.data.message);
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            toast.error('Failed to add stock to watchlist.');
        }
    };

    const loadOptions = useCallback(async (inputValue) => {
        if (!inputValue) {
            return [];
        }

        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${ALPHA_VANTAGE_API_KEY}`);
            const matches = response.data.bestMatches || [];
            return matches.map(match => ({
                label: `${match['2. name']} (${match['1. symbol']})`,
                value: match['1. symbol'],
            }));
        } catch (error) {
            console.error('Error fetching stock options:', error);
            toast.error('Failed to fetch stock options.');
            return [];
        }
    }, []);

    return (
        <div className="stock-app">
            <h1>Stock Market Application</h1>

            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                onChange={handleStockSelect}
                placeholder="Search for a stock..."
                className="stock-select"
            />

            {loading && <p>Loading stock data...</p>}

            {selectedStock && stockData.length > 0 && (
                <div className="stock-details">
                    <h2>{selectedStock.label}</h2>
                    <div className="buttons">
                        <button onClick={handleBuyStock} className="buy-button">Buy</button>
                        <button onClick={handleAddToWatchlist} className="watchlist-button">Add to Watchlist</button>
                    </div>
                    <div className="tradingview-widget">
                        <TradingViewWidget
                            symbol={selectedStock.value}
                            autosize
                            theme="light"
                        />
                    </div>
                    <div className="stock-description">
                        <h3>Stock Description</h3>
                        <p>{stockDescription}</p>
                    </div>
                    <div className="stock-data">
                        <h3>Historical Data</h3>
                        <ul>
                            {stockData.slice(0, 5).map((entry, index) => (
                                <li key={index}>
                                    <strong>{entry.date}:</strong> Open {entry.open}, Close {entry.close}, High {entry.high}, Low {entry.low}, Volume {entry.volume}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="portfolio">
                <h3>Your Portfolio</h3>
                <ul>
                    {portfolio.length > 0 ? (
                        portfolio.map((stock, index) => (
                            <li key={index}>
                                <strong>{stock.symbol}:</strong> Last Close {stock.data.close} USD
                                <button onClick={() => handleSellStock(stock.symbol)} className="sell-button">Sell</button>
                            </li>
                        ))
                    ) : (
                        <p>No stocks in your portfolio.</p>
                    )}
                </ul>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
