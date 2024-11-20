'use client';

import {NextPage} from 'next';
import {use, useContext, useEffect, useOptimistic, useState, useTransition} from 'react';
import {Book} from '@/app/types/book';
import ky from 'ky';
import CurrencyProvider, {CurrencyContext} from "@/app/client/CurrencyContext";
import {ErrorBoundary} from "react-error-boundary";

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
	onUpdate: (updatedBook: Book) => void;
};

const TableRow: React.FC<TableRowProps> = ({book, onDelete, onUpdate}) => {
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
				<LikeWidget likes={book.likes} bookId={book.id} onUpdate={onUpdate}/>
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
	bookId: string;
	onUpdate(updatedBook: Book): void
}

const LikeWidget: React.FC<LikeWidgetProps> = (props) => {
	return <ErrorBoundary fallback={<div>Fehler aufgetreten!</div>}>
		<LikeWidgetInternal {...props} />
	</ErrorBoundary>
}

const LikeWidgetInternal: React.FC<LikeWidgetProps> = ({likes, bookId, onUpdate}) => {
	// todo: implement with increasing Likes with useTransition and useOptimistic

	const [isPending, startTransition] = useTransition();
	const [optimisticLike, setOptimisticLike] = useOptimistic(likes, (currentLikes, amount: number) => {
		return currentLikes + amount;
	});

	const handleLikeClick = () => {
		startTransition(async () => {
			setOptimisticLike(1);
			const updatedBook = await ky.patch<Book>(`http://localhost:3001/books/${bookId}/likes?slowdown=2400`).json();
			// updatedBook.likes = 666;
			onUpdate(updatedBook);
		})
	}

	return <div className={"flex"}>
		{optimisticLike} ({likes})
		<button className={"cursor-pointer hover:underline"} onClick={() => handleLikeClick()} disabled={isPending}>
			Like me!
		</button>
		{isPending && "Liking..."}

	</div>

}

// BITTE NICHT:
// let p: any = null;
// function fetchBooksData() {
// 	if (!p) {
// 		p  = fetch("...");
// 	}
//
// 	return p;
// }

const PriceWidget: React.FC<{ title: string; price: number }> = ({title, price}) => {
	const [showPrices, setShowPrices] = useState(true);

	// BITTE NICHT:
	// const booksDataPromise = fetchBooksData();
	// const booksData = use(booksDataPromise);

	// const currencyContext = useContext(CurrencyContext);
	const currencyContext = showPrices ? use(CurrencyContext) : null;

	// const router = useRouter();

	// const handleOpenBookClick() => {
	// 	const router = use(RouterContext);
	// 	router.open("...")
	// }

	// todo: consume context
	//  use state to show/hide prices
	console.log("PriceWidget", title);

	const realPrice = currencyContext ? price * currencyContext.rate : -1;

	return (
		<span className={"flex justify-between"}>
			{showPrices && (
				<span className={"p-2"}>
         {realPrice} {currencyContext?.currency}
        </span>
			)}
			<Button onClick={() => setShowPrices(!showPrices)}>{showPrices ? "Hide Price" : "Show Price"}</Button>
		</span>
	);
}

const ClientPage: NextPage = () => {
	const [books, setBooks] = useState<Book[]>([]);

	const [isPending, startTransition] = useTransition();

	// ky-Bibliothek: https://github.com/sindresorhus/ky

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
						ISBN {String(isPending)}
						<button onClick={() => {
							startTransition(async () => {
								return new Promise( res =>setTimeout(res, 5000));
							})
						}}>Start</button>
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
					<TableRow book={book} key={book.id} onDelete={handleDelete} onUpdate={handleUpdate}/>
				))}
			</tbody>
		</table>
	);
};

function ClientPageApp() {
	return <CurrencyProvider><ClientPage/></CurrencyProvider>
}

export default ClientPageApp;
