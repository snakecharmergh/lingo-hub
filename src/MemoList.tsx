import { useMemo, useState } from "react";
import { Badge, Button, Card, CardBody, Col, Form, FormControl, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import styles from "./MemoList.module.css";

//SimplifiedMemo is a simplified version of the memo without the markdowm
type SimplifiedMemo = {
  tags: Tag[]
  title:string
  id: string
}

type MemoListProps = {
  availableTags: Tag[]
  memos: SimplifiedMemo[]
}

export function MemoList({availableTags, memos}: MemoListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')

  const filteredMemos= useMemo(() => {
    return memos.filter(memo => {
      return (title === '' || memo.title.toLowerCase().includes(title.toLowerCase()))
      && (selectedTags.length === 0 || selectedTags.every(tag => memo.tags.some(memoTag => memoTag.id === tag.id))) //if the tags donot exist, then do nothing, otherwise loop though all the tags and check that 'every' one of them exist (for the user to norrow down the search when filtering through the tags)
    })
  }, [title, memos, selectedTags])// useMemo updates each time we update the title, selctzed tags or the memo itself

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col><h1>Memos</h1></Col>
        <Col xs='auto'>
          <Stack gap={2} direction= 'horizontal'>
            <Link to='/new'>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <FormControl type='text' value= {title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                // ReactSelect expects for its value: a label and an id
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
      </Form>

      <Row xs={1} s={2} lg={3} xl={4} className="g-3">
        {filteredMemos.map(memo => (
          <Col key={memo.id}>
            <MemoCard id={memo.id} title={memo.title} tags={memo.tags}/>
          </Col>
        ))}
      </Row>
    </>
    )
}

function MemoCard({id, title, tags}: SimplifiedMemo) {
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          {/* fs= font size */}
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
              {tags.map(tag => (
                // text-truncate for the text not to overflow
                <Badge key={tag.id} className="text-truncate">{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}
