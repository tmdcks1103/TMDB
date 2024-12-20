import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Person from "../components/Person";
import useMovieCredits from "../hooks/useMovieCredits";
import MovieDetailSkeleton from "../components/Skeleton/MovieDetailSkeleton";
import CastSkeleton from "../components/Skeleton/CastSkeleton";

// 상세 정보 표시 컴포넌트
const MovieDetail = ({ movie }) => (
  <Backdrop>
    <img
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      alt={`${movie.title} backdrop`}
    />
    <Overlay>
      <Title>{movie.title}</Title>
      <MovieInfo>
        <Rating>평점: {movie.vote_average}</Rating>
        <ReleaseDate>개봉일: {movie.release_date}</ReleaseDate>
        <Overview>{movie.overview}</Overview>
      </MovieInfo>
    </Overlay>
  </Backdrop>
);

// 출연진과 제작진을 위한 공통 섹션 컴포넌트
const CastSection = ({ title, people }) => (
  <section>
    <SectionTitle>{title}</SectionTitle>
    <PeopleGrid>
      {people?.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </PeopleGrid>
  </section>
);

const MovieDetailPage = () => {
  const { state } = useLocation();
  const movie = state?.movie; // URL에서 전달된 movie 데이터
  const { data: creditsData, isLoading, isError } = useMovieCredits(movie?.id);

  // 로딩 상태
  if (isLoading) {
    return (
      <Container>
        <MovieDetailSkeleton />
        <CastSkeleton />
      </Container>
    );
  }

  // 에러 상태
  if (isError) {
    return <Message>에러가 발생했습니다!</Message>;
  }

  return (
    <Container>
      {movie && <MovieDetail movie={movie} />}
      <CastSection title="출연진" people={creditsData?.cast} />
      <CastSection title="제작진" people={creditsData?.crew} />
    </Container>
  );
};

export default MovieDetailPage;

// 스타일 컴포넌트
const Container = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
`;

const Backdrop = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%; /* Overlay의 너비를 고정 */
  max-width: 800px; /* 최대 너비 설정 */
  color: white;
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
`;

const MovieInfo = styled.div`
  margin-top: 10px;
`;

const Rating = styled.div`
  font-size: 18px;
`;

const ReleaseDate = styled.div`
  font-size: 18px;
  margin: 5px 0;
`;

const Overview = styled.div`
  margin-top: 15px;
  font-size: 1rem;
  max-width: 100%; /* Overlay의 너비에 맞춤 */
  max-height: 150px; /* 텍스트가 Overlay를 넘어가지 않도록 높이 제한 */
  overflow: hidden; /* 넘치는 내용 숨김 */
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 ... 표시 */
  display: -webkit-box; /* 줄바꿈 효과를 위한 Flex 박스 */
  -webkit-line-clamp: 5; /* 최대 5줄로 제한 */
  -webkit-box-orient: vertical; /* Flex 박스 방향 설정 */
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)); 
  padding: 20px;
  border-radius: 12px;
  color: #f5f5f5;
  line-height: 1.6;
  backdrop-filter: blur(6px);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01);
  }
`;

const SectionTitle = styled.h2`
  margin-top: 20px;
`;

const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
`;

const Message = styled.div`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;