'use client';

import { NextPage } from 'next';
import { useActionState } from 'react';
import { createBook } from './createBook.action';
import Submit from './Submit';

const UserFormPage: NextPage = () => {
  const [error, submitAction, isPending] = useActionState<string, FormData>(
    createBook,
    '',
    '/books/create'
  );

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (isPending) {
  //   return <div>Speichere...</div>;
  // }

  return (
    <form action={submitAction}>
      {error && <div>{error}</div>}
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input className="text-black" type="text" name="isbn" id="isbn" />
      </div>
      <div>
        <label htmlFor="title">Titel:</label>
        <input className="text-black" type="text" name="title" id="title" />
      </div>
      <div>
        <label htmlFor="author">Autor:</label>
        <input className="text-black" type="author" name="author" id="author" />
      </div>
      <div>
        <label htmlFor="release">Veröffentlichung:</label>
        <input
          className="text-black"
          type="release"
          name="release"
          id="release"
        />
      </div>
      <div>
        <label htmlFor="pages">Seiten:</label>
        <input className="text-black" type="pages" name="pages" id="pages" />
      </div>
      <div>
        <label htmlFor="language">Sprache:</label>
        <input
          className="text-black"
          type="language"
          name="language"
          id="language"
        />
      </div>
      <div>
        <label htmlFor="price">Preis:</label>
        <input className="text-black" type="price" name="price" id="price" />
      </div>

      <Submit />
    </form>
  );
};

export default UserFormPage;
