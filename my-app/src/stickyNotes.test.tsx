import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });

    test("check if all notes are displayed", () => {

        render(<StickyNotes />);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        const createNote = (title: string, content: string) => {
            fireEvent.change(createNoteTitleInput, { target: { value: title } });
            fireEvent.change(createNoteContentTextarea, {
                target: { value: content },
            });
            fireEvent.click(createNoteButton);
        };

        const checkNote = (title: string, content: string) => {
            
            createNote(title, content);
            const newNoteTitle = screen.getByText(title);
            const newNoteContent = screen.getByText(content);

            expect(newNoteTitle).toBeInTheDocument();
            expect(newNoteContent).toBeInTheDocument();

        };

        checkNote("Note 1", "Note 1 content");
        checkNote("Note 2", "Note 2 content");
        checkNote("Note 3", "Note 3 content");
        checkNote("Note 4", "Note 4 content");

    });
});

describe("Update StickyNote", () => {
    test("update a note and check if it is displayed", () => {
        render(<StickyNotes />);    

        const testNoteTitle = screen.getByText("test note 1 title");
        const testNoteContent = screen.getByText("test note 1 content");
        const testNoteLabel = screen.getByText("other");

        fireEvent.change(testNoteTitle, { target: { innerHTML: "Updated Note" } });
        fireEvent.change(testNoteContent, { target: { innerHTML: "Updated content" } });
        fireEvent.change(testNoteLabel, { target: { innerHTML: "updated" } });

        const updatedNoteTitle = screen.getByText("Updated Note");
        const updatedNoteContent = screen.getByText("Updated content");
        const updatedNoteLabel = screen.getByText("updated");

        expect(updatedNoteTitle).toBeInTheDocument();
        expect(updatedNoteContent).toBeInTheDocument();
        expect(updatedNoteLabel).toBeInTheDocument();

    });
});

describe("Delete StickyNote", () => {

    test("delete the first note and check if it is removed", () => {
        render(<StickyNotes />);

        const deleteNoteButton = screen.getAllByText("x", { selector: "button" })[0];
        
        fireEvent.click(deleteNoteButton);

        const deletedNoteTitle = screen.queryByText("test note 1 title");
        const deletedNoteContent = screen.queryByText("test note 1 content");
        const deletedNoteLabel = screen.queryByText("other");

        expect(deletedNoteTitle).toBeNull();
        expect(deletedNoteContent).toBeNull();
        expect(deletedNoteLabel).toBeNull();
    });

    test("delete all notes and check if they are removed", () => {
        render(<StickyNotes />);

        const deleteFirst = () => {
            const deleteNoteButton = screen.getAllByText("x", { selector: "button" })[0];
            fireEvent.click(deleteNoteButton);
        }
        
        for(let i = 0; i < 6; i++) deleteFirst();

        const favoriteButton = screen.queryByText("♡", { selector: "button" });
        
        expect(favoriteButton).toBeNull();
    });

});

describe("Favorite StickyNote", () => {
   
    test("favorite a note and check if the list updates", () => {

        render(<StickyNotes />);

        const favoriteButton = screen.getAllByText("♡", { selector: "button" })[0];
        fireEvent.click(favoriteButton);

        const favoriteList = screen.getByText("List of favorites:");
        const favoriteNote = screen.getAllByText("test note 1 title");

        expect(favoriteList).toBeInTheDocument();
        expect(favoriteNote.length).toBe(2);
    });

    test("unfavorite a note and check if the list updates", () => {

        render(<StickyNotes />);

        const favoriteButton = screen.getAllByText("♡", { selector: "button" })[0];
        fireEvent.click(favoriteButton);

        const unfavoriteButton = screen.getAllByText("♥", { selector: "button" })[0];
        fireEvent.click(unfavoriteButton);

        const favoriteList = screen.queryByText("List of favorites:");
        const favoriteNote = screen.queryAllByText("test note 1 title");

        expect(favoriteList).toBeInTheDocument();
        expect(favoriteNote.length).toBe(1);
    });
});