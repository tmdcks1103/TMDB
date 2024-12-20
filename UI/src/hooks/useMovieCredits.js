import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../apis/axios-instance';

const useMovieCredits = (movieId) => {
  return useQuery({
    queryKey: ['movieCredits', movieId],
    queryFn: async () => {
        const response = await axiosInstance.get(`/movie/${movieId}/credits?language=ko-KR`);
        console.log('Credits data:', response.data); // 데이터 확인용
        return response.data; // 데이터 구조가 creditsData.cast 및 creditsData.crew로 저장됨
    },
    enabled: !!movieId,
  });
};

export default useMovieCredits;