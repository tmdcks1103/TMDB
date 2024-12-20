import React, { useState } from "react";
import Movie from "../../components/Movie";
import MovieListSkeleton from "../../components/Skeleton/movie-list-skeleton";
import { useGetMoviesByPage } from "../../hooks/queries/useGetMoviesByPage";
import Pagination from "../../components/Pagination";

import * as S from "./page.style";

const TopRatedPage = () => {
    const [page, setPage] = useState(1); // 페이지 상태 관리
    const { data: movies, isLoading, error, isPreviousData } = useGetMoviesByPage('top_rated', page); //영화 데이터 불러오기

    // 총 페이지 수 계산
    const totalPages = movies?.total_pages || 1;

    return (
        <S.Container>
            <S.MoviesContainer>
                {/* 영화 카드가 부드럽게 보이도록 애니메이션 적용 */}
                {isLoading ? (
                    <MovieListSkeleton number={24} />
                ) : (
                    movies?.results.map((movie, index) => (
                        <Movie key={movie.id} movie={movie} delay={index * 0.05} />
                    ))
                )}
            </S.MoviesContainer>

            {/* Pagination 컴포넌트 추가 */}
            <Pagination 
                page={page}     // 현재 페이지
                setPage={setPage}  //페이지 변경 함수 Pagination 컴포넌트에 전달
                totalPages={totalPages}    // 총페이지 
                isPreviousData={isPreviousData} // 이전 데이터 
            />
        </S.Container>
    );
};

export default TopRatedPage;
