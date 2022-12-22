import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe("addNote Button", () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  //Dealing with errors from localStorage
  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
    Storage.prototype.getItem = getItemMock;
    render(<App />);
    const addNoteButtonElement = screen.getByRole("button", { name: "Add Note" });
    fireEvent.click(addNoteButtonElement);
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
  })

  test('should render input element on addNote button click', () => {
    const inputElement = screen.getByRole("input");
    expect(inputElement).toBeInTheDocument();
  });

  test('should render textarea element on addNote button click', () => {
    const textAreaElement = screen.getByRole("textarea");
    expect(textAreaElement).toBeInTheDocument();
  });

  test('should add note to sidebar on addNote button click', () => {
    const element = screen.getByText("New Note Title");
    expect(element).toBeInTheDocument();
  });
});

describe("changing input values", () => {
  beforeEach(() => {
    render(<App />);
    const addNoteButtonElement = screen.getByRole("button", { name: "Add Note" });
    fireEvent.click(addNoteButtonElement);
  });

  test("should be able to type into input", () => {
    const inputElement = screen.getByRole("input") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Recipes" } });
    expect(inputElement.value).toBe("Recipes");
  });

  test("should be able to type into textarea", () => {
    const inputElement = screen.getByRole("textarea") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Cheese" } });
    expect(inputElement.value).toBe("Cheese");
  });
});

describe("sidebar", () => {
  beforeEach(() => {
    render(<App />);
    const addNoteButtonElement = screen.getByRole("button", { name: "Add Note" });
    fireEvent.click(addNoteButtonElement);
  });

  test("should highlight note on click", () => {
    const noteElement = screen.getByTestId("note");
    fireEvent.click(noteElement);
    expect(noteElement).toHaveClass("noteActive");
  });

  test("should load note into main on sidebar click", () => {
    const noteElement = screen.getByTestId("note");
    expect(noteElement).toBeInTheDocument();
  });

  test("should show modal when delete clicked", () => {
    const deleteIcon = screen.getByTestId("deleteIcon");
    fireEvent.click(deleteIcon);
    const deleteModal = screen.getByTestId("deleteModal");
    expect(deleteModal).toBeInTheDocument();
  });
});

describe("Delete Modal", () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  beforeEach(() => {
    render(<App />);
    const addNoteButtonElement = screen.getByRole("button", { name: "Add Note" });
    fireEvent.click(addNoteButtonElement);
    const deleteIcon = screen.getByTestId("deleteIcon");
    fireEvent.click(deleteIcon);
  });

  test("should remove note from sidebar on delete confirm", () => {
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    fireEvent.click(confirmButton);
    const sideBarNote = screen.queryByTestId("note");
    expect(sideBarNote).not.toBeInTheDocument();
  });

  test("should keep note in sidebar on delete cancel", () => {
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    const sideBarNote = screen.queryByTestId("note");
    expect(sideBarNote).toBeInTheDocument();
  });

  test("should remove modal on confirm", async () => {
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    fireEvent.click(confirmButton);
    const deleteModal = await screen.findByTestId("deleteModal");
    setTimeout(() => { expect(deleteModal).not.toBeInTheDocument(); }, 0)
  });

  test("should remove modal on cancel", async () => {
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    const deleteModal = await screen.findByTestId("deleteModal");
    setTimeout(() => { expect(deleteModal).not.toBeInTheDocument(); }, 0)
  });
});

describe("truncate", () => {
  beforeEach(() => {
    render(<App />);
    const addNoteButtonElement = screen.getByRole("button", { name: "Add Note" });
    fireEvent.click(addNoteButtonElement);
  });

  test("should truncate title of note in sidebar", () => {
    const inputElement = screen.getByRole("input") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "List of things to do Today" } });
    const truncatedText = screen.getByText("List of things to do...")
    expect(truncatedText).toBeInTheDocument();
  });

  test("should truncate body of note in sidebar", () => {
    const textareaElement = screen.getByRole("textarea") as HTMLInputElement;
    fireEvent.change(textareaElement, { target: { value: "These are all the things" } });
    const truncatedText = screen.getByText("These are all the th...")
    expect(truncatedText).toBeInTheDocument();
  });
});


