import React, { useState } from 'react';

const Mainform = () => {
  const [tickers, setTickers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8080/optimize-portfolio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickers: tickers,
          start_date: startDate,
          end_date: endDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#1e90ff',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '10px',
      backgroundColor: '#1e90ff',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
   
    result: {
      backgroundColor: '#f0f8ff', // Light background color
      border: '1px solid #add8e6', // Light blue border
      borderRadius: '8px', // Rounded corners
      padding: '15px', // Padding inside the box
      marginTop: '20px', // Space above the result box
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    },
    
    resultHeading: {
      fontWeight: 'bold', // Bold heading
      fontSize: '20px', // Font size for the heading
      color: '#1e90ff', // Blue color for the heading
      marginBottom: '10px', // Space below the heading
      textAlign: 'center', // Center the heading
    },
    
    resultText: {
      fontSize: '16px', // Font size for the result text
      color: '#333', // Darker text color for readability
      margin: '5px 0', // Vertical margins for spacing
      lineHeight: '1.5', // Line height for better readability
    },
    
    error: {
      color: 'red',
      textAlign: 'center',
    },
    
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Optimize Your Portfolio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Tickers (comma-separated)</label>
          <input
            type="text"
            value={tickers}
            onChange={(e) => setTickers(e.target.value)}
            style={styles.input}
            placeholder="e.g. AAPL,GOOGL,MSFT"
            required
          />
        </div>
        <div>
          <label style={styles.label}>Start Date (YYYY/MM/DD)</label>
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.input}
            placeholder="e.g. 2023/01/01"
            required
          />
        </div>
        <div>
          <label style={styles.label}>End Date (YYYY/MM/DD)</label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.input}
            placeholder="e.g. 2023/12/31"
            required
          />
        </div>
        <div>
          <button type="submit" style={styles.button}>
            Optimize
          </button>
        </div>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {result && (
        // <div style={styles.results}>
        //   <h2 style={{ fontWeight: 'bold' }}>Results:</h2>
        //   <p>Weights: {JSON.stringify(result.weights)}</p>
        //   <p>Expected Annual Return: {result.expected_annual_return}</p>
        //   <p>Annual Volatility: {result.annual_volatility}</p>
        //   <p>Sharpe Ratio: {result.sharpe_ratio}</p>
        // </div>
        <div style={styles.result}>
          <h2 style={styles.resultHeading}>Results:</h2>
          <p style={styles.resultText}>Weights: {JSON.stringify(result.weights)}</p>
          <p style={styles.resultText}>Expected Annual Return: {result.expected_annual_return}</p>
          <p style={styles.resultText}>Annual Volatility: {result.annual_volatility}</p>
          <p style={styles.resultText}>Sharpe Ratio: {result.sharpe_ratio}</p>
      </div>
      )}
    </div>
  );
};

export default Mainform;
