// // https://financialmodelingprep.com/api/v3/stock/list?apikey=OfWkW6me85Ix6iPN2IpXXpZypva6P6ja


// import React, { useEffect, useState } from "react";
// // import invest from '../pictures/invest.jpeg';


// const Stocks = () => {
//   const [stocks, setStocks] = useState([]);

//   const fetchData = async () => {
//     let resonse = await fetch(
//       " https://financialmodelingprep.com/api/v3/stock/list?apikey=OfWkW6me85Ix6iPN2IpXXpZypva6P6ja"
//     );
//     let data = await resonse.json();
//     // console.log(data)
//     setStocks(data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//     <h2 className="firstdiv">Get the latest Stock Price</h2>
//           <div className="mainDiv">
//       {stocks.map((ele) => {
//         // console.log(ele)
//         return (
//           <>
//         <div className="card" >
//               {/* <img src={ele.urlToImage === null ? invest : ele.urlToImage} class="card-img-top" alt="..." /> */}
//               <h3>{ele.symbol}</h3>
//               <div className="card-body">
//                 {/* <h5 className="card-title">{ele.author === "" ? "Janelle Ash" : ele.author}</h5> */}
//                 <p className="card-text">
//                  {ele.name}
//                  {/* {ele.price}
//                  {ele.exchange}
//                  {ele.exchangeShortName} */}
//                 </p>
//                 {/* <a href={ele.url} target="_blank" className="btn btn-primary">
//                   Read More
//                 </a> */}
//               </div>
//             </div>
//           </>
//         );
//     })}
//     </div>
//     </>
//   );
// };

// export default Stocks;

// import React, { useEffect, useState } from "react";

// const Stocks = () => {
//   const [stocks, setStocks] = useState([]);

//   const fetchData = async () => {
//     try {
//       let response = await fetch(
//         "https://financialmodelingprep.com/api/v3/stock/list?apikey=OfWkW6me85Ix6iPN2IpXXpZypva6P6ja"
//       );
//       let data = await response.json();
//       setStocks(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <h2 className="firstdiv">Get the latest Stock Price</h2>
//       <div className="mainDiv">
//         {stocks.length > 0 ? (
//           stocks.map((ele, index) => (
//             <div className="card" key={index}>
//               <h3>{ele.symbol}</h3>
//               <div className="card-body">
//                 <p className="card-text">{ele.name}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Stocks;

// import React, { useEffect, useState } from "react";
// import { debounce } from 'lodash';

// const Stocks = React.memo(() => {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = debounce(async () => {
//     console.log("fetching data")
//     try {
//       let response = await fetch(
//         "https://financialmodelingprep.com/api/v3/stock/list?apikey=OfWkW6me85Ix6iPN2IpXXpZypva6P6ja"
//       );
//       let data = await response.json();
//       console.log(data);
//       setStocks(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false);
//     }
//   }, 300); // Debounce time in milliseconds

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <h2 className="firstdiv">Get the latest Stock Price</h2>
//       <div className="mainDiv">
//         {loading ? (
//           <p>Loading...</p>
//         ) : stocks.length > 0 ? (
//           stocks.map((ele, index) => (
//             <div className="card" key={index}>
//               <h3>{ele.symbol}</h3>
//               <div className="card-body">
//                 <p className="card-text">{ele.name}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No data available.</p>
//         )}
//       </div>
//     </>
//   );
// });

// export default Stocks;

// import React, { useEffect, useState, useMemo } from "react";
// import { debounce } from 'lodash';

// const Stocks = React.memo(() => {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchData = debounce(async () => {
//     console.log("Fetching data for page:", currentPage);
//     try {
//       let response = await fetch(
//         `https://financialmodelingprep.com/api/v3/stock/list?apikey=OfWkW6me85Ix6iPN2IpXXpZypva6P6ja&page=${currentPage}`
//       );
//       let data = await response.json();
//       console.log("Data received:", data);
//       setStocks(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false);
//     }
//   }, 300); // Debounce time in milliseconds

//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);

//   const memoizedStocks = useMemo(() => stocks, [stocks]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     setLoading(true); // Set loading to true when changing pages
//   };

//   return (
//     <>
//       <h2 className="stockdiv">Get the latest Stock Price</h2>
//       <div className="maindiv">
//         {loading ? (
//           <p>Loading...</p>
//         ) : memoizedStocks.length > 0 ? (
//           memoizedStocks.map((ele, index) => (
//             <div className="card" key={index}>
//               <h3>{ele.symbol}</h3>
//               <div className="card-body">
//                 <p className="card-text">{ele.name}</p>
//                 <p className="card-text">{ele.price}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No data available.</p>
//         )}

//         {/* Pagination Controls */}
//         <div className="pagination">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             Previous
//           </button>
//           <span> Page {currentPage} </span>
//           <button onClick={() => handlePageChange(currentPage + 1)}>
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// });

// export default Stocks;

// import React, { useEffect, useState, useMemo } from "react";
// import { debounce } from 'lodash';

// const fetchData = debounce(async (currentPage, pageSize, setStocks, setLoading) => {
//   try {
//     const url = `https://financialmodelingprep.com/api/v3/stock/list?apikey=OfWkW6me85Ix6iPN2IpXXpZypva6P6ja&page=${currentPage}&limit=${pageSize}`;
//     console.log("Fetching data with URL:", url);

//     let response = await fetch(url);
//     let data = await response.json();
//     console.log("Data received:", data);

//     setStocks(data);
//     setLoading(false);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     setLoading(false);
//   }
// }, 300); // Debounce time in milliseconds

// const Stocks = React.memo(() => {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(1);

//   useEffect(() => {
//     fetchData(currentPage, pageSize, setStocks, setLoading);
//   }, [currentPage, pageSize]);

//   const memoizedStocks = useMemo(() => stocks, [stocks]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     setLoading(true);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//     setCurrentPage(1);
//     setLoading(true);
//   };

//   return (
//     <>
//       <h2 className="firstdiv">Get the latest Stock Price</h2>
//       <div className="mainDiv">
//         {/* Controls for changing page size */}
//         <div className="pageSizeControls">
//           <label htmlFor="pageSize">Items per page:</label>
//           <select
//             id="pageSize"
//             value={pageSize}
//             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//           </select>
//         </div>

//         {loading ? (
//           <p>Loading...</p>
//         ) : memoizedStocks && memoizedStocks.length > 0 ? (
//           memoizedStocks.map((ele) => (
//             <div className="card" key={ele.symbol}>
//               <h3>{ele.symbol}</h3>
//               <div className="card-body">
//                 <p className="card-text">{ele.name}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No data available.</p>
//         )}

//         {/* Pagination Controls */}
//         <div className="pagination">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             Previous
//           </button>
//           <span> Page {currentPage} </span>
//           <button onClick={() => handlePageChange(currentPage + 1)}>
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// });

// export default Stocks;


// import React, { useState } from "react";

// const CompanyDetails = () => {
//   const [symbol, setSymbol] = useState("");
//   const [companyDetails, setCompanyDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchCompanyDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(
//         `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=OfWkW6me85Ix6iPN2IpXXpZypva6P6ja`
//       );
//       const data = await response.json();

//       if (data && data.length > 0) {
//         setCompanyDetails(data[0]);
//       } else {
//         setCompanyDetails(null);
//         setError("Company not found");
//       }
//     } catch (error) {
//       console.error("Error fetching company details:", error);
//       setError("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchCompanyDetails();
//   };

//   return (
//     <div className="getinput">
//     <h2> Instantly Discover the Share/Stock Price at Your Fingertips</h2>
//       <h3>Provide the Company Details</h3>
//       <form onSubmit={handleSubmit}>
//         <label required>
//           Enter Company Symbol:
//           <input
//             type="text"
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value)}
//           />
//         </label>
//         <button type="submit" disabled={loading}>
//           Get Details
//         </button>
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {companyDetails && (
//         <div className="data">
//           <h3>{companyDetails.symbol}</h3>
//             <div className="column1">
//             <p>Name: </p>
//             <p>Price: </p>
//             <p>Change: </p>
//             <p>Percentage Change: </p>
//             <p>Day Low: </p>
//             <p>Day High: </p>
//             <p>Year Low: </p>
//             <p>Year High: </p>
//             <p>Market Cap: </p>
//             <p>Price Avg 50: </p>
//             <p>Price Avg 200: </p>
//             <p>Exchange: </p>
//             <p>Volume: </p>
//             <p>Average Volume: </p>
//             <p>Open: </p>
//             <p>Previous Close: 
//             <p>Earnings per Share (EPS): </p>
//             <p>Price to Earnings (P/E) Ratio: </p>
//             <p>Earnings Announcement:</p>
//             <p>Shares Outstanding: </p>
//             <p>Timestamp: </p>
//             </div>

//             <div className="column2">
//             <p>{companyDetails.name}</p>
//             <p>{companyDetails.price}</p>
//             <p>{companyDetails.change}</p>
//             <p>{companyDetails.changesPercentage}%</p>
//             <p>{companyDetails.dayLow}</p>
//             <p>{companyDetails.dayHigh}</p>
//             <p>{companyDetails.yearLow}</p>
//             <p>{companyDetails.yearHigh}</p>
//             <p>{companyDetails.marketCap}</p>
//             <p>{companyDetails.priceAvg50}</p>
//             <p>{companyDetails.priceAvg200}</p>
//             <p>{companyDetails.exchange}</p>
//             <p>{companyDetails.volume}</p>
//             <p>{companyDetails.avgVolume}</p>
//             <p>{companyDetails.open}</p>
//             <p>{companyDetails.previousClose}</p>
//             <p>{companyDetails.eps}</p>
//             <p>{companyDetails.pe}</p>
//             <p>{companyDetails.earningsAnnouncement}</p>
//             <p>{companyDetails.sharesOutstanding}</p>
//             <p>{companyDetails.timestamp}</p>
//             </div>

//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyDetails;


import React, { useState } from "react";

const CompanyDetails = () => {
  const [symbol, setSymbol] = useState("");
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   const finnhub = require('finnhub');

//   const api_key = finnhub.ApiClient.instance.authentications['api_key'];
//   api_key.apiKey = "cmqvv7hr01ql2lmt95u0cmqvv7hr01ql2lmt95ug"
//   const finnhubClient = new finnhub.DefaultApi()

// finnhubClient.quote("AAPL", (error, data, response) => {
//   console.log(data)
// });

document.body.style = 'background: cornsilk;';


  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=OfWkW6me85Ix6iPN2IpXXpZypva6P6ja`
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
