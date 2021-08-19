import Cookies from "universal-cookie"
import { unSubMeta } from "./useUserChanged"
import firebase from "../firebaseConfig"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { resetEditedNews, resetEditedTask } from "../slices/uiSlice"

const cookie = new Cookies()

export const useLogout = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const logout = async () => {
    if (unSubMeta) {
      unSubMeta()
    }
    await firebase.auth().signOut()
    queryClient.removeQueries("tasks")
    queryClient.removeQueries("news")
    dispatch(resetEditedTask())
    dispatch(resetEditedNews())
    cookie.remove("token")
  }
  return { logout }
}
