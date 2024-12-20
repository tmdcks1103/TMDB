import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Movie = ({ movie }) => {
    const navigate = useNavigate();
    return (
        <MovieContainer onClick={() => navigate(`/movies/${movie.id}`, {
            replace: false,
            state: { movie }
        })}>
            <ImageWrapper>
                <Image src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
            </ImageWrapper>
            <Title>{movie.title}</Title>
            <Date>{movie.date}</Date>
        </MovieContainer>
    );
}

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

const ImageWrapper = styled.div`
    width: 160px;
    height: 240px;
    perspective: 1000px; /* 3D 회전 효과를 위한 원근감을 추가 */
    margin-bottom: 10px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 5%;
    object-fit: cover;
    transition: transform 0.6s ease; /* 회전 애니메이션 */
    transform-style: preserve-3d; /* 3D 효과 적용 */
    
    &:hover {
        transform: rotateY(180deg); /* 이미지가 Y축을 기준으로 180도 회전 */
    }
`;

const Title = styled.div`
    font-size: 20px;
    margin-top: 10px;
    color: white;
`;

const Date = styled.div`
    font-size: 15px;
    color: white;
`;

export default Movie;