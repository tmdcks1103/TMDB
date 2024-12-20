
import styled from "styled-components";
import Lottie from "lottie-react";
import ErrorLottie from "../Animation/Animation - 1731509687429.json"

const NotFound = () => {
    return (
        <ErrorWrapper>
            {/* 에러 애니메이션~ */}
            <Lottie animationData={ErrorLottie} style={{ width: '150px', height: '150px' }} />
            <ErrorText>에러 발생: {error.message}</ErrorText>
        </ErrorWrapper>
    );
};

export default NotFound;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const ErrorText = styled.p`
  text-align: center;
  color: red;
  font-size: 1.2rem;
  margin-top: 10px;
`;