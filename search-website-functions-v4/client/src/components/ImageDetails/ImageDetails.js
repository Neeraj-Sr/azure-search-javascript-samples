
import React, { useState} from "react";

import './ImageDetails.css';
import getPage from '../../getPage';

export default function ImageDetails(props) {

    const [page, setPage] = useState(0);
    const handleNextPage = () => {
        setPage(page + 1);
      }
    
    const handlePreviousPage = () => {
        if(page > 0)
            setPage(page - 1);
      }
    
    let url = getPage(props.path,page);
    return (
        <div  >
        <ul className='menu_ul'>
          <li><button onClick={handlePreviousPage}> &lt;&lt; </button></li>
          <li><h5 className="card-title">{props.name} Page# {page}</h5></li>
          <li><button onClick={handleNextPage}> &gt;&gt; </button></li>
        </ul>
        <li><img  src={url} alt="No more Pages"></img></li>
        </div>
    );
  };