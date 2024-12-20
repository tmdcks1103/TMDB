import React from "react";
import styled from "styled-components";

const Pagination = ({ page, setPage, totalPages, isPreviousData }) => {
    //이전 페이지로 이동하는 함수
    const handlePrevPage = () => {
        if (page > 1) { //첫 페이지보다 클 때만 감소
            setPage(page - 1);
        }
    };
    //다음 페이지로 이동하는 함수 
    const handleNextPage = () => {
        if (page < totalPages) { // 마지막 페이지보다 작을 때만 페이지 증가
            setPage(page + 1);
        }
    };

    return (
        <PaginationContainer>
            {/* 이전 페이지 버튼 */}
            <PrevButton 
                onClick={handlePrevPage}
                disabled={isPreviousData || page <= 1}
            >
                이전
            </PrevButton>

            {/* 현재 페이지 번호 표시 */}
            <PageNumber>{page} / {totalPages}</PageNumber>

            {/* 다음 페이지 버튼 */}
            <NextButton 
                onClick={handleNextPage}
                disabled={isPreviousData || page >= totalPages}
            >
                다음
            </NextButton>
        </PaginationContainer>
    );
};

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

// 이전 페이지 버튼 스타일
const PrevButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    background-color: #f06292;  /* 이전 버튼 배경색 (녹색) */
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;  /* 둥근 모서리 추가 */
    transition: background-color 0.3s ease, transform 0.2s ease;  /* 배경색 및 크기 변화 애니메이션 */

    &:hover:not(:disabled) {
        background-color: #45A049;  /* 이전 버튼 호버 시 색상 */
        transform: scale(1.05);  /* 호버 시 버튼 살짝 확대 */
    }

    &:disabled {
        background-color: #888;
        cursor: not-allowed;
    }
`;

// 다음 페이지 버튼 스타일
const NextButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    background-color: #f06292;  /* 다음 버튼 배경색 (파란색) */
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;  /* 둥근 모서리 추가 */
    transition: background-color 0.3s ease, transform 0.2s ease;  /* 배경색 및 크기 변화 애니메이션 */

    &:hover:not(:disabled) {
        background-color: #1E88E5;  /* 다음 버튼 호버 시 색상 */
        transform: scale(1.05);  /* 호버 시 버튼 살짝 확대 */
    }

    &:disabled {
        background-color: #888;
        cursor: not-allowed;
    }
`;

const PageNumber = styled.div`
    color: #fff;
    font-size: 16px;
`;

export default Pagination;