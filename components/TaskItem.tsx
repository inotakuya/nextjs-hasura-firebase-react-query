import React, { memo, VFC } from "react"
import { Task } from "../types/types"
import { useDispatch } from "react-redux"
import { useAppMutate } from "../hooks/useAppMutate"
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"
import { setEditedTask } from "../slices/uiSlice"

interface Props {
  task: Task
}

const TaskItem: VFC<Props> = ({ task }) => {
  const dispatch = useDispatch()
  const { deleteTaskMutation } = useAppMutate()
  if (deleteTaskMutation.isLoading) {
    return <p>Deleting...</p>
  }
  if (deleteTaskMutation.isError) {
    return <p>Error</p>
  }
  return (
    <li className="my-3">
      <span className="font-bold">{task.title}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => dispatch(setEditedTask({ id: task.id, title: task.title }))}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => deleteTaskMutation.mutate(task.id)}
        />
      </div>
    </li>
  )
}

export default memo(TaskItem)
