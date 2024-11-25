import { MemoData, Tag } from "./App";
import { MemoForm } from "./MemoForm";

type NewMemoProps = {
  onSubmit: (data: MemoData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NewMemo({onSubmit, onAddTag,availableTags }: NewMemoProps){
  return (
    <>
      <h1 className="mb-4">New Memo</h1>
      <MemoForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}
