import styled from "styled-components";

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
    gap: 15px; /* input과 버튼 간 간격 추가 */

    input {
        width: 60%;
        padding: 12px 16px;
        border: 2px solid #ddd;
        border-radius: 8px ;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s;

        &:focus {
            border-color: #f82e62;
            box-shadow: 0 0 8px rgba(248, 46, 98, 0.3);
        }
    }

    button {
        width: 10%;
        padding: 12px 16px;
        background-color: #f82e62;
        color: white;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 8px;
        transition: background-color 0.3s, transform 0.2s;

        &:hover {
            background-color: #d82755;
            transform: scale(1.05);
        }

        &:active {
            background-color: #c02048;
            transform: scale(1);
        }
    }
`;

const MovieGridContainer = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 20px;
    margin-left: 100px;
`;

export { SearchContainer, MovieGridContainer }