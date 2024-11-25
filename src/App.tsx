import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NewMemo } from './NewMemo'
import { useLocalStorage } from './useLocalStorage'
import { useMemo } from 'react'
import { v4 as uuidV4 } from 'uuid'

// we create the types RawMemo & RawMemoData to store the ids of the tags of each memo>>>propgate the change only on the Tags updated of that certain ids rather than of the whole memo
export type RawMemo= {
  id:string
} & RawMemoData

export type RawMemoData= {
  title: string
  body: string
  tagIds: string[]
}

export type Memo= {
  id:string
} & MemoData

export type MemoData= {
  title: string
  body: string
  tags: Tag[]
}

export type Tag={
  id: string
  label: string
}


function App() {
  //to store data, we use LocalStorage rather than useState to keep our data persisted
  const[memos, setMemos]= useLocalStorage<RawMemo[]>('MEMOS', []) // the data would be stored under the name=label MEMOS &&& we r storing the RawMemo=== the memoID rather than the memo itself
  const[tags, setTags]= useLocalStorage<Tag[]>('TAGS', [])// the data would be stored under the name=label  TAGS

  //to convert the rawMemo (that only has an id) and store it into actual memo (with all the data)
  const memosWithTags = useMemo(() => {
    return memos.map(memo => {
      return {...memo, tags: tags.filter(tag => memo.tagIds.includes(tag.id ))}
    })
  }, [memos, tags]) // to run this only once our memos or tags are updated

  //create a function to handle the creation of a memo
  //uuidv4 allows to create a unique string-based id
  function onCreateMemo({tags, ...data}: MemoData) {
    setMemos(prevMemos => {
      return [...prevMemos, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)},]
    })
  }

  function addTag(tag: Tag ) {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/new' element={<NewMemo onSubmit={onCreateMemo} onAddTag={addTag} availableTags= {tags}/>} />
        <Route path='/:id'>
          <Route index element={<h1>Show</h1>} />
          <Route path='edit' element={<h1>Edit</h1>} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
