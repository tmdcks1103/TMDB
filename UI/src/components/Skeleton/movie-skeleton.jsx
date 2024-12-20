import * as S from './movie-skeleton.style'

const MovieSkeleton = () => {
    return(
        <S.Container>
            <S.MovieMain/>
            <S.TextWrapper>
                <S.TitleBox/>
            </S.TextWrapper>
        </S.Container>
    );
}

export default MovieSkeleton;