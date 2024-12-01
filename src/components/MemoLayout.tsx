import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Memo } from "../App"

type MemoLayoutProps = {
  memos: Memo[]
}

export function MemoLayout ({memos}: MemoLayoutProps) {
  const {id} = useParams() //a hook from React router to get the memo id straight from the url
  const memo = memos.find(m => m.id === id)

  if (memo == null) return <Navigate to='/' replace /> // to navigate to homepage and replce the url othe non-existing id with the homepage url
  return <Outlet context= {memo}/> // outlet  react routes renders whatever inside the routes (either the edit or show page)
}

export function useCustomizedMemo() {
  return useOutletContext<Memo>()
}
