// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData } from "./storage.js";

const state = {
  users: [],
  selectedUser: null,
  bookmarks: [],
};

const elements = {};

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
  //elements.bookmarkForm.addEventListener("submit", handleAddBookmarkSubmit);
  //elements.bookmarkClear.addEventListener("click", handleClearBookmark);
};

function createUserOptions() {
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "---Select User---";
  elements.userSelect.appendChild(defaultOption);
  state.users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = user;
    elements.userSelect.appendChild(option);
  });
}

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

function render() {
  if (state.bookmarks === null) {
    alert("No bookmark data found for this user.");
    state.bookmarks = [];
    elements.bookmarkContainer.textContent =
      "There is currently no stored bookmark data for this user.";
  } else {
  }
}
