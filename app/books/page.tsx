import ky from 'ky';
import {NextPage} from 'next';
import {Book} from '../types/book';
import {ReactNode} from 'react';
import TableRow from './components/TableRow';
import Header from "@/app/books/components/Header";

const BooksListPage: NextPage = async () => {
	console.log("BookListPage");

	let errorMessage: ReactNode = '';
	let books: Book[] = [];

	// Führt zu dynamischem Render:
	//   const meineCookies = cookies();

	// const API_KEY = process.env.MY_SECRET_API_KEY;

	try {
		books = await ky<Book[]>('http://localhost:3001/books').json();
	} catch (error) {
		const errorText =
			error instanceof Error ? error.message : 'An error occurred';
		errorMessage = (
			<p className="text-red-500 bg-red-100 border border-red-400 rounded p-2">
				{errorText}
			</p>
		);
	}

	if (books.length === 0) {
		return (
			<div>
				{errorMessage && <p>{errorMessage}</p>}
				<p>No books found</p>
			</div>
		);
	}

	return (
		<>
			<Header />
			{errorMessage && <p>{errorMessage}</p>}
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							ISBN
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Titel
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Autor
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Likes
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{books.map((book) => (
						<TableRow book={book} key={book.id}/>
					))}
				</tbody>
			</table>
		</>
	);
};

export default BooksListPage;
