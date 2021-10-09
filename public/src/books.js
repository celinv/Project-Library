const { findAccountById } = require("./accounts");

/*
@param authors array, number value ID of a single author object
@return author object with matching id given
*/
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

/*
DONE
@param the books array, a string id of a single book object
@return the books object with the matching id parameter
*/
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

/*
@param the books array
@return two arrays, with the first array listing the books that are checked out,
and the second array that lists the books that are returned
*/
function partitionBooksByBorrowedStatus(books) {
  let returnBooks = [];
  let notReturnedBooks = [];

  for (let book in books) {
    let status = books[book].borrows[0].returned;
    if (status === true) {
      returnBooks.push(books[book]);
    }
    else {
      notReturnedBooks.push(books[book]);
    }
  }
  return [notReturnedBooks, returnBooks];
}

/*
@param a book object, the accounts array
@return an array of ten or fewer account objects that 
represents the accounts given by the IDs in the provided book's `borrows` 
array. However, each account object should include the `returned` entry from 
the corresponding transaction object in the `borrows` array.
*/
function getBorrowersForBook(book, accounts) {
  return book.borrows.map((bookTransaction) => {
    return {
      ...bookTransaction, ...accounts.find((account) => account.id === bookTransaction.id)
    }
  }).slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
