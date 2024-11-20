import {Book} from '@/app/types/book';
import Link from "next/link";
import LikeWidget from "@/app/books/components/LikeWidget";

type TableRowProps = {
	book: Book;
};

const TableRow: React.FC<TableRowProps> = ({book}) => {
	return (
		<tr className="bg-white hover:bg-gray-100">
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
				<Link href={`/books/${book.id}`}>{book.isbn}</Link>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{book.title}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{book.author}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				<LikeWidget id={book.id} likes={book.likes}/>
			</td>
		</tr>
	);
};

export default TableRow;
