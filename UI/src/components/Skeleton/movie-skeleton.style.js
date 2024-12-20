import styled, {keyframes} from "styled-components";

const skeleton = keyframes`
    0% {
        opacity: 1;
        background: rgb(50, 50, 50);
    };
    30% {
        opacity: 0.2;
        background: rgb(70, 70, 70);
    };
    50% {
        opacity: 0.4;
        background: rgb(100, 100, 100);
    };  
    80% {
        opacity: 0.8;
        background: rgb(70, 70, 70);
    };
    100% {
        opacity: 1;
        background: rgb(50, 50, 50);
    };
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const MovieMain = styled.div`
    width: 160px;
    height: 240px;
    background: rgb(70, 70, 70);
    border-rarius: 10px;
    overflow: hidden;
    animation: ${skeleton} 1.5s infinte linear alternate;
`;

const TextWrapper = styled.div`
    width: 160px;
    height: 60px;
    display: flex;
    flex-direction: column;
    margin-top: 5px;

`;

const TitleBox = styled.div`
    background: rgb(70, 70, 70);
    width: 160px;
    height: 20px;
    border-rarius: 10px;
    animation: ${skeleton} 1.5s infinte linear alternate;
`;

export { Container, MovieMain, TextWrapper, TitleBox }