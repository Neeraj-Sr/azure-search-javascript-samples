import React, { useState } from "react";

import './Result.css';
import axios from 'axios';
import apiBaseUrl from "../../../config";
import getPage from "../../../getPage";

export default function Result(props) {
    
  console.log(`result prop = ${JSON.stringify(props)}`)
    const imageurl = getPage(props.document.metadata_storage_path,0);
    return(
    <div className="card result">
        <a href={`/#/details/${props.document.metadata_storage_path}`}>
            <img className="card-img-top" src={imageurl} alt="Document Image"></img>
            <div className="card-body">
                <h6 className="title-style">{props.document.metadata_storage_name}</h6>
            </div>
        </a>
    </div>
    );
}
