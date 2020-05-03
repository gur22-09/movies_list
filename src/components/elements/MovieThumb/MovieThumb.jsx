import React from 'react';


import './MovieThumb.css';

const MovieThumb = ({release,image,vote})=>{
    return (
        <div className='rmdb-moviethumb'>
    
         <span className='release-date'>{release}</span>
         <img src={image} alt='movie-poster'/>
         <span className='voting-score'>{vote}</span>
         
         </div>
    );
};

export default MovieThumb;