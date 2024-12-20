import { useState, useCallback } from 'react';
import * as S from './search.style.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchMovieList from '../components/Movie/search-movie-list.jsx';

// debounce 함수
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const SearchInput = ({ value, onChange, onSearch }) => (
    <S.SearchContainer>
        <input
            placeholder="영화 제목을 입력하세요"
            value={value}
            onChange={onChange}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button onClick={onSearch}>검색</button>
    </S.SearchContainer>
);

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mq = searchParams.get('mq') || '';

    // 검색 실행
    const handleSearchMovie = useCallback(() => {
        if (mq === searchValue) return; // 동일 검색 방지
        navigate(`/search?mq=${searchValue}`);
    }, [mq, searchValue, navigate]);

    // 디바운스 적용
    const debouncedSearchMovie = useCallback(
        debounce(handleSearchMovie, 300),
        [handleSearchMovie]
    );

    return (
        <Grid>
            <SearchInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={debouncedSearchMovie}
            />
            <SearchMovieList />
        </Grid>
    );
};

export default SearchPage;

const Grid = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;