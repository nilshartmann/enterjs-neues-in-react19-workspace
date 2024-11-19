export type Book = {
  id: string;
  isbn: string;
  title: string;
  author: string;
  release: Date;
  pages: number;
  language: string;
  rating: number;
  likes: number;
  price: number;
};

export type CreateBook = Omit<Book, 'id'> & { id?: string };

export type Review = {
  id: string;
  title: string;
  text: string;
  bookId: string;
}

export type CreateReview = Omit<Review, 'id'> & { id?: string };