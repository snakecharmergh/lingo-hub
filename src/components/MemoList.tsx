import { useState, useEffect, useMemo } from "react";
import { Badge, Button, Card, Col, Form, FormControl, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
import styles from "./MemoList.module.css";
import axios from "axios";

// SimplifiedMemo is a simplified version of the memo without the markdown
type SimplifiedMemo = {
  tags: Tag[];
  title: string;
  id: string;
};

type MemoListProps = {
  availableTags: Tag[];
  memos: SimplifiedMemo[];
  OnUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  OnUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

export function MemoList({
  availableTags,
  memos,
  OnUpdateTag,
  onDeleteTag,
}: MemoListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  // States for grammar rules API call
  const [grammarRules, setGrammarRules] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch general German grammatical rules
  const fetchGrammarRules = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://api.languagetool.org/v2/check", {
        text: "Beispieltext",
        language: "de",
      });

      // Fetch and display the rules from the response
      const rules = response.data.matches.map((match: any) => match.message);
      setGrammarRules(rules);
    } catch (error) {
      console.error("Error fetching grammar rules:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch grammar rules when the component mounts
  useEffect(() => {
    fetchGrammarRules();
  }, []);

  const filteredMemos = useMemo(() => {
    return memos.filter((memo) => {
      return (
        (title === "" || memo.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            memo.tags.some((memoTag) => memoTag.id === tag.id)
          ))
      );
    });
  }, [title, memos, selectedTags]);

  return (
    <>
      <Row className="mb-4 ps-3">
        {/* Left column: Grammar rules list */}
        <Col xs={4}>
          <div className={styles.grammar}>
            <h4>Grammar Rules</h4>
            {loading ? (
              <p>Loading grammar rules...</p>
            ) : grammarRules.length > 0 ? (
              <ul>
                {grammarRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            ) : (
              <p>No grammar rules found.</p>
            )}
          </div>
        </Col>


        {/* Right column: Memos */}
        <Col>
          <Row className="align-items-center mb-4">
            <Col>
              <h1>Memos</h1>
            </Col>
            <Col xs="auto">
              <Stack gap={2} direction="horizontal">
                <Link to="/new">
                  <Button variant="info">Create</Button>
                </Link>
                <Button onClick={() => setEditTagsModalIsOpen(true)} variant="outline-warning">
                  Edit Tags
                </Button>
              </Stack>
            </Col>
          </Row>

          <Form>
            <Row className="mb-4">
              <Col>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <FormControl
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="tags">
                  <Form.Label>Tags</Form.Label>
                  <ReactSelect
                    value={selectedTags.map((tag) => ({ label: tag.label, value: tag.id }))}
                    options={availableTags.map((tag) => ({ label: tag.label, value: tag.id }))}
                    onChange={(tags) => {
                      setSelectedTags(tags.map((tag) => ({ label: tag.label, id: tag.value })));
                    }}
                    isMulti
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {filteredMemos.map((memo) => (
              <Col key={memo.id}>
                <MemoCard id={memo.id} title={memo.title} tags={memo.tags} />
              </Col>
            ))}
          </Row>

          <EditTagsModal
            availableTags={availableTags}
            show={editTagsModalIsOpen}
            handleClose={() => setEditTagsModalIsOpen(false)}
            OnUpdateTag={OnUpdateTag}
            onDeleteTag={onDeleteTag}
          />
        </Col>
      </Row>
    </>
  );
}

function MemoCard({ id, title, tags }: SimplifiedMemo) {
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function EditTagsModal({
  availableTags,
  show,
  handleClose,
  OnUpdateTag,
  onDeleteTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => OnUpdateTag(tag.id, e.target.value)}
                  />
                </Col>

                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
