import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: black;
`;

const MoviesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
    padding: 10px 20px;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    & > div {
        animation: fadeIn 0.5s ease-in-out forwards;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export {Container, MoviesContainer}