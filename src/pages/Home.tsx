import { FormEvent, useRef, useState } from "react";
import { Button, Stack, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { NoteData, Tag } from "../App";

type HomeProps = {
  availableTags: Tag[];
};

export function Home(props: HomeProps) {
  const { availableTags } = props;

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  return (
    <>
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <h1>Notes</h1>
        <Stack direction="horizontal" gap={2}>
          <Link to="/new">
            <Button>Create</Button>
          </Link>
          <Button variant="outline-secondary">Edit Tags</Button>
        </Stack>
      </Stack>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                getOptionLabel={(option) => option.label}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}
