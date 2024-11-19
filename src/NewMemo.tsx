import { MemoData } from "./App";
import { MemoForm } from "./MemoForm";

type NewMemoProps = {
  onSubmit: (data: MemoData) => void
}

export function NewMemo({onSubmit}: NewMemoProps){
  return (
    <>
      <h1 className="mb-4">New Memo</h1>
      <MemoForm onSubmit={onSubmit} />
    </>
  )
}
