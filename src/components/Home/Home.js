import React,{Component} from 'react';
import {API_URL,API_KEY,IMAGE_BASE_URL,POSTER_SIZE,BACKDROP_SIZE} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';

import './Home.css';


class Home extends Component{
    constructor(){
        super();
        this.state={
            movies:[],
            heroImg:null,
            loading:false,
            currentPage:0,
            totalPages:0,
            searchTerm:'',
            upcoming:[]
        };
    }


    componentDidMount(){
        this.setState({loading:true});
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
        this.fetchUpcoming();
        
    }

    searchItems =(searchTerm)=>{
        
       let endpoint;
         
       this.setState({
           loading:true,
           movies: [],
           searchTerm
       });

       if(searchTerm === ''){
         endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
       }else{
         endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
       }

       this.fetchItems(endpoint);
    }

    loadMoreItems = ()=>{
        let endpoint = '';
        this.setState({loading:true});
        const {currentPage,searchTerm} = this.state; 
        if(this.state.searchTerm === ''){
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        }else{
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;

        }

        this.fetchItems(endpoint);
        
    }
    fetchUpcoming = () =>{
        const endpoint = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
          this.setState({
            upcoming: [...this.state.upcoming, ...result.results],
        
          });
          
        })
        .catch(error => console.error('Error:', error))
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            
          this.setState({
            movies: [...result.results],
            heroImg: this.state.heroImage || result.results[0],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages
          });
          
        })
        .catch(error => console.error('Error:', error))
      }


    render(){
        const {heroImg, searchTerm,movies,loading,currentPage,totalPages,upcoming} = this.state
        return(
            <div className='rmdb-home'>
             {heroImg ? 
              <div>
                <HeroImage 
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImg.backdrop_path}`}
                    title={heroImg.original_title}
                    text={heroImg.overview}

                />
                <SearchBar callback={this.searchItems} />
              </div> : null }
              <div className='rmdb-home-grid'>
                <FourColGrid 
                   header={searchTerm ? `Search Result` : `Trending Movies` }
                >
                   {
                       movies.map((item,index)=>{
                           return (
                               <MovieThumb
                                key={index}
                                clickable={true}
                                image={item.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${item.poster_path}`:'./images/no_image.jpeg'}
                                movieId={item.id}
                                movieName={item.original_title}
                                release={item.release_date}
                                vote={item.vote_average}
                                />
                           )   
                       })
                   }
               </FourColGrid>
               {loading ? <Spinner /> : null}
               {currentPage <= totalPages && !loading  ?
                  <LoadMoreBtn text='...Next' onClick={this.loadMoreItems} />
                  : 
                  null
               }
               </div>
               {
                 
                 <div className='rmdb-home-grid'>
                  <FourColGrid
                   header='Upcoming Movies'
                   >
                  {
                   upcoming.filter((item,index)=>index<8).map((item,index)=>{
                       
                           return (
                            <MovieThumb
                                key={index}
                                clickable={true}
                                image={item.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${item.poster_path}`:'./images/no_image.jpeg'}
                                movieId={item.id}
                                movieName={item.original_title}
                                release={item.release_date}
                                vote={item.vote_average}
                                />
                           )
                       }
                   )
                  }
                  </FourColGrid>
                 </div>
                }
            </div>
           
        )  
           
    }
};


export default Home;