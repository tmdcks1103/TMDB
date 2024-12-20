import styled from "styled-components";
import { FaFilm, FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarItem>
                <FaSearch/>
                <SearchLink to='/search'>
                    찾기
                </SearchLink>
            </SidebarItem>
            <SidebarItem>
            <FaFilm />
                <MovieLink to='/movies'>
                    영화
                </MovieLink>
            </SidebarItem>
        </SidebarContainer>
    );
}

export default Sidebar;

const SidebarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    background-color: rgb(30, 30, 30);
    color: white;
    padding: 10px 30px;
    width: 10%;
`;

const SidebarItem = styled.div`
    color: white; 
    text-decoration: none; /* 밑줄 제거 */
    margin: 10px 0; 
    transition: transform 0.2s;
    font-weight: bold;

    &:hover {
        transform: scale(1.20);
    }

    &:active {
        color: white;
    }
`

const SearchLink = styled(Link)`
    color: white;
    margin-left: 10px;
    text-decoration: none;
`;

const MovieLink=styled(Link)`
    color:white;
    text-decoration: none;
    margin-left: 10px;
`