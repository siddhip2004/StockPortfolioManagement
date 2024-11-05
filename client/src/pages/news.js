import React, { useEffect, useState } from "react";
import invest from '../pictures/invest.jpeg';

const News = () => {
  const [mynews, setMyNews] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY_FOR_TESLA;

  const fetchData = async () => {
    console.log("API URL:", process.env.REACT_APP_API_KEY_FOR_TESLA);
    let resonse = await fetch(apiKey);
    let data = await resonse.json();
    setMyNews(data.articles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <h2 className="firstdiv">Dive into the Pulse of the Corporate World</h2>
          <div className="mainDiv">
      {mynews.map((ele) => {
        console.log(ele)
        return (
          <>
        <div className="card" >
          
              <img src={ele.urlToImage === null ? invest : ele.urlToImage} class="card-img-top" alt="..." />
              <div className="card-body">
                {/* <h5 className="card-title">{ele.author === "" ? "Janelle Ash" : ele.author}</h5> */}
                <p className="card-text">
                 {ele.title}
                </p>
              </div>
                <div className="read">
                <a href={ele.url} target="_blank" className="btn btn-primary">
                  Read More
                </a>
                </div>
              
        </div>
          </>
        );
    })}
    </div>
    </>
  );
};

export default News;