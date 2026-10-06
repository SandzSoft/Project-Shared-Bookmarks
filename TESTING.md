# Testing

## The website must contain a drop-down which lists five users

Manually tested by opening the user dropdown and confirming that five users are listed.

Unit test in `example.test.js` verifies that `getUserIds()` returns five users.

## Selecting a user must display the list of bookmarks for the relevant user

Manually tested by selecting different users from the dropdown and confirming that the bookmarks displayed belong to the selected user.

## If there are no bookmarks for the selected user, a message is displayed

Manually tested by selecting a user with no stored bookmarks and confirming that the message explaining that there is no stored bookmark data is displayed.

## The list of bookmarks must be shown in reverse chronological order

Unit test in `example.test.js` verifies that `sortBookmarks()` sorts bookmarks from the newest to the oldest created date.

## Each bookmark has a title, description and created-at timestamp displayed

Manually tested by viewing the bookmark list and confirming that each bookmark displays its title, description and created date.

## Each bookmark's title is a link to the bookmark's URL

Manually tested by clicking bookmark titles and confirming that they open the correct URL.

## Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark

Manually tested by clicking the "Copy to clipboard" button and pasting the copied URL into another text field to confirm that the correct URL was copied.

## Each bookmark's like counter works independently and persists data across sessions

Manually tested by clicking the Like button on different bookmarks and confirming that each bookmark's like count changes independently.

## The page was then refreshed and the like counts were checked to confirm that the updated values persisted.

Unit test in `example.test.js` verifies that `increaseLikes()` correctly increases a bookmark's like count.

## The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.

Manually tested by checking that the form contains accessible inputs for URL, title and description, together with a submit button.

The form was also tested using the keyboard to confirm that it can be submitted without using a mouse.

## Submitting the form adds a new bookmark for the relevant user only

Manually tested by selecting a user, adding a bookmark, and confirming that the new bookmark appears for that user.

Another user was then selected to confirm that the bookmark was not added to that user's list.

## After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark

Manually tested by adding a new bookmark and confirming that it immediately appears in the bookmark list for the currently selected user.

## The website must score 100 for accessibility in Lighthouse

Tested using Lighthouse in Snapshot mode.

The accessibility score was checked for the different views of the website, including views with and without bookmarks.

## Unit tests must be written for at least one non-trivial function

Unit tests in `example.test.js`.

The tests cover:

- `increaseLikes()`
- `getUserOptions()`
- `sortBookmarks()`
- `getUserIds()`

The tests were run using Node's built-in test runner.
