import {
  AddBookClubInput,
  AddBookClubResponse,
  DeleteClubsInput,
  DeleteClubsResponse,
  UpdateClubsInput
} from 'pages/api/book-clubs';
import {
  Data,
  DeleteBooksInput,
  DeleteBooksResponse,
  UpdateBooksInput
} from 'pages/api/books';
import { BookClub, ParamsFrom, Response } from 'types';

// contains server inputs and handlers for DB

export type DeleteProps = ParamsFrom<typeof deleteClub>[0];
export type UpdateProps = ParamsFrom<typeof updateBookClub>[0];
export type AddProps = ParamsFrom<typeof createBookClub>[0];

const headers = { 'Content-Type': 'application/json' };

// updates BookClub or returns error
async function updateBookClub(clubsToUpdate: UpdateClubsInput) {
  try {
    const req = await fetch('/api/book-clubs', {
      body: JSON.stringify(clubsToUpdate),
      method: 'PATCH',
      headers
    });
    const { data }: DeleteBooksResponse = await req.json();
    return data;
  } catch (error) {
    console.error('error updating book club', error);
  }
}
// creates a new book club (or returns error)
async function createBookClub(clubToAdd: AddBookClubInput) {
  try {
    const req = await fetch('/api/book-clubs', {
      body: JSON.stringify(clubToAdd),
      method: 'POST',
      headers
    });
    const { data }: AddBookClubResponse = await req.json();
    return data.insertedId;
  } catch (error) {
    console.error('error creating book club', error);
  }
}
// deletes a book club from DB/else returns error
async function deleteClub(clubsToDelete: DeleteClubsInput) {
  try {
    const req = await fetch('/api/book-clubs', {
      body: JSON.stringify(clubsToDelete),
      method: 'DELETE',
      headers
    });
    const { data }: DeleteClubsResponse = await req.json();
    return data;
  } catch (error) {
    console.error('error deleting book club', error);
  }
}
// gets all Book Clubs.
async function getClubs() {
  try {
    const req = await fetch('/api/book-clubs');
    const { data }: Response<BookClub[]> = await req.json();
    return data;
  } catch (error) {
    console.error('error getting book clubs', error);
  }
}

export { createBookClub, deleteClub, getClubs, updateBookClub };
