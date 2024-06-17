import React, { Component, useState } from 'react';
import Autocomplete from './Autocomplete';
import SummaryChart from './SummaryChart';
import StackedColumnChart from './Recommend';
import YourComponent from './Sentiments';
import SplineChart from './Historical';
import VolumeByPriceChart from './VolumeChart';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tabs = ({ companyData, companyData1, companyData2, companyData3, companyData4, companyData5, companyData6, companyData7, companyData8, handleAutocompleteSelect }) => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('summary');

  const navigate = useNavigate();
  
  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderLinks = () => {
    const currentUrl = window.location.href;
  
    return companyData1.map((company, index) => (
      <React.Fragment key={index}>
        <a href={currentUrl} rel="noopener noreferrer" onClick={() => handleAutocompleteSelect(company)}>{company}</a>
        {index !== companyData1.length - 1 && ", "} {/* Add comma between links except for the last one */}
      </React.Fragment>
    ));
  };

  // const renderLinks = () => {
  //  // const currentUrl = window.location.href;
  
  //   // return companyData1.map((company, index) => (
  //   //   <React.Fragment key={index}>
  //   //     <a rel="noopener noreferrer" onClick={() => navigate(`/search/${company}`)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', fontSize: '12px' }}>{company}</a>
  //   //     {index !== companyData1.length - 1 && ", "} {/* Add comma between links except for the last one */}
  //   //   </React.Fragment>
  //   // ));

  //   return(companyData1.map((peer, index) => (
  //     <div key={index} onClick={() => navigate(`/search/${peer}`)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', fontSize: '12px' }}>
  //       {peer}
  //     </div>
  //    )))
  // };
  
    
  
  
  

  const formatDate = (unixTimeSeconds) => {
    if (!unixTimeSeconds) return ''; // Handle the case when unixTimeSeconds is null or undefined
    const unixTimeMilliseconds = unixTimeSeconds * 1000;
    const date = new Date(unixTimeMilliseconds);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };


  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };


  return (
    <div className='tabs'>
      {/* Tab Navigation */}
      <div className='tab'>
        <button className={activeTab === 'summary' ? 'active' : ''} onClick={() => handleTabChange('summary')}>Summary</button>
        <button className={activeTab === 'topnews' ? 'active' : ''} onClick={() => handleTabChange('topnews')}>Top News</button>
        <button className={activeTab === 'charts' ? 'active' : ''} onClick={() => handleTabChange('charts')}>Charts</button>
        <button className={activeTab === 'insights' ? 'active' : ''} onClick={() => handleTabChange('insights')}>Insights</button>
        {/* Add more tabs as needed */}
      </div>

      {/* Tab Content */}
      <div className='alltags'>
        {/* Summary Tab */}
        {activeTab === 'summary' && companyData3 && companyData && companyData1 &&(
          <div className='tabcontent summary'>

            <div className='summaryInfo'>

              {/* {companyData3 && (
                <div>
                  <p><b>High Price:{companyData3.h}</b></p>
                  <p><b>Low Price:{companyData3.l}</b></p>
                  <p><b>Open Price:{companyData3.o}</b></p>
                  <p><b>Prev. Price:{companyData3.pc}</b></p>

                  {companyData && (
                    <div>
                      <p><u><b>About the company</b></u></p>
                      <p><b>IPO Start Date: </b>{companyData.ipo}</p>
                      <p><b>Industry: </b>{companyData.finnhubIndustry}</p>
                      <p><b>Webpage: </b><a href={companyData.weburl} target="blank">{companyData.weburl}</a></p>
                      {companyData1 && (
                        <div>
                          <p><b>Company peers:</b></p>

                          <div>
                            <p>{renderLinks()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )} */}

             
                <div className='Prices-container'>
                  <div className='Prices'><div style={{ fontWeight: '500' }}><b>High Price: </b></div><div>{companyData3.h}</div></div>
                  <div className='Prices'><div style={{ fontWeight: '500' }}><b>Low Price: </b></div><div>{companyData3.l}</div></div>
                  <div className='Prices'><div style={{ fontWeight: '500' }}><b>Open Price: </b></div><div>{companyData3.o}</div></div>
                  <div className='Prices'><div style={{ fontWeight: '500' }}><b>Prev. Close: </b></div><div>{companyData3.pc}</div></div>
                </div>
                <div className='About-container'>
                  <div className="AboutCompany" >About the company</div>
                  <div className='About'><div style={{ fontWeight: '600' }}>IPO Start Date:</div><div>{companyData.ipo}</div></div>
                  <div className='About'><div style={{ fontWeight: '600' }}>Industry:</div><div>{companyData.finnhubIndustry}</div></div>
                  <div className='About'><div style={{ fontWeight: '600' }}>Webpage:</div><div><a href={companyData.weburl}>{companyData.weburl}</a></div></div>
                  <div><div style={{ fontWeight: '600' }}>Company Peers:</div></div>
                  <div className='peers'>
                     <p>{renderLinks()}</p>
                  </div>
                </div>
             

            </div>
            {companyData5 && companyData3 && (
              <div className='summaryChart'>
                <SummaryChart props={companyData5} stockValue={companyData3.d}/>
                {/* <SummaryChart props={companyData5}/> */}
              </div>
            )}
          </div>
        )}

        {/* Latest News Tab */}
        {activeTab === 'topnews' &&  companyData2 &&(
          <div className='tabcontent'>
            <h2>News</h2>
            
    <Row xs={1} md={2} className="g-4">
        {companyData2.map((data, idx) => {

          console.log("newsssss",companyData2);
          // Check if the image source is not null or empty
          if (data.image) {
            return (
              <Col key={idx} className="newsCol">
                {/* Wrap the card inside a clickable div */}
                <div onClick={() => handleCardClick(data)}>
                  <Card className='newsCard'>
                    <Row>
                      <Col xs={3} className='newsImage'> {/* Image column */}
                        <Card.Img variant="top" src={data.image} />
                      </Col>
                      <Col xs={9} className='newsHeadline'> {/* Text column */}
                        <Card.Body>
                          <Card.Text>
                           
                            {data.headline}
                          </Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Col>
            );
          } else {
            return null; // Skip rendering the card if image source is null or empty
          }
        })}
      </Row>

<div className='modal-main'>
  {/* Modal */}
  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header className='newsModalHeader' closeButton>
      <div>
        <p className="modal-news-source">{selectedItem?.source}</p>
        <p className="modal-news-datetime">{formatDate(selectedItem?.datetime)}</p>
      </div>
    </Modal.Header>
    <Modal.Body>
      <p className="modal-news-header">{selectedItem?.headline}</p>
      <p className="modal-news-summary">{selectedItem?.summary}</p>
      <p className="modal-more-details">For more details click <a target="_blank" href={selectedItem?.url}>here</a></p>
      {/* Share section */}
      <div className="share-section">
        <p>Share</p>
        {/* Twitter share button */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedItem?.headline)}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png" alt='Twitter logo' style={{height: '25px', width: '40px'}}/>
          {/* <img src="img/twitter_logo.png" alt="Twitter" /> */}
        </a>
        {/* Facebook share button */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://i.pinimg.com/originals/ce/d6/6e/ced66ecfc53814d71f8774789b55cc76.png" alt='Facebook logo' style={{height: '30px', width: '30px'}}/>
          {/* <img src="img/facebook_logo.png" alt="Facebook" /> */}
        </a>
      </div>
    </Modal.Body>
  </Modal>
</div>


          </div>

          
        )}

        {/* Charts Tab */}
        {activeTab === 'charts' && (
          <div className='tabcontent'>
            {companyData8 && (
            <VolumeByPriceChart stockData={companyData8} />
            )}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className='tabcontent'>
            <h4 className='text-center'>Insider Sentiments</h4>
            {companyData4 && (
              <div>
            {/* <div>Insider Sentiments: {companyData4.data[0].mspr}</div> */}
            <YourComponent companyData4={companyData4} />

            <div className='insightCharts'>
              <Row>
              <Col className="chart3" xs={6}>
              <StackedColumnChart inputData={companyData6} />
              </Col>
              <Col className="chart4" xs={6}>
               <SplineChart data={companyData7}/>
              </Col>
              </Row>
            </div>
            </div>
            )}
          </div>
        )}

        {/* Add more tab content components as needed */}
      </div>

      {/* <YourComponent companyData4={companyData4}/> */}
    </div>
  );
};

export default Tabs;

