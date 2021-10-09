/*
@param accounts array, string ID of a single account object
@return the matching account object that has the same ID
*/
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

/*
@param the accounts array
@return an array of name objects sorted alphabetically
*/
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
}

/*
@param an account object, books array
@return a number that represents the number of times the 
account's ID appears in any book's `borrows` array.
*/
function getTotalNumberOfBorrows(account, books) {
  const booksFilter = books.reduce((acc, book) => {
    return [...acc, ...book.borrows]}, []
  ).filter((borrow) => borrow.id === account.id);
  return booksFilter.length;
}

/*
@param an account object, the books array, and the authors array
@return An array of book objects, including author information, 
that represents all books _currently checked out_ by the given account. 
_Look carefully at the object below,_ as it's not just the book object; the 
author object is nested inside of it.
*/
function getBooksPossessedByAccount(account, books, authors) {
  let booksBorrowed = [];
  for (book in books) {
    let borrowTransactions = books[book].borrows;
    for (transaction in borrowTransactions) {
      let borrowTransaction = borrowTransactions[transaction];
      if (borrowTransaction.id === account.id && borrowTransaction.returned === false) {
        books[book].author = authors.find(
          (author) => author.id === books[book].authorId
        );
        booksBorrowed.push(books[book]); 
      }
    }
  }
  return booksBorrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
