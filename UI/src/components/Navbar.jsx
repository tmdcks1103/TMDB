import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAxiosInstance } from "../apis/user"; // 변경된 axios 인스턴스 가져오기
import { useQuery } from "@tanstack/react-query";

// const Navbar = () => {
//     const navigate = useNavigate();
//     const [nickname, setNickname] = useState(null);

//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             const accessToken = localStorage.getItem('accessToken');
//             if (accessToken) {
//                 try {
//                     const api = getAxiosInstance(accessToken); // 토큰을 가진 axios 인스턴스 생성
//                     const response = await api.get("/user/me"); // 변경된 API 호출
//                     const email = response.data.email;
//                     setNickname(email.split('@')[0]);
//                 } catch (error) {
//                     console.error("유저 정보 불러오기 실패:", error);
//                 }
//             }
//         };
//         fetchUserInfo();
//     }, [nickname]);

//     const handleLogout = () => {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         setNickname(null);
//         navigate('/');
//     };

//     return (
//         <nav>
//             <NavbarContainer>
//                 <Logo to='/'>
//                     YONGCHA
//                 </Logo>
//                 <Buttons>
//                     {nickname ? (
//                         <>
//                             <WelcomeMessage>{nickname}님 반갑습니다</WelcomeMessage>
//                             <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
//                         </>
//                     ) : (
//                         <>
//                             <Login to='/login'>로그인</Login>
//                             <Signup to='/signup'>회원가입</Signup>
//                         </>
//                     )}
//                 </Buttons>
//             </NavbarContainer>
//         </nav>
//     );
// };

// export default Navbar;

const Navbar = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken'); // accessToken을 가져옵니다.

    // useQuery로 유저 정보를 fetch합니다.
    const { data, isLoading, isError } = useQuery({
        queryKey: ["userInfo", accessToken], // 쿼리 키에 accessToken을 포함시켜 유효한 토큰에 맞는 데이터를 가져옵니다.
        queryFn: async () => {
            if (accessToken) {
                const api = getAxiosInstance(accessToken);
                const response = await api.get("/user/me"); // 유저 정보를 가져옵니다.
                return response.data;
            }
            return null; // accessToken이 없으면 null 반환
        },
        enabled: !!accessToken, // accessToken이 있을 때만 쿼리가 실행되도록 설정합니다.
    });

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/'); // 로그아웃 후 홈 페이지로 리다이렉트
    };

    return (
        <nav>
            <NavbarContainer>
                <Logo to='/'>YONGCHA</Logo>
                <Buttons>
                    {isLoading ? (
                        <span>로딩 중...</span> // 로딩 중 표시
                    ) : isError || !data ? (
                        <>
                            <Login to='/login'>로그인</Login>
                            <Signup to='/signup'>회원가입</Signup>
                        </>
                    ) : (
                        <>
                            <WelcomeMessage>{data.email.split('@')[0]}님 반갑습니다</WelcomeMessage>
                            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                        </>
                    )}
                </Buttons>
            </NavbarContainer>
        </nav>
    );
};

export default Navbar;

const NavbarContainer = styled.nav`
    display: flex;
    padding: 30px;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgb(30, 30, 30);
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #f06292;
  text-decoration: none;
  transition: transform 0.5s ease, color 0.3s ease, box-shadow 0.5s ease;

  &:hover {
    color: #ff4081;
    transform: scale(1.3) rotate(5deg);
    box-shadow: 0px 4px 15px rgba(255, 64, 129, 0.7);
  }
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
`;

const Login = styled(Link)`
    padding: 7px 10px;
    border-radius: 5px;
    background-color: #f06292;
    transition: transform 0.2s;
    &:hover {
      background-color: #e91e63;
      transform: scale(1.05);
    }
    margin-right: 10px;
    color:white;
    text-decoration: none;
`;

const Signup = styled(Link)`
    padding: 7px 10px;
    border-radius: 5px;
    background-color: #f06292;
    transition: transform 0.2s;
    &:hover {
      background-color: #45a049;
      transform: scale(1.05);
    }
    margin-left: 10px;
    color: white;
    text-decoration: none;
`;

const WelcomeMessage = styled.span`
    color: #333;
    font-size: 1.2rem;
    margin-right: 15px;
`;

const LogoutButton = styled.button`
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ff1a1a;
    }
`;