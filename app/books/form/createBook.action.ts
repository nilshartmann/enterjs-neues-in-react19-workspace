'use server';

import ky from 'ky';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBook(error: string, formdata: FormData) {
  try {
    const book = {
      isbn: formdata.get('isbn') as string,
      title: formdata.get('title') as string,
      author: formdata.get('author') as string,
      release: formdata.get('release') as string,
      pages: formdata.get('pages') as string,
      language: formdata.get('language') as string,
      price: formdata.get('price') as string,
    };

    // const book = Object.fromEntries(formdata.entries());

    throw new Error('Server not reachable');
    await wait(5_000);

    ky.post('http://localhost:3001/books', { json: book });
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An error occurred';
  }

  revalidatePath('/books');
  redirect('/books');
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
