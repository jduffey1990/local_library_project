function findAccountById(accounts, id) {
  let account = {}
  for (let person of accounts) {
    const personalID = person.id
    if (id === personalID) {
      account = person
    }
  }
  return account
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1)
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  let person = account.id
  let borrows = 0
  for (let book of books) {
    for (let borrower of book.borrows) {
      if (borrower.id === person) {
        borrows++
      }
    }
  }
  return borrows
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const borrowedBooks = books.filter((book) => {
    const borrow = book.borrows[0];
    return !borrow.returned && borrow.id === accountId;
  });
  return borrowedBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
