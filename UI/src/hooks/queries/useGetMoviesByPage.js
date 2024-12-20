import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";

// 페이지와 카테고리를 기반으로 데이터를 받아오는 함수
const fetchMoviesByPage = async ({ category, page }) => {
    const { data } = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${page}`);
    console.log("영화 데이터 로드 중...");
    return data;// API 응답 데이터 반환 
};

// 페이지네이션을 위한 데이터 페칭 훅
function useGetMoviesByPage(category, page) {
    return useQuery({
        queryKey: ["movies", category, page], // 쿼리키
        queryFn: () => fetchMoviesByPage({ category, page }),
        keepPreviousData: true, // 이전 데이터를 유지하여 페이지 전환이 부드럽게
        //새로운 데이터를 요청중일때 기존 데이터를 그대로 유지할 수 있음.
    });
}

export { useGetMoviesByPage };