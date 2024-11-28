import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useCustomizedMemo } from "./MemoLayout";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export function Memo() {
  const memo = useCustomizedMemo()

  return(
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{memo.title}</h1>
          {memo.tags.length > 0 &&
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {memo.tags.map(tag => (
                // text-truncate for the text not to overflow
                <Badge key={tag.id} className="text-truncate">{tag.label}</Badge>
              ))}
            </Stack>
          }
        </Col>

        <Col xs='auto'>
          <Stack gap={2} direction= 'horizontal'>
            <Link to= {`/${memo.id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button variant="outline-danger">Delete</Button>
            <Link to={"/"}>
              <Button variant="outline-secondary">Back</Button>
            </Link>

          </Stack>
        </Col>

      </Row>

      <ReactMarkdown>{memo.body}</ReactMarkdown>
    </>
  )
}
