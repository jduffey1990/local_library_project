function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let count = 0
  for (let book of books) {
    const borrowed = book.borrows[0]
    if (!borrowed.returned) {
      count++
    }
  }
  return count
}

function getMostCommonGenres(books) {
  const totalGenres = [];
  books.forEach(book => {
    const genre = book.genre;
    const index = totalGenres.findIndex(item => item.name === genre);
    if (index === -1) {
      totalGenres.push({ name: genre, count: 1 });
    } else {
      totalGenres[index].count++;
    }
  });
  return totalGenres
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}


function getMostPopularBooks(books) {
  const countObj = books.reduce((result, book) => {
    result[book.title] = book.borrows.length;
    return result;
  }, {});

  const sortedBooks = Object.entries(countObj)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return sortedBooks;
}


function getMostPopularAuthors(books, authors) {
  const authorObj = books.reduce((result, book) => {
    const authorId = book.authorId;
    const borrows = book.borrows.length;
    if (!result[authorId]) {
      result[authorId] = { name: getAuthorName(authors, authorId), count: borrows };
    } else {
      result[authorId].count += borrows;
    }
    return result;
  }, {});

  const sortedAuthors = Object.values(authorObj)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return sortedAuthors;
}

function getAuthorName(authors, authorId) {
  const author = authors.find(author => author.id === authorId);
  return `${author.name.first} ${author.name.last}`;
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
