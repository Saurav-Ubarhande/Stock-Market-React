const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;
var cors = require('cors');


app.use(cors())
app.use(express.json());


app.get('/api/autocomplete', async (req, res) => {
  try {

    const response = await axios.get('https://finnhub.io/api/v1/search/?', {
      params: {
        q: req.query.symbol, 
        token: 'cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Finnhub:', error);
    res.status(500).json({ error: 'Error fetching data from Finnhub' });
  }
});

app.get('/api/finnhub-data', async (req, res) => {
  try {
   
    const response = await axios.get('https://finnhub.io/api/v1/stock/profile2?', {
      params: {
        symbol: req.query.symbol, 
        token: 'cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Finnhub:', error);
    res.status(500).json({ error: 'Error fetching data from Finnhub' });
  }
});

app.get('/api/getCompanyData', async (req, res) => {
  try {

    const response = await axios.get('https://finnhub.io/api/v1/stock/peers?', {
      params: {
        symbol: req.query.symbol, 
        token: 'cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Finnhub:', error);
    res.status(500).json({ error: 'Error fetching data from Finnhub' });
  }
});


app.get('/api/getNews', async (req, res) => {
  try {

    const response = await axios.get(`https://finnhub.io/api/v1/company-news?`, {
      params: {
        symbol: req.query.symbol,
        from: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        to: new Date().toISOString().slice(0, 10),
        token: 'cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
      }
    });

    res.send(response.data.slice(0, 20));

  } catch (error) {
 
    console.error('Error fetching company data:', error);
    res.status(500).send('Error fetching company data');
  }
});

app.get('/api/getHighPrice', async (req, res) => {
  try {

    const response = await axios.get(`https://finnhub.io/api/v1/quote?`, {
      params: {
        symbol: req.query.symbol, 
        token: 'cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
      }
    });

    res.send(response.data);
  } catch (error) {

    console.error('Error fetching company data:', error);
    res.status(500).send('Error fetching company data');
  }
});


app.get('/api/insidersentiment', async (req, res) => {
  try {
   
    const response = await axios.get(`https://finnhub.io/api/v1/stock/insider-sentiment?`, {
      params: {
        symbol: req.query.symbol,
        from: '2022-01-01',
        token: 'cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
      }
    });


    if (response.data.data && Array.isArray(response.data.data)) {
      const data = response.data.data;
     

      let totalMSPR = 0;
      let positiveMSPR = 0;
      let negativeMSPR = 0;
      let totalChange = 0;
      let positiveChange = 0;
      let negativeChange = 0;
    
      data.forEach(item => {
        totalMSPR += item.mspr;
        totalChange += item.change;
    
        if (item.mspr > 0) {
          positiveMSPR += item.mspr;
        } else if (item.mspr < 0) {
          negativeMSPR += item.mspr;
        }
    
        if (item.change > 0) {
          positiveChange += item.change;
        } else if (item.change < 0) {
          negativeChange += item.change;
        }
      });

      // Format values to 2 decimal places
      totalMSPR = totalMSPR.toFixed(2);
      positiveMSPR = positiveMSPR.toFixed(2);
      negativeMSPR = negativeMSPR.toFixed(2);
      totalChange = totalChange.toFixed(2);
      positiveChange = positiveChange.toFixed(2);
      negativeChange = negativeChange.toFixed(2);

      // Construct an object with the formatted values
      const result = {
        totalMSPR: totalMSPR,
        positiveMSPR: positiveMSPR,
        negativeMSPR: negativeMSPR,
        totalChange: totalChange,
        positiveChange: positiveChange,
        negativeChange: negativeChange
      };

      console.log(result);
      // Send the object in the response
      res.send(result);
    } else {
      res.status(500).send('No data available');
    }
  } catch (error) {
    // Handle errors
    console.error('Error fetching company data:', error);
    res.status(500).send('Error fetching company data');
  }
});



app.get('/api/chart1', async (req, res) => {
  try {

    const today = new Date();
    const todayFormatted = formatDate(today);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayFormatted = formatDate(yesterday);

    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${req.query.symbol}/range/1/hour/${yesterdayFormatted}/${todayFormatted}?adjusted=true&sort=asc&apiKey=eH2puz4LUAnC5KoMpQ8DGplIXEKbvX38`);
  
    console.log("Chart1 called")
    res.send(response.data);
    
  } catch (error) {

    console.error('Error fetching company data:', error);
    res.status(500).send('Error fetching company data');
  }
});

app.get('/api/chart2', async (req, res) => {
  try {

    const today = new Date();
    const todayFormatted = formatDate(today);


    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayFormatted = formatDate(yesterday);

    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const twoYearsAgoFormatted = formatDate(twoYearsAgo);


    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${req.query.symbol}/range/1/month/${twoYearsAgoFormatted}/${todayFormatted}?adjusted=true&sort=asc&apiKey=eH2puz4LUAnC5KoMpQ8DGplIXEKbvX38`);

    res.send(response.data);
    console.log("Chart2 called")
  } catch (error) {

    console.error('Error fetching company data:', error);
    res.status(500).send('Error fetching company data');
  }
});

app.get('/api/chart3', async (req, res) => {
  try {
 
      const response = await axios.get(`https://finnhub.io/api/v1/stock/recommendation?`, {
        params: {
          symbol: req.query.symbol,
          token: 'cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
        }
      });
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching company data:', error);
    res.status(500).send('Error fetching company data');
  }
});

app.get('/api/chart4', async (req, res) => {
  try {
      const response = await axios.get(`https://finnhub.io/api/v1/stock/earnings?`, {
        params: {
          symbol: req.query.symbol, 
          token: 'cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
        }
      });
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching company data:', error);
    res.status(500).send('Error fetching company data');
  }
});

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

 const mongoose = require("mongoose")

mongoose
        .connect("mongodb+srv://sauravubarhande:alJKbFxpw3IuIexH@backenddb.umx3hvv.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
        .then(()=>{
            console.info("Connected to DB");
        })
        .catch((e) => {
            console.log("Error:",e);
      });

      const Trade = require('./tradeschema.js'); 
      const Wallet = require('./MoneySchema.js');
      const Fav = require('./watchlistschema.js');


      app.post('/api/buy', async (req, res) => {
        try {
            const { quantity, price, stockName, ticker, change, Money} = req.body;
            console.log('Buy request received:', { quantity, price, stockName, ticker, change});
         
            const totalCost = quantity*price;
            let existingBuy = await Trade.findOne({ stockName });

            let currentMoney=await Wallet.findOne();

            if(!currentMoney){
              currentMoney = new Wallet({Money:25000});
            }

            currentMoney.Money-=totalCost;

            await currentMoney.save();

            if (existingBuy) {
           
              existingBuy.quantity += quantity;

              existingBuy.MarketV = price*quantity;
               

              const newTotal = parseInt(quantity)*parseInt(price);
              existingBuy.Total += newTotal;
              existingBuy.Average = existingBuy.Total/existingBuy.quantity;

              await existingBuy.save();
              res.json(existingBuy);
            } else {

              
              const Total = quantity*price;
              const Average = Total/quantity;
              const MarketV = quantity*price;

              const newBuy = new Trade({ quantity, price, stockName, ticker, Total, Average, change, MarketV});
              await newBuy.save();
              res.json(newBuy);

            }
          } catch (error) {
            console.error('Error buying stock:', error);
            res.status(500).json({ error: 'An error occurred' });

          }
        });
      
      app.post('/api/sell', async (req, res) => {
        try {
          const { quantity, price, stockName } = req.body;

console.log(quantity,price);
          const totalCost=quantity*price;
          let currentMoney = await Wallet.findOne();
          currentMoney.Money+=totalCost;
          await currentMoney.save();
          console.log('Sell request received:', { quantity, price, stockName });
          let Sellstock = await Trade.findOne({ stockName });
          Sellstock.quantity -= quantity;        
          const newTotal = parseInt(quantity)*parseInt(price);
          Sellstock.Total -= newTotal;
          await Sellstock.save();
          if (Sellstock.quantity  === 0) {
            await Trade.deleteOne({ stockName: stockName });
          }
         
          res.json(Sellstock);
        } catch (error) {
          console.error('Error processing sell request:', error);
  }
      });

      app.get('/api/portfolioData', async (req, res) => {
        try {

            const trades = await Trade.find();
            console.log(trades)
            res.json(trades);

        } catch (error) {
            console.error('Error fetching trade data:', error);
            res.status(500).json({ error: 'An error occurred' });

        }
    });

    app.get('/api/portfoliostock', async (req, res) => {
      const symbol = req.query.symbol; 
      console.log('portfoliostock', symbol);
      try {

          const trades = await Trade.findOne({ ticker: symbol });
          console.log("trades",trades)
          res.json(trades);

      } catch (error) {
          console.error('Error fetching trade data:', error);
          res.status(500).json({ error: 'An error occurred' });
      }
  });

app.get('/watchlist/check/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const existingStock = await Fav.findOne({ symbol: symbol });
    if (existingStock) {
      res.json({ inWatchlist: true });
    } else {
      res.json({ inWatchlist: false });
    }
  } catch (error) {

    console.error('Error checking stock in watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });

  }
});


app.post('/api/watchlist/add', async (req, res) => {
  try {
    const { symbol, name, currentPrice, dailyChange, percentChange } = req.body;
    const existingStock = await Fav.findOne({ name });
    if (existingStock) {
      res.status(400).json({ error: 'Stock already exists in the watchlist' });
    } else {
      const newfav = new Fav({ symbol, name, currentPrice, dailyChange, percentChange });
          await newfav.save();
          res.json(newfav);
      
      console.log('Stock added to watchlist successfully');  
    }
  } catch (error) {
    console.error('Error adding stock to watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/watchlist/remove/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;


    const result = await Fav.deleteOne({ symbol: symbol });

    if (result.deletedCount === 1) {
      console.log('Stock removed from watchlist successfully');
      res.status(200).json({ message: 'Stock removed from watchlist successfully' });
    } else {
      console.error('Stock not found in the watchlist');
      res.status(404).json({ error: 'Stock not found in the watchlist' });
    }
  } catch (error) {
    console.error('Error removing stock from watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
 });

 app.get('/api/watchlist', async (req, res) => {
  try {
      const list = await Fav.find();
      console.log(list)
      res.json(list);
  } catch (error) {
      console.error('Error fetching trade data:', error);
      res.status(500).json({ error: 'An error occurred' });
      
  }
});

app.get('/api/Money', async (req, res) => {
  try {
      let currentMoney = await Wallet.findOne();
      if (!currentMoney) {
        currentMoney = new Wallet({ Money: 25000 }); 
      }
      console.log(currentMoney);
      res.json({ Money: currentMoney.Money });
  } catch (error) {
      console.error('Error fetching trade data:', error);
      res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});