import React, { useState } from "react";

const CompanyDetails = () => {
  const [symbol, setSymbol] = useState("");
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ApiKey = process.env.REACT_APP_FINANCIAL_MODELING_API_KEY;
//   const finnhub = require('finnhub');

//   const api_key = finnhub.ApiClient.instance.authentications['api_key'];
//   api_key.apiKey = "cmqvv7hr01ql2lmt95u0cmqvv7hr01ql2lmt95ug"
//   const finnhubClient = new finnhub.DefaultApi()

// finnhubClient.quote("AAPL", (error, data, response) => {
//   console.log(data)
// });
// console.log(process.env.REACT_APP_FINANCIAL_MODELING_API_KEY);
// console.log(ApiKey);

document.body.style = 'background: cornsilk;';


  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(process.env.REACT_APP_FINANCIAL_MODELING_API_KEY);
      console.log(ApiKey);
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${ApiKey}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setCompanyDetails(data[0]);
      } else {
        setCompanyDetails(null);
        setError("Company not found");
      }
    } catch (error) {
      console.error("Error fetching company details:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCompanyDetails();
  };

  return (
    <div className="getinput">
      <h2> Instantly Discover the Share/Stock Price at Your Fingertips</h2>
      <h3>Provide the Company Details</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Company Symbol:
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          Get Details
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {companyDetails && (
        <div className="data">
          <h3>{companyDetails.symbol}</h3>
          <div className="column1">
            <p>Name : </p>
            <p>Price : </p>
            <p>Change : </p>
            <p>Percentage Change : </p>
            <p>Day Low : </p>
            <p>Day High : </p>
            <p>Year Low : </p>
            <p>Year High : </p>
            <p>Market Cap : </p>
            <p>Price Avg 50 : </p>
            <p>Price Avg 200 : </p>
            <p>Exchange : </p>
            <p>Volume : </p>
            <p>Average Volume : </p>
            <p>Open : </p>
            <p>Previous Close : </p>
            <p>Earnings per Share (EPS) : </p>
            <p>Price to Earnings (P/E) Ratio : </p>
            <p>Earnings Announcement : </p>
            <p>Shares Outstanding : </p>
            <p>Timestamp : </p>
          </div>

          <div className="column2">
            <p>{companyDetails.name}</p>
            <p>{companyDetails.price}</p>
            <p>{companyDetails.change}</p>
            <p>{companyDetails.changesPercentage}%</p>
            <p>{companyDetails.dayLow}</p>
            <p>{companyDetails.dayHigh}</p>
            <p>{companyDetails.yearLow}</p>
            <p>{companyDetails.yearHigh}</p>
            <p>{companyDetails.marketCap}</p>
            <p>{companyDetails.priceAvg50}</p>
            <p>{companyDetails.priceAvg200}</p>
            <p>{companyDetails.exchange}</p>
            <p>{companyDetails.volume}</p>
            <p>{companyDetails.avgVolume}</p>
            <p>{companyDetails.open}</p>
            <p>{companyDetails.previousClose}</p>
            <p>{companyDetails.eps}</p>
            <p>{companyDetails.pe}</p>
            <p>{companyDetails.earningsAnnouncement}</p>
            <p>{companyDetails.sharesOutstanding}</p>
            <p>{companyDetails.timestamp}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
