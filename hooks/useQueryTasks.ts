import { Task } from "../types/types"
import { GraphQLClient } from "graphql-request"
import { GET_TASKS } from "../queries/queries"
import { useQuery } from "react-query"
import Cookies from "universal-cookie"
import { useEffect } from "react"

const cookie = new Cookies()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

interface TasksRes {
  tasks: Task[]
}

export const fetchTasks = async () => {
  const { tasks } = await graphQLClient.request<TasksRes>(GET_TASKS)
  return tasks
}

export const useQueryTasks = () => {
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    })
  }, [cookie.get("token")])
  return useQuery<Task[], Error>({
    queryKey: "tasks",
    queryFn: fetchTasks,
    staleTime: 0,
  })
}
