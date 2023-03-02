function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id)
  return found
}


function findBookById(books, id) {
  let found = books.find((book) => book.id === id)
  return found
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const returnedBooks = [];

  for (let book of books) {
    const borrow = book.borrows[0];
    if (borrow.returned) {
      returnedBooks.push(book);
    } else {
      borrowedBooks.push(book);
    }
  }
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((borrow) => {
    const account = accounts.find((account) => account.id === borrow.id);
    return { ...borrow, ...account };
  });
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
