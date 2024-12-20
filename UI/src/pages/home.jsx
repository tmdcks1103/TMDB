import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FaHome, FaFire, FaStar, FaFilm } from "react-icons/fa";
import { useGetMoviesByPage } from "../hooks/queries/useGetMoviesByPage";
import MovieListSkeleton from "../components/Skeleton/movie-list-skeleton";
import Movie from "../components/Movie";
import { Link } from "react-router-dom";

const HomePage = () => {
    const sections = [
        { title: "인기 영화", icon: <FaFire />, path: "movies/popular", category: "popular" },
        { title: "추천 영화", icon: <FaStar />, path: "movies/top-rated", category: "top_rated" },
        { title: "현재 상영 중", icon: <FaFilm />, path: "movies/now-playing", category: "now_playing" },
    ];

    return (
        <HomeContainer>
            <HomeHeader>
                <FaHome /> Home
            </HomeHeader>

            <Banner>
                <BannerText>
                    🎥스크린 속에서 펼쳐지는 무한한 가능성을 만나보세요! 🎥
                </BannerText>
                <BannerSubText>
                    최신 개봉작부터 추천작까지, 모든 영화가 한자리에!
                </BannerSubText>
            </Banner>

            {sections.map(({ title, icon, path, category }) => (
                <MovieSection key={category} title={title} icon={icon} path={path} category={category} />
            ))}

            <SearchPrompt>
                <SearchPromptText>
                    찾는 영화가 있다면? <Link to="/search">여기서 검색</Link>
                </SearchPromptText>
            </SearchPrompt>
        </HomeContainer>
    );
};

const MovieSection = ({ title, icon, path, category }) => {
    const { data: movies, isLoading } = useGetMoviesByPage(category, 1);

    const renderMovies = () => {
        if (isLoading) return <MovieListSkeleton number={6} />;
        return movies?.results.slice(0, 10).map((movie, index) => (
            <Movie key={movie.id} movie={movie} delay={index * 0.05} />
        ));
    };

    return (
        <Section>
            <Link to={path}>
                <SectionHeader>
                    {icon} {title}
                </SectionHeader>
            </Link>
            <SectionContent>{renderMovies()}</SectionContent>
        </Section>
    );
};

export default HomePage;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    color: white;
    padding: 20px;
    width: 100%;
`;

const HomeHeader = styled.h1`
    font-size: 36px;
    margin-bottom: 20px;
    text-align: center;
    color: #ff9800;
`;

const Banner = styled.div`
    width: 75%;
    height: 250px;
    background: linear-gradient(to right, #ff9800, #f44336);
    background-size: 200% 200%;
    animation: gradientShift 6s ease infinite;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    border-radius: 10px;

    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

const BannerText = styled.h2`
    font-size: 28px;
    text-align: center;
    line-height: 1.5;
    animation: floatText 2.5s ease-in-out infinite;

    @keyframes floatText {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;

const BannerSubText = styled.p`
    font-size: 16px;
    margin-top: 10px;
    opacity: 0.8;
    text-align: center;
`;

const Section = styled.div`
    width: 100%;
    max-width: 1200px;
    margin-bottom: 40px;
`;

const SectionHeader = styled.h2`
    font-size: 28px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    color: #ff9800;
    cursor: pointer;
    svg {
        margin-right: 10px;
    }
`;

const SectionContent = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 10px;
    cursor: grab;

    &::-webkit-scrollbar {
        display: none;
    }

    &:active {
        cursor: grabbing;
    }

    /* Smooth scrolling */
    scroll-behavior: smooth;

    /* Each movie item will snap into place */
    & > * {
        scroll-snap-align: start;
    }
`;

const SearchPrompt = styled.div`
    margin-top: 40px;
    padding: 10px;
    background-color: #f44336;
    border-radius: 5px;
    width: 100%;
    max-width: 1200px;
    text-align: center;
`;

const SearchPromptText = styled.p`
    font-size: 18px;
    color: white;
    margin-bottom: 10px;

    a {
        color: #ff9800;
        text-decoration: underline;
        font-weight: bold;

        &:hover {
            color: white;
        }
    }
`;