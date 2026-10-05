import { getUserIds, getData, setData } from "./storage.js";
import { increaseLikes, getUserOptions, sortBookmarks } from "./functions.js";

//state object to hold the application state
const state = {
  users: [],
  selectedUser: null,
  bookmarks: [],
};

const elements = {};

//window onload event to initialize the application
window.onload = function () {
  elements.userSelect = document.getElementById("user-select");
  elements.bookmarkContainer = document.getElementById("bookmarks-container");
  elements.bookmarkForm = document.getElementById("bookmark-form");
  elements.bookmarkAdd = document.getElementById("add-bookmark");
  //elements.bookmarkClear = document.getElementById("bookmark-clear");

  elements.bookmarkTitle = document.getElementById("title");
  elements.bookmarkUrl = document.getElementById("url");
  elements.bookmarkDescription = document.getElementById("description");
  elements.bookmarkAdd.style.display = "none";

  state.users = getUserIds();
  createUserOptions();
  elements.userSelect.addEventListener("change", handleUserSelection);
  elements.bookmarkForm.addEventListener("submit", handleAddBookmarkSubmit);
  //elements.bookmarkClear.addEventListener("click", handleClearBookmark);
};

// Create user options in the select dropdown
function createUserOptions() {
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "---Select User---";
  elements.userSelect.appendChild(defaultOption);
  getUserOptions(state.users).forEach((userOption) => {
    const option = document.createElement("option");
    option.value = userOption.value;
    option.textContent = userOption.text;
    elements.userSelect.appendChild(option);
  });
}

// Handle user selection from the dropdown
function handleUserSelection(event) {
  state.selectedUser = event.target.value;

  if (state.selectedUser === "") {
    state.selectedUser = null;
    elements.bookmarkAdd.style.display = "none";
    state.bookmarks = [];
    render();
    return;
  }

  elements.bookmarkAdd.style.display = "block";
  state.bookmarks = getData(state.selectedUser);
  render();
}

// Render bookmarks in the container
function render() {
  if (state.bookmarks === null) {
    elements.bookmarkContainer.textContent =
      "There is currently no stored bookmark data for this user.";
  } else {
  }
}

// Handle bookmark form
function handleAddBookmarkSubmit(event) {
  event.preventDefault();
  const data = {
    title: elements.bookmarkTitle.value,
    url: elements.bookmarkUrl.value,
    description: elements.bookmarkDescription.value,
    createdAt: new Date().toISOString(),
    likes: 0,
  };
  if (state.bookmarks === null) {
    state.bookmarks = [];
  }
  state.bookmarks.push(data);
  setData(state.selectedUser, state.bookmarks);
  elements.bookmarkForm.reset();
  render();
}
