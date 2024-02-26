import { NoteData, Tag } from "../App";
import { NoteForm } from "../components/NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
};
export function NewNote(props: NewNoteProps) {
  const { onSubmit, onAddTag, availableTags } = props;

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
