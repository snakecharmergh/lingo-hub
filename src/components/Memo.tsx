import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useCustomizedMemo } from "./MemoLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import styles from './Memo.module.css';

type MemoProps = {
  onDeleteMemo: (id: string) => void
}

export function Memo( {onDeleteMemo}: MemoProps) {
  const memo = useCustomizedMemo()
  const navigate = useNavigate() // custom react hook

  return(
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{memo.title}</h1>
          {memo.tags.length > 0 &&
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {memo.tags.map(tag => (
                // text-truncate for the text not to overflow
                <Badge key={tag.id} style={{ fontSize: '1.01rem', padding: '10px', margin: '5px' }} className="text-truncate">{tag.label}</Badge>
              ))}
            </Stack>
          }
        </Col>

        <Col xs='auto'>
          <Stack gap={2} direction= 'horizontal'>
            <Link to= {`/${memo.id}/edit`}>
              <Button variant='info'>Edit</Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => {
                onDeleteMemo(memo.id)
                navigate("/")}}>Delete</Button>
            <Link to={"/"}>
              <Button variant="outline-warning">Home</Button>
            </Link>

          </Stack>
        </Col>

      </Row>

      <ReactMarkdown className={styles.markdown}>{memo.markdown}</ReactMarkdown>
    </>
  )
}
