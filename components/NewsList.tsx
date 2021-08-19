import React, { memo, VFC } from "react"
import { useQueryNews } from "../hooks/useQueryNews"
import NewsItem from "./NewsItem"

const NewsList: VFC = () => {
  const { data, isLoading, isError } = useQueryNews()
  if (isLoading) return <div>{"Loading..."}</div>
  if (isError) return <div>{"Error"}</div>
  return (
    <ul>
      {data?.map(news => (
        <NewsItem key={news.id} news={news} />
      ))}
    </ul>
  )
}

export default memo(NewsList)
