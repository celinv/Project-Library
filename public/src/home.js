/*
@param the books array
@return the length of the books array
*/
function getTotalBooksCount(books) {
  return books.length;
}

/*
@param the accounts array
@return the length of the accounts array
*/
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

/*
@param the books array
@return the number of books that are currently being borrowed, as indicated
by books.borrows.returned === false
*/
function getBooksBorrowedCount(books) {
  return books.filter((book) => book.borrows[0].returned === false).length;
}

/*
@param the books array
@return an ordered array of five or fewer objects listing the name of the genre and 
the amount of times the genre occurs
*/
function getMostCommonGenres(books) {
  const bookGenre = books.reduce((acc, book) => {
    let genre = book.genre;
    if (acc[genre]) {
      acc[genre]++;
    }
    else {
      acc[genre] = 1;
    }
    return acc
  }, {});
  const genreArray = [];
  for (genre in bookGenre) {
    genreArray.push({name: genre, count: bookGenre[genre]});
  }
  return genreArray.sort((genreA, genreB) => genreA.count < genreB.count ? 1 : -1).slice(0,5);
}

/*
@param the books array
@return an array of five or fewer book objects that have been borrowed the most,
as indicated by the 'borrows' property in the book object
*/
function getMostPopularBooks(books) {
  const borrowsArray = [];
  for (book in books) {
    borrowsArray.push({name: books[book].title, count: books[book].borrows.length});
  }

  return borrowsArray.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1).slice(0,5);
}

/*
@param the books array and the authors array
@return an array of five or fewer objects listing the name of the author and the amount
of times their books were borrowed; the books that were borrowed the most under that 
author's name are sorted from greatest to least
*/
function getMostPopularAuthors(books, authors) {
 let countByAuthor = books.reduce((acc, book) => {
   let authorId = book.authorId;
   let borrowCount = book.borrows.length;
   if (!acc[authorId]) {
     acc[authorId] = 0;
   }
   acc[authorId] = borrowCount;
  return acc;
 }, {});

 let fullNameAuthor = Object.keys(countByAuthor).map((authorId) => {
   const author = authors.find((authorName) => authorName.id == authorId);
   return {name: `${author.name.first} ${author.name.last}`, count: countByAuthor[authorId]};
 });

 return fullNameAuthor.sort((authorA, authorB) => authorA.count < authorB.count ? 1 : -1).slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
