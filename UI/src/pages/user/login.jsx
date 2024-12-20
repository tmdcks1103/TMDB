import styled from "styled-components";
import { validateLogin } from "../../utils/validtate";
import useForm from "../../hooks/useForm";
import { useNavigate } from 'react-router-dom';
import { apiAxiosInstance } from "../../apis/user"; // axios 인스턴스 가져오기
import { useState } from 'react';

const SignInPage = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState(null); // 서버 에러 상태 관리
    const form = useForm({
        initialValues: {
            userEmail: '',
            userPassword: ''
        },
        validate: validateLogin
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setServerError(null); // 기존 에러 초기화
        try {
            const response = await apiAxiosInstance.post('/auth/login', {
                email: form.values.userEmail,
                password: form.values.userPassword
            });
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            const errorMessage = error.response?.data?.message || "로그인에 실패했습니다. 다시 시도해주세요.";
            setServerError(errorMessage);
            console.error("로그인 실패:", error);
        }
    };

    const isSubmitDisabled = !!(form.errors.userEmail || form.errors.userPassword);

    return (
        <Container>
            <Header>로그인</Header>
            <Form onSubmit={handleLogin}>
                <InputField
                    hasError={form.touched.userEmail && form.errors.userEmail}
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    {...form.getTextInputProps("userEmail")}
                />
                {form.touched.userEmail && form.errors.userEmail && (
                    <ErrorMessage>{form.errors.userEmail}</ErrorMessage>
                )}

                <InputField
                    hasError={form.touched.userPassword && form.errors.userPassword}
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                    {...form.getTextInputProps("userPassword")}
                />
                {form.touched.userPassword && form.errors.userPassword && (
                    <ErrorMessage>{form.errors.userPassword}</ErrorMessage>
                )}

                {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

                <SubmitButton type="submit" disabled={isSubmitDisabled}>
                    로그인
                </SubmitButton>
            </Form>
        </Container>
    );
};

export default SignInPage;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8rem;
    font-size: 1.5rem;
    width: 100%;
`;

const Header = styled.div`
    color: white;
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputField = styled.input`
    width: 18rem;
    height: 2.4rem;
    border-radius: 0.4rem;
    margin: 0.5rem 0;
    padding: 0.2rem 0.5rem;
    box-sizing: border-box; 
    border: ${props => (props.hasError ? "1px solid red" : "1px solid #ccc")};
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.8rem;
    margin: 0;
`;

const SubmitButton = styled.button`
    width: 18rem;
    height: 2.4rem;
    border-radius: 0.4rem;
    margin-top: 1rem;
    background-color: ${props => (props.disabled ? "gray" : "rgb(255, 20, 147)")};
    color: white;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => (props.disabled ? "gray" : "#67a8de")};
    }
`;