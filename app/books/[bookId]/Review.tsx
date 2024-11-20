"use client";
import {Review} from "@/app/types/book";
import {use, useEffect} from "react";

type ReviewListProps = {
	reviewsPromise: Promise<Review[]>
}

export default function ReviewList({reviewsPromise}: ReviewListProps) {
	const reviews = use(reviewsPromise);

	useEffect(() => {
		// ...
	}, []);

	return reviews.map(r => <div key={r.id}>{r.title} {r.text}</div>)

}