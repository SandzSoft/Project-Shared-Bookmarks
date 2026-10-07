import { getUserIds, getData, setData } from "./storage.js";
import { increaseLikes, getUserOptions, sortBookmarks } from "./functions.js";

//state object to hold the application state
const state = {
  users: [],
  selectedUser: null,
  bookmarks: null,
};

const elements = {};

//window onload event to initialize the application
window.onload = function () {
  elements.userSelect = document.getElementById("user-select");
  elements.bookmarkContainer = document.getElementById("bookmarks-container");
  elements.bookmarkForm = document.getElementById("bookmark-form");
  elements.bookmarkAdd = document.getElementById("add-bookmark");

  elements.bookmarkTitle = document.getElementById("title");
  elements.bookmarkUrl = document.getElementById("url");
  elements.bookmarkDescription = document.getElementById("description");
  elements.bookmarkAdd.style.display = "none";

  state.users = getUserIds();
  createUserOptions();
  elements.userSelect.addEventListener("change", handleUserSelection);
  elements.bookmarkForm.addEventListener("submit", handleAddBookmarkSubmit);
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
    state.bookmarks = null;
    elements.bookmarkAdd.style.display = "none";
    showMessage("Please select a user to view bookmarks.");
    return;
  }

  elements.bookmarkAdd.style.display = "block";
  state.bookmarks = getData(state.selectedUser);
  render();
}

// Render bookmarks in the container
function render() {
  elements.bookmarkContainer.replaceChildren();
  if (!state.bookmarks || state.bookmarks.length === 0) {
    showMessage("There is currently no stored bookmark data for this user.");
    return;
  }
  state.bookmarks = sortBookmarks(state.bookmarks);
  const cards = state.bookmarks.map(createBookmarkCard);
  elements.bookmarkContainer.replaceChildren(...cards);
}
// Create bookmark card
function createBookmarkCard(bookmark) {
  const article = document.createElement("article");
  const title = document.createElement("h3");
  const link = document.createElement("a");
  link.href = bookmark.url;
  link.textContent = bookmark.title;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  title.appendChild(link);
  // Description
  const description = document.createElement("p");
  description.textContent = bookmark.description;
  // Created date
  const createdAt = document.createElement("p");
  createdAt.textContent = `Created: ${new Date(
    bookmark.createdAt,
  ).toLocaleString()}`;
  // Copy button
  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy to clipboard";
  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(bookmark.url);
    copyButton.textContent = "Copied!";
  });
  // Like button
  const likeButton = document.createElement("button");
  likeButton.textContent = `Like (${bookmark.likes || 0})`;
  likeButton.addEventListener("click", () => handleAddLike(bookmark));
  // Add everything to the article
  article.appendChild(title);
  article.appendChild(description);
  article.appendChild(createdAt);
  article.appendChild(copyButton);
  article.appendChild(likeButton);
  return article;
}

function handleAddLike(bookmark) {
  increaseLikes(bookmark);
  setData(state.selectedUser, state.bookmarks);
  render();
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

function showMessage(text) {
  elements.bookmarkContainer.textContent = text;
}
