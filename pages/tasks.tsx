import React, { VFC } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useLogout } from "../hooks/useLogout"
import firebase from "../firebaseConfig"
import Layout from "../components/Layout"
import { ChevronDoubleLeftIcon, LogoutIcon } from "@heroicons/react/solid"
import NewsList from "../components/NewsList"
import NewsEdit from "../components/NewsEdit"
import TaskList from "../components/TaskList"
import TaskEdit from "../components/TaskEdit"

const Tasks: VFC = () => {
  const router = useRouter()
  const { logout } = useLogout()
  const user = firebase.auth().currentUser
  return (
    <Layout title="tasks">
      <p className="my-3">{user?.email}</p>
      <LogoutIcon
        className="h-5 w-5 my-3 text-blue-500 cursor-pointer"
        onClick={() => {
          logout()
          router.push("/")
        }}
      />
      <p className="mt-10 mb-5 text-blue-500 text-xl font-bold">News Edit</p>
      <div className="grid grid-cols-2 gap-40">
        <NewsList />
        <NewsEdit />
      </div>
      <p className="mt-20 mb-5 text-blue-500 text-xl font-bold">Tasks Edit</p>
      <div className="grid grid-cols-2 gap-40">
        <TaskList />
        <TaskEdit />
      </div>
      <Link href="/">
        <div className="mt-20 flex items-center cursor-pointer">
          <ChevronDoubleLeftIcon className="h-5 w-5 mx-1 text-blue-500" />
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  )
}

export default Tasks
