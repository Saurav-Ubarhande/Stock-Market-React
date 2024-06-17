// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Alert } from 'react-bootstrap';
// import Tabs from './Tabs';
// import { useNavigate, useParams } from 'react-router-dom';
// import { BsSearch, BsX } from 'react-icons/bs';
// import { Form, FormControl, Button } from 'react-bootstrap';

// const Autocomplete = ({ onSelect, showTabs, onSearchButtonClick, onClose, companyData, companyData1, companyData2, companyData3, companyData4, companyData5, companyData6, companyData7, companyData8 }) => {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   const navigate = useNavigate();
  
//   useEffect(() => {
//     if (query.trim() !== '') {
//       axios.get(`http://localhost:3001/api/autocomplete?symbol=${query}`)
//         .then(response => {
//           const filteredData = response.data.result.filter(item => (
//             item.type === 'Common Stock' && !item.symbol.includes('.')
//           ));

//           if (filteredData.length === 0) {
//             setErrorMessage('No data found. Please enter a valid Ticker');
//             setSuggestions([]);
//           } else {
//             setSuggestions(filteredData.slice(0, 5));
//             setErrorMessage('');
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching autocomplete suggestions:', error);
//           setErrorMessage('An error occurred. Please try again later.');
//           setSuggestions([]);
//         });
//     } else {
//       setSuggestions([]);
//       setErrorMessage('');
//     }
//   }, [query]);

//   const handleSelectSuggestion = (symbol) => {
//     setQuery('');
//     setSuggestions([]);
//     onSelect(symbol);
//   };

//   const handleSearch = (symbol) => {
//   onSearchButtonClick(symbol);
//    };

//   const handleClose = () => {
//     setQuery('');
//     setSuggestions([]);
//     onClose();
//   };

//   return (
//     <div>
//       <div>
//         <form onSubmit={handleSearch} id="search" className="search-bar" action="javascript:void(0)">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search..."
//           />

// {/* onClick={() => handleSearch()} */}

//           {/* <Button id="searchbutton"  className="search" type="submit" data-close>
           
//             <BsSearch />
//           </Button>
//           <Button id="closebutton" onClick={handleClose} data-clos className="close-button" type="button" data-close>
           
//             <BsX style={{ fontSize: '1.5em' }} />
//           </Button> */}

//           <Button type="submit" onClick={() => handleSearch()} variant="primary" className="rounded-0" style={{ backgroundColor: 'white', color: 'darkblue', border: 'none', padding: '5px', outline: 'none' }}>
//             <BsSearch />
//           </Button>
//           <Button type="button" onClick={handleClose} variant="secondary" className="rounded-end" style={{ backgroundColor: 'white', color: 'darkblue', border: 'none', paddingLeft: '1px', marginRight: '15px', outline: 'none' }}>
//             <BsX style={{ fontSize: '1.5em' }} />
//           </Button>
//         </form>
//       </div>

//       {errorMessage && (
//         <div style={{ paddingTop: '5%', textAlign: 'center' }}>
//           <Alert variant="danger">{errorMessage}</Alert>
//         </div>
//       )}

//       {!errorMessage && suggestions.length > 0 && (
//         <div className='suggestions'>
//           {suggestions.map((suggestion, index) => (
//             <li key={index} onClick={() => handleSelectSuggestion(suggestion.symbol)}>
//               {suggestion.symbol} | {suggestion.description}
//             </li>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Autocomplete;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import { BsSearch, BsX } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Autocomplete = ({ onSelect, onSearchButtonClick, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (query.trim() !== '') {
      setLoading(true); // Start loading spinner
      axios.get(`https://react-project-3856.wl.r.appspot.com/api/autocomplete?symbol=${query}`)
        .then(response => {
          const filteredData = response.data.result.filter(item => (
            item.type === 'Common Stock' && !item.symbol.includes('.')
          ));

          if (filteredData.length === 0) {
            setErrorMessage('No data found. Please enter a valid Ticker');
            setSuggestions([]);
          } else {
            setSuggestions(filteredData.slice(0, 5));
            setErrorMessage('');
          }
        })
        .catch(error => {
          console.error('Error fetching autocomplete suggestions:', error);
          setErrorMessage('An error occurred. Please try again later.');
          setSuggestions([]);
        })
        .finally(() => {
          setLoading(false); // Stop loading spinner
        });
    } else {
      setSuggestions([]);
      setErrorMessage('');
    }
  }, [query]);

  const handleSelectSuggestion = (symbol) => {
    setQuery('');
    setSuggestions([]);
    onSelect(symbol);
  };

  const handleSearch = () => {
    onSearchButtonClick(query);
  };

  const handleClose = () => {
    setQuery('');
    setSuggestions([]);
    onClose();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSearch} id="search" className="search-bar" action="javascript:void(0)">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter stock ticker symbol"
          />

          <Button type="submit" variant="primary" className="rounded-0" style={{ backgroundColor: 'white', color: 'darkblue', border: 'none', padding: '5px', outline: 'none' }}>
            <BsSearch />
          </Button>
          <Button type="button" onClick={handleClose} variant="secondary" className="rounded-end" style={{ backgroundColor: 'white', color: 'darkblue', border: 'none', paddingLeft: '1px', marginRight: '15px', outline: 'none' }}>
            <BsX style={{ fontSize: '1.5em' }} />
          </Button>
        </form>
      </div>

 
      {loading && <Spinner animation="border" variant="primary" className="loader" />}

      {errorMessage && (
        <div style={{ paddingTop: '5%', textAlign: 'center' }}>
          <Alert variant="danger">{errorMessage}</Alert>
        </div>
      )}

      {!errorMessage && suggestions.length > 0 && (
        <div className='suggestions'>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelectSuggestion(suggestion.symbol)}>
              {suggestion.symbol} | {suggestion.description}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;


