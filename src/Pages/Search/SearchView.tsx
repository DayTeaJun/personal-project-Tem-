import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import { useParams } from 'react-router-dom';
import { S } from '../HomeFeed/homFeed.style';
import BookItem from '../../Components/Books/BookItem';
import { Paginaition } from './Pagination';
import { useEffect, useState } from 'react';

export default function SearchView() {
	const { searchView } = useParams<string>();
	const [currentPage, setCurrentPage] = useState(1);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const fetchGetBook = async () => {
			try {
				const bookData = await getBooks(searchView || '', 14, currentPage);
				setBooks(bookData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchGetBook();
	}, [currentPage]);

	// const { data: books, isLoading } = useQuery({
	// 	queryKey: ['books', searchView],
	// 	queryFn: () => getBooks(searchView || '', 14, currentPage),
	// 	enabled: !!searchView,
	// 	refetchOnWindowFocus: false,
	// });

	return (
		<>
			{books && books.length !== 0 ? (
				<S.Section>
					{books.map((item: BookData, index: number) => (
						<BookItem
							item={item}
							id={index}
							search={searchView || ''}
							key={item.isbn}
						></BookItem>
					))}
				</S.Section>
			) : (
				books && books.length === 0 && <h2>not found</h2>
			)}

			<Paginaition currentPage={currentPage} setCurrentPage={setCurrentPage} />

			{/* {isLoading && <h2>Loading...</h2>} */}
		</>
	);
}
