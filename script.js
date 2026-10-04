const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = JSON.parse(localStorage.getItem("quicknotes-notes")) || [];

/*

* Save the current notes array to localStorage.
  */
  function saveNotes() {
  localStorage.setItem("quicknotes-notes", JSON.stringify(notes));
  }

/*

* Update the note count.
  */
  function updateCount() {
  if (notes.length === 0) {
  noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
  noteCount.textContent = "You have 1 note.";
  } else {
  noteCount.textContent = `You have ${notes.length} notes.`;
  }
  }

/*

* Display the notes on the page.
  */
  function render() {
  notesList.textContent = "";

  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter(note =>
  note.text.toLowerCase().includes(searchTerm)
  );

  if (filteredNotes.length === 0 && searchTerm !== "") {
  const emptyMessage = document.createElement("li");
  emptyMessage.textContent = "No notes match your search.";
  notesList.appendChild(emptyMessage);
  updateCount();
  return;
  }

  filteredNotes.forEach(note => {
  const listItem = document.createElement("li");
  listItem.classList.add(
  "note-card",
  `category-${note.category}`
  );

  ```
   const noteText = document.createElement("p");
   noteText.classList.add("note-text");
   noteText.textContent = note.text;

   const details = document.createElement("div");
   details.classList.add("note-details");

   const categoryLabel = document.createElement("span");
   categoryLabel.classList.add("note-category");
   categoryLabel.textContent = note.category;

   const date = document.createElement("small");
   date.textContent = note.createdAt;

   const deleteButton = document.createElement("button");
   deleteButton.classList.add("delete-btn");
   deleteButton.type = "button";
   deleteButton.textContent = "Delete";

   deleteButton.addEventListener("click", function () {
       deleteNote(note.id);
   });

   details.appendChild(categoryLabel);
   details.appendChild(date);
   details.appendChild(deleteButton);

   listItem.appendChild(noteText);
   listItem.appendChild(details);

   notesList.appendChild(listItem);
  ```

  });

  updateCount();
  }

/*

* Add a new note.
  */
  noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  errorMessage.textContent = "";

  if (text.length === 0) {
  errorMessage.textContent = "Please type a note first.";
  return;
  }

  if (text.length > 200) {
  errorMessage.textContent =
  "Notes must be 200 characters or fewer.";
  return;
  }

  const newNote = {
  id: Date.now(),
  text: text,
  category: category,
  createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);

  saveNotes();
  render();

  noteInput.value = "";
  noteCategory.value = "personal";
  errorMessage.textContent = "";
  noteInput.focus();
  });

/*

* Delete a note.
  */
  function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);

  saveNotes();
  render();
  }

/*

* Search notes as the user types.
  */
  searchInput.addEventListener("input", function () {
  render();
  });

/*

* Initial page render.
  */
  render();
