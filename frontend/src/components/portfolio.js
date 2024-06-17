import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';  


const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [data, setData] = useState([]);
  const [Money, setMoney] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedStock, setSelectedStock] = useState(null); // State variable to store the selected stock
  const [errorMessage, setErrorMessage] = useState('');
  const [stockBuy, setstockBuy] = useState(null);
  const [buyAlert, setBuyAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [sellAlert, setSellAlert] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get('https://react-project-3856.wl.r.appspot.com/api/portfolioData');
      const response2 = await axios.post('https://react-project-3856.wl.r.appspot.com/api/Money');
      setPortfolioData(response.data);
      setMoney(response2);
      setLoader(false);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleBuy = (stock) => {
    setSelectedStock(stock);
    setShowModal(true);
    // Implement your logic for buying here
  };


  const SellhandleToggleModal = () => {
    setSellModal(!sellModal);
    setErrorMessage('');
  };
  
  const handleSell = (stock) => {
    setSellModal(true);
    setSelectedStock(stock); 
    fetchAvailableQuantity(stock);
    console.log("ps",stock);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10); // Parse the input value as an integer
    setQuantity(value); // Update the quantity state
    // Calculate the total value and update the total state
    //setTotal(value * parseFloat(companyData3.c));
  };

  const handleSellQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const fetchAvailableQuantity = async (stock) => {
    setSelectedStock(stock);
    console.log("pss",stock);
    if (!stock) return;
    try {
      const response = await axios.get('https://react-project-3856.wl.r.appspot.com/api/portfolioData', { params: { stockName:  stock.stockName } });
      if (response.data.length > 0) {
        const tickerData = response.data.find(item => item.ticker === stock.ticker);
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

  const buyStock = async (stock) => {
    setSelectedStock(stock);
        if (!selectedStock) return;
    try {
      const totalAmount = quantity * parseFloat(selectedStock.price);
        const response = await axios.post('https://react-project-3856.wl.r.appspot.com/api/buy', {
            quantity:quantity,
            price: selectedStock.price,
            stockName: selectedStock.stockName,
            //ticker: companyData.ticker,
            change: selectedStock.change,
        });
        setLoading(false);
        console.log("stockBuy:",response.data); // Handle success response
        setstockBuy(response.data);

        fetchPortfolioData();
        setQuantity(0);

        setShowModal(!showModal);
        setBuyAlert(true);
    } catch (error) {
        console.error('Error buying stock:', error);
        setLoading(false);
    }
};

const sellStock =async (stock) => {
  setSelectedStock(stock);
        if (!selectedStock) return;
  try {
      // 
      const response1 = await axios.post('https://react-project-3856.wl.r.appspot.com/api/sell', {
        quantity:quantity,
        price: selectedStock.price,
        stockName: selectedStock.stockName,
      });
      
      console.log(response1.data); // Handle success response
      setErrorMessage('');
      setSellAlert(true);

      fetchPortfolioData();
        setQuantity(0);
    } catch (error) {
      console.error('Error selling stock:', error); // Handle error
    }
    setSellModal(!sellModal);
  };

  //console.log("ss",selectedStock);
  console.log("paq",availableQuantity);
  console.log("pq",quantity);

  return(
    <div className='portfolio'>

{loader && <Spinner animation="border" role="status" />} {/* Render loading spinner */}
      
       {buyAlert  && selectedStock &&(
        <div style={{ paddingTop: '5%', textAlign: 'center' }}>
          <Alert variant="success" onClose={() => setBuyAlert(false)} dismissible>{selectedStock.ticker} bought successfully.</Alert>
        </div>
      )}

      {sellAlert && selectedStock &&(
        <div style={{ paddingTop: '5%', textAlign: 'center' }}>
          <Alert variant="danger" onClose={() => setSellAlert(false)} dismissible>{selectedStock.ticker} sold successfully.</Alert>
        </div>
      )}

      {Money && (
       <><h2>My Portfolio</h2><h5>Money in wallet: ${parseFloat(Money.data.Money).toFixed(2)}</h5></>
      )}
       {portfolioData.map((item, index) => (
      <>  {item.quantity > 0 && (
        <><Card>
           
             <Card.Header>
             <Link to={`/search/${item.ticker}`} style={{ textDecoration: 'none' }}>
               <p style={{color:'black',}}><b>{item.ticker}</b>{item.stockName}</p>
               </Link>
             </Card.Header><Card.Body>
               <Card.Text>
                 <Row>

                   <><Col key={index}>
                     <p className="bold-text" style={{color:'black', marginBottom: '0', textAlign: 'left' }}>Quantity: </p>
                     <p className="bold-text" style={{color:'black', marginBottom: '0', textAlign: 'left' }}>Avg. Cost/ Share:</p>
                     <p className="bold-text" style={{color:'black', marginBottom: '0', textAlign: 'left' }}>Total Cost:</p>
                   </Col><Col>
                       <p className="bold-text" style={{color:'black', marginBottom: '0', textAlign: 'left' }}>{item.quantity} </p>
                       <p className="bold-text" style={{color:'black', marginBottom: '0', textAlign: 'left' }}>{parseFloat(item.Average).toFixed(2)}</p>
                       <p className="bold-text" style={{color:'black', marginBottom: '0', textAlign: 'left' }}>{parseFloat(item.Total).toFixed(2)}</p>
                     </Col><Col>
                       <p className="bold-text" style={{color:'black', marginBottom: '0', textAlign: 'left' }}>Change: </p>
                       <p className="bold-text" style={{color:'black', marginBottom: '0', textAlign: 'left' }}>Current Price:</p>
                       <p className="bold-text" style={{color:'black', marginBottom: '0', textAlign: 'left' }}>Market Value:</p>
                     </Col><Col>
                       <p style={{color:'black', marginBottom: '0', textAlign: 'left' }}>{item.change}</p>
                       <p style={{color:'black', marginBottom: '0', textAlign: 'left' }}>{parseFloat(item.price).toFixed(2)}</p>
                       <p style={{color:'black', marginBottom: '0', textAlign: 'left' }}>{parseFloat((item.quantity)*(item.price)).toFixed(2)}</p>
                     </Col></>

                 </Row>
               </Card.Text>
             </Card.Body><Card.Footer>
               <p style={{ display: 'flex', gap: '10px', justifyContent: 'left' }}>
                 <Button variant="primary" onClick={() => handleBuy(item)}>Buy</Button>
                 <Button variant="danger" onClick={() => handleSell(item)}>Sell</Button>
               </p>


               {/* Modal */}
               <Modal show={showModal} onHide={handleToggleModal}>
                 <Modal.Header closeButton>
                   <Modal.Title  className='buySellTicker'>{selectedStock && selectedStock.stockName}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body style={{ padding: '20px' }}>
                   {/* Add your buy stock form or content here */}
                   
                     <p>Current Price: {selectedStock && selectedStock.price}</p>
                 
                   <p>Money in Wallet: {parseFloat(Money.data.Money).toFixed(2)}</p>
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
                   {selectedStock &&(
                   ((quantity * selectedStock.price) > Money.data.Money) && <p className="text-danger">Not enough money in wallet!</p>
                    )}
                   {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
                 </Modal.Body>
                 <Modal.Footer>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                     <p>Total: ${selectedStock && (quantity * selectedStock.price).toFixed(2)}</p> {/* Display the total value */}
                     <Button
                       variant="success" // Change variant based on total value
                       // onClick={buyStock(companyData3)}
                       onClick={() => buyStock()}
                       disabled= {selectedStock &&(
                        ((quantity * selectedStock.price) > Money.data.Money)
                         )} // Disable button if total is more than 25000
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
                   <Modal.Title  className='buySellTicker'>{selectedStock && selectedStock.stockName}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body style={{ padding: '20px' }}>
                   {/* Add your buy stock form or content here */}
                
                     <p>Current Price: {selectedStock && selectedStock.price}</p>
                
                   <p>Money in Wallet: {parseFloat(Money.data.Money).toFixed(2)}</p>
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
                     <p>Total: ${selectedStock && (quantity * selectedStock.price).toFixed(2)}</p> {/* Display the total value */}

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



             </Card.Footer>

            
           </Card><div style={{ marginBottom: '4%' }}></div></>
        )}</>
          ))}
         
       
      

    </div>
  )
}

export default Portfolio;
