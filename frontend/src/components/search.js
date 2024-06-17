import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import Tabs from './Tabs';
import { Form, FormControl, Button, Modal, InputGroup, Dropdown, Alert } from 'react-bootstrap';
import { BsSearch, BsX } from 'react-icons/bs';
import { useNavigate,useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Portfolio from './portfolio';
import { useSearchResults } from './SearchResultContext';

// function Search() {
  let Money=25000
  const Search=()=> {
 

  // const { searchResults, setSearchResults, setTicker } = useSearchResults(); 
  
  const [symbol, setSymbol] =   useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const navigate = useNavigate();
  const { ticker } = useParams();


  const [marketOpen, setMarketOpen] = useState(false);


  const [companyData, setCompanyData] = useState(null);
  const fetchDataFromServer = async (symbol) => {
    try {
      const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/api/finnhub-data?symbol=${symbol}`);
      setCompanyData(response.data);
      console.log("cd",companyData);
      localStorage.setItem('companydata', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching data from server:', error);
    }
  };

  const [loading, setLoading] = useState(false);
  const [companyData1, setCompanyData1] = useState(null);

  const fetchDataFromServer1 = async (symbol) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/api/getCompanyData?symbol=${symbol}`);

      setCompanyData1(response.data);
      localStorage.setItem('companydata1', JSON.stringify(response.data));

      console.log(companyData1);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  };

  const [companyData2, setCompanyData2] = useState(null);

  const fetchNews = async (symbol) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/api/getNews?symbol=${symbol}`);

      console.log('Company Data 2:', response.data);
      setCompanyData2(response.data);
      console.log("Newwwws",companyData2);
      localStorage.setItem('News', JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  };

  const [companyData3, setCompanyData3] = useState(null);

  const HighValue = async (symbol) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/api/getHighPrice?symbol=${symbol}`);

      console.log('Company Data 3:', response.data);
      setCompanyData3(response.data);
      localStorage.setItem('getHighPrice', JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  };


  const [companyData4, setCompanyData4] = useState(null);

  const sentiment = async (symbol) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/api/insidersentiment?symbol=${symbol}`);

      console.log('Company Data 4:', response.data);
      setCompanyData4(response.data);
      localStorage.setItem('sentiment', JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  };

  const [companyData5, setCompanyData5] = useState(null);

  const chart1 = async (symbol) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/api/chart1?symbol=${symbol}`);

      console.log('Chart1:', response.data);
      setCompanyData5(response.data);
      localStorage.setItem('chart1', JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  };

  const [companyData6, setCompanyData6] = useState(null);

  const chart3 = async (symbol) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/api/chart3?symbol=${symbol}`);

      console.log('Chart3:', response.data);
      setCompanyData6(response.data);
      localStorage.setItem('chart3', JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  };

  const [companyData7, setCompanyData7] = useState(null);

  const chart4 = async (symbol) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/api/chart4?symbol=${symbol}`);

      console.log('Chart4:', response.data);
      setCompanyData7(response.data);
      localStorage.setItem('chart4', JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  };

  const [companyData8, setCompanyData8] = useState(null);

  const chart2 = async (symbol) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/api/chart2?symbol=${symbol}`);

      console.log('Chart2:', response.data);
      setCompanyData8(response.data);
      localStorage.setItem('chart2', JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  };




  useEffect(() => {
    // Define a function to fetch high value data
    const fetchHighValueData = async () => {
      if (symbol) { // Ensure symbol is not null
        try {
          setLoading(true);
          await HighValue(symbol); // Call the HighValue function with the valid symbol
          setLoading(false);
        } catch (error) {
          console.error('Error fetching high value data:', error);
          setLoading(false);
        }
      }
    };
  
    // Define a function to fetch company data from the server
    const fetchCompanyDataFromServer = async () => {
      if (symbol) { // Ensure symbol is not null
        try {
          setLoading(true);
          await fetchDataFromServer(symbol); // Call the fetchdatafrom server function with the valid symbol
          setLoading(false);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setLoading(false);
        }
      }
    };

    const fetchCompanyDataFromServer1 = async () => {
      if (symbol) { // Ensure symbol is not null
        try {
          setLoading(true);
          await fetchDataFromServer1(symbol); // Call the fetchdatafrom server function with the valid symbol
          setLoading(false);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setLoading(false);
        }
      }
    };

    const fetchCompanyNews = async () => {
      if (symbol) { // Ensure symbol is not null
        try {
          setLoading(true);
          await fetchNews(symbol); // Call the fetchdatafrom server function with the valid symbol
          setLoading(false);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setLoading(false);
        }
      }
    };

    const fetchsentiment = async () => {
      if (symbol) { // Ensure symbol is not null
        try {
          setLoading(true);
          await sentiment(symbol); // Call the fetchdatafrom server function with the valid symbol
          setLoading(false);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setLoading(false);
        }
      }
    };
    const fetchChart1 = async () => {
      if (symbol) { // Ensure symbol is not null
        try {
          setLoading(true);
          await chart1(symbol); // Call the fetchdatafrom server function with the valid symbol
          setLoading(false);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setLoading(false);
        }
      }
    };
    const fetchChart2 = async () => {
      if (symbol) { // Ensure symbol is not null
        try {
          setLoading(true);
          await chart2(symbol); // Call the fetchdatafrom server function with the valid symbol
          setLoading(false);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setLoading(false);
        }
      }
    };
    const fetchChart3 = async () => {
      if (symbol) { // Ensure symbol is not null
        try {
          setLoading(true);
          await chart3(symbol); // Call the fetchdatafrom server function with the valid symbol
          setLoading(false);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setLoading(false);
        }
      }
    };
    const fetchChart4 = async () => {
      if (symbol) { // Ensure symbol is not null
        try {
          setLoading(true);
          await chart4(symbol); // Call the fetchdatafrom server function with the valid symbol
          setLoading(false);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setLoading(false);
        }
      }
    };
  
    // Call both fetch functions initially
    fetchHighValueData();
    fetchCompanyDataFromServer();
    fetchCompanyDataFromServer1();
    fetchCompanyNews();
    fetchsentiment();
    fetchChart1();
    fetchChart2()
    fetchChart3();
    fetchChart4();

    if (marketOpen) {
    // Set an interval to call both fetch functions every 15 seconds
    const interval = setInterval(() => {
      fetchHighValueData();
      fetchCompanyDataFromServer();
      fetchCompanyDataFromServer1();
      fetchCompanyNews();
      fetchsentiment();
    fetchChart1();
    fetchChart2()
    fetchChart3();
    fetchChart4();
    }, 15000);
  
    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(interval);

  };
  }, [symbol,marketOpen]); // Make sure to include symbol in the dependency array
       


    const handleAutocompleteSelect = (async (selectedSymbol) => {
    try {
      setLoading(true);
      const [data1, data2] = await Promise.all([

      
        //  window.location.hash = selectedSymbol,
        // localStorage.setItem('previousSymbol',selectedSymbol),
        setSymbol(selectedSymbol),
        fetchDataFromServer(selectedSymbol),
        fetchDataFromServer1(selectedSymbol),
        fetchNews(selectedSymbol),
        HighValue(selectedSymbol),
        sentiment(selectedSymbol),
        chart1(selectedSymbol),
        chart2(selectedSymbol),
        chart3(selectedSymbol),
        chart4(selectedSymbol),

        setShowTabs(true),
        setSelectedSymbol(selectedSymbol),

        localStorage.setItem('previousSymbol', selectedSymbol),
       // setTicker(selectedSymbol),
        //localStorage.setItem('searchResults', JSON.stringify(response.data)),

        navigate(`/search/${selectedSymbol}`)
      ]);
      setLoading(false);
      // Do something with the data if needed


    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  });

 

  useEffect(() => {
    if (ticker) {
      setSymbol(ticker);
      setShowTabs(true);
      setSelectedSymbol(ticker);
      //handleAutocompleteSelect(ticker);
    }
  }, [ticker]);

  
  const handleSearchButtonClick = async (selectedSymbol) => {
    try {
      if (selectedSymbol) { // Check if symbol is not null or empty
        setLoading(true);

        // Fetch data based on the selected symbol
        await Promise.all([
          fetchDataFromServer(selectedSymbol),
          fetchDataFromServer1(selectedSymbol),
          fetchNews(selectedSymbol),
          HighValue(selectedSymbol),
          sentiment(selectedSymbol),
          chart1(selectedSymbol),
          chart2(selectedSymbol),
          chart3(selectedSymbol),
          chart4(selectedSymbol),

          setShowTabs(true),
        setSelectedSymbol(selectedSymbol),
        navigate(`/search/${selectedSymbol}`)
        ]);

        setShowTabs(true);
      } else {
        // Handle case when no symbol is selected
        console.error('No symbol selected.');
        // You can show a message to the user or perform any other action here
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setLoading(false);
    }
  };

  // const onSearchButtonClick = () => {
  //   // Call handleSearchButtonClick with the current symbol value
  //   handleSearchButtonClick(symbol);
  // };



  function formatUnixTimestamp(unixTimeSeconds) {
    const date = new Date(unixTimeSeconds * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based index
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  function renderArrowImage(companyData3) {
    // Check if companyData3 exists and has a valid 'd' property
    if (companyData3 && typeof companyData3.d === 'number') {
      // Determine the color of the text based on the sign of companyData3.d
      const textColor = companyData3.d < 0 ? 'red' : 'green';

      // Define the path to the arrow image
      const arrowPath = companyData3.d < 0 ? "img/RedArrowDown.png" : "img/GreenArrowUp.png";

      // Define the style for the text
      const textStyle = {
        color: textColor,  // Set the text color based on the sign of companyData3.d
      };

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based index
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');

      const currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const isMobile = window.innerWidth <= 390;
      console.log(window.innerWidth);
      // Return the JSX with arrow image and styled text
      return (
        <>
          <span style={textStyle}>
            
            <p className='currentPrice'>{parseFloat(companyData3.c).toFixed(2)}</p>

            <p className="change">
              {/* <img className="arrow" src={arrowPath} alt={textColor === 'green' ? 'Green Arrow' : 'Red Arrow'} /> */}

              <span  style={{ fontSize: '20px', color: companyData3.d >= 0 ? 'green' : 'red' }}>
                {companyData3.d >= 0 ? '▲' : '▼'}
              </span>

              {parseFloat(companyData3.d).toFixed(2)} ({parseFloat(companyData3.dp).toFixed(2)}%)
            </p>

            {/* <p>{formatUnixTimestamp(companyData3.t)}</p> */}
            
          </span>
          <p className='currentTime'>{currentTime}</p>
        </>
      );
    } else {
      return null; // Return null if companyData3.d is not a valid number
    }
  }


  const MarketStatus = ({ data }) => {
    // Calculate the current timestamp
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Calculate the difference between the current timestamp and the timestamp from the data
    const timeDifference = currentTimestamp - data.t;

    // Check if the market is open based on the time difference
    const isMarketOpen = timeDifference < 300;

    return (

      <div className="market-status">
        {isMarketOpen ? (
          setMarketOpen(true),
          <p>Market is open</p>
        ) : (
          <p className="closed">Market closed on {formatUnixTimestamp(companyData3.t)}</p>
        )}
      </div>

    );
  };


  useEffect(() => {
    // Retrieve data from localStorage
    const storedData1 = localStorage.getItem('previousSymbol');
    const storedData2 = localStorage.getItem('companydata');
    const storedData3 = localStorage.getItem('companydata1');
    const storedData4 = localStorage.getItem('getHighPrice');
    const storedData5 = localStorage.getItem('News');
    const storedData6 = localStorage.getItem('sentiment');
    const storedData7 = localStorage.getItem('chart1');
    const storedData8 = localStorage.getItem('chart2');
    const storedData9 = localStorage.getItem('chart3');
    const storedData10 = localStorage.getItem('chart4');
    if (storedData1) {
      setShowTabs(true);
      setSelectedSymbol(storedData1);
      setCompanyData(JSON.parse(storedData2));
      setCompanyData1(JSON.parse(storedData3));
      setCompanyData3(JSON.parse(storedData4));
      setCompanyData2(JSON.parse(storedData5));
      setCompanyData4(JSON.parse(storedData6));
      setCompanyData5(JSON.parse(storedData7));
      setCompanyData8(JSON.parse(storedData8));
      setCompanyData6(JSON.parse(storedData9));
      setCompanyData7(JSON.parse(storedData10));

    }
  }, []); 

//console.log("Saurav",companyData);

  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [showTabs, setShowTabs] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSelectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
  };

  // const handleSearchButtonClick = () => {
  //   setShowTabs(true);
  //   setSelectedSymbol(symbol);
  // };

  const handleSearchClose = () => {
    setShowTabs(false);
  };

  const handleAutocompleteClose = () => {
    setShowTabs(false);
    setSelectedSymbol(null);
    localStorage.removeItem('companydata');
    localStorage.removeItem('companydata1');
    localStorage.removeItem('News');
    localStorage.removeItem('getHighPrice');
    localStorage.removeItem('News');
    localStorage.removeItem('previousSymbol');
    localStorage.removeItem('sentiment');
    localStorage.removeItem('chart1');
    localStorage.removeItem('chart2');
    localStorage.removeItem('chart3');
    localStorage.removeItem('chart4');
  };

  const [isWatchlisted, setIsWatchlisted] = useState(false);

  // const handleToggleWatchlist = () => {
  //   setIsWatchlisted(!isWatchlisted);
  // };

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleBuy = () => {
    setShowModal(true);
    // Implement your logic for buying here
  };


  
  const [quantity, setQuantity] = useState(0); // Initialize quantity state with 0
  const [total, setTotal] = useState(0); // Initialize total state

  // const buyStock = async(companyData3) => {
  //   try {

  //       // if (Boughtstocks.hasOwnProperty(searchResults.name)) {
  //       //     Boughtstocks[searchResults.name] += quantity; // If the stockName already exists, increase its quantity
  //       //   } else {
  //       //     Boughtstocks[searchResults.name] = quantity; // If the stockName doesn't exist, add it with the given quantity
  //       //   }
  //       // console.log(Boughtstocks);
  //       // const totalAmount = quantity * parseFloat(searchResults.c);
  //       // if (totalAmount > Money) {
  //       //   setErrorMessage('Insufficient funds'); // Set error message if total amount exceeds available funds
  //       //   return;
  //       // }
  //       Money -= total;
  //       console.log(Money)
  //       const response = await axios.post('http://localhost:3001/api/buy', {
        
  //         quantity,
  //         price: companyData3.c,
  //         stockName: companyData3.name,
  //         change: companyData3.d,
  //         Money: Money,
  //       });
  //       setLoading(false);
  //       console.log(response.data); // Handle success response
  //     }catch (error) {
  //       console.error('Error buying stock:', error);
  //       setLoading(false);
  //     }

  //   };

  const [stockBuy, setstockBuy] = useState(null);

  
  const [buyAlert, setBuyAlert] = useState(false);

  const buyStock = async () => {
    try {
        const response = await axios.post('https://react-project-3856.wl.r.appspot.com/api/buy', {
            quantity:quantity,
            price: companyData3.c,
            stockName: companyData.name,
            ticker: companyData.ticker,
            change: companyData3.d,
        });
        setLoading(false);
        console.log("stockBuy:",response.data); // Handle success response
        setstockBuy(response.data);

        setShowModal(!showModal);
        setBuyAlert(true);
    } catch (error) {
        console.error('Error buying stock:', error);
        setLoading(false);
    }
};

const [sellModal, setSellModal] = useState(false);

const [sellAlert, setSellAlert] = useState(false);

const SellhandleToggleModal = () => {
  setSellModal(!sellModal);
  setErrorMessage('');
};

const handleSell = () => {
  setSellModal(true);
  fetchAvailableQuantity();
  
};

const [isSellButtonDisabled, setIsSellButtonDisabled] = useState(false);

const [availableQuantity, setAvailableQuantity] = useState(0);

useEffect(() => {
  fetchAvailableQuantity();
}, []);

// const fetchAvailableQuantity = async () => {
//   try {
//     const response = await axios.get('http://localhost:3001/api/portfolioData', { stockName: companyData.name });
//     if (response.data.length > 0) {
//       setAvailableQuantity(response.data[0].quantity);
//     } else {
//       setAvailableQuantity(0);
//     }
//   } catch (error) {
//     console.error('Error fetching available quantity:', error);
//     setAvailableQuantity(0);
//   }
// };

const fetchAvailableQuantity = async () => {
  try {
    const response = await axios.get('https://react-project-3856.wl.r.appspot.com/api/portfolioData', { params: { stockName: companyData.name } });
    if (response.data.length > 0) {
      const tickerData = response.data.find(item => item.ticker === companyData.ticker);
      console.log("td",tickerData.quantity);
      if (tickerData) {
        setAvailableQuantity(tickerData.quantity);
      } else {
        setAvailableQuantity(0);
      }
    } else {
      setAvailableQuantity(0);
    }
  } catch (error) {
    console.error('Error fetching available quantity:', error);
    setAvailableQuantity(0);
  }
};

const[sellButton,setSellButton]=useState(false);
const checkQuantity = async (symbol) => {
  // try {
  //   const response = await axios.get('http://localhost:3001/api/portfolioData', { params: { ticker: setSymbol } });
  //   console.log("quantityyyy",response.data); // Update inWatchlist state from backend
  // } catch (error) {
  //   console.error('Error checking watchlist:', error);
  // }

  try {
    const response = await axios.get('https://react-project-3856.wl.r.appspot.com/api/portfolioData', { params: { ticker: setSymbol } });
    if (response.data.length > 0) {
      const tickerData = response.data.find(item => item.ticker === companyData.ticker);
      console.log("tddddddd",tickerData.quantity);
      if(tickerData.quantity > 0){
        setSellButton(true);
      }
      if (tickerData) {
        setAvailableQuantity(tickerData.quantity);
      } else {
        setAvailableQuantity(0);
      }
    } else {
      setAvailableQuantity(0);
    }
  } catch (error) {
    console.error('Error fetching available quantity:', error);
    setAvailableQuantity(0);
  }

};

if(symbol){
  checkQuantity();
}

console.log("aq",availableQuantity);

const handleSellQuantityChange = (event) => {
  setQuantity(event.target.value);
};

  const sellStock =async () => {
 
    try {
        const response2 = await axios.get('https://react-project-3856.wl.r.appspot.com/api/portfolioData', { stockName: companyData.name });
        console.log(response2.data)
        if (response2.data.length === 0) {
            setErrorMessage('No trades found for the specified stock');
            return;
        }
        console.log(quantity);
        console.log("qav",response2.data[0].quantity);
        // if(response2.data[0].quantity<quantity){
        //     setErrorMessage('Not enough quantity');
        //     setIsSellButtonDisabled(true);
        //     return;
        // }
        const response1 = await axios.post('https://react-project-3856.wl.r.appspot.com/api/sell', {
          quantity:quantity,
          price: companyData3.c,
          stockName: companyData.name
        });
        
        console.log(response1.data); // Handle success response
        setErrorMessage('');
        setSellAlert(true);
      } catch (error) {
        console.error('Error selling stock:', error); // Handle error
      }
      setSellModal(!sellModal);
    };

    const fetchCurrentMoney = async () => {
      try {
        const response = await axios.post('https://react-project-3856.wl.r.appspot.com/api/Money');
        Money = response.data.Money;
        console.log(response.data.Money)
        return (response.data.Money); // Assuming the server responds with the money value under the key 'Money'
      } catch (error) {
        console.error('Error fetching current money:', error);
        return null; // Handle the error appropriately in your component
      }
    };

    fetchCurrentMoney();

 const [inWatchlist,setInWatchlist]=useState(false);
    // Fetch inWatchlist state from backend when component mounts
useEffect(() => {
  if (companyData) {
    checkWatchlist(companyData.ticker);
  }
}, [companyData]);

// Function to check if the stock is in the watchlist
const checkWatchlist = async (symbol) => {
  try {
    const response = await axios.get(`https://react-project-3856.wl.r.appspot.com/watchlist/check/${symbol}`);
    setInWatchlist(response.data.inWatchlist); // Update inWatchlist state from backend
  } catch (error) {
    console.error('Error checking watchlist:', error);
  }
};

const handleToggleWatchlist = async () => {
  try {
    if (inWatchlist) {
      // Remove from watchlist
      await axios.post(`https://react-project-3856.wl.r.appspot.com/watchlist/remove/${companyData.ticker}`); 
    } else {
      // Add to watchlist
      const watchlistData = {
        symbol: companyData.ticker,
        name: companyData.name,
        currentPrice: companyData3.c,
        dailyChange: companyData3.d, // Include daily change
        percentChange: companyData3.dp // Include percent change
      };
      await axios.post(`https://react-project-3856.wl.r.appspot.com/api/watchlist/add`, watchlistData); 
    }
    setInWatchlist(!inWatchlist); // Toggle the state
  } catch (error) {
    console.error('Error adding/removing from watchlist:', error);
  }
};

  // Function to handle quantity change
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10); // Parse the input value as an integer
    setQuantity(value); // Update the quantity state
    // Calculate the total value and update the total state
    setTotal(value * parseFloat(companyData3.c));
  };

 
  // const handleSellQuantityChange = (event) => {
  //   const newQuantity = event.target.value;
  //   setQuantity(newQuantity);

  //   // Enable or disable the button based on the new quantity value
  //   setIsSellButtonDisabled(newQuantity === '' || response2.data[0].quantity < newQuantity);
  // };
  return (
    <div className='stocksearch'>
      
     
      
      <div className='stockheading'>STOCK SEARCH</div>
      {/* <Autocomplete onSelect={fetchDataFromServer} /> */}
      {/* <Autocomplete onSelect={handleAutocompleteSelect} /> */}

      <Autocomplete onSelect={handleAutocompleteSelect} showTabs={showTabs} onSearchButtonClick={handleAutocompleteSelect} onClose={handleAutocompleteClose} />
      {/* {showTabs && selectedSymbol && (
        // <Tabs selectedSymbol={selectedSymbol} />

        // <Tabs handleAutocompleteSelect={handleAutocompleteSelect} companyData={companyData} companyData1={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} companyData5={companyData5} companyData6={companyData6} companyData7={companyData7} companyData8={companyData8}/>
        <div className="container1">
        <Tabs handleAutocompleteSelect={handleAutocompleteSelect} companyData={companyData} companyData1={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} companyData5={companyData5} companyData6={companyData6} companyData7={companyData7} companyData8={companyData8}/>
      </div>
     )} */}

      {buyAlert && (
        <div style={{ paddingTop: '5%', textAlign: 'center' }}>
          <Alert variant="success" onClose={() => setBuyAlert(false)} dismissible>{companyData.ticker} bought successfully.</Alert>
        </div>
      )}

      {sellAlert && (
        <div style={{ paddingTop: '5%', textAlign: 'center' }}>
          <Alert variant="danger" onClose={() => setSellAlert(false)} dismissible>{companyData.ticker} sold successfully.</Alert>
        </div>
      )}

      {companyData && showTabs && selectedSymbol && (
        <div className='container1'>
          <div className='row'>
            <div className='col'>
              <h2 className='companyTicker'>
                {companyData.ticker}
                <FaStar
                  className={`star-icon ${inWatchlist ? 'yellow' : 'white'}`}
                  onClick={handleToggleWatchlist}
                />
              </h2>
              <p className='companyName'>{companyData.name}</p>
              <p className='exchange'>{companyData.exchange}</p>
              {/* Add more company data fields as needed */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Button variant="success" onClick={handleBuy}>Buy</Button>
                {sellButton &&(
                <Button variant="danger" onClick={handleSell}>Sell</Button>
                )}
              </div>
               {/* Modal */}
              <Modal show={showModal} onHide={handleToggleModal}>
                <Modal.Header closeButton>
                  <Modal.Title  className='buySellTicker'>{companyData.ticker}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '20px' }}>
                  {/* Add your buy stock form or content here */}
                  {companyData3 && (
                    <p>Current Price: {parseFloat(companyData3.c).toFixed(2)}</p>
                  )}
                  <p>Money in Wallet: {parseFloat(Money).toFixed(2)}</p>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <Form.Group controlId="quantity">
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter quantity"
                          value={quantity}
                          onChange={handleQuantityChange} // Handle quantity change
                        />
                      </Form.Group>
                    </div>
                  </div>
                  {total > Money && <p className="text-danger">Not enough money in wallet!</p>}
                </Modal.Body>
                <Modal.Footer>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <p>Total: ${total.toFixed(2)}</p> {/* Display the total value */}
                    <Button
                      variant="success" // Change variant based on total value
                      // onClick={buyStock(companyData3)}
                      onClick={() => buyStock()}
                      disabled={total > Money} // Disable button if total is more than 25000
                    >
                      Buy
                    </Button>

                    {/* {showAlert && (
                  <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Stock bought successfully!
                  </Alert>
                )} */}

                  </div>
                </Modal.Footer>
              </Modal>



              <Modal show={sellModal} onHide={SellhandleToggleModal}>
                <Modal.Header closeButton>
                  <Modal.Title  className='buySellTicker'>{companyData.ticker}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '20px' }}>
                  {/* Add your buy stock form or content here */}
                  {companyData3 && (
                    <p>Current Price: {parseFloat(companyData3.c).toFixed(2)}</p>
                  )}
                  <p>Money in Wallet: {parseFloat(Money).toFixed(2)}</p>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <Form.Group controlId="quantity">
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter quantity"
                          value={quantity}
                          onChange={handleSellQuantityChange} // Handle quantity change
                        />
                      </Form.Group>
                    </div>
                  </div>

                  {/* {total > 25000 && <p className="text-danger">Not enough money in wallet!</p>} */}
                  {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
                  {availableQuantity < quantity && <p className="text-danger">Not enough stocks!</p>}
                </Modal.Body>
                <Modal.Footer>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <p>Total: ${total.toFixed(2)}</p> {/* Display the total value */}

                    <Button
                      variant="success" // Change variant based on total value
                      // onClick={buyStock(companyData3)}
                      onClick={() => sellStock()}
                      disabled={availableQuantity < quantity} // Disable button if total is more than 25000

                    >
                      Sell
                    </Button>

                                {/* {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                      Stock bought successfully!
                    </Alert>
                  )} */}

                  </div>
                </Modal.Footer>
              </Modal>
            </div>

            <div className="col">
              <img className='logo' src={companyData.logo}></img>
            </div>

            <div className='col'>
              {companyData3 && (
                <>
                  {/* Render the arrow image and styled text using the renderArrowImage function */}
                  {renderArrowImage(companyData3)}
                </>
              )}
            </div>

          </div>
          <div className='row marketStatus'>
            {companyData3 && (
              <>
                <MarketStatus data={companyData3} />
              </>
            )}
          </div>
        </div>
      )}


      {showTabs && selectedSymbol && (
        <div className="container2">
          <Tabs handleAutocompleteSelect={handleAutocompleteSelect} handleSearchButtonClick={handleSearchButtonClick} companyData={companyData} companyData1={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} companyData5={companyData5} companyData6={companyData6} companyData7={companyData7} companyData8={companyData8} />
        </div>
      )}



      {/* <Tabs handleAutocompleteSelect={handleAutocompleteSelect} companyData={companyData} companyData1={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} companyData5={companyData5} companyData6={companyData6} companyData7={companyData7} companyData8={companyData8}/> */}       
    </div>
  );
} 

export default Search;