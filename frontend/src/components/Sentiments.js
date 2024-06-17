import React from 'react';

const YourComponent = ({ companyData4 }) => {
  // Check if companyData4 exists and contains data
  if (!companyData4 || !companyData4.data || !Array.isArray(companyData4.data)) {
    return <div>No data available</div>;
  }

  // Extract data array from companyData4
  const data = companyData4.data;

  // Calculate aggregate values
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

  const formatValue = value => {
    // Check if value is an integer
    if (Number.isInteger(value)) {
      return value; // Return integer value without decimal places
    } else {
      return value.toFixed(2); // Return value with 2 decimal places
    }
  };

      return (
        <table className="centered-table"> {/* Add class for centering */}
          <thead>
            <tr>
              <th>{companyData4.symbol}</th>
              <th>MSPR</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='fw-bold'>Total</td>
              <td>{formatValue(totalMSPR)}</td>
              <td>{formatValue(totalChange)}</td>
            </tr>
            <tr>
              <td className='fw-bold'>Positive</td>
              <td>{formatValue(positiveMSPR)}</td>
              <td>{formatValue(positiveChange)}</td>
            </tr>
            <tr>
              <td className='fw-bold'>Negative</td>
              <td>{formatValue(negativeMSPR)}</td>
              <td>{formatValue(negativeChange)}</td>
            </tr>
          </tbody>
        </table>
      );
};

export default YourComponent;
