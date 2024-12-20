import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Sidebar from "../components/sidebar";

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <Row>
                <Sidebar />
                    <Outlet />
            </Row>
        </>
    );
};

export default RootLayout;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    min-height: 100vh;
`;