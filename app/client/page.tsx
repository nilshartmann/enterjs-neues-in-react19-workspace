'use client';

import {NextPage} from 'next';
import {use, useContext, useEffect, useState} from 'react';
import {Book} from '@/app/types/book';
import ky from 'ky';
import CurrencyProvider, {CurrencyContext} from "@/app/client/CurrencyContext";

type ButtonProps = {
	onClick: () => void;
	children: React.ReactNode;
};
const Button: React.FC<ButtonProps> = ({onClick, children}) => {
	console.log('Button');
	return (
		<button
			onClick={onClick}
			className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
		>
			{children}
		</button>
	);
};

type TableRowProps = {
	book: Book;
	onDelete: (id: string) => void;
};

const TableRow: React.FC<TableRowProps> = ({book, onDelete}) => {
	console.log('TableRow');
	return (
		<tr className="bg-white hover:bg-gray-100">
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
				{book.isbn}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{book.title}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{book.author}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				<LikeWidget likes={book.likes}/>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				<PriceWidget title={book.title} price={book.price}/>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				<Button onClick={() => onDelete(book.id)}>Delete</Button>
			</td>
		</tr>
	);
};

type LikeWidgetProps = {
	likes: number;
}

const LikeWidget: React.FC<LikeWidgetProps> = ({likes}) => {
	// todo: implement with increasing Likes with useTransition and useOptimistic
	return <span>{likes}</span>

}

const PriceWidget: React.FC<{ title: string; price: number }> = ({title, price}) => {
	// todo: consume context
	//  use state to show/hide prices
	console.log("PriceWidget", title);

	const showPrices = true;

	return (
		<span className={"flex justify-between"}>
			{showPrices && (
				<span className={"p-2"}>
         {price}
        </span>
			)}
		</span>
	);
}

const ClientPage: NextPage = () => {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		ky<Book[]>('http://localhost:3001/books')
			.json()
			.then((data) => setBooks(data));
	}, []);

	async function handleDelete(id: string) {
		await ky.delete(`http://localhost:3001/books/${id}`);
		setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
	}

	function handleUpdate(book: Book) {
		setBooks(books => books.map(b => b.id === book.id ? book : b));
	}

	return (
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
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Price
					</th>
					<th className="px-6 py-3"></th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{books.map((book) => (
					<TableRow book={book} key={book.id} onDelete={handleDelete}/>
				))}
			</tbody>
		</table>
	);
};

export default ClientPage;
