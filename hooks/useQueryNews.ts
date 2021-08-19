import { News } from "../types/types"
import request from "graphql-request"
import { GET_NEWS } from "../queries/queries"
import { useQuery } from "react-query"

interface NewsRes {
  news: News[]
}

export const fetchNews = async () => {
  const { news } = await request<NewsRes>(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, GET_NEWS)
  return news
}

export const useQueryNews = () => {
  return useQuery<News[], Error>({
    queryKey: "news",
    queryFn: fetchNews,
    staleTime: Infinity,
  })
}
