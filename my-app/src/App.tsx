import './App.css';
import React, { useEffect, useState } from 'react';

import { Label, Note } from './types';
import { dummyNotesList } from './constant';

import { ThemeContext, themes } from './ThemeContext';

function NoteBlock(props: any): JSX.Element {

  const [favorite, setFavorite] = useState(false);

  let favoriteIcon = favorite ? "♥" : "♡";

  useEffect(() => {
    favoriteIcon = favorite ? "♥" : "♡";
  }, [favorite]);

  const theme = React.useContext(ThemeContext);

  return (
    <div
      key={props.note.id}
      className="note-item"
      style={{
        background: theme.note_item.background,
        color: theme.note_item.color,
      }}
    >
      <div className="notes-header">
        <button onClick={() => {
          setFavorite(!favorite);
          if (!favorite) {
            props.setFavoriteList(props.favoriteList.concat(props.note));
          } else {
            props.setFavoriteList(props.favoriteList.filter((favoriteNote: any) => favoriteNote.id !== props.note.id));
          }
        }}>
          {favoriteIcon}</button>
        <button onClick={() => {
          props.setNotes(props.notes.filter((note: any) => note.id !== props.note.id));
        }}>x</button>
      </div>
      <h2 contentEditable="true" 
      onInput={(event) => props.setSelectedNote({...props.selectedNote, title: event.currentTarget.textContent})}> 
        {props.note.title} 
      </h2>
      <p contentEditable="true"
      onInput={(event) => props.setSelectedNote({...props.selectedNote, content: event.currentTarget.textContent})}> 
        {props.note.content} </p>
      <p contentEditable="true" 
      onInput={(event) => props.setSelectedNote({...props.selectedNote, label: event.currentTarget.textContent})}> 
        {props. note.label} </p>
    </div>
  );
}

function createNoteHandler(event: React.FormEvent, notes: Note[], 
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>, 
  createNote: any, setCreateNote: any) {

  event.preventDefault();
  const newNote = {
    id: notes.length + 1,
    title: createNote.title,
    content: createNote.content,
    label: createNote.label,
  };
  setNotes(notes.concat(newNote));
  setCreateNote({
    id: -1,
    title: "",
    content: "",
    label: "",
  });
  
}


function StickyNote() {

  const [notes, setNotes] = useState<Note[]>(dummyNotesList);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: "",
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [favoriteList, setFavoriteList] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState(initialNote);

  const theme = React.useContext(ThemeContext);

  return (
    <div className='app-container'
      style={{
        background: theme.background,
        color: theme.foreground,
      }}
    >
      <form className="note-form" onSubmit={(event)=>createNoteHandler(event, notes, setNotes, createNote, setCreateNote)}>
        <div><input
          placeholder="Note Title"
          onChange={(event) =>
            setCreateNote({ ...createNote, title: event.target.value })}
          required>
        </input>
        </div>

        <div><textarea onChange={(event) =>
          setCreateNote({ ...createNote, content: event.target.value })}
          required>
        </textarea></div>

        <div>
          <select
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value })}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>


        <div><button type="submit">Create Note</button></div>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteBlock note={note} favoriteList={favoriteList} setFavoriteList={setFavoriteList} 
          selectedNote={selectedNote} setSelectedNote={setSelectedNote} notes={notes} setNotes={setNotes}/>
        ))}
      </div>
      <div className="favorite-list">
        <h3>List of favorites:</h3>
        {favoriteList.map((note) => (
          <p>{note.title}</p>
        ))}
      </div>
    </div>

  );
}

function App() {

  const [currentTheme, setTheme] = useState(themes.light);

  const onToggle = () => {
    setTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.foreground;
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <StickyNote />
      <button onClick={onToggle}> Toggle Theme </button>
    </ThemeContext.Provider>
  );

}

export default App;

