import React from 'react';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import {Link} from 'react-router-dom'
import './Header.css';


const Header = ()=>(
    <div className='rmdb-header'>
     <div className='rmdb-header-content'>
       <Link to='/'>
        <MovieFilterIcon style={{fontSize:100}} color='secondary' className='rmdb-logo'/>  
       </Link>
       </div>
    </div>
);

export default Header;
