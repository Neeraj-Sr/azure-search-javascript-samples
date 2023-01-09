import React from 'react';

import './Result.css';
import axios from 'axios';
import apiBaseUrl from "../../../config";

export default function Result(props) {
    
    console.log(`result prop = ${JSON.stringify(props)}`)
  
    axios.get(`${apiBaseUrl || ""}/api/getimage?id=${id}`)
      .then(response => {
        
        console.log(JSON.stringify(response.data))
        const doc = response.data.document;
        
      })
      .catch(error => {
        console.log(error);
      });

    return(
    <div className="card result">
        <a href={`/#/details/${props.document.id}`}>
            <img className="card-img-top" src={props.document.image_url} alt="{props.document.metadata_storage_path}"></img>
            <div className="card-body">
                <h6 className="title-style">{props.document.metadata_storage_path}</h6>
            </div>
        </a>
    </div>
    );
}
