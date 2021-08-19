import Cookies from "universal-cookie"
import { GraphQLClient } from "graphql-request"
import { useDispatch } from "react-redux"
import { useMutation, useQueryClient } from "react-query"
import { useEffect } from "react"
import {
  CREATE_NEWS,
  CREATE_TASK,
  DELETE_NEWS,
  DELETE_TASK,
  UPDATE_NEWS,
  UPDATE_TASK,
} from "../queries/queries"
import { EditNews, EditTask, News, Task } from "../types/types"
import { resetEditedNews, resetEditedTask } from "../slices/uiSlice"

const cookie = new Cookies()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useAppMutate = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    })
  }, [cookie.get("token")])

  const createTaskMutation = useMutation(
    (title: string) => graphQLClient.request(CREATE_TASK, { title }),
    {
      onSuccess: res => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks")
        if (previousTodos) {
          queryClient.setQueryData("tasks", [...previousTodos, res.insert_tasks_one])
        }
        dispatch(resetEditedTask())
      },
      onError: () => {
        dispatch(resetEditedTask())
      },
    }
  )

  const updateTaskMutation = useMutation(
    (task: EditTask) => graphQLClient.request(UPDATE_TASK, task),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks")
        if (previousTodos) {
          queryClient.setQueryData(
            "tasks",
            previousTodos.map(task => (task.id === variables.id ? res.update_tasks_by_pk : task))
          )
        }
        dispatch(resetEditedTask())
      },
      onError: () => {
        dispatch(resetEditedTask())
      },
    }
  )
  const deleteTaskMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_TASK, { id }),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks")
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            "tasks",
            previousTodos.filter(task => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )
  const createNewsMutation = useMutation(
    (content: string) => graphQLClient.request(CREATE_NEWS, { content }),
    {
      onSuccess: res => {
        const previousNews = queryClient.getQueryData<News[]>("news")
        if (previousNews) {
          queryClient.setQueryData("news", [...previousNews, res.insert_news_one])
        }
        dispatch(resetEditedNews())
      },
      onError: () => {
        dispatch(resetEditedNews())
      },
    }
  )

  const updateNewsMutation = useMutation(
    (news: EditNews) => graphQLClient.request(UPDATE_NEWS, news),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>("news")
        if (previousNews) {
          queryClient.setQueryData(
            "news",
            previousNews.map(news => (news.id === variables.id ? res.update_news_by_pk : news))
          )
        }
        dispatch(resetEditedNews())
      },
      onError: () => {
        dispatch(resetEditedNews())
      },
    }
  )
  const deleteNewsMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_NEWS, { id }),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>("news")
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            "news",
            previousNews.filter(news => news.id !== variables)
          )
        }
        dispatch(resetEditedNews())
      },
    }
  )
  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createNewsMutation,
    updateNewsMutation,
    deleteNewsMutation,
  }
}
