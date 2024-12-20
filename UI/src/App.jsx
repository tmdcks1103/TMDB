
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { createGlobalStyle } from 'styled-components';

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import RootLayout from "./layout/root-layout.jsx";
import MoviesPage from './pages/movies.jsx';
import LoginPage from './pages/user/login.jsx';
import SignupPage from './pages/user/signup.jsx';
import SearchPage from './search/search.jsx';
import PopularPage from './pages/category/now-playing.jsx';
import NowPlayingPage from './pages/category/now-playing.jsx';
import TopRatedPage from './pages/category/top-rated.jsx';
import UpComingPage from './pages/category/up-coming.jsx';
import MovieDetailPage from './pages/movie-detail.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {

                index: true,
                element: <HomePage/>
            },
            {
                path: 'movies',
                element: <MoviesPage/>,
            },
            {
                path:'login',
                element:<LoginPage/>
            },
            {
                path:'signup',
                element:<SignupPage/>
            },
            {
                path:'search',
                element:<SearchPage/>
            },
            {
                path:'movies/now-playing',
                element:<NowPlayingPage/>
            },
            {
                path:'movies/popular',
                element:<PopularPage/>
            },
            {
                path:'movies/top-rated',
                element:<TopRatedPage/>
            },
            {
                path:'movies/up-coming',
                element:<UpComingPage/>
            },
            {
                path:'movies/:movieId',
                element:<MovieDetailPage/>

            }

        ]
    },

])

function App() {
    return (
        <>
            <GlobalStyle/>
            <RouterProvider router={router}/>
        </>
    )
}

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        background-color:black;
    }
`;

export default App