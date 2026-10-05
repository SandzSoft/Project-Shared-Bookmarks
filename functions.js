export function increaseLikes(bookmark) {
  bookmark.likes += 1;
}

export function getUserOptions(users) {
  return users.map((user) => ({
    value: user,
    text: user,
  }));
}

export function sortBookmarks(bookmarks) {
  return [...bookmarks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
}
