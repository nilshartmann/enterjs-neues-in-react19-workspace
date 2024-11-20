import ky from 'ky';
import { NextPage } from 'next';
import { Book } from '../types/book';

const BooksPage: NextPage = async () => {
  let books: Book[] = [];
  let errorMessage: string | null = null;
  try {
    books = await ky<Book[]>('http://localhost:3001/booksss').json();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'An error occurred';
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (books.length === 0) {
    return <div>Keine Bücher vorhanden</div>;
  }

  return (
    <div>
      <h1>Bücherliste</h1>
      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Autor</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksPage;
