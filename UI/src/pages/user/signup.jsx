import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { apiAxiosInstance } from "../../apis/user";

// 유효성 검사 스키마
const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email("올바른 이메일 형식이 아닙니다.")
        .required("이메일을 반드시 입력해주세요."),
    password: yup
        .string()
        .min(8, "비밀번호는 8자 이상이어야 합니다.")
        .max(16, "비밀번호는 16자 이하여야 합니다.")
        .required("비밀번호를 반드시 입력해주세요."),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호 확인을 입력해주세요."),
});

const SignupForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await apiAxiosInstance.post("/auth/register", {
                email: data.email,
                password: data.password,
                passwordCheck: data.confirmPassword,
            });
            navigate("/login"); // 회원가입 후 로그인 페이지로 이동
        } catch (error) {
            console.error(
                "회원가입 실패:",
                error.response ? error.response.data : error
            );
        }
    };

    return (
        <Container>
            <Header>회원가입</Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputWithError
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력하세요."
                    register={register("email")}
                    error={errors.email?.message}
                />
                <InputWithError
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    register={register("password")}
                    error={errors.password?.message}
                />
                <InputWithError
                    label="비밀번호 확인"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요."
                    register={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />
                <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "처리 중..." : "회원가입"}
                </SubmitButton>
            </Form>
        </Container>
    );
};

const InputWithError = ({ label, type, placeholder, register, error }) => (
    <FieldContainer>
        <InputField
            type={type}
            placeholder={placeholder}
            aria-label={label}
            {...register}
            hasError={!!error}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
    </FieldContainer>
);

export default SignupForm;

// 스타일 컴포넌트
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
    width: 100%;
`;

const FieldContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
`;

const InputField = styled.input`
    width: 18rem;
    height: 2.4rem;
    border-radius: 0.4rem;
    margin: 0.5rem 0;
    padding: 0.2rem 0.5rem;
    box-sizing: border-box;
    border: ${({ hasError }) => (hasError ? "1px solid red" : "1px solid #ccc")};
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 0.8rem;
`;

const SubmitButton = styled.button`
    width: 18rem;
    height: 2.4rem;
    border-radius: 0.4rem;
    margin-bottom: 0.5rem;
    padding: 0.2rem 0.5rem;
    box-sizing: border-box;
    background-color: ${({ disabled }) => (disabled ? "gray" : "rgb(255, 20, 147)")};
    color: white;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    &:hover {
        background-color: ${({ disabled }) => (disabled ? "gray" : "#67a8de")};
    }
`;