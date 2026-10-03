// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

const state = {
  users: [],
  selectedUser: null,
  bookmarks: [],
};

const elements = {};

window.onload = function () {
  elements.userSelect = document.getElementById("user-selector");
  elements.bookmarkCards = document.getElementById("bookmark-cards");
  elements.bookmarkForm = document.getElementById("bookmark-form");
  elements.bookmarkAdd = document.getElementById("add-bookmark");
  elements.bookmarkClear = document.getElementById("bookmark-clear");

  elements.bookmarkTitle = document.getElementById("bookmark-title");
  elements.bookmarkUrl = document.getElementById("bookmark-url");
  elements.bookmarkDescription = document.getElementById(
    "bookmark-description",
  );
  elements.bookmarkAdd.style.display = "none";

  state.users = getUserIds();
  createUserOptions();
  elements.userSelect.addEventListener("change", handleUserSelection);
  elements.bookmarkForm.addEventListener("submit", handleAddBookmarkSubmit);
  elements.bookmarkClear.addEventListener("click", handleClearBookmark);
};
