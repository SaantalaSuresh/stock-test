




// import React, { useState, useCallback } from 'react';
// import AsyncSelect from 'react-select/async';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import TradingViewWidget from 'react-tradingview-widget';
// import 'react-toastify/dist/ReactToastify.css';
// import './Home.css';

// const ALPHA_VANTAGE_API_KEY = 'HHSZGUD5RLRR7AOY'; // Replace with your API key  HHSZGUD5RLRR7AOY

// function Home() {
//     const [stockData, setStockData] = useState([]);
//     const [selectedStock, setSelectedStock] = useState(null);
//     const [portfolio, setPortfolio] = useState([]);
//     const [loading, setLoading] = useState(false);

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

//     const handleStockSelect = (selectedOption) => {
//         setSelectedStock(selectedOption);
//         fetchStockData(selectedOption.value);
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

//    const handleAddToWatchlist = async () => {
//   if (selectedStock) {
//     try {
//       const response = await axios.post(`http://localhost:6005/api/watchlist`, {
//         symbol: selectedStock.value,
//         name: selectedStock.label,
//       });
//       toast.success(`${selectedStock.value} added to your watchlist!`);
//     } catch (error) {
//       console.error('Error adding to watchlist:', error);
//       toast.error('Failed to add stock to watchlist.');
//     }
//   } else {
//     toast.error('Select a stock to add to your watchlist.');
//   }
// };

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



import React, { useState, useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import TradingViewWidget from 'react-tradingview-widget';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const ALPHA_VANTAGE_API_KEY = 'HHSZGUD5RLRR7AOY'; // Replace with your API key

function Home() {
    const [stockData, setStockData] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStockData = async (symbol) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
            console.log('API Response:', response.data); // Log the entire response for debugging
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

    const handleStockSelect = (selectedOption) => {
        setSelectedStock(selectedOption);
        fetchStockData(selectedOption.value);
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
        if (selectedStock) {
            try {
                const response = await axios.post(`http://localhost:6005/api/watchlist`, {
                    symbol: selectedStock.value,
                    name: selectedStock.label,
                });
                toast.success(`${selectedStock.value} added to your watchlist!`);
            } catch (error) {
                console.error('Error adding to watchlist:', error);
                toast.error('Failed to add stock to watchlist.');
            }
        } else {
            toast.error('Select a stock to add to your watchlist.');
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
