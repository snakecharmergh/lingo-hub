import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NewMemo } from './NewMemo'
import { useLocalStorage } from './useLocalStorage'
import { useMemo } from 'react'
// import { useState } from 'react'

export type Memo= {
  id:string
} & MemoData

export type RawMemo= {
  id:string
} & RawMemoData

export type RawMemoData= {
  title: string
  body: string
  tagIds: string[]
}

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
  const[memos, setMemos]= useLocalStorage<RawMemo[]>('MEMOS', [])
  const[tags, setTags]= useLocalStorage<Tag[]>('TAGS', [])
  
  const memoswithTags = useMemo(() => {
    return memos.map(memo => {
      return {...memo, tags: tags.filter(tag => memo.tagIds.includes(tag.id ))}
    })
  }, [memos, tags])

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/new' element={<NewMemo />} />
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
