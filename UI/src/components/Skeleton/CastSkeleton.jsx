import styled from "styled-components";

const CastSkeleton = () => (
    <GridContainer>
        {Array.from({ length: 10 }).map((_, index) => (
            <PersonSkeleton key={index} />
        ))}
    </GridContainer>
);

export default CastSkeleton;

// 스타일 컴포넌트
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
`;

const PersonSkeleton = styled.div`
    width: 100px;
    height: 100px;
    background-color: #444;
    border-radius: 50%;
`;