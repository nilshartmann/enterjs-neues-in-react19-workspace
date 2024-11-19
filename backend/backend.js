/* eslint @typescript-eslint/no-require-imports: 0 */
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); //

const app = express();

app.use(cors());  // Enable CORS for all origins

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Use the first command line argument as the port or default to 3000
const port = process.argv[2] || 3002;

const data = require("./data.json")

// Slowdown middleware
const slowdownMiddleware = (req, res, next) => {
  const slowdownParam = req.query.slowdown;
  let delay = 0;

  if (slowdownParam !== undefined) {
    delay = parseInt(slowdownParam) || 1200;
  }

  if (delay > 0) {
    setTimeout(() => {
      next();
    }, delay);
  } else {
    next();
  }
};

app.use(slowdownMiddleware);

// GET /books endpoint - Retrieve the list of books
app.get('/books', (req, res) => {
  res.json(data.books);
});

// GET /books/:bookId endpoint - Retrieve a single book by ID
app.get('/books/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  const book = data.books.find(b => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// GET /books/:bookId/reviews endpoint - Retrieve reviews for a single book by book ID
app.get('/books/:bookId/reviews', (req, res) => {
  const bookId = req.params.bookId;
  const bookReviews = data.reviews.filter(review => review.bookId === bookId);
  if (bookReviews.length > 0) {
    res.json(bookReviews);
  } else {
    res.status(404).send('Reviews not found for the specified book');
  }
});

// POST /books endpoint - Add a new book
app.post('/books', (req, res) => {
  const { isbn, title, author, release, pages, language, price } = req.body;

  if (!isbn || !title || !author || !release || !pages || !language || !price) {
    return res.status(400).send('Invalid request: Missing required fields.');
  }

  // Generate a new unique ID for the book
  const newId = uuidv4();

  const newBook = {
    id: newId,
    isbn,
    title,
    author,
    release,
    pages,
    language,
    rating: 0, // Set rating to 0
    price,
    likes: 0 // Set likes to 0
  };

  data.books.push(newBook);

  res.status(201).json(newBook);
});

// DELETE /books/:bookId endpoint - Delete a single book by ID
app.delete('/books/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  const bookIndex = data.books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    const deletedBook = data.books.splice(bookIndex, 1);
    res.json(deletedBook[0]); // Return the deleted book object
  } else {
    res.status(404).send('Book not found');
  }
});

// POST /books/:bookId/reviews endpoint - Add a new review for a specific book
app.post('/books/:bookId/reviews', (req, res) => {
  const bookId = req.params.bookId;
  const { title, text } = req.body;

  // Validate that bookId, title, and text are present
  if (!bookId || !title || !text) {
    return res.status(400).send('Invalid request: Missing required fields.');
  }

  // Ensure the book exists
  const book = data.books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).send('Book not found');
  }

  // Prepare the new review object
  const newReview = {
    id: (data.reviews.length + 1).toString(), // Generate a new ID based on the length of the reviews array
    title,
    text,
    bookId
  };

  // Add the new review to the reviews array
  data.reviews.push(newReview);

  // Return the newly created review
  res.status(201).json(newReview);
});

// PATCH /books/:bookId endpoint - Increment the likes of a book by ID
app.patch('/books/:bookId/likes', (req, res) => {
  const bookId = req.params.bookId;
  const book = data.books.find(b => b.id === bookId);

  if (book) {
    book.likes += 1;
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

app.listen(port, () => {
  console.log(`📚 Server is running on http://localhost:${port}`);
  console.log(``);
  console.log(`List Books   GET http://localhost:${port}/books`);
  console.log(`Get a Book   GET http://localhost:${port}/books/3`);
  console.log(`Add Book     POST http://localhost:${port}/books/3 isbn title author release pages language price`);
  console.log(`Delete Book  DELETE http://localhost:${port}/books/3`);
  console.log(`Like Book    PUT http://localhost:${port}/books/3/likes`);
  console.log(`Book Reviews GET http://localhost:${port}/books/3/reviews`);
  console.log(`Add Review   POST http://localhost:${port}/books/3/reviews title=Hurray text=great`);
  console.log(``);
  console.log(`😴 To simulate slow responses, add '?slowdown=delay_in_ms' to your URL:`);
  console.log(`     GET http://localhost:${port}/books/3?slowdown=2400`)


});