"use server";

import ky from "ky";
import {Book} from "@/app/types/book";
import {revalidatePath} from "next/cache";

export async function increaseLike(bookId: string) {

	await ky.patch<Book>(`http://localhost:3001/books/${bookId}/likes`).json();

	revalidatePath("/books");

	return "like hat funktioniert!";

}