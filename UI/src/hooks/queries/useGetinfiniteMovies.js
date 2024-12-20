import { useInfiniteQuery } from "@tanstack/react-query";
import { useGetMovies } from "./useGetMovie";

function useGetInfiniteMovies(category) {
    return useInfiniteQuery({
        queryFn : ({pageParam = 1}) => useGetMovies({category, pageParam}),
        queryKey: ['movies', category],
        getNextPageParam: (lastPage) => {
            // const lastMovie = lastPage.results[lastPage.results.length - 1];
            const nextPage = lastPage.results.length > 0 ? lastPage.page + 1 : undefined;
            return nextPage;
        }
    })
}

export {useGetInfiniteMovies}