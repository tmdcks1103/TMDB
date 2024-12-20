import styled from "styled-components";

const MovieDetailSkeleton = () => (
    <SkeletonContainer>
        <BackdropSkeleton />
        <OverlaySkeleton>
            <TitleSkeleton />
            <InfoSkeleton />
            <InfoSkeleton />
            <OverviewSkeleton />
        </OverlaySkeleton>
    </SkeletonContainer>
);

export default MovieDetailSkeleton;

// 스타일 컴포넌트
const SkeletonContainer = styled.div`
    background-color: black;
    padding: 20px;
`;

const BackdropSkeleton = styled.div`
    width: 100%;
    height: 300px;
    background-color: #444;
    border-radius: 10px;
`;

const OverlaySkeleton = styled.div`
    margin-top: 20px;
`;

const TitleSkeleton = styled.div`
    width: 50%;
    height: 32px;
    background-color: #555;
    margin: 10px 0;
    border-radius: 5px;
`;

const InfoSkeleton = styled.div`
    width: 30%;
    height: 18px;
    background-color: #666;
    margin: 5px 0;
    border-radius: 5px;
`;

const OverviewSkeleton = styled.div`
    width: 80%;
    height: 100px;
    background-color: #666;
    margin-top: 15px;
    border-radius: 10px;
`;