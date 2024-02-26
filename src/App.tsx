import React, { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { NewNote } from "./pages/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { NoteLst } from "./components/NoteList";
import { Home } from "./pages/Home";

type Note = {
  id: string;
} & NoteData;
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...notes,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes, tags]);

  function handleCreateNote({ tags, ...data }: NoteData) {
    setNotes((prev) => [
      ...prev,
      {
        ...data,
        id: uuidv4(),
        tagIds: tags.map((tag) => tag.id),
      },
    ]);
  }

  function handleAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<Home availableTags={tags}/>}></Route>
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={handleCreateNote}
              onAddTag={handleAddTag}
              availableTags={tags}
            />
          }
        ></Route>
        <Route path="/:id">
          <Route index element={<h1>show</h1>}></Route>
          <Route path="edit" element={<h1>edit note</h1>}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Container>
  );
}

export default App;
