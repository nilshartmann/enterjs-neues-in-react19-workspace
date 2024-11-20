import {NextPage} from "next";
import {Book, Review} from "@/app/types/book";
import ky from "ky";
import {Suspense} from "react";

const BookPage: NextPage<{ params: Promise<{ bookId: string }> }> = async (props) => {
	const params = await props.params;
	const bookId = params.bookId;

	const reviewsPromise = ky.get<Review[]>(`http://localhost:3001/books/${bookId}/reviews`).json();

	return <main>
		<div className={"flex flex-col space-y-4"}>

			<Suspense fallback={"Bücher werden geladen..."}>
				<BookView bookId={bookId}/>
			</Suspense>

			<Suspense fallback={"Reviews werden geladen..."}>
				<ReviewList reviewsPromise={reviewsPromise}/>
			</Suspense>
		</div>
	</main>

}

async function BookView({bookId}: { bookId: string }) {
	const book = await ky.get<Book>(`http://localhost:3001/books/${bookId}`).json();

	return <article>
		<h1 className={"text-4xl"}>{book.title}</h1>
	</article>
}

type ReviewListProps = {
	reviewsPromise: Promise<Review[]>
}

async function ReviewList({reviewsPromise}: ReviewListProps) {
	// const reviewsPromise = ky.get<Review[]>(`http://localhost:3001/books/${bookId}/reviews?slowdown=5000`).json();

	const reviews = await reviewsPromise;

	return reviews.map(r => <div key={r.id}>{r.title} {r.text} </div>)

}

export default BookPage;