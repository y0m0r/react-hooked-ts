import React, {useEffect, useReducer} from 'react';
import Header from './Header';
import Movie, {MovieType} from './Movie';
import Search from './Search';
import "./App.css"


const INITIAL_SEARCH_KEY = "man"
const OMDB_API_KEY = "cdb79a35"
const MOVIE_API_URL = `https://www.omdbapi.com/?s=${INITIAL_SEARCH_KEY}&apikey=${OMDB_API_KEY}`;

enum ActionType {
    SEARCH_MOVIES_REQUEST = "SEARCH_MOVIES_REQUEST",
    SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS",
    SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE"
}

interface IAppAction {
    type: ActionType,
    payload?: IAppState["movies"]
    error?: IAppState["errorMessage"]
}


interface IAppState {
    loading: boolean
    movies: MovieType[]
    errorMessage?: string | null
}


const initialState: IAppState = {
    loading: true,
    movies: [],
    errorMessage: null
};

const reducer = (state: IAppState, action: IAppAction): IAppState => {
    switch (action.type) {
        case ActionType.SEARCH_MOVIES_REQUEST:
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case ActionType.SEARCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                // !でエラー回避
                movies: action.payload!
            };
        case ActionType.SEARCH_MOVIES_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.error!
            };
        default:
            return state;
    }
};


const App: React.VFC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                dispatch({
                    type: ActionType.SEARCH_MOVIES_SUCCESS,
                    payload: jsonResponse.Search
                })
            })
    }, [])

    const searchFunction = (searchValue: string) => {
        dispatch({
            type: ActionType.SEARCH_MOVIES_REQUEST
        })

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${OMDB_API_KEY}`)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Response === "True") {
                    dispatch({
                        type: ActionType.SEARCH_MOVIES_SUCCESS,
                        payload: jsonResponse.Search
                    })
                } else {
                    dispatch({
                        type: ActionType.SEARCH_MOVIES_FAILURE,
                        error: jsonResponse.Error
                    })

                }
            });
    };

    const {movies, errorMessage, loading} = state;
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