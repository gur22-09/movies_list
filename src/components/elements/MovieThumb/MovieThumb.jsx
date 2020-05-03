import React from 'react';

import './MovieThumb.css';

const MovieThumb = (props)=>{
    return (
        <div className='rmdb-moviethumb'>
         <span className='release-date'>{props.release}</span>
         <img src={props.image} alt='movie-poster'/>
         
          
          <span className='voting-score'>{props.vote}</span>
         
         </div>
    );
};

export default MovieThumb;