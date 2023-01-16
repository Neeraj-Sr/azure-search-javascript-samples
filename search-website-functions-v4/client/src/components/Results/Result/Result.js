import React, { useState, useEffect } from "react";

import './Result.css';
import axios from 'axios';
import apiBaseUrl from "../../../config";

export default function Result(props) {
    
    console.log(`result prop = ${JSON.stringify(props)}`)
    const imageBaseUrl = "https://docsexplorerfunc2.azurewebsites.net"
    const [imageurl, setImageUrl] = useState({});
    console.log(props.document)
    //axios.get(`${imageBaseUrl || ""}/api/HttpTriggerFunc?name=${props.document.metadata_storage_path}`)
    axios.get(`${apiBaseUrl || ""}/api/getimage?id=${props.document.metadata_storage_path}`)
      .then(response => {
        console.log(JSON.stringify(response.data))
        console.log(response.data)
        setImageUrl(response.data.document)        
      })
      .catch(error => {
        console.log(error);
      });

    return(
    <div className="card result">
        <a href={`/#/details/${props.document.metadata_storage_path}`}>
            <img className="card-img-top" src={imageurl} ></img>
            <div className="card-body">
                <h6 className="title-style">{props.document.metadata_storage_name}</h6>
            </div>
        </a>
    </div>
    );
}
