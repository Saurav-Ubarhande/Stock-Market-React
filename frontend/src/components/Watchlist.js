import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://react-project-3856.wl.r.appspot.com/api/watchlist');
      setWatchlistData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRemoveFromWatchlist = async (symbol) => {
    try {
      await axios.post(`https://react-project-3856.wl.r.appspot.com/watchlist/remove/${symbol}`);
      // After successful removal, refetch watchlist data
      fetchData();
    } catch (error) {
      console.error('Error removing stock from watchlist:', error);
    }
  };

  const renderWatchlist = () => {
    if (loading) {
      return <Spinner animation="border" role="status" />;
    } else if (watchlistData.length === 0) {
      return(
        <div style={{ paddingTop: '5%', textAlign: 'center' }}>
           <Alert variant="warning">Currently you don't have any stock in your watchlist.</Alert> 
       </div>)
    } else {
      return (
        <div className='watchlist'>
          <Row className="g-4">
            {watchlistData.map((item) => (
              <Col key={item.symbol} xs={12}>
                <Card style={{ width: '100%', position: 'relative', marginBottom: '5px' }}>
                  <span className="clos" onClick={() => handleRemoveFromWatchlist(item.symbol)}
                    style={{ position: 'absolute', top: '5px', left: '5px', cursor: 'pointer' }}>&times;</span>
                  <Link to={`/search/${item.symbol}`} style={{ textDecoration: 'none' }}>
                    <Card.Body style={{ paddingBottom: '20px', paddingTop: '30px' }}>
                      <div style={{ display: 'flex', gap: '10%' }}>
                        <div style={{ width: '40%' }}>
                          <Card.Title style={{ color: 'black', marginBottom: '10px' }}>{item.symbol}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted" style={{ width: '100%', color: 'black', marginTop: '5px' }}>{item.name}</Card.Subtitle>
                        </div>
                        <div style={{ width: '50%' }}>
                          <h2 style={{ fontSize: '150%', color: item.dailyChange >= 0 ? 'green' : 'red' }}>
                            {parseFloat(item.currentPrice).toFixed(2)}
                          </h2>
                          <div id='arrow' style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '100%', color: item.dailyChange >= 0 ? 'green' : 'red' }}>
                              {item.dailyChange >= 0 ? '▲' : '▼'}
                            </span>
                            <span>
                              <h4 style={{ fontSize: '100%', color: item.dailyChange >= 0 ? 'green' : 'red' }}>
                                {parseFloat(item.dailyChange).toFixed(2)} ({parseFloat(item.percentChange).toFixed(2)}%)
                              </h4>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }
  };

  return (
    <div className="Watchlist-container">
      <div >
        <h2 className='Watchlist'>My Watchlist</h2>
        {renderWatchlist()}
      </div>
    </div>
  );
};

export default Watchlist;
