import { MemoData, Tag } from "./App";
import { MemoForm } from "./MemoForm";
import { useCustomizedMemo } from "./MemoLayout";

type EditMemoProps = {
  onSubmit: (id: string, data: MemoData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function EditMemo({onSubmit, onAddTag,availableTags }: EditMemoProps){
  const memo = useCustomizedMemo()
  return (
    <>
      <h1 className="mb-4">Edit Memo</h1>
      <MemoForm //title, markdwon, tags are the initial defualt data that is used and renderd automatically on the edit page
        title={memo.title}
        markdown= {memo.markdown}
        tags= {memo.tags}
        onSubmit={data => onSubmit(memo.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}/>
    </>
  )
}
