// import { useDataContext } from "../hooks/useDataContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { Link } from "react-router-dom";
// // import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import { useEffect } from "react"
// import { useCleanData } from "../hooks/useCleanData";


// const DataDetails = () => {
//     const {data, dispatch} = useDataContext()
//     const {user} = useAuthContext();
//     const {cleanData} = useCleanData();

//     const handleClick = () => {
//         cleanData();
//     }
    
//     useEffect ( () => {
//         const fetchdata = async () => {
//             const response = await fetch('/api/data/add', {
//                 headers: {'Authorization': `Bearer ${user.token}`}, 
//             })

//             const json = await response.json()

//             if (response.ok)
//             {
//                 dispatch ({type: 'GET_DATA', payload: json})
//             }
//         }

//         if (user) {
//             fetchdata()
//           }
//     }, [dispatch, user])
//     // const handleClick = async () => {
//     //     const response = await fetch('/api/data/add' + data._id)
        
//     //     const json = await response.json()
//     // }

//     return (
//         <div>
//         {user && (
//         <div>
            
//             {data && (
//         <div className="datadetails">
//             <Link to = "/mainform">
//             <button onClick={handleClick}>CLEAR DATA</button>
//             </Link>
//             <h4>Risk-Factor: {data.risk}</h4>
//             <h4>Time-Period: {data.timeperiod}</h4>
//             <span className="material-symbols-outlined"></span>
//         </div>
//         )}
        
//         </div>
//         )}
//         </div>
//     )
// }

// export default DataDetails


// import React from "react";
// import { useDataContext } from "../hooks/useDataContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useCleanData } from "../hooks/useCleanData";

// const DataDetails = () => {
//   const { data, dispatch } = useDataContext();
//   const { user } = useAuthContext();
//   const { cleanData } = useCleanData();

//   const handleClick = () => {
//     cleanData();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("/api/data/add", {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });

//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: "GET_DATA", payload: json });
//       }
//     };

//     if (user) {
//       fetchData();
//     }
//   }, [dispatch, user]);

//   const DisplayStartDate = ({ startDate }) => {
//     const startDateFormatted = new Date(startDate).toLocaleDateString();
//     return <span>{startDateFormatted}</span>;
//   };

//   const DisplayEndDate = ({ endDate }) => {
//     const endDateFormatted = new Date(endDate).toLocaleDateString();
//     return <span>{endDateFormatted}</span>;
//   };

//   return (
//     <div>
//       {user && (
//         <div>
//           {data && (
//             <div className="datadetails">
//               <Link to="/mainform">
//                 <button onClick={handleClick}>CLEAR DATA</button>
//               </Link>
//               <h4>
//                 Start Date: <DisplayStartDate startDate={data.startDate} />
//               </h4>
//               <h4>
//                 End Date: <DisplayEndDate endDate={data.endDate} />
//               </h4>
//               <h4>Stock-Tickers: {data.strings}</h4>
//               {/* <h4>Time-Period: {data.timeperiod}</h4> */}
//               <span className="material-symbols-outlined"></span>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DataDetails;


import React from "react";
import { useDataContext } from "../hooks/useDataContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCleanData } from "../hooks/useCleanData";

const DataDetails = () => {
  const { data, dispatch } = useDataContext();
  const { user } = useAuthContext();
  const [flaskData, setFlaskData] = useState(null);
  const { cleanData } = useCleanData();

  const handleClick = () => {
    cleanData();
  };
  
  // useEffect(() => {
  //   const fetchDataFromFlask = async () => {
  //     // try {
  //       const response = await fetch("http://localhost:5000/optimize_portfolio", 
  //         // method: "POST",
  //         // headers: {
  //         //   "Content-Type": "application/json",
  //         //   Authorization: `Bearer ${user.token}`,
  //         // },
  //         // body: JSON.stringify({
  //         //   tickers: data.strings.split(","),
  //         //   start_date: data.startDate,
  //         //   end_date: data.endDate,
  //         // }),

          
  //       );

  //       // let data = await resonse.json();
  //       //   setFlaskData(data.articles);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const json = await response.json();
  //       setFlaskData(json);
  //     }
  //     // } catch (error) {
  //     //   console.error("Error fetching data from Flask API:", error);
  //     // }
  //   };

  //   // if (user && data) {
  //   //   fetchDataFromFlask();
  //   // }
  // }, [user, data]);

  // const fetchDatafromFlask = async () => {
  //   let resonse = await fetch(
  //     "http://localhost:5000/tickers"
  //   );
  //   let json = await resonse.json();
  //   setFlaskData(json);
  // };

  // useEffect(() => {
  //   fetchDatafromFlask();
  // }, []);

  const DisplayStartDate = ({ startDate }) => {
    const startDateFormatted = new Date(startDate).toLocaleDateString();
    return <span>{startDateFormatted}</span>;
  };

  const DisplayEndDate = ({ endDate }) => {
    const endDateFormatted = new Date(endDate).toLocaleDateString();
    return <span>{endDateFormatted}</span>;
  };

  return (
    <div>
      {user && (
        <div>
          {data && (
            <div className="datadetails">
              <Link to="/mainform">
                <button onClick={handleClick}>CLEAR DATA</button>
              </Link>
              <h4>
                Start Date: <DisplayStartDate startDate={data.startDate} />
              </h4>
              <h4>
                End Date: <DisplayEndDate endDate={data.endDate} />
              </h4>
              <h4>Stock-Tickers: {data.strings}</h4>
              {flaskData && (
                <div>
                  <h4>Flask API Results:</h4>
                  {/* Display Flask API results here */}
                  <pre>{JSON.stringify(flaskData, null, 2)}</pre>
                </div>
              )}
              <span className="material-symbols-outlined"></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataDetails;
