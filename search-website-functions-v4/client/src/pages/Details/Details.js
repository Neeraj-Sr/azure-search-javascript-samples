import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
//import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import apiBaseUrl from "../../config";
import Result from '../../components/Results/Result/Result';
import getPage from "../../getPage";

import "./Details.css";

export default function Details() {

  let { id } = useParams();
  const [document, setDocument] = useState({});
  const [matchingdocs,setMatchingDocs] = useState({});
  const [selectedTab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  //const [resultCount, setcount] = useState(10)

  useEffect(() => {
    setIsLoading(true);
    console.log(id);
    axios.get(`${apiBaseUrl || ""}/api/lookup?id=${id}`)
      .then(response => {
        console.log(JSON.stringify(response.data))
        const doc = response.data.document;
        setDocument(doc);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
    axios.get(`${apiBaseUrl || ""}/api/getmorelikethis?id=${id}`)
      .then(response => {
        //console.log(JSON.stringify(response.data))
        const doc = response.data.document.value;
        console.log(doc);
        setMatchingDocs(doc);
      })
      .catch(error => {
        console.log(error);
      });   
  }, [id]);

  
  // View default is loading with no active tab
  let detailsBody = (<CircularProgress />),
      resultStyle = "nav-link",
      rawStyle    = "nav-link",
      likeThisStyle = "nav-link";

  if (!isLoading && document) {
    
    const url = getPage(document.metadata_storage_path,0);
   // console.log(url)
    if (selectedTab === 0) {
      resultStyle += " active";
      detailsBody = (
        <div className="card-body">
          <h5 className="card-title">{document.metadata_storage_name}</h5>
          <img className="image" src={url} alt="Book cover"></img>
        </div>
      );
    }
    // View raw data
    if(selectedTab === 1){
      rawStyle += " active";
        detailsBody = (
          <div className="card-body text-left">
            <pre><code>
              {JSON.stringify(document.keyphrases, null, 2)}
            </code></pre>
          </div>
        );
      }
    if(selectedTab === 2){
      likeThisStyle += " active";
      console.log(matchingdocs)
      let results = matchingdocs.map((result, index) => {
        console.log(result.metadata_storage_name)
        return <Result 
            key={index} 
            document={result}
          />;
      });
      detailsBody =
      (
      <div className="row row-cols-md-5 results">
        {results}
      </div>);
    } 
    }  

  return (
    <main className="main main--details container fluid">
      <div className="card text-center result-container">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item"><button className={resultStyle} onClick={() => setTab(0)}>Result</button></li>
              <li className="nav-item"><button className={rawStyle} onClick={() => setTab(1)}>Raw Data</button></li>
              <li className="nav-item"><button className={likeThisStyle} onClick={() => setTab(2)}>More Like This</button></li>
          </ul>
        </div>
        {detailsBody}
      </div>
    </main>
  );
  }

