import React, {useEffect, useState} from 'react';
import Header from './Header';
import Movie, {MovieType} from './Movie';
import Search from './Search';
import "./App.css"


const INITIAL_SEARCH_KEY = "man"
const OMDB_API_KEY = "cdb79a35"
const MOVIE_API_URL = `https://www.omdbapi.com/?s=${INITIAL_SEARCH_KEY}&apikey=${OMDB_API_KEY}`;


const App: React.VFC = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetch(MOVIE_API_URL).then(response => response.json()).then(jsonResponse => {
            setMovies(jsonResponse.Search);
            setLoading(false);
        })
    }, [])

    const searchFunction = (searchValue: string) => {
        setLoading(true);
        setErrorMessage(null);

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Response === "True") {
                    setMovies(jsonResponse.Search);
                    setLoading(false);
                } else {
                    setErrorMessage(jsonResponse.Error);
                    setLoading(false);
                }
            });
    };

    return (
        <>
            <div className="App">
                <Header text="HOOKED"/>
                <Search searchFunction={searchFunction}/>
                <p className="App-intro">Sharing a few of our favourite movies</p>
                <div className="movies">
                    {loading && !errorMessage ? (
                        <span>loading...</span>
                    ) : errorMessage ? (
                        <div className="errorMessage">{errorMessage}</div>
                    ) : (
                        movies.map((movie: MovieType, index) => (
                            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
                        ))
                    )}
                </div>
            </div>


        </>
    )
}


export default App;