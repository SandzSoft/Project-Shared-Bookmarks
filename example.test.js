import assert from "node:assert";
import test from "node:test";
import { getUserIds } from "./storage.js";
import { increaseLikes, getUserOptions, sortBookmarks } from "./functions.js";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("should increase bookmark likes", () => {
  const bookmark = {
    likes: 0,
  };
  increaseLikes(bookmark);
  assert.equal(bookmark.likes, 1);
  increaseLikes(bookmark);
  assert.equal(bookmark.likes, 2);
});

test("should create user options", () => {
  const users = ["user1", "user2", "user3"];
  const result = getUserOptions(users);
  assert.equal(result.length, 3);
  assert.equal(result[0].value, "user1");
  assert.equal(result[0].text, "user1");
  assert.equal(result[1].value, "user2");
  assert.equal(result[1].text, "user2");
  assert.equal(result[2].value, "user3");
  assert.equal(result[2].text, "user3");
});

test("should sort bookmarks in reverse chronological order", () => {
  const bookmark1 = {
    createdAt: "2026-08-27T22:17:18.940Z",
  };
  const bookmark2 = {
    createdAt: "2026-08-28T22:17:18.940Z",
  };
  const bookmark3 = {
    createdAt: "2026-08-28T20:17:18.940Z",
  };
  const bookmarksArray = [bookmark1, bookmark2, bookmark3];
  const sortedBookmarksArray = [bookmark2, bookmark3, bookmark1];
  const result = sortBookmarks(bookmarksArray);
  assert.deepEqual(result, sortedBookmarksArray);
});
