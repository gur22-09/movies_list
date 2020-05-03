import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

import './SearchBar.css';


class SearchBar extends React.Component{
    state={
      value: ''
    }

    timeout = null;
     
    doSearch = event =>{
        const {target} = event;

        this.setState({value:target.value});
        clearTimeout(this.timeout);

        this.timeout = setTimeout(()=>{
            this.props.callback(this.state.value);
        },500);
    }


    render(){
        return(
            <div className='rmdb-searchbar'>
             <div className='rmdb-searchbar-content'>
              <SearchIcon fontSize='large' className='rmdb-searchbar-icon' />
              <input 
                  type='text'
                  className='rmdb-searchbar-input'
                  placeholder='Search'
                  onChange={this.doSearch}
                  value={this.state.value}
              />

             </div>
            </div>
        )
    }
};


export default SearchBar;