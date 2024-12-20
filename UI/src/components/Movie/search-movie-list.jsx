import * as S from '../../search/search.style.js'
import useCustomFetch from '../../hooks/useCustomFetch.js';
import Movie from '../Movie.jsx'
import { useSearchParams } from 'react-router-dom';
import MovieListSkeleton from '../Skeleton/movie-list-skeleton.jsx';


const SearchMovieList = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    })

    const mq = searchParams.get('mq');

    const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;

    const { data: movies , isLoading, isError} = useCustomFetch(url);
    
    if (isLoading) {
        return (
            <S.MovieGridContainer>
                <MovieListSkeleton number={20}/>
            </S.MovieGridContainer>
        )
    }

    if (mq && movies.data?.results.length === 0) {
        return (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <h1 style={{color:'white'}}>해당하는 검색어 {mq}에</h1>
                <h1 style={{color:'white'}}>해당하는 데이터가 없습니다</h1>
            </div>
        )
    }

    return(
        <S.MovieGridContainer>
            {movies.data?.results.map((movie)=>(
                <Movie movie={movie} key={movie.id}/>

            ))}
        </S.MovieGridContainer>
    );
};

export default SearchMovieList;