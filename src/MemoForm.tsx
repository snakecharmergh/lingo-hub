import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from 'react-select/creatable'
import { MemoData, Tag } from "./App";
import { v4 as uuidV4 } from 'uuid'


type MemoFormProps= {
  onSubmit: (data: MemoData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<MemoData> // use partial to pass all the memo data but noe is required and all are optional since we need them only for the EditMemo but not for the NewMemo

export function MemoForm({onSubmit, onAddTag, availableTags, title= "", markdown= "", tags=[]}: MemoFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags]= useState<Tag[]>(tags) //to store our tags
  const navigate = useNavigate( )

  function handleSubmit(e:FormEvent) {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    //to navigate to the previous page once clicking the save button
    navigate('..')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect // allows to create tags
                onCreateOption= {label => {
                  const newTag = {id: uuidV4(), label}
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag ])
                }}
                // creatableReactSelect expects for its value: a label and an id
                value={selectedTags.map(tag => {
                  return {label:tag.label, value: tag.id}
                })}
                //set the options for onCreateOption of tags
                options= {availableTags.map(tag => {
                  return {label: tag.label, value: tag.id  }
                })}
                // to convert from the value that creatbleReactSelect expects to the value we are storing for our type(Tag= id and label)
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return {label: tag.label, id: tag.value}
                    })
                  )
                }}
              isMulti/>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control defaultValue={markdown} required as='textarea' ref= {markdownRef} rows={20}/>
        </Form.Group>

        <Stack direction="horizontal" className="justify-content-end" gap={3}>
          <Button type="submit" variant="primary">Save</Button>
          <Link to='..'>
            <Button type="button" variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>

      </Stack>
    </Form>
  )
}
