import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe("Render to do list", () => {

    test("renders to do list", () => {
        render(<ToDoList />);
        const toDoListBoughtItems = screen.getByText("Items bought: 0");
        expect(toDoListBoughtItems).toBeInTheDocument();

        const toDoListItem1 = screen.getByText("Apples");
        expect(toDoListItem1).toBeInTheDocument();

        const toDoListItem2 = screen.getByText("Bananas");
        expect(toDoListItem2).toBeInTheDocument();
    });

    test("check a bought item", () => {

        render(<ToDoList />);

        const toDoListCheckbox1 = screen.getAllByRole("checkbox", { checked: false })[0];

        fireEvent.click(toDoListCheckbox1);
        const toDoListBoughtItems1 = screen.getByText("Items bought: 1");
        expect(toDoListBoughtItems1).toBeInTheDocument();

        const toDoListCheckbox2 = screen.getAllByRole("checkbox", { checked: false })[0];

        fireEvent.click(toDoListCheckbox2);
        const toDoListBoughtItems2 = screen.getByText("Items bought: 2");
        expect(toDoListBoughtItems2).toBeInTheDocument();

    })

});